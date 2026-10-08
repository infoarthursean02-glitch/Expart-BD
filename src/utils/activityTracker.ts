import { WebVisitorRecord, ActivityLogRecord } from '../types';
import { captureClientLocation } from './clientLocation';

const VISITORS_KEY = 'expart_bd_visitors_v2';
const ACTIVITIES_KEY = 'expart_bd_activities_v2';
const CURRENT_VISITOR_ID_KEY = 'expart_bd_visitor_session_id';

// Helper to format date as YYYY-MM-DD
export const getFormattedDateStr = (date: Date = new Date()): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getPastDate = (daysAgo: number): { dateStr: string; timestampMs: number } => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { dateStr: getFormattedDateStr(d), timestampMs: d.getTime() };
};

// Detect Traffic Referrer & Source
export const detectTrafficSource = (): {
  source: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} => {
  const referrer = typeof document !== 'undefined' ? (document.referrer || '') : '';
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const utmSource = searchParams.get('utm_source') || undefined;
  const utmMedium = searchParams.get('utm_medium') || undefined;
  const utmCampaign = searchParams.get('utm_campaign') || undefined;

  let source = 'Direct / Organic';
  if (utmSource) {
    source = `Campaign: ${utmSource}`;
  } else if (referrer) {
    const refLower = referrer.toLowerCase();
    if (refLower.includes('facebook') || refLower.includes('fb.me') || refLower.includes('fb.com')) {
      source = 'Facebook (Meta)';
    } else if (refLower.includes('google')) {
      source = 'Google Search';
    } else if (refLower.includes('youtube')) {
      source = 'YouTube';
    } else if (refLower.includes('whatsapp') || refLower.includes('wa.me')) {
      source = 'WhatsApp';
    } else if (refLower.includes('instagram')) {
      source = 'Instagram';
    } else if (refLower.includes('tiktok')) {
      source = 'TikTok';
    } else {
      try {
        const host = new URL(referrer).hostname;
        source = host.replace(/^www\./, '');
      } catch {
        source = 'Referral Link';
      }
    }
  }

  return { source, referrer: referrer || 'direct', utmSource, utmMedium, utmCampaign };
};

// Seed multi-day visitor records (Today, Yesterday, 2-7 days ago, 8-30 days ago)
const generateInitialVisitors = (): WebVisitorRecord[] => {
  const today = getPastDate(0);
  const yesterday = getPastDate(1);
  const daysAgo2 = getPastDate(2);
  const daysAgo3 = getPastDate(3);
  const daysAgo4 = getPastDate(4);
  const daysAgo5 = getPastDate(5);
  const daysAgo6 = getPastDate(6);
  const daysAgo10 = getPastDate(10);
  const daysAgo15 = getPastDate(15);

  return [
    // Today visitors
    {
      id: 'VIS-9412',
      ip: '103.145.74.12',
      city: 'Dhaka',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      isp: 'Link3 Technologies Ltd',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile 123',
      os: 'Android 14',
      mapsUrl: 'https://www.google.com/maps?q=23.8103,90.4125',
      firstSeen: 'Today, 12:40 PM',
      lastActive: 'Today, 12:49 PM',
      currentPage: 'Order Form & TrxID',
      pagesVisited: ['Homepage', 'Pricing Package', 'Order Form'],
      totalActions: 8,
      isOnline: true,
      referrer: 'https://m.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 2,
      dateStr: today.dateStr,
      timestampMs: today.timestampMs,
    },
    {
      id: 'VIS-8831',
      ip: '103.230.104.18',
      city: 'Chittagong',
      region: 'Chittagong Division',
      country: 'Bangladesh',
      isp: 'Carnival Internet',
      device: 'Desktop (Windows)',
      browser: 'Chrome 122',
      os: 'Windows 11',
      mapsUrl: 'https://www.google.com/maps?q=22.3569,91.7832',
      firstSeen: 'Today, 11:15 AM',
      lastActive: 'Today, 01:10 PM',
      currentPage: 'FAQ & Policy Guide',
      pagesVisited: ['Homepage', 'Eligibility Checker', 'FAQ'],
      totalActions: 14,
      isOnline: true,
      referrer: 'https://www.google.com/',
      trafficSource: 'Google Search',
      orderNowClicks: 1,
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 3600000,
    },
    {
      id: 'VIS-7629',
      ip: '118.179.223.5',
      city: 'Sylhet',
      region: 'Sylhet Division',
      country: 'Bangladesh',
      isp: 'AmberIT Limited',
      device: 'Mobile (iOS)',
      browser: 'Mobile Safari',
      os: 'iOS 17.4',
      mapsUrl: 'https://www.google.com/maps?q=24.8949,91.8687',
      firstSeen: 'Today, 10:05 AM',
      lastActive: 'Today, 10:45 AM',
      currentPage: 'Live Support Chat',
      pagesVisited: ['Homepage', 'Live Chat Widget'],
      totalActions: 6,
      isOnline: false,
      referrer: 'direct',
      trafficSource: 'Direct / Organic',
      orderNowClicks: 1,
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 7200000,
    },
    {
      id: 'VIS-6504',
      ip: '103.114.98.77',
      city: 'Rajshahi',
      region: 'Rajshahi Division',
      country: 'Bangladesh',
      isp: 'Grameenphone 4G',
      device: 'Mobile (Android)',
      browser: 'Samsung Internet',
      os: 'Android 13',
      mapsUrl: 'https://www.google.com/maps?q=24.3745,88.6042',
      firstSeen: 'Today, 09:20 AM',
      lastActive: 'Today, 09:55 AM',
      currentPage: 'Package Details',
      pagesVisited: ['Homepage', 'Package Features'],
      totalActions: 5,
      isOnline: false,
      referrer: 'https://l.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 1,
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 10800000,
    },
    // Yesterday visitors
    {
      id: 'VIS-5921',
      ip: '103.152.126.4',
      city: 'Khulna',
      region: 'Khulna Division',
      country: 'Bangladesh',
      isp: 'Banglalink 4G',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      os: 'Android 13',
      mapsUrl: 'https://www.google.com/maps?q=22.8456,89.5403',
      firstSeen: 'Yesterday, 08:15 PM',
      lastActive: 'Yesterday, 08:35 PM',
      currentPage: 'Order Form',
      pagesVisited: ['Homepage', 'Pricing Package', 'Order Form'],
      totalActions: 9,
      isOnline: false,
      referrer: 'https://www.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 2,
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs,
    },
    {
      id: 'VIS-5418',
      ip: '119.30.38.91',
      city: 'Dhaka',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      isp: 'Dot Internet',
      device: 'Desktop (macOS)',
      browser: 'Safari 17',
      os: 'macOS Sonoma',
      mapsUrl: 'https://www.google.com/maps?q=23.7925,90.4078',
      firstSeen: 'Yesterday, 04:30 PM',
      lastActive: 'Yesterday, 05:02 PM',
      currentPage: 'Eligibility Checker',
      pagesVisited: ['Homepage', 'Eligibility Checker', 'Order Form'],
      totalActions: 12,
      isOnline: false,
      referrer: 'https://www.google.com/',
      trafficSource: 'Google Search',
      orderNowClicks: 1,
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs - 7200000,
    },
    {
      id: 'VIS-4902',
      ip: '103.205.180.12',
      city: 'Gazipur',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      isp: 'Robi Axiata Ltd',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      os: 'Android 14',
      mapsUrl: 'https://www.google.com/maps?q=23.9999,90.4203',
      firstSeen: 'Yesterday, 02:10 PM',
      lastActive: 'Yesterday, 02:40 PM',
      currentPage: 'Pricing Package',
      pagesVisited: ['Homepage', 'Pricing Package'],
      totalActions: 6,
      isOnline: false,
      referrer: 'https://web.whatsapp.com/',
      trafficSource: 'WhatsApp',
      orderNowClicks: 1,
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs - 14400000,
    },
    // Past 7 Days visitors
    {
      id: 'VIS-4319',
      ip: '103.88.140.23',
      city: 'Comilla',
      region: 'Chittagong Division',
      country: 'Bangladesh',
      isp: 'Comilla Online',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      os: 'Android 12',
      mapsUrl: 'https://www.google.com/maps?q=23.4607,91.1809',
      firstSeen: '2 days ago',
      lastActive: '2 days ago',
      currentPage: 'Order Form',
      pagesVisited: ['Homepage', 'Pricing Package', 'Order Form'],
      totalActions: 11,
      isOnline: false,
      referrer: 'https://m.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 2,
      dateStr: daysAgo2.dateStr,
      timestampMs: daysAgo2.timestampMs,
    },
    {
      id: 'VIS-3810',
      ip: '103.220.207.15',
      city: 'Barisal',
      region: 'Barisal Division',
      country: 'Bangladesh',
      isp: 'Barisal Net',
      device: 'Desktop (Windows)',
      browser: 'Firefox 124',
      os: 'Windows 10',
      mapsUrl: 'https://www.google.com/maps?q=22.7010,90.3535',
      firstSeen: '3 days ago',
      lastActive: '3 days ago',
      currentPage: 'Homepage',
      pagesVisited: ['Homepage', 'FAQ'],
      totalActions: 4,
      isOnline: false,
      referrer: 'https://www.youtube.com/',
      trafficSource: 'YouTube',
      orderNowClicks: 0,
      dateStr: daysAgo3.dateStr,
      timestampMs: daysAgo3.timestampMs,
    },
    {
      id: 'VIS-3204',
      ip: '103.111.218.42',
      city: 'Dhaka',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      isp: 'BracNet Ltd',
      device: 'Mobile (iOS)',
      browser: 'Mobile Safari',
      os: 'iOS 16.5',
      mapsUrl: 'https://www.google.com/maps?q=23.7808,90.4192',
      firstSeen: '4 days ago',
      lastActive: '4 days ago',
      currentPage: 'Order Form',
      pagesVisited: ['Homepage', 'Pricing Package', 'Order Form'],
      totalActions: 8,
      isOnline: false,
      referrer: 'https://www.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 1,
      dateStr: daysAgo4.dateStr,
      timestampMs: daysAgo4.timestampMs,
    },
    {
      id: 'VIS-2811',
      ip: '103.245.19.8',
      city: 'Narayanganj',
      region: 'Dhaka Division',
      country: 'Bangladesh',
      isp: 'Circle Network',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      os: 'Android 14',
      mapsUrl: 'https://www.google.com/maps?q=23.6238,90.5000',
      firstSeen: '5 days ago',
      lastActive: '5 days ago',
      currentPage: 'Package Features',
      pagesVisited: ['Homepage', 'Package Features'],
      totalActions: 5,
      isOnline: false,
      referrer: 'https://www.google.com/',
      trafficSource: 'Google Search',
      orderNowClicks: 1,
      dateStr: daysAgo5.dateStr,
      timestampMs: daysAgo5.timestampMs,
    },
    {
      id: 'VIS-2190',
      ip: '103.134.198.11',
      city: 'Rangpur',
      region: 'Rangpur Division',
      country: 'Bangladesh',
      isp: 'Grameenphone 4G',
      device: 'Mobile (Android)',
      browser: 'Samsung Internet',
      os: 'Android 13',
      mapsUrl: 'https://www.google.com/maps?q=25.7439,89.2752',
      firstSeen: '6 days ago',
      lastActive: '6 days ago',
      currentPage: 'Order Form',
      pagesVisited: ['Homepage', 'Pricing Package', 'Order Form'],
      totalActions: 7,
      isOnline: false,
      referrer: 'https://m.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 1,
      dateStr: daysAgo6.dateStr,
      timestampMs: daysAgo6.timestampMs,
    },
    // Past 30 Days visitors
    {
      id: 'VIS-1850',
      ip: '103.120.201.55',
      city: 'Mymensingh',
      region: 'Mymensingh Division',
      country: 'Bangladesh',
      isp: 'AmberIT',
      device: 'Desktop (Windows)',
      browser: 'Chrome 121',
      os: 'Windows 11',
      mapsUrl: 'https://www.google.com/maps?q=24.7471,90.4203',
      firstSeen: '10 days ago',
      lastActive: '10 days ago',
      currentPage: 'Homepage',
      pagesVisited: ['Homepage', 'How It Works', 'Order Form'],
      totalActions: 10,
      isOnline: false,
      referrer: 'https://www.facebook.com/',
      trafficSource: 'Facebook (Meta)',
      orderNowClicks: 2,
      dateStr: daysAgo10.dateStr,
      timestampMs: daysAgo10.timestampMs,
    },
    {
      id: 'VIS-1402',
      ip: '103.190.45.62',
      city: 'Bogra',
      region: 'Rajshahi Division',
      country: 'Bangladesh',
      isp: 'Carnival Internet',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      os: 'Android 13',
      mapsUrl: 'https://www.google.com/maps?q=24.8465,89.3777',
      firstSeen: '15 days ago',
      lastActive: '15 days ago',
      currentPage: 'Pricing Package',
      pagesVisited: ['Homepage', 'Pricing Package'],
      totalActions: 6,
      isOnline: false,
      referrer: 'https://www.google.com/',
      trafficSource: 'Google Search',
      orderNowClicks: 1,
      dateStr: daysAgo15.dateStr,
      timestampMs: daysAgo15.timestampMs,
    },
  ];
};

const generateInitialActivities = (): ActivityLogRecord[] => {
  const today = getPastDate(0);
  const yesterday = getPastDate(1);
  const daysAgo2 = getPastDate(2);
  const daysAgo3 = getPastDate(3);
  const daysAgo5 = getPastDate(5);

  return [
    // Today
    {
      id: 'ACT-2001',
      visitorId: 'VIS-9412',
      category: 'order',
      eventType: 'order_submit',
      title: 'Order Submitted (bKash TrxID)',
      details: 'Customer Mizan submitted order EXP-3543 with TrxID: BDHINDKRXR (৳2,999).',
      timestamp: 'Today, 12:49 PM',
      ip: '103.145.74.12',
      city: 'Dhaka',
      device: 'Mobile (Android)',
      statusBadge: 'New Order',
      source: 'Facebook (Meta)',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs,
    },
    {
      id: 'ACT-2002',
      visitorId: 'VIS-9412',
      category: 'click',
      eventType: 'order_now_click',
      title: "'Order Now' Clicked (Hero Section)",
      details: "Visitor clicked primary CTA in Hero section to jump to Order Form.",
      timestamp: 'Today, 12:46 PM',
      ip: '103.145.74.12',
      city: 'Dhaka',
      device: 'Mobile (Android)',
      statusBadge: 'CTA Click',
      elementClicked: 'Hero Section CTA',
      source: 'Facebook (Meta)',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 180000,
    },
    {
      id: 'ACT-2003',
      visitorId: 'VIS-9412',
      category: 'payment',
      eventType: 'payment_copy',
      title: 'Official Payment Number Copied',
      details: 'Copied bKash personal send money number to clipboard in order form.',
      timestamp: 'Today, 12:44 PM',
      ip: '103.145.74.12',
      city: 'Dhaka',
      device: 'Mobile (Android)',
      statusBadge: 'Payment Copy',
      elementClicked: 'bKash Copy Button',
      source: 'Facebook (Meta)',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 300000,
    },
    {
      id: 'ACT-2004',
      visitorId: 'VIS-8831',
      category: 'chat',
      eventType: 'chat_open',
      title: 'Live Support Chat Inquiry',
      details: 'Asked question: "I have 1k followers, can I monetize my reels?" Bot provided instant reply.',
      timestamp: 'Today, 01:08 PM',
      ip: '103.230.104.18',
      city: 'Chittagong',
      device: 'Desktop (Windows)',
      statusBadge: 'Support Chat',
      source: 'Google Search',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 1200000,
    },
    {
      id: 'ACT-2005',
      visitorId: 'VIS-8831',
      category: 'click',
      eventType: 'order_now_click',
      title: "'Order Now' Clicked (Pricing Card)",
      details: 'Visitor clicked CTA on the Pricing Package card.',
      timestamp: 'Today, 12:55 PM',
      ip: '103.230.104.18',
      city: 'Chittagong',
      device: 'Desktop (Windows)',
      statusBadge: 'CTA Click',
      elementClicked: 'Pricing Package CTA',
      source: 'Google Search',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 2400000,
    },
    {
      id: 'ACT-2006',
      visitorId: 'VIS-7629',
      category: 'visitor',
      eventType: 'page_visit',
      title: 'New Visitor Arrived from Sylhet',
      details: 'Direct visit on Mobile Safari from AmberIT Limited.',
      timestamp: 'Today, 10:05 AM',
      ip: '118.179.223.5',
      city: 'Sylhet',
      device: 'Mobile (iOS)',
      statusBadge: 'Site Visit',
      source: 'Direct / Organic',
      dateStr: today.dateStr,
      timestampMs: today.timestampMs - 7200000,
    },
    // Yesterday
    {
      id: 'ACT-2007',
      visitorId: 'VIS-5921',
      category: 'click',
      eventType: 'order_now_click',
      title: "'Order Now' Clicked (Navbar)",
      details: 'Visitor clicked header navigation CTA button.',
      timestamp: 'Yesterday, 08:20 PM',
      ip: '103.152.126.4',
      city: 'Khulna',
      device: 'Mobile (Android)',
      statusBadge: 'CTA Click',
      elementClicked: 'Navbar CTA',
      source: 'Facebook (Meta)',
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs,
    },
    {
      id: 'ACT-2008',
      visitorId: 'VIS-5921',
      category: 'order',
      eventType: 'order_submit',
      title: 'Order Submitted (Nagad TrxID)',
      details: 'Customer Tariq submitted order EXP-8812 with Nagad TrxID: 994BK10X.',
      timestamp: 'Yesterday, 08:30 PM',
      ip: '103.152.126.4',
      city: 'Khulna',
      device: 'Mobile (Android)',
      statusBadge: 'New Order',
      source: 'Facebook (Meta)',
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs + 600000,
    },
    {
      id: 'ACT-2009',
      visitorId: 'VIS-5418',
      category: 'navigation',
      eventType: 'eligibility_check',
      title: 'Policy Eligibility Audit Tested',
      details: 'Ran page check for follower count and original content requirements.',
      timestamp: 'Yesterday, 04:45 PM',
      ip: '119.30.38.91',
      city: 'Dhaka',
      device: 'Desktop (macOS)',
      statusBadge: 'Tool Audit',
      source: 'Google Search',
      dateStr: yesterday.dateStr,
      timestampMs: yesterday.timestampMs - 7200000,
    },
    // Past Days
    {
      id: 'ACT-2010',
      visitorId: 'VIS-4319',
      category: 'click',
      eventType: 'order_now_click',
      title: "'Order Now' Clicked (Final CTA)",
      details: 'Visitor reached bottom of page and clicked Final CTA banner.',
      timestamp: '2 days ago',
      ip: '103.88.140.23',
      city: 'Comilla',
      device: 'Mobile (Android)',
      statusBadge: 'CTA Click',
      elementClicked: 'Final CTA Banner',
      source: 'Facebook (Meta)',
      dateStr: daysAgo2.dateStr,
      timestampMs: daysAgo2.timestampMs,
    },
    {
      id: 'ACT-2011',
      visitorId: 'VIS-3810',
      category: 'visitor',
      eventType: 'page_visit',
      title: 'YouTube Referral Arrival',
      details: 'Arrived from YouTube video description link to view package.',
      timestamp: '3 days ago',
      ip: '103.220.207.15',
      city: 'Barisal',
      device: 'Desktop (Windows)',
      statusBadge: 'Referral',
      source: 'YouTube',
      dateStr: daysAgo3.dateStr,
      timestampMs: daysAgo3.timestampMs,
    },
    {
      id: 'ACT-2012',
      visitorId: 'VIS-2811',
      category: 'click',
      eventType: 'order_now_click',
      title: "'Order Now' Clicked (How It Works)",
      details: 'Visitor reviewed step-by-step guidance and clicked order button.',
      timestamp: '5 days ago',
      ip: '103.245.19.8',
      city: 'Narayanganj',
      device: 'Mobile (Android)',
      statusBadge: 'CTA Click',
      elementClicked: 'How It Works CTA',
      source: 'Google Search',
      dateStr: daysAgo5.dateStr,
      timestampMs: daysAgo5.timestampMs,
    },
  ];
};

export const getVisitors = (): WebVisitorRecord[] => {
  try {
    const data = localStorage.getItem(VISITORS_KEY);
    if (!data) {
      const initial = generateInitialVisitors();
      localStorage.setItem(VISITORS_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = generateInitialVisitors();
      localStorage.setItem(VISITORS_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (err) {
    return generateInitialVisitors();
  }
};

export const getActivities = (): ActivityLogRecord[] => {
  try {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    if (!data) {
      const initial = generateInitialActivities();
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = generateInitialActivities();
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (err) {
    return generateInitialActivities();
  }
};

export const syncVisitorsWithBackend = async (): Promise<WebVisitorRecord[]> => {
  try {
    const res = await fetch(`/api/visitors?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.visitors) && data.visitors.length > 0) {
        localStorage.setItem(VISITORS_KEY, JSON.stringify(data.visitors));
        return data.visitors;
      }
    }
  } catch (err) {
    // offline fallback
  }
  return getVisitors();
};

export const syncActivitiesWithBackend = async (): Promise<ActivityLogRecord[]> => {
  try {
    const res = await fetch(`/api/activities?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.activities) && data.activities.length > 0) {
        localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(data.activities));
        return data.activities;
      }
    }
  } catch (err) {
    // offline fallback
  }
  return getActivities();
};

export const recordActivity = (
  category: ActivityLogRecord['category'],
  title: string,
  details: string,
  statusBadge?: string,
  eventType?: ActivityLogRecord['eventType'],
  elementClicked?: string,
  source?: string
): void => {
  try {
    const visitorId = localStorage.getItem(CURRENT_VISITOR_ID_KEY) || 'VIS-LIVE';
    const current = getActivities();
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const dateStr = getFormattedDateStr(now);

    const newAct: ActivityLogRecord = {
      id: `ACT-${Date.now()}`,
      visitorId,
      category,
      title,
      details,
      timestamp: timeStr,
      statusBadge: statusBadge || 'Live Event',
      eventType: eventType || (category === 'click' ? 'order_now_click' : undefined),
      elementClicked,
      source: source || detectTrafficSource().source,
      dateStr,
      timestampMs: now.getTime(),
    };

    const updated = [newAct, ...current.slice(0, 499)];
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('expart_activity_changed'));

    // Sync to backend
    fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAct),
    }).catch(() => {});
  } catch (err) {
    console.error('Error recording activity:', err);
  }
};

export const recordOrderNowClick = (sourceButton: string = 'General CTA'): void => {
  const traffic = detectTrafficSource();
  recordActivity(
    'click',
    `'Order Now' Clicked (${sourceButton})`,
    `Visitor initiated checkout by clicking '${sourceButton}'.`,
    'Order Click',
    'order_now_click',
    sourceButton,
    traffic.source
  );

  try {
    const visitorId = localStorage.getItem(CURRENT_VISITOR_ID_KEY);
    if (visitorId) {
      const visitors = getVisitors();
      const updated = visitors.map((v) => {
        if (v.id === visitorId) {
          const clicks = (v.orderNowClicks || 0) + 1;
          const acts = (v.totalActions || 0) + 1;
          return { ...v, orderNowClicks: clicks, totalActions: acts, lastActive: `Today, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` };
        }
        return v;
      });
      localStorage.setItem(VISITORS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('expart_visitor_changed'));

      const targetVis = updated.find((v) => v.id === visitorId);
      if (targetVis) {
        fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetVis),
        }).catch(() => {});
      }
    }
  } catch (err) {
    console.error('Error recording order now click:', err);
  }
};

export const trackCurrentVisitor = async (pageName: string = 'Homepage'): Promise<void> => {
  try {
    let visitorId = localStorage.getItem(CURRENT_VISITOR_ID_KEY);
    const traffic = detectTrafficSource();
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const dateStr = getFormattedDateStr(now);

    if (!visitorId) {
      visitorId = `VIS-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem(CURRENT_VISITOR_ID_KEY, visitorId);
    }

    const visitors = getVisitors();
    const existing = visitors.find((v) => v.id === visitorId);

    if (existing) {
      const pages = existing.pagesVisited || [];
      if (!pages.includes(pageName)) pages.push(pageName);

      const updatedVis: WebVisitorRecord = {
        ...existing,
        currentPage: pageName,
        pagesVisited: pages,
        lastActive: timeStr,
        isOnline: true,
        totalActions: (existing.totalActions || 0) + 1,
        referrer: existing.referrer || traffic.referrer,
        trafficSource: existing.trafficSource || traffic.source,
        dateStr: existing.dateStr || dateStr,
        timestampMs: existing.timestampMs || now.getTime(),
      };

      const updated = visitors.map((v) => (v.id === visitorId ? updatedVis : v));
      localStorage.setItem(VISITORS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('expart_visitor_changed'));

      fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVis),
      }).catch(() => {});
    } else {
      const loc = await captureClientLocation();
      const newVisitor: WebVisitorRecord = {
        id: visitorId,
        ip: loc.ip || '103.145.74.12',
        city: loc.city || 'Dhaka',
        region: loc.region || 'Dhaka Division',
        country: loc.country || 'Bangladesh',
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
        referrer: traffic.referrer,
        trafficSource: traffic.source,
        utmSource: traffic.utmSource,
        utmMedium: traffic.utmMedium,
        utmCampaign: traffic.utmCampaign,
        orderNowClicks: 0,
        dateStr,
        timestampMs: now.getTime(),
      };

      const updated = [newVisitor, ...visitors];
      localStorage.setItem(VISITORS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('expart_visitor_changed'));

      fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVisitor),
      }).catch(() => {});

      // Record entry activity
      recordActivity(
        'visitor',
        `New Visitor Landed on ${pageName}`,
        `Referral from ${traffic.source} (${loc.city || 'Bangladesh'} on ${loc.device || 'Device'}).`,
        'Site Visit',
        'page_visit',
        pageName,
        traffic.source
      );
    }
  } catch (err) {
    console.error('Error tracking visitor:', err);
  }
};
