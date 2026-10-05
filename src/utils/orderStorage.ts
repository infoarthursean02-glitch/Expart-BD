import { OrderRecord, OrderStatus, AdminSettings, FaqItem, PackageFeatureItem } from '../types';

const STORAGE_KEY = 'expart_bd_orders_v1';
const SETTINGS_KEY = 'expart_bd_settings_v1';
const FAQS_KEY = 'expart_bd_faqs_v1';
const FEATURES_KEY = 'expart_bd_features_v1';

const DEFAULT_SETTINGS: AdminSettings = {
  paymentNumber: '01601300122',
  packagePrice: 2999,
  businessName: 'Expart BD',
  adminUsername: 'eXPART bd',
  adminPassword: 'Ex02@0##',
  adminPin: '1234',
  announcementActive: false,
  announcementText: '🔥 বিশেষ অফার: সম্পূর্ণ ফেসবুক মনিটাইজেশন প্যাকেজ এখন মাত্র ৳২,৯৯৯ টাকায়!',
};

const INITIAL_ORDERS: OrderRecord[] = [];

export const getOrders = (): OrderRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed: OrderRecord[] = JSON.parse(data);
    // Filter out old legacy mock test orders so list starts genuinely from 0 real orders
    const cleaned = parsed.filter(
      (o) => !['EXP-9142', 'EXP-8820', 'EXP-7519'].includes(o.id)
    );
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return INITIAL_ORDERS;
  }
};

export const saveOrder = (order: OrderRecord): void => {
  try {
    const current = getOrders();
    const updated = [order, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
  } catch (e) {
    console.error('Error saving order', e);
  }
};

export const updateOrderStatus = (
  id: string,
  newStatus: OrderStatus,
  adminNote?: string
): void => {
  try {
    const current = getOrders();
    const updated = current.map((ord) => {
      if (ord.id === id) {
        return {
          ...ord,
          status: newStatus,
          adminNote: adminNote !== undefined ? adminNote : ord.adminNote,
        };
      }
      return ord;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
  } catch (e) {
    console.error('Error updating order', e);
  }
};

export const deleteOrder = (id: string): void => {
  try {
    const current = getOrders();
    const updated = current.filter((ord) => ord.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
  } catch (e) {
    console.error('Error deleting order', e);
  }
};

export const getSettings = (): AdminSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(data);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (newSettings: AdminSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    window.dispatchEvent(new CustomEvent('expart_settings_changed'));
  } catch (e) {
    console.error('Error saving settings', e);
  }
};

// FAQ Management
export const getFaqs = (): FaqItem[] => {
  try {
    const data = localStorage.getItem(FAQS_KEY);
    if (!data) {
      localStorage.setItem(FAQS_KEY, JSON.stringify(INITIAL_FAQS));
      return INITIAL_FAQS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_FAQS;
  }
};

export const saveFaq = (faq: FaqItem): void => {
  try {
    const current = getFaqs();
    const updated = [...current, faq];
    localStorage.setItem(FAQS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_faqs_changed'));
  } catch (e) {
    console.error('Error saving FAQ', e);
  }
};

export const updateFaq = (id: string, updatedFaq: Partial<FaqItem>): void => {
  try {
    const current = getFaqs();
    const updated = current.map((f) => (f.id === id ? { ...f, ...updatedFaq } : f));
    localStorage.setItem(FAQS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_faqs_changed'));
  } catch (e) {
    console.error('Error updating FAQ', e);
  }
};

export const deleteFaq = (id: string): void => {
  try {
    const current = getFaqs();
    const updated = current.filter((f) => f.id !== id);
    localStorage.setItem(FAQS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_faqs_changed'));
  } catch (e) {
    console.error('Error deleting FAQ', e);
  }
};

// Package Features Management
export const getPackageFeatures = (): PackageFeatureItem[] => {
  try {
    const data = localStorage.getItem(FEATURES_KEY);
    if (!data) {
      localStorage.setItem(FEATURES_KEY, JSON.stringify(INITIAL_PACKAGE_FEATURES));
      return INITIAL_PACKAGE_FEATURES;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PACKAGE_FEATURES;
  }
};

export const savePackageFeature = (feature: PackageFeatureItem): void => {
  try {
    const current = getPackageFeatures();
    const updated = [...current, feature];
    localStorage.setItem(FEATURES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_features_changed'));
  } catch (e) {
    console.error('Error saving feature', e);
  }
};

export const updatePackageFeature = (id: string, updatedFeat: Partial<PackageFeatureItem>): void => {
  try {
    const current = getPackageFeatures();
    const updated = current.map((f) => (f.id === id ? { ...f, ...updatedFeat } : f));
    localStorage.setItem(FEATURES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_features_changed'));
  } catch (e) {
    console.error('Error updating feature', e);
  }
};

export const deletePackageFeature = (id: string): void => {
  try {
    const current = getPackageFeatures();
    const updated = current.filter((f) => f.id !== id);
    localStorage.setItem(FEATURES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_features_changed'));
  } catch (e) {
    console.error('Error deleting feature', e);
  }
};

export const exportOrdersCsv = (): void => {
  const orders = getOrders();
  const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Page Link', 'Method', 'Sender Number', 'TrxID', 'Amount', 'Status', 'Notes', 'Admin Note'];
  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${o.createdAt}"`,
    `"${o.fullName}"`,
    `"${o.phoneNumber}"`,
    `"${o.pageUrl}"`,
    `"${o.paymentMethod}"`,
    `"${o.senderNumber}"`,
    `"${o.trxId}"`,
    `"${o.amount}"`,
    `"${o.status}"`,
    `"${(o.notes || '').replace(/"/g, '""')}"`,
    `"${(o.adminNote || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Expart_BD_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
