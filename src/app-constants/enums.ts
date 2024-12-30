export enum RoleType {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

export enum QuotationState {
  DRAFT = 'draft',
  QUOTATED = 'quotated', // Quotation created, not yet confirmed by the customer
  SOLD = 'sold', // Finalized and confirmed by the customer
  TERMINATED = 'terminated', // Booking cancelled or terminated
  UPGRADED = 'upgraded', // Status for upgraded booking or service
}

export enum TaxType {
  'SGST' = 'SGST',
  'CGST' = 'CGST',
  'IGST' = 'IGST',
}
