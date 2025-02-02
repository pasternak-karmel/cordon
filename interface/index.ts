export interface TokenData {
  access: string;
  refresh: string;
  access_expires: number;
}

export interface InstitutionProps {
  id: string;
  name: string;
  logo: string;
}

export interface ProviderProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export interface AccountInfo {
  resourceId: string;
  iban: string;
  currency: string;
  ownerName: string;
  name: string;
  product: string;
  cashAccountType: string;
}

export interface CreditCardProps {
  bankName: string;
  cardNumber: number;
  bankImage: string;
  amount: number;
  status: string;
}