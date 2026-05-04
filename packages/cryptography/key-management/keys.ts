import { randomBytes, createPublicKey, createPrivateKey } from "node:crypto";
import { generateKeyPair, type KeyPair } from "../signatures/ecdsa.js";
import { sha256 } from "../hashing/sha256.js";
import { toHex } from "../utils/hex.js";

export interface PatientKeyBundle {
  keyId: string;
  publicKey: string;   // PEM
  privateKey: string;  // PEM – keep secret
}

/**
 * Generate a fresh key bundle for a patient.
 * The keyId is a SHA-256 of the public key, providing a deterministic identifier.
 */
export function generatePatientKeyBundle(): PatientKeyBundle {
  const pair: KeyPair = generateKeyPair();
  const keyId = sha256(pair.publicKey);
  return { keyId, ...pair };
}

/**
 * Derive a stable, deterministic patient address (32-byte hex) from a public key.
 * This mirrors how blockchain addresses are derived from public keys.
 */
export function derivePatientAddress(publicKeyPem: string): string {
  return sha256(publicKeyPem).slice(0, 40); // 20 bytes, hex-encoded
}

/**
 * Generate a random 256-bit symmetric secret, returned as a hex string.
 * Useful for generating per-record AES encryption keys.
 */
export function generateSymmetricKey(): string {
  return toHex(randomBytes(32));
}

/**
 * Validate that a string is a well-formed PEM public key.
 */
export function isValidPublicKeyPem(pem: string): boolean {
  try {
    createPublicKey(pem);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate that a string is a well-formed PEM private key.
 */
export function isValidPrivateKeyPem(pem: string): boolean {
  try {
    createPrivateKey(pem);
    return true;
  } catch {
    return false;
  }
}
