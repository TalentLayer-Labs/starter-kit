import crypto from 'crypto';

export function getSHA256Hash(data: any): string {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}
