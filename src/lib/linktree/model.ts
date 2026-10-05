export interface LinktreeProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  links: { id: number | string; label: string; url: string }[];
}

function address(value: string) {
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return true;
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}

export function validateLinktree(data: unknown): LinktreeProfile {
  const profile = data as LinktreeProfile;
  if (!profile || typeof profile.name !== 'string' || !profile.name.trim() || profile.name.length > 200 ||
      typeof profile.bio !== 'string' || profile.bio.length > 2000 ||
      typeof profile.avatarUrl !== 'string' || !address(profile.avatarUrl) ||
      !Array.isArray(profile.links) || profile.links.length > 100) {
    throw new Error('Preencha o nome e uma URL válida para a imagem. Use até 100 links.');
  }
  const ids = new Set<string>();
  const links = profile.links.map(link => {
    if (!link || !['number', 'string'].includes(typeof link.id) || !String(link.id).trim() ||
        ids.has(String(link.id)) || typeof link.label !== 'string' || !link.label.trim() || link.label.length > 200 ||
        typeof link.url !== 'string' || link.url.length > 2048 || !address(link.url)) {
      throw new Error('Cada link precisa de um título e URL válida (https://, http:// ou caminho /).');
    }
    ids.add(String(link.id));
    return { id: link.id, label: link.label.trim(), url: link.url };
  });
  return { name: profile.name.trim(), bio: profile.bio.trim(), avatarUrl: profile.avatarUrl, links };
}
