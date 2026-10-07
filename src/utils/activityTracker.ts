import { WebVisitorRecord, ActivityLogRecord } from '../types';
import { captureClientLocation } from './clientLocation';

const VISITORS_KEY = 'expart_bd_visitors_v1';
const ACTIVITIES_KEY = 'expart_bd_activities_v1';
const CURRENT_VISITOR_ID_KEY = 'expart_bd_visitor_session_id';

const INITIAL_VISITORS: WebVisitorRecord[] = [
  {
    id: 'VIS-9412',
    ip: '103.145.74.12',
    city: 'ঢাকা',
    region: 'ঢাকা বিভাগ',
    country: 'বাংলাদেশ',
    isp: 'Link3 Technologies Ltd',
    device: 'Mobile',
    browser: 'Chrome Mobile',
    os: 'Android 14',
    mapsUrl: 'https://www.google.com/maps?q=23.8103,90.4125',
    firstSeen: 'আজ, ১২:৪০ PM',
    lastActive: 'আজ, ১২:৪৯ PM',
    currentPage: 'অর্ডার কনফার্মেশন পেজ',
    pagesVisited: ['হোমপেজ', 'মনিটাইজেশন প্যাকেজ', 'অর্ডার ফর্ম'],
    totalActions: 8,
    isOnline: true,
  },
  {
    id: 'VIS-8831',
    ip: '103.230.104.18',
    city: 'চট্টগ্রাম',
    region: 'চট্টগ্রাম বিভাগ',
    country: 'বাংলাদেশ',
    isp: 'Carnival Internet',
    device: 'Desktop',
    browser: 'Chrome 122',
    os: 'Windows 11',
    mapsUrl: 'https://www.google.com/maps?q=22.3569,91.7832',
    firstSeen: 'আজ, ১১:১৫ AM',
    lastActive: 'আজ, ০১:১০ PM',
    currentPage: 'FAQ ও পলিসি গাইড',
    pagesVisited: ['হোমপেজ', 'এলিজিটিবিলিটি চেকার', 'প্রশ্ন-উত্তর (FAQ)'],
    totalActions: 14,
    isOnline: true,
  },
  {
    id: 'VIS-7629',
    ip: '118.179.223.5',
    city: 'সিলেট',
    region: 'সিলেট বিভাগ',
    country: 'বাংলাদেশ',
    isp: 'AmberIT Limited',
    device: 'Mobile',
    browser: 'Safari',
    os: 'iOS 17.4',
    mapsUrl: 'https://www.google.com/maps?q=24.8949,91.8687',
    firstSeen: 'আজ, ১০:০৫ AM',
    lastActive: 'আজ, ১০:৪৫ AM',
    currentPage: 'লাইভ সাপোর্ট চ্যাট',
    pagesVisited: ['হোমপেজ', 'লাইভ চ্যাট উইজেট'],
    totalActions: 6,
    isOnline: false,
  },
  {
    id: 'VIS-6504',
    ip: '103.114.98.77',
    city: 'রাজশাহী',
    region: 'রাজশাহী বিভাগ',
    country: 'বাংলাদেশ',
    isp: 'Grameenphone 4G',
    device: 'Mobile',
    browser: 'Samsung Internet',
    os: 'Android 13',
    mapsUrl: 'https://www.google.com/maps?q=24.3745,88.6042',
    firstSeen: 'আজ, ০৯:২০ AM',
    lastActive: 'আজ, ০৯:৫৫ AM',
    currentPage: 'প্যাকেজ বিবরণী',
    pagesVisited: ['হোমপেজ', 'প্যাকেজ ফিচার'],
    totalActions: 5,
    isOnline: false,
  }
];

const INITIAL_ACTIVITIES: ActivityLogRecord[] = [
  {
    id: 'ACT-1001',
    visitorId: 'VIS-9412',
    category: 'order',
    title: 'অর্ডার সাবমিট করেছেন (bKash TrxID)',
    details: 'গ্রাহক মিজান (Mizan) TrxID: BDHINDKRXR দিয়ে EXP-3543 অর্ডার সাবমিট করেছেন।',
    timestamp: 'আজ, ১২:৪৯ PM',
    ip: '103.145.74.12',
    city: 'ঢাকা',
    device: 'Mobile (Android)',
    statusBadge: 'নতুন অর্ডার'
  },
  {
    id: 'ACT-1002',
    visitorId: 'VIS-9412',
    category: 'payment',
    title: 'বিকাশ নম্বর কপি করেছেন',
    details: 'অফিশিয়াল পেমেন্ট নম্বর +8801929027577 ক্লিপবোর্ডে কপি করেছেন।',
    timestamp: 'আজ, ১২:৪৬ PM',
    ip: '103.145.74.12',
    city: 'ঢাকা',
    device: 'Mobile (Android)',
    statusBadge: 'পেমেন্ট কপি'
  },
  {
    id: 'ACT-1003',
    visitorId: 'VIS-8831',
    category: 'chat',
    title: 'লাইভ চ্যাটে প্রশ্ন করেছেন',
    details: 'প্রশ্ন: "আমার ১ হাজার follower আছে, monetize হবে?" উত্তর রিসিভ করেছেন।',
    timestamp: 'আজ, ০১:০৮ PM',
    ip: '103.230.104.18',
    city: 'চট্টগ্রাম',
    device: 'Desktop (Windows)',
    statusBadge: 'সাপোর্ট চ্যাট'
  },
  {
    id: 'ACT-1004',
    visitorId: 'VIS-8831',
    category: 'navigation',
    title: 'মনিটাইজেশন যোগ্যতা টেস্ট করেছেন',
    details: 'এলিজিটিবিলিটি চেকারে পেজ স্ট্যাটাস গ্রিন ও পলিসি রিকোয়ারমেন্ট দেখেছেন।',
    timestamp: 'আজ, ১২:৫৮ PM',
    ip: '103.230.104.18',
    city: 'চট্টগ্রাম',
    device: 'Desktop (Windows)',
    statusBadge: 'টুল ব্যবহার'
  },
  {
    id: 'ACT-1005',
    visitorId: 'VIS-7629',
    category: 'visitor',
    title: 'নতুন ভিজিটর ওয়েবসাইটে প্রবেশ করেছেন',
    details: 'ফেসবুক রেফারেল থেকে সিলেট অঞ্চল থেকে মোবাইল ডিভাইসে আগমন।',
    timestamp: 'আজ, ১০:০৫ AM',
    ip: '118.179.223.5',
    city: 'সিলেট',
    device: 'Mobile (iOS)',
    statusBadge: 'ওয়েব ভিজিট'
  }
];

export const getVisitors = (): WebVisitorRecord[] => {
  try {
    const data = localStorage.getItem(VISITORS_KEY);
    if (!data) {
      localStorage.setItem(VISITORS_KEY, JSON.stringify(INITIAL_VISITORS));
      return INITIAL_VISITORS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(VISITORS_KEY, JSON.stringify(INITIAL_VISITORS));
      return INITIAL_VISITORS;
    }
    return parsed;
  } catch (err) {
    return INITIAL_VISITORS;
  }
};

export const getActivities = (): ActivityLogRecord[] => {
  try {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    if (!data) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(INITIAL_ACTIVITIES));
      return INITIAL_ACTIVITIES;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(INITIAL_ACTIVITIES));
      return INITIAL_ACTIVITIES;
    }
    return parsed;
  } catch (err) {
    return INITIAL_ACTIVITIES;
  }
};

export const recordActivity = (
  category: ActivityLogRecord['category'],
  title: string,
  details: string,
  statusBadge?: string
): void => {
  try {
    const visitorId = localStorage.getItem(CURRENT_VISITOR_ID_KEY) || 'VIS-LIVE';
    const current = getActivities();
    const now = new Date();
    const timeStr = `আজ, ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const newAct: ActivityLogRecord = {
      id: `ACT-${Date.now()}`,
      visitorId,
      category,
      title,
      details,
      timestamp: timeStr,
      statusBadge: statusBadge || 'লাইভ',
    };

    const updated = [newAct, ...current.slice(0, 49)]; // keep recent 50
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_activity_changed'));
  } catch (err) {
    console.error('Error recording activity:', err);
  }
};

export const trackCurrentVisitor = async (pageName: string = 'হোমপেজ'): Promise<void> => {
  try {
    let visitorId = localStorage.getItem(CURRENT_VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = `VIS-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem(CURRENT_VISITOR_ID_KEY, visitorId);
    }

    const visitors = getVisitors();
    const existing = visitors.find((v) => v.id === visitorId);
    const now = new Date();
    const timeStr = `আজ, ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    if (existing) {
      const updated = visitors.map((v) => {
        if (v.id === visitorId) {
          const pages = v.pagesVisited || [];
          if (!pages.includes(pageName)) pages.push(pageName);
          return {
            ...v,
            currentPage: pageName,
            pagesVisited: pages,
            lastActive: timeStr,
            isOnline: true,
            totalActions: (v.totalActions || 0) + 1,
          };
        }
        return v;
      });
      localStorage.setItem(VISITORS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('expart_visitor_changed'));
    } else {
      // Capture location
      const loc = await captureClientLocation();
      const newVisitor: WebVisitorRecord = {
        id: visitorId,
        ip: loc.ip || '103.145.74.12',
        city: loc.city || 'ঢাকা',
        region: loc.region || 'ঢাকা বিভাগ',
        country: loc.country || 'বাংলাদেশ',
        isp: loc.isp || 'Broadband ISP',
        device: loc.device || 'Desktop',
        browser: loc.browser || 'Chrome',
        os: loc.os || 'Windows',
        mapsUrl: loc.mapsUrl,
        firstSeen: timeStr,
        lastActive: timeStr,
        currentPage: pageName,
        pagesVisited: [pageName],
        totalActions: 1,
        isOnline: true,
      };
      const updated = [newVisitor, ...visitors];
      localStorage.setItem(VISITORS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('expart_visitor_changed'));
    }
  } catch (err) {
    console.error('Error tracking visitor:', err);
  }
};
