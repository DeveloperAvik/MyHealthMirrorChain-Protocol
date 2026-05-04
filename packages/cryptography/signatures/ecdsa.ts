import {
  generateKeyPairSync,
  createSign,
  createVerify,
  KeyObject,
} from "node:crypto";

const CURVE = "prime256v1"; // P-256 / secp256r1
const HASH = "SHA256";

export interface KeyPair {
  privateKey: string;  // PEM
  publicKey: string;   // PEM
}

/**
 * Generate a fresh ECDSA P-256 key pair, returned as PEM strings.
 */
export function generateKeyPair(): KeyPair {
  const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: CURVE,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });

  return {
    privateKey: privateKey as string,
    publicKey: publicKey as string,
  };
}

/**
 * Sign an arbitrary string payload with an ECDSA private key (PEM).
 * Returns a base64-encoded DER signature.
 */
export function sign(data: string, privateKeyPem: string): string {
  const signer = createSign(HASH);
  signer.update(data);
  signer.end();
  return signer.sign(privateKeyPem, "base64");
}

/**
 * Verify a base64-encoded ECDSA signature against the original data.
 */
export function verify(
  data: string,
  signatureBase64: string,
  publicKeyPem: string,
): boolean {
  try {
    const verifier = createVerify(HASH);
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKeyPem, signatureBase64, "base64");
  } catch {
    return false;
  }
}
