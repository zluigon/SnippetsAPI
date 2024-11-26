import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is not defined in the environment variables');
}

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

const algo = 'aes-256-cbc';

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return iv.toString('hex') + encrypted;
}

function decrypt(text: string): string {
  const iv = Buffer.from(text.slice(0, 32), 'hex');
  const encrypted = text.slice(32);
  const decipher = crypto.createDecipheriv(algo, key, iv);
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

export { encrypt, decrypt };
