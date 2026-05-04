import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;   // 96-bit IV recommended for GCM
const TAG_LENGTH = 16;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32;  // 256-bit

export interface EncryptedPayload {
  iv: string;
  tag: string;
  salt: string;
  ciphertext: string;
}

/**
 * Derive a 256-bit key from a passphrase + salt using scrypt.
 */
function deriveKey(passphrase: string, salt: Buffer): Buffer {
  return scryptSync(passphrase, salt, KEY_LENGTH) as Buffer;
}

/**
 * Encrypt plaintext with AES-256-GCM.
 * Returns an EncryptedPayload where every field is a hex string.
 */
export function encrypt(plaintext: string, passphrase: string): EncryptedPayload {
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);
  const key = deriveKey(passphrase, salt);

  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    salt: salt.toString("hex"),
    ciphertext: encrypted.toString("hex"),
  };
}

/**
 * Decrypt an EncryptedPayload produced by {@link encrypt}.
 */
export function decrypt(payload: EncryptedPayload, passphrase: string): string {
  const salt = Buffer.from(payload.salt, "hex");
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");
  const ciphertext = Buffer.from(payload.ciphertext, "hex");
  const key = deriveKey(passphrase, salt);

  const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
