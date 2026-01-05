export interface Receipt {
  id?: number;
  nomComplet: string;
  paymentType: 'cash' | 'cheque' | 'virement' | 'mobile_money';
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

export type PaymentType = 'cash' | 'cheque' | 'virement' | 'mobile_money';

export const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: 'cash', label: 'Espèces' },
  { value: 'cheque', label: 'Chèque' },
  { value: 'virement', label: 'Virement' },
  { value: 'mobile_money', label: 'Mobile Money' },
];

export const CLASSES = [
  'Licence 1',
  'Licence 2',
  'Licence 3',
  'Master 1',
  'Master 2',
  'Spécialisation',
];

export const PAYMENT_REASONS = [
  'Frais de scolarité',
  'Frais d\'inscription',
  'Frais de transport',
  'Frais de cantine',
  'Frais d\'activités',
  'Autre',
];
