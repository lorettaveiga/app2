import crypto from "crypto";

export function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

export function hashPassword(password, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash;
}

export function verifyPassword(password, salt, hashedPassword) {
  const hashToCompare = hashPassword(password, salt);
  return hashToCompare === hashedPassword;
}

export function simpleHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}
