/**
 * Convert a Buffer or Uint8Array to a lowercase hex string.
 */
export function toHex(bytes: Buffer | Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

/**
 * Convert a hex string to a Buffer.
 * Throws if the input is not valid hex.
 */
export function fromHex(hex: string): Buffer {
  if (hex.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error(`Invalid hex string: "${hex}"`);
  }
  return Buffer.from(hex, "hex");
}

/**
 * Convert a UTF-8 string to its hex representation.
 */
export function stringToHex(str: string): string {
  return Buffer.from(str, "utf8").toString("hex");
}

/**
 * Convert a hex string back to a UTF-8 string.
 */
export function hexToString(hex: string): string {
  return fromHex(hex).toString("utf8");
}

/**
 * Constant-time comparison of two hex strings to avoid timing attacks.
 */
export function hexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = fromHex(a);
  const bufB = fromHex(b);
  let diff = 0;
  for (let i = 0; i < bufA.length; i += 1) {
    diff |= bufA[i] ^ bufB[i];
  }
  return diff === 0;
}
