import 'server-only';
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from 'node:crypto';
import { MongoClient } from 'mongodb';

const DAY = 86_400_000;
type TokenRecord = {
    _id: string; encryptedToken: string; seedHash: string; initializedAt: Date;
    expiresAt?: Date; refreshedAt?: Date; lockUntil?: Date; lockId?: string;
    lastFailureAt?: Date;
};

// Conexão independente: as rotas legadas fecham sua própria conexão.
let clientPromise: Promise<MongoClient> | undefined;
async function collection() {
    if (!process.env.URL_MONGO) throw new Error('Instagram: URL_MONGO ausente.');
    if (!clientPromise) {
        clientPromise = new MongoClient(process.env.URL_MONGO, {
            maxPoolSize: 5, serverSelectionTimeoutMS: 10000,
        }).connect().catch(() => {
            clientPromise = undefined;
            throw new Error('Instagram: banco indisponível.');
        });
    }
    return (await clientPromise).db('site-coqueiral').collection<TokenRecord>('integration_tokens');
}

function encryptionKey() {
    const hex = process.env.INSTAGRAM_TOKEN_ENCRYPTION_KEY || '';
    if (!/^[a-f0-9]{64}$/i.test(hex)) throw new Error('Instagram: chave de criptografia inválida.');
    return Buffer.from(hex, 'hex');
}

export function encryptToken(token: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
    return [iv, cipher.getAuthTag(), encrypted].map(part => part.toString('base64')).join('.');
}

export function decryptToken(value: string) {
    const [iv, tag, encrypted] = value.split('.').map(part => Buffer.from(part, 'base64'));
    const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

export function renewalDue(record: Pick<TokenRecord, 'initializedAt' | 'refreshedAt' | 'expiresAt'>, now = Date.now()) {
    // Tokens recém-gerados precisam ter ao menos 24 horas.
    if (now - new Date(record.refreshedAt || record.initializedAt).getTime() < DAY) return false;
    return !record.expiresAt || new Date(record.expiresAt).getTime() - now <= 15 * DAY;
}

async function tokenRecord() {
    encryptionKey();
    const records = await collection();
    const seed = process.env.TOKEN_INSTA?.trim();
    let record = await records.findOne({_id: 'instagram'});
    if (seed) {
        const seedHash = createHash('sha256').update(seed).digest('hex');
        if (!record) {
            await records.updateOne({_id: 'instagram'}, {$setOnInsert: {
                encryptedToken: encryptToken(seed), seedHash, initializedAt: new Date(),
            }}, {upsert: true});
        } else if (record.seedHash !== seedHash) {
            // Uma troca explícita do token inicial permite recuperar uma autorização revogada.
            await records.updateOne({_id: 'instagram', seedHash: record.seedHash}, {
                $set: {encryptedToken: encryptToken(seed), seedHash, initializedAt: new Date()},
                $unset: {expiresAt: '', refreshedAt: '', lockId: '', lockUntil: '', lastFailureAt: ''},
            });
        }
        record = await records.findOne({_id: 'instagram'});
    }
    if (!record) throw new Error('Instagram: configure TOKEN_INSTA para inicializar.');
    return record;
}

export async function instagramAccessToken() {
    // Compatibilidade até configurar a automação no ambiente.
    if (!process.env.INSTAGRAM_TOKEN_ENCRYPTION_KEY) {
        if (!process.env.TOKEN_INSTA) throw new Error('Instagram: token ausente.');
        return process.env.TOKEN_INSTA;
    }
    return decryptToken((await tokenRecord()).encryptedToken);
}

export async function refreshInstagramToken() {
    const record = await tokenRecord();
    if (!renewalDue(record)) return {status: 'not_due', expiresAt: record.expiresAt ?? null};
    
    const records = await collection();
    const lockId = randomUUID();
    const locked = await records.findOneAndUpdate({
        _id: 'instagram', encryptedToken: record.encryptedToken, seedHash: record.seedHash,
        $or: [{lockUntil: {$exists: false}}, {lockUntil: {$lt: new Date()}}],
    }, {$set: {lockId, lockUntil: new Date(Date.now() + 120000)}}, {returnDocument: 'after'});
    if (!locked) return {status: 'busy'};
    try {
        const url = new URL('https://graph.instagram.com/refresh_access_token');
        url.searchParams.set('grant_type', 'ig_refresh_token');
        url.searchParams.set('access_token', decryptToken(locked.encryptedToken));
        const response = await fetch(url, {cache: 'no-store', signal: AbortSignal.timeout(15000)});
        if (!response.ok) throw new Error('Instagram: renovação recusada.');
        const data = await response.json();
        if (typeof data.access_token !== 'string' || !data.access_token ||
            typeof data.expires_in !== 'number' || !Number.isFinite(data.expires_in) || data.expires_in <= 0) {
            throw new Error('Instagram: resposta de renovação inválida.');
        }
        const expiresAt = new Date(Date.now() + data.expires_in * 1000);
        const saved = await records.updateOne({_id: 'instagram', lockId}, {
            $set: {encryptedToken: encryptToken(data.access_token), expiresAt, refreshedAt: new Date()},
            $unset: {lockId: '', lockUntil: '', lastFailureAt: ''},
        });
        if (!saved.matchedCount) throw new Error('Instagram: estado alterado durante renovação.');
        return {status: 'renewed', expiresAt};
    } catch {
        await records.updateOne({_id: 'instagram', lockId}, {
            $set: {lastFailureAt: new Date()}, $unset: {lockId: '', lockUntil: ''},
        });
        // Nunca propagar a resposta ou URL da Meta, pois podem conter o token.
        throw new Error('Não foi possível renovar o Instagram. Verifique a validade do token e a conexão.');
    }
}
