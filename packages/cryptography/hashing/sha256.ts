import { createHash, createHmac } from "node:crypto";

/**
 * Compute a SHA-256 hex digest of the given input.
 */
export function sha256(input: string | Buffer): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * Compute a SHA-512 hex digest of the given input.
 */
export function sha512(input: string | Buffer): string {
  return createHash("sha512").update(input).digest("hex");
}

/**
 * Hash a JSON-serialisable object deterministically.
 * Keys are sorted so object property order does not affect the digest.
 */
export function hashObject(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj).sort();
  const sorted: Record<string, unknown> = {};
  for (const k of keys) sorted[k] = obj[k];
  return sha256(JSON.stringify(sorted));
}

/**
 * HMAC-SHA-256 with a secret key – useful for verifying payload integrity.
 */
export function hmacSha256(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("hex");
}
