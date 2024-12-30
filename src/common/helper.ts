import { hash, compare } from 'bcrypt';
import { TaxType } from 'src/app-constants/enums';

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

export function CalculateTaxes(subTotal, taxes) {
  const allTaxTypes = Object.values(TaxType);
  const calculatedTaxes = [];
  let totalTaxes = 0;

  allTaxTypes.forEach((taxType) => {
    if (taxes.includes(taxType)) {
      let taxEntry;
      if (taxType === TaxType.SGST || taxType === TaxType.CGST) {
        taxEntry = {
          type: taxType,
          percentage: 9,
          value: subTotal * 0.09,
        };
      } else if (taxType === TaxType.IGST) {
        taxEntry = {
          type: TaxType.IGST,
          percentage: 18,
          value: subTotal * 0.18,
        };
      }
      calculatedTaxes.push(taxEntry);
      totalTaxes += taxEntry.value;
    } else {
      calculatedTaxes.push({
        type: taxType,
        percentage:
          taxType === TaxType.SGST || taxType === TaxType.CGST ? 9 : 18,
        value: 'NA',
      });
    }
  });
  return { calculatedTaxes, totalTaxes };
}
