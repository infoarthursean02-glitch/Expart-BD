export type PaymentMethod = 'bKash' | 'Nagad';

export type OrderStatus = 'checking' | 'verified' | 'in_progress' | 'completed' | 'rejected';

export interface OrderRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  pageUrl: string;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  trxId: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  adminNote?: string;
}

export interface AdminSettings {
  paymentNumber: string;
  packagePrice: number;
  businessName: string;
  adminUsername: string;
  adminPassword: string;
  adminPin?: string;
  announcementActive?: boolean;
  announcementText?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PackageFeatureItem {
  id: string;
  text: string;
  bn: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TargetAudienceItem {
  title: string;
  badge: string;
  description: string;
  highlight: string;
}
