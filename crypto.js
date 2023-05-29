const crypto = require("crypto");

const deriveKey = (password, fixedSalt) => {
  const saltBuffer = arrayBufferToBuffer(fixedSalt);
  const iterations = 37649;
  const keyLength = 32;

  const derivedKey = crypto.pbkdf2Sync(password, saltBuffer, iterations, keyLength, "sha1");
  return derivedKey;
};

const arrayBufferToBuffer = (arrayBuffer) => {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
};

const decrypt = (keyBytes, cipherText, cipherAlgorithm) => {
  try {
    const key = keyBytes;

    const inputBuffer = Buffer.from(cipherText, "base64");

    const iv = inputBuffer.slice(0, 16);
    const encryptedBytes = inputBuffer.slice(16, -32);
    const macBytes = inputBuffer.slice(-32);

    const mac = crypto.createHmac("sha256", key);
    mac.update(iv);
    mac.update(encryptedBytes);
    const expectedMacBytes = mac.digest();

    if (!equalBytes(macBytes, expectedMacBytes)) {
      throw new Error("Decryption Failed");
    }

    const decipher = crypto.createDecipheriv(cipherAlgorithm, key, iv);
    decipher.setAutoPadding(true);

    const decryptedChunks = [];
    decryptedChunks.push(decipher.update(encryptedBytes));
    decryptedChunks.push(decipher.final());

    const decryptedText = Buffer.concat(decryptedChunks).toString("utf8");

    return decryptedText;
  } catch (error) {
    console.error("Decryption error:", error);
    return cipherText;
  }
};

const equalBytes = (buf1, buf2) => {
  if (buf1.length !== buf2.length) return false;

  for (let i = 0; i < buf1.length; i++) {
    if (buf1[i] !== buf2[i]) return false;
  }

  return true;
};

const encrypt = (keyBytes, plaintext, cipherAlgorithm) => {
  try {
    const key = keyBytes;
    const iv = crypto.randomBytes(16); // Genera un nuevo vector de inicialización aleatorio

    const cipher = crypto.createCipheriv(cipherAlgorithm, key, iv);
    cipher.setAutoPadding(true); // Habilita el relleno PKCS7

    const encryptedChunks = [];
    encryptedChunks.push(cipher.update(Buffer.from(plaintext, "utf8")));
    encryptedChunks.push(cipher.final());

    const encryptedBytes = Buffer.concat(encryptedChunks);

    const mac = crypto.createHmac("sha256", key);
    mac.update(iv);
    mac.update(encryptedBytes);
    const macBytes = mac.digest();

    const outputStream = Buffer.concat([iv, encryptedBytes, macBytes]);
    return outputStream.toString("base64");
  } catch (error) {
    console.error("Encryption error:", error);
    return plaintext;
  }
};

const getCipher = (cipher) => {
  try {
    const key = crypto.randomBytes(32); // Generar una clave aleatoria de 32 bytes
    const iv = crypto.randomBytes(16); // Generar un vector de inicialización aleatorio de 16 bytes
    return crypto.createCipheriv(cipher, key, iv);
  } catch (error) {
    console.error("Error creating cipher:", error);
    return null;
  }
};

const parseBase64Binary = (base64String) => {
  const base64 = Buffer.from(base64String, "base64");
  return new Uint8Array(base64).buffer;
};

module.exports = {
  encrypt,
  decrypt,
  deriveKey,
  getCipher,
  parseBase64Binary,
};
