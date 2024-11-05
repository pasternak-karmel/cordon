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