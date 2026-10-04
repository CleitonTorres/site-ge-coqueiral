import { randomInt } from 'node:crypto';
import type { Collection, Document } from 'mongodb';

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateRegistrationProtocol() {
  const code = Array.from({length: 8}, () => alphabet[randomInt(alphabet.length)]).join('');
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export async function insertRegistrationWithProtocol(
  collection: Pick<Collection<Document>, 'createIndex' | 'insertOne'>,
  registration: Document,
  generate = generateRegistrationProtocol,
) {
  // Sparse keeps legacy registrations without a protocol compatible with this index.
  await collection.createIndex({protocol: 1}, {unique: true, sparse: true});
  for (let attempt = 0; attempt < 10; attempt++) {
    const protocol = generate();
    try {
      await collection.insertOne({...registration, protocol});
      return protocol;
    } catch (error) {
      const failure = error as {code?: number; keyPattern?: Record<string, unknown>};
      if (failure.code !== 11000 || !failure.keyPattern?.protocol) throw error;
    }
  }
  throw new Error('Não foi possível gerar um protocolo único. Tente novamente.');
}
