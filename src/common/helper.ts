import { hash, compare } from 'bcrypt';

export function getSchemaKey(key: string): string {
  return key === 'id' ? '_id' : key;
}

const saltOrRounds = 10;

/**
 * Hashes a plain text password.
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, saltOrRounds);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to true if the passwords match, otherwise false.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generateQuotationNumber(prefix) {
  const timestamp = Date.now().toString(36); // Base-36 timestamp for uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random alphanumeric string
  return `${prefix}-${timestamp}-${randomSuffix}`;
}
