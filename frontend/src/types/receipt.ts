export interface Receipt {
  id?: number;
  nomComplet: string;
  paymentType: 'cash' | 'cheque' | 'virement';
  chequeDetails?: string;
  amount: number;
  dossierNumber: string;
  date: string;
  classe: string;
  phoneNumber?: string;
  paymentReason: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReceiptFilters {
  search: string;
  paymentType: string;
  classe: string;
  dateFrom: string;
  dateTo: string;
}

export type PaymentType = 'cash' | 'cheque' | 'virement';

export const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: 'cash', label: 'Espèces' },
  { value: 'cheque', label: 'Chèque' },
  { value: 'virement', label: 'Virement' },
];

export const CLASSES = [
  '1ère Année',
  '2ème Année',
  '3ème Année',
  '4ème Année',
  '5ème Année',
  '6ème Année',
];

export const PAYMENT_REASONS = [
  'Frais de scolarité',
  'Frais d\'inscription',
  'Frais de transport',
  'Frais de cantine',
  'Frais d\'activités',
  'Autre',
];
