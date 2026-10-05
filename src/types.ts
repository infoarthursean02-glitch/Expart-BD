export type PaymentMethod = 'bKash' | 'Nagad';

export type OrderStatus = 'checking' | 'verified' | 'in_progress' | 'completed' | 'rejected';

export interface ClientLocationData {
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  ip?: string;
  isp?: string;
  device?: string;
  browser?: string;
  os?: string;
  accuracyMeters?: number;
  source?: 'gps' | 'ip' | 'network';
  mapsUrl?: string;
  formattedAddress?: string;
  capturedAt?: string;
}

export interface OrderRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  pageUrl: string;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  trxId: string;
  extraTrxChars?: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  adminNote?: string;
  clientLocation?: ClientLocationData;
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

export interface ChatMessage {
  id: string;
  sender: 'client' | 'bot' | 'admin';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  clientName?: string;
  clientLocation?: ClientLocationData;
  createdAt: string;
  updatedAt: string;
  unreadCountForAdmin: number;
  messages: ChatMessage[];
  status: 'active' | 'closed';
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
