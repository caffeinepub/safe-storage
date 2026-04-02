// AES-GCM-256 client-side encryption using Web Crypto API

const PBKDF2_ITERATIONS = 100_000;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;

function toArrayBuffer(arr: Uint8Array): Uint8Array<ArrayBuffer> {
  if (arr.buffer instanceof ArrayBuffer) {
    return arr as Uint8Array<ArrayBuffer>;
  }
  return new Uint8Array(arr) as Uint8Array<ArrayBuffer>;
}

export async function deriveKey(
  password: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toArrayBuffer(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

/**
 * Encrypts bytes using AES-GCM-256.
 * Returns: [16-byte salt | 12-byte IV | encrypted data]
 */
export async function encryptBytes(
  data: Uint8Array,
  password: string,
): Promise<Uint8Array> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: toArrayBuffer(iv) },
    key,
    toArrayBuffer(data),
  );

  const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);
  result.set(salt, 0);
  result.set(iv, SALT_LENGTH);
  result.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH);
  return result;
}

/**
 * Decrypts bytes previously encrypted with encryptBytes.
 * Input format: [16-byte salt | 12-byte IV | encrypted data]
 */
export async function decryptBytes(
  data: Uint8Array,
  password: string,
): Promise<Uint8Array> {
  const salt = data.slice(0, SALT_LENGTH);
  const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const encrypted = data.slice(SALT_LENGTH + IV_LENGTH);
  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: toArrayBuffer(iv) },
    key,
    toArrayBuffer(encrypted),
  );
  return new Uint8Array(decrypted);
}

/** Derive a deterministic encryption password from the user's principal */
export function getEncryptionPassword(principal: string): string {
  return `safe-storage-key:${principal}`;
}
