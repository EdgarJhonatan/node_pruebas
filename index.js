const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const {
  encrypt,
  decrypt,
  decrypt2,
  parseBase64Binary,
  deriveKey,
  getCipher,
  encrypt2,
} = require("./crypto");
/*
const encryptedData =
  "rucPZ+/6Q6jY0FZ3FyGWtT7BKNftIJlC6Nn2aKa0dtLhRMetR4eUT2uj9vkHFZePqvkz8w+On01MCdAigd0EfC/c+fF7EjzXKalDw9P4Xb/Ye5rC7amNZkvUdWGL/JPyoywWWfkBi1o2BF2DxXhrRahb8ORFFGkVVjskINoSDIHK+EVpLkADkUOp2KF3VeDL";

// Clave de cifrado
const key = "pLPIREfrl6#w#I1hEPeXOtadReS5*Tly";

// Descifrar los datos
const decryptedData = CryptoJS.HmacSHA256(encryptedData, key)
  .toString(CryptoJS.enc.Base64)
  .toString(CryptoJS.enc.Utf8);
//const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);

console.log("decryptedData", decryptedData);
*/
//---------------
/*
// Datos cifrados en base64 obtenidos desde OutSystems
const encryptedData2 =
  "hwqbmkBE+xKPMWLA+w8WOdbg9EB+9qzCXiqnvJMBj7LomLsxpQmeQBOgR3eBPnAT2MBAIbu0n3ucyM4sb+2jLLkks4fZ3XHKcbZO0u+y+3wBKGkVjxzotPFIOqcakrkvmOXfyF7xWScUSOu0M5pAAmIY/mCxCOjS+ux0L1iFC0TyvjSK8Ypo+tAD44ra1xbv2//wLjpydd8TpyraBVFOuQxldLRInDq1SFoQ+MwqfOevFhRcwjy/aC0tnmT2f3tCW8vNQ9d2dNmviIKsJ1I2y9BykTFm6pFxiNPtdNGvhBV5bPL1gO0a0V9J//bvbm3Bu6xArWq7lWcI9IU9ZHTO+Klwey4GuY3ZrY0DBFCE55JS/Z80VSLJeXQgq/UTRk8jDt/Xl5vFQp6JdwrabWqjd+tujb3IKwixog4jIgmMo3fY5vBPgeWwKLjucVRA9lZE6NSmmDPpuomAEFdVXcfiTA==";

// Clave de cifrado
const key2 = "pLPIREfrl6#w#I1hEPeXOtadReS5*Tly";

const decipher = crypto.createDecipher("aes-256-cbc", key2);
let decryptedData2 = decipher.update(encryptedData2, "base64", "utf8");
decryptedData2 += decipher.final("utf8");

console.log(decryptedData2);
*/
/*
// Generar una clave aleatoria
const keyBytes = crypto.randomBytes(32);
console.log("keyBytes", keyBytes);

// Encriptar el texto utilizando la clave generada
const plaintext = "Texto a encriptar prueba";
const cipher = "aes-256-cbc";
const encryptedData = encrypt(keyBytes, plaintext, cipher);

// Obtener los valores cifrados
const { ciphertext, iv } = encryptedData;
console.log("Ciphertext:", ciphertext);
console.log("IV:", iv);

// Ahora, para desencriptar el texto

// Obtener la clave guardada en formato base64
const claveGuardada = keyBytes.toString("base64");

// Desencriptar el texto cifrado utilizando la clave guardada y el IV
const decryptedText = decrypt(Buffer.from(claveGuardada, "base64"), ciphertext, iv, cipher);
console.log("Decrypted Text:", decryptedText);
*/
/*
const keyBytes = "clave en bytes";
const cipherText =
  "rucPZ+/6Q6jY0FZ3FyGWtT7BKNftIJlC6Nn2aKa0dtLhRMetR4eUT2uj9vkHFZePqvkz8w+On01MCdAigd0EfC/c+fF7EjzXKalDw9P4Xb/Ye5rC7amNZkvUdWGL/JPyoywWWfkBi1o2BF2DxXhrRahb8ORFFGkVVjskINoSDIHK+EVpLkADkUOp2KF3VeDL";
const cipher = "aes-256-cbc";

const decryptedText = decrypt2(keyBytes, cipherText, cipher);
console.log("Decrypted Text:", decryptedText);

*/
const cipherText =
  "aJ8aPxRIdNZXpuA2999yUXzXWfY3f0t2huDPbszj+W0wcO9Ac/ao+e+sd77p6abAuTVJt8nuAn2eLtBpdwP5VLJTczs6wyUuImk8foI3E651V8PzV0MwuP4Kp4qTHQNEt7WTia3roWNfFq1MQkGoTCXQDXMJYxRmKkVE85YuJYY=";

// Paso 1
const salt = parseBase64Binary(
  "rgbah+AZtko0FlU0W6BCaaAuvKKlF2dAFHjrEVZTF+8RKQPOyn/RO9D8LOCLlAOxgoPad0HcQS5IAWYIq5RsMmihILUdWHe3Gr7YZJUNGtzPqZZI+VtmTS4Hvb+LHbahD5dhWey1moFlYmrxpjkisI1OPkS/1EnWaiaUf/9iVEw="
);
// Paso 2
const resDeriveKey = deriveKey("pLPIREfrl6#w#I1hEPeXOtadReS5*Tly", salt);

const resDecrypt2 = decrypt(resDeriveKey, cipherText, "aes-256-cbc");
console.log("resDecrypt2", resDecrypt2);

const plaintext = {
  transaccion: {
    id: 3,
  },
  producto: {
    id: "2",
  },
};
const resEncrypt2 = encrypt(resDeriveKey, JSON.stringify(plaintext), "aes-256-cbc");
console.log("resEncrypt2", resEncrypt2);
