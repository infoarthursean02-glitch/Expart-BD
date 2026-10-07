import { OrderRecord, OrderStatus, AdminSettings, FaqItem, PackageFeatureItem, ClientLocationData } from '../types';

const STORAGE_KEY = 'expart_bd_orders_v1';
const SETTINGS_KEY = 'expart_bd_settings_v1';
const FAQS_KEY = 'expart_bd_faqs_v1';
const FEATURES_KEY = 'expart_bd_features_v1';

const DEFAULT_SETTINGS: AdminSettings = {
  paymentNumber: '+8801929027577',
  packagePrice: 2999,
  businessName: 'Expart BD',
  adminUsername: 'eXPART bd',
  adminPassword: 'Ex02@0##',
  adminPin: '1234',
  announcementActive: false,
  announcementText: '🔥 বিশেষ অফার: সম্পূর্ণ ফেসবুক মনিটাইজেশন প্যাকেজ এখন মাত্র ৳২,৯৯৯ টাকায়!',
};

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'EXP-3543',
    fullName: 'Mizan',
    phoneNumber: '01601300122',
    pageUrl: 'https://facebook.com/mizan.page',
    paymentMethod: 'bKash',
    senderNumber: '01601300122',
    trxId: 'BDHINDKRXR',
    extraTrxChars: '9A',
    amount: 2999,
    status: 'checking',
    createdAt: 'আজ, ১২:৪৯ PM',
    notes: 'ফেসবুক পেজ মনিটাইজেশন সার্ভিস সেটআপ',
    clientLocation: {
      ip: '103.145.74.12',
      city: 'ঢাকা',
      country: 'বাংলাদেশ',
      formattedAddress: 'ঢাকা, বাংলাদেশ',
      latitude: 23.8103,
      longitude: 90.4125,
      mapsUrl: 'https://www.google.com/maps?q=23.8103,90.4125',
      source: 'ip',
      device: 'Desktop',
      os: 'Windows',
      browser: 'Chrome'
    }
  }
];

// Cross-tab broadcast channel for instant multi-window sync
const orderBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('expart_orders_sync_channel')
  : null;

if (orderBroadcast) {
  orderBroadcast.onmessage = (event) => {
    if (event.data?.type === 'ORDER_SYNC') {
      window.dispatchEvent(new CustomEvent('expart_order_changed'));
    }
  };
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new CustomEvent('expart_order_changed'));
    }
  });
}

export const syncOrdersWithBackend = async (): Promise<OrderRecord[]> => {
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        const local = getOrders();
        const map = new Map<string, OrderRecord>();
        // Add backend orders
        data.orders.forEach((o: OrderRecord) => map.set(o.id, o));
        // Add local orders not yet on backend
        local.forEach((o: OrderRecord) => {
          if (!map.has(o.id)) {
            map.set(o.id, o);
            fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(o)
            }).catch(() => {});
          }
        });
        const merged = Array.from(map.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent('expart_order_changed'));
        return merged;
      }
    }
  } catch (err) {
    // offline or static fallback
  }
  return getOrders();
};

const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'ফেসবুক কনটেন্ট মনিটাইজেশন কী? (What is Facebook Content Monetization?)',
    answer:
      'ফেসবুক কনটেন্ট মনিটাইজেশন হলো মেটা প্ল্যাটফর্মের এমন একটি ব্যবস্থা যার মাধ্যমে যোগ্য ভিডিও ক্রিয়েটররা তাদের আপলোডকৃত ভিডিও বা রিলসে বিজ্ঞাপন (In-Stream Ads), স্টারস (Stars) ইত্যাদির মাধ্যমে সরাসরি আয় করতে পারেন।',
  },
  {
    id: 'faq-2',
    question: 'কারা Expart BD-এর এই সার্ভিসটি গ্রহণ করতে পারবেন? (Who can use this service?)',
    answer:
      'যেকোনো ফেসবুক ভিডিও ক্রিয়েটর, পেজ ওনার, ইনফ্লুয়েন্সার বা ব্যবসা প্রতিষ্ঠান যারা নিজেদের ফেসবুক পেজ থেকে আয়ের পথ সুগম করতে সঠিক কারিগরি সেটআপ ও মেটা পলিসি গাইডেন্স চান।',
  },
  {
    id: 'faq-3',
    question: 'সার্ভিস ফি কত এবং কীভাবে পেমেন্ট করব? (How much does the service cost?)',
    answer:
      'আমাদের সম্পূর্ণ ফেসবুক মনিটাইজেশন প্যাকেজের মূল্য এককালীন মাত্র ৳২,৯৯৯ টাকা। আপনি আমাদের অফিশিয়াল বিকাশ অথবা নগদ পার্সোনাল নম্বরে (+8801929027577) Send Money করে প্রাপ্ত Transaction ID (TrxID) দিয়ে অর্ডার কনফার্ম করতে পারবেন। কোনো লুকানো চার্জ নেই।',
  },
  {
    id: 'faq-4',
    question: 'TrxID সাবমিট করার পর কীভাবে ভেরিফিকেশন হয়? (How is payment verified?)',
    answer:
      'অর্ডার ফর্মে আপনার নাম, পেজ লিংক ও TrxID সাবমিট করার সাথে সাথে সিস্টেম স্বয়ংক্রিয়ভাবে রিকোয়েস্টটি অ্যাডমিন প্যানেলে জমা করে। আমাদের অ্যাডমিন টিম TrxID মিলিয়ে সাথে সাথে আপনার পেজের অডিট ও সার্ভিস প্রসেসিং শুরু করে।',
  },
  {
    id: 'faq-5',
    question: 'সার্ভিস প্রসেস সম্পন্ন হতে কত সময় লাগে? (How long does the process take?)',
    answer:
      'অর্ডার প্লেস করার পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমাদের টিম আপনার পেজ অডিট ও টেকনিক্যাল কাজ শুরু করে। ধাপে ধাপে সেটিংস ও ব্যাংক পেআউট কনফিগারেশন বুঝিয়ে দেওয়া হয়।',
  },
  {
    id: 'faq-6',
    question: 'মনিটাইজেশন কি শতভাগ গ্যারান্টিড? (Is monetization guaranteed?)',
    answer:
      'না, কোনো সৎ প্রতিষ্ঠান ফেসবুকের পক্ষ থেকে ১০০% অনুমোদনের গ্যারান্টি দিতে পারে না। কারণ মনিটাইজেশনের চূড়ান্ত সিদ্ধান্ত মেটা (Meta/Facebook) অ্যালগরিদম ও তাদের নিজস্ব পলিসির উপর নির্ভরশীল। আমরা মেটার নিয়ম মেনে আপনার পেজের যাবতীয় সেটিংস প্রস্তুত করি যাতে রিজেক্ট হওয়ার ঝুঁকি সর্বনিম্ন থাকে।',
  },
];

const INITIAL_PACKAGE_FEATURES: PackageFeatureItem[] = [
  { id: 'feat-1', text: 'Facebook Monetization Assistance', bn: 'মনিটাইজেশন সেটিংস ও কারিগরি সহায়তা' },
  { id: 'feat-2', text: 'Professional Support', bn: 'অভিজ্ঞ এক্সপার্টদের সার্বক্ষণিক দিকনির্দেশনা' },
  { id: 'feat-3', text: 'Creator-focused Guidance', bn: 'ভিডিও ও রিলস কনটেন্ট নির্মাতাদের জন্য বিশেষ গাইডলাইন' },
  { id: 'feat-4', text: 'Order Support', bn: 'অর্ডারের শুরু থেকে শেষ পর্যন্ত নিয়মিত ট্র্যাকিং' },
  { id: 'feat-5', text: 'Page Eligibility Audit', bn: 'পেজ এলিজিবিলিটি ও পলিসি ভায়োলেশন চেকিং' },
  { id: 'feat-6', text: 'Payout & Tax Setup Guidance', bn: 'ব্যাংক তথ্য ও পেআউট কনফিগারেশন সংক্রান্ত সাহায্য' },
];

export const getOrders = (): OrderRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed: OrderRecord[] = JSON.parse(data);
    // Filter out old legacy mock test orders
    const cleaned = parsed.filter(
      (o) => !['EXP-9142', 'EXP-8820', 'EXP-7519'].includes(o.id)
    );
    // If cleaned is empty, restore with INITIAL_ORDERS (including Mizan's order)
    if (cleaned.length === 0 && INITIAL_ORDERS.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
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
    const exists = current.some((o) => o.id === order.id);
    const updated = exists ? current.map((o) => (o.id === order.id ? order : o)) : [order, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
    orderBroadcast?.postMessage({ type: 'ORDER_SYNC' });

    // Send to backend
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).catch((err) => {
      console.warn('Backend order sync warning:', err);
    });
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
    orderBroadcast?.postMessage({ type: 'ORDER_SYNC' });

    fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, adminNote }),
    }).catch(() => {});
  } catch (e) {
    console.error('Error updating order', e);
  }
};

export const updateOrderLocation = (
  id: string,
  location: ClientLocationData
): void => {
  try {
    const current = getOrders();
    const updated = current.map((ord) => {
      if (ord.id === id) {
        return {
          ...ord,
          clientLocation: location,
        };
      }
      return ord;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
    orderBroadcast?.postMessage({ type: 'ORDER_SYNC' });

    fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientLocation: location }),
    }).catch(() => {});
  } catch (e) {
    console.error('Error updating order location', e);
  }
};

export const deleteOrder = (id: string): void => {
  try {
    const current = getOrders();
    const updated = current.filter((ord) => ord.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_order_changed'));
    orderBroadcast?.postMessage({ type: 'ORDER_SYNC' });

    fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
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
    if (
      !parsed.paymentNumber || 
      parsed.paymentNumber === '01601300122' || 
      parsed.paymentNumber === '+8801908769186' || 
      parsed.paymentNumber.includes('01908769186') ||
      parsed.paymentNumber.includes('01601300122')
    ) {
      parsed.paymentNumber = '+8801929027577';
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...DEFAULT_SETTINGS, ...parsed }));
    }
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (newSettings: AdminSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    window.dispatchEvent(new CustomEvent('expart_settings_changed'));
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    }).catch(() => {});
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
    fetch('/api/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feature),
    }).catch(() => {});
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
    const item = updated.find((f) => f.id === id);
    if (item) {
      fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      }).catch(() => {});
    }
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
    fetch(`/api/features/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
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
