import { OrderRecord, OrderStatus, AdminSettings } from '../types';

const STORAGE_KEY = 'expart_bd_orders_v1';
const SETTINGS_KEY = 'expart_bd_settings_v1';

const DEFAULT_SETTINGS: AdminSettings = {
  paymentNumber: '01601300122',
  packagePrice: 2999,
  businessName: 'Expart BD',
  adminUsername: 'eXPART bd',
  adminPassword: 'Ex02@0##',
  adminPin: '1234',
};

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'EXP-9142',
    fullName: 'মাহমুদুল হাসান',
    phoneNumber: '01712345678',
    pageUrl: 'https://facebook.com/hasanvlogsbd',
    paymentMethod: 'bKash',
    senderNumber: '01712345678',
    trxId: 'BK9A7X3L01',
    amount: 2999,
    status: 'checking',
    createdAt: 'আজ, ১০:১৫ AM',
    notes: 'আমার পেজের ফলোয়ার আছে ১২ হাজার। দ্রুত সেটআপ দরকার।',
  },
  {
    id: 'EXP-8820',
    fullName: 'তানজিলা আক্তার',
    phoneNumber: '01898765432',
    pageUrl: 'https://facebook.com/tanzilacooks',
    paymentMethod: 'Nagad',
    senderNumber: '01898765432',
    trxId: 'NG84FD9902',
    amount: 2999,
    status: 'verified',
    createdAt: 'আজ, ০৯:৩০ AM',
    notes: 'কুকিং ভিডিও বানাই। পেআউট সেটআপে সাহায্য চাই।',
    adminNote: 'পেমেন্ট চেক করা হয়েছে। পেজ অডিট চলছে।',
  },
  {
    id: 'EXP-7519',
    fullName: 'রাকিবুল ইসলাম',
    phoneNumber: '01911223344',
    pageUrl: 'https://facebook.com/rakibtechbd',
    paymentMethod: 'bKash',
    senderNumber: '01911223344',
    trxId: 'BK3M88Q144',
    amount: 2999,
    status: 'completed',
    createdAt: 'গতকাল, ০৪:৫০ PM',
    notes: 'ইন-স্ট্রিম অ্যাডস ও ব্যাংক ইনফরমেশন সেটআপ চাই।',
    adminNote: 'সেটআপ সম্পন্ন হয়েছে এবং ক্লায়েন্টকে রিপোর্ট পাঠানো হয়েছে।',
  },
];

export const getOrders = (): OrderRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
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
