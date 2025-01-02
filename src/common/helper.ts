import { HttpException, HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { extname } from 'path';
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

// Helper function to generate a unique file name with the original name as a prefix
export function generateFileName(file: Express.Multer.File): string {
  const originalName = file.originalname.replace(
    extname(file.originalname),
    '',
  ); // Remove the extension from original name
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
  return `${originalName}-${uniqueSuffix}`; // Concatenate original name with unique suffix
}

export const imageFileFilter = async (req, file, callback) => {
  const allowedMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new HttpException(
        `${file.mimetype} not allowed!`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};
