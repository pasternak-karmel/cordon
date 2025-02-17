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

export interface RequisitionTableProps {
  id: string;
  userId: string;
  requisitionId: string;
  status_short: string;
  status_long: string;
  status_description: string;
  agreement: string;
  accounts: string[];
  reference: string;
  user_language: string;
  linkStatus: string;
  lastSyncAt: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  institutionName: string;
}

export interface transactionProps {
  SubscriptionTitle: string;
  subscriptionPrice: number;
  transactionId: string;
  bookingDate: string;
  transactionAmount: {
    amount: number;
    currency: string;
  };
  debtorName: string;
  additionalInformation: string;
  finAbonnement: string | null;
}

export interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular: boolean;
  isPerMonth: boolean;
  description: string;
}

export interface PricingSectionProps {
  billingCards: PricingCardProps[];
}
export interface subscriptionDetailProps {
  SubscriptionTitle: string;
  subscriptionLogoUrl: string;
  subscriptionCategory: string;
  remainingDays: number;
  startingDate: string;
  endingDate: string;
  subscriptionPrice: number;
  subscriptionType: string;
  paymentsHistory: { paymentDate: string; paymentCategory: string }[];
}

export interface SubscriptionStore {
  subscription: subscriptionDetailProps;
  updateSubscription: (data: subscriptionDetailProps) => void;
}
export interface userRequistionProps {
  id: string;
  created: string;
  redirect: string;
  status: string;
  institution_id: string;
  agreement: string;
  reference: string;
  accounts: string[];
  link: string;
  ssn: string | null;
  account_selection: boolean;
  redirect_immediate: boolean;
}

export interface ChartData {
  name: string;
  total: number;
}

export interface BarChartProps {
  data: ChartData[];
  total: number;
}