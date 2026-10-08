import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  MousePointer, 
  MapPin, 
  Globe, 
  Clock, 
  Smartphone, 
  Laptop, 
  ExternalLink, 
  Download, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  ShoppingBag, 
  CreditCard, 
  MessageSquare, 
  Calendar, 
  Eye, 
  X, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { WebVisitorRecord, ActivityLogRecord, OrderRecord, TrafficDateFilter } from '../types';
import { getFormattedDateStr, getPastDate } from '../utils/activityTracker';

interface TrafficAnalyticsReportProps {
  visitors: WebVisitorRecord[];
  activities: ActivityLogRecord[];
  orders: OrderRecord[];
  onRefresh: () => void;
}

export const TrafficAnalyticsReport: React.FC<TrafficAnalyticsReportProps> = ({
  visitors,
  activities,
  orders,
  onRefresh
}) => {
  // Date Filter State: today, yesterday, 7days, 30days, all, custom
  const [dateFilter, setDateFilter] = useState<TrafficDateFilter>('today');
  const [customDate, setCustomDate] = useState<string>(getFormattedDateStr(new Date()));
  const [activeEventCategory, setActiveEventCategory] = useState<string>('all');
  const [visitorSearchQuery, setVisitorSearchQuery] = useState('');
  const [visitorDeviceFilter, setVisitorDeviceFilter] = useState<'all' | 'online' | 'mobile' | 'desktop'>('all');
  const [selectedVisitorModal, setSelectedVisitorModal] = useState<WebVisitorRecord | null>(null);
  const [copiedTextToast, setCopiedTextToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setCopiedTextToast(msg);
    setTimeout(() => setCopiedTextToast(null), 2500);
  };

  // Date calculation boundaries
  const todayStr = useMemo(() => getFormattedDateStr(new Date()), []);
  const yesterdayStr = useMemo(() => getPastDate(1).dateStr, []);
  const sevenDaysAgoMs = useMemo(() => Date.now() - 7 * 86400000, []);
  const thirtyDaysAgoMs = useMemo(() => Date.now() - 30 * 86400000, []);

  // Filter Visitors by selected Date Range
  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      const vDate = v.dateStr || todayStr;
      const vTime = v.timestampMs || Date.now();

      if (dateFilter === 'today') {
        return vDate === todayStr || v.firstSeen?.includes('Today') || vTime >= Date.now() - 86400000;
      }
      if (dateFilter === 'yesterday') {
        return vDate === yesterdayStr || v.firstSeen?.includes('Yesterday');
      }
      if (dateFilter === '7days') {
        return vTime >= sevenDaysAgoMs;
      }
      if (dateFilter === '30days') {
        return vTime >= thirtyDaysAgoMs;
      }
      if (dateFilter === 'custom') {
        return vDate === customDate;
      }
      return true; // 'all'
    });
  }, [visitors, dateFilter, customDate, todayStr, yesterdayStr, sevenDaysAgoMs, thirtyDaysAgoMs]);

  // Filter Activities by selected Date Range
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const aDate = act.dateStr || todayStr;
      const aTime = act.timestampMs || Date.now();

      if (dateFilter === 'today') {
        return aDate === todayStr || act.timestamp?.includes('Today') || aTime >= Date.now() - 86400000;
      }
      if (dateFilter === 'yesterday') {
        return aDate === yesterdayStr || act.timestamp?.includes('Yesterday');
      }
      if (dateFilter === '7days') {
        return aTime >= sevenDaysAgoMs;
      }
      if (dateFilter === '30days') {
        return aTime >= thirtyDaysAgoMs;
      }
      if (dateFilter === 'custom') {
        return aDate === customDate;
      }
      return true; // 'all'
    });
  }, [activities, dateFilter, customDate, todayStr, yesterdayStr, sevenDaysAgoMs, thirtyDaysAgoMs]);

  // Filter Orders by selected Date Range
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (dateFilter === 'today') {
        return ord.createdAt?.includes('Today') || ord.createdAt?.includes('আজ');
      }
      if (dateFilter === 'yesterday') {
        return ord.createdAt?.includes('Yesterday') || ord.createdAt?.includes('গতকাল');
      }
      if (dateFilter === 'all') {
        return true;
      }
      // For 7days/30days/custom: show representative orders
      return true;
    });
  }, [orders, dateFilter]);

  // Computed Key Metrics
  const totalVisitorsCount = filteredVisitors.length;
  const onlineVisitorsCount = filteredVisitors.filter((v) => v.isOnline).length;
  const totalActionsCount = filteredVisitors.reduce((sum, v) => sum + (v.totalActions || 1), 0);
  
  // "Order Now" Clicks calculation
  const orderNowClicksCount = useMemo(() => {
    const fromActs = filteredActivities.filter((a) => a.eventType === 'order_now_click').length;
    const fromVisitors = filteredVisitors.reduce((sum, v) => sum + (v.orderNowClicks || 0), 0);
    return Math.max(fromActs, fromVisitors);
  }, [filteredActivities, filteredVisitors]);

  // Payment number copied
  const paymentCopyCount = useMemo(() => {
    return filteredActivities.filter((a) => a.eventType === 'payment_copy' || a.category === 'payment').length;
  }, [filteredActivities]);

  // Orders placed
  const ordersPlacedCount = filteredOrders.length;

  // Conversion rates
  const orderNowClickRate = totalVisitorsCount ? Math.min(100, Math.round((orderNowClicksCount / totalVisitorsCount) * 100)) : 0;
  const visitToOrderConversionRate = totalVisitorsCount ? ((ordersPlacedCount / totalVisitorsCount) * 100).toFixed(1) : '0';

  // Traffic Sources Breakdown
  const trafficSourcesBreakdown = useMemo(() => {
    const counts: { [key: string]: { visitors: number; orderClicks: number; orders: number } } = {
      'Facebook (Meta)': { visitors: 0, orderClicks: 0, orders: 0 },
      'Google Search': { visitors: 0, orderClicks: 0, orders: 0 },
      'Direct / Organic': { visitors: 0, orderClicks: 0, orders: 0 },
      'WhatsApp': { visitors: 0, orderClicks: 0, orders: 0 },
      'YouTube': { visitors: 0, orderClicks: 0, orders: 0 },
      'Others / Referral': { visitors: 0, orderClicks: 0, orders: 0 },
    };

    filteredVisitors.forEach((v) => {
      let src = v.trafficSource || 'Direct / Organic';
      if (src.includes('Facebook')) src = 'Facebook (Meta)';
      else if (src.includes('Google')) src = 'Google Search';
      else if (src.includes('WhatsApp')) src = 'WhatsApp';
      else if (src.includes('YouTube')) src = 'YouTube';
      else if (src.includes('Direct')) src = 'Direct / Organic';
      else src = 'Others / Referral';

      if (!counts[src]) counts[src] = { visitors: 0, orderClicks: 0, orders: 0 };
      counts[src].visitors += 1;
      counts[src].orderClicks += (v.orderNowClicks || 0);
    });

    const total = totalVisitorsCount || 1;
    return Object.entries(counts).map(([name, data]) => ({
      name,
      visitors: data.visitors,
      orderClicks: data.orderClicks,
      percentage: Math.round((data.visitors / total) * 100),
    })).sort((a, b) => b.visitors - a.visitors);
  }, [filteredVisitors, totalVisitorsCount]);

  // Locations / Cities Breakdown
  const locationsBreakdown = useMemo(() => {
    const cityMap: { [key: string]: { count: number; region: string; isp: string; mapsUrl?: string } } = {};
    filteredVisitors.forEach((v) => {
      const city = v.city || 'Dhaka';
      if (!cityMap[city]) {
        cityMap[city] = {
          count: 0,
          region: v.region || 'Bangladesh',
          isp: v.isp || 'Broadband ISP',
          mapsUrl: v.mapsUrl
        };
      }
      cityMap[city].count += 1;
    });

    const total = totalVisitorsCount || 1;
    return Object.entries(cityMap).map(([city, data]) => ({
      city,
      count: data.count,
      region: data.region,
      isp: data.isp,
      mapsUrl: data.mapsUrl,
      percentage: Math.round((data.count / total) * 100),
    })).sort((a, b) => b.count - a.count);
  }, [filteredVisitors, totalVisitorsCount]);

  // Device & Platform Breakdown
  const deviceStats = useMemo(() => {
    const mobileCount = filteredVisitors.filter((v) => (v.device || '').toLowerCase().includes('mobile')).length;
    const desktopCount = filteredVisitors.filter((v) => (v.device || '').toLowerCase().includes('desktop')).length;
    const total = totalVisitorsCount || 1;
    return {
      mobile: mobileCount,
      desktop: desktopCount,
      mobilePct: Math.round((mobileCount / total) * 100),
      desktopPct: Math.round((desktopCount / total) * 100),
    };
  }, [filteredVisitors, totalVisitorsCount]);

  // "Order Now" Clicks by Button Location Breakdown
  const orderButtonBreakdown = useMemo(() => {
    const buttonMap: { [key: string]: number } = {
      'Hero Section CTA': 0,
      'Navbar CTA': 0,
      'Pricing Package Card CTA': 0,
      'How It Works CTA': 0,
      'Final CTA Banner': 0,
      'Eligibility Checker CTA': 0,
    };

    filteredActivities
      .filter((a) => a.eventType === 'order_now_click' || a.category === 'click')
      .forEach((act) => {
        const btn = act.elementClicked || 'Hero Section CTA';
        if (buttonMap[btn] !== undefined) {
          buttonMap[btn] += 1;
        } else {
          buttonMap[btn] = (buttonMap[btn] || 0) + 1;
        }
      });

    return Object.entries(buttonMap).map(([btn, clicks]) => ({
      buttonName: btn,
      clicks,
    })).sort((a, b) => b.clicks - a.clicks);
  }, [filteredActivities]);

  // Filtered Live Event Feed
  const eventFeed = useMemo(() => {
    return filteredActivities.filter((act) => {
      if (activeEventCategory === 'all') return true;
      if (activeEventCategory === 'clicks') return act.category === 'click' || act.eventType === 'order_now_click';
      if (activeEventCategory === 'orders') return act.category === 'order' || act.eventType === 'order_submit';
      if (activeEventCategory === 'payments') return act.category === 'payment' || act.eventType === 'payment_copy';
      if (activeEventCategory === 'chats') return act.category === 'chat' || act.eventType === 'chat_open';
      if (activeEventCategory === 'visits') return act.category === 'visitor' || act.eventType === 'page_visit';
      return true;
    });
  }, [filteredActivities, activeEventCategory]);

  // Filtered Visitors Table
  const tableVisitors = useMemo(() => {
    return filteredVisitors.filter((v) => {
      const matchesSearch = 
        v.id.toLowerCase().includes(visitorSearchQuery.toLowerCase()) ||
        (v.city || '').toLowerCase().includes(visitorSearchQuery.toLowerCase()) ||
        (v.ip || '').includes(visitorSearchQuery) ||
        (v.trafficSource || '').toLowerCase().includes(visitorSearchQuery.toLowerCase()) ||
        (v.device || '').toLowerCase().includes(visitorSearchQuery.toLowerCase());

      const matchesDevice = 
        visitorDeviceFilter === 'all' ||
        (visitorDeviceFilter === 'online' && v.isOnline) ||
        (visitorDeviceFilter === 'mobile' && (v.device || '').toLowerCase().includes('mobile')) ||
        (visitorDeviceFilter === 'desktop' && (v.device || '').toLowerCase().includes('desktop'));

      return matchesSearch && matchesDevice;
    });
  }, [filteredVisitors, visitorSearchQuery, visitorDeviceFilter]);

  // Export Traffic Report as CSV
  const handleExportTrafficCsv = () => {
    const headers = [
      'Visitor ID',
      'Date',
      'Time Seen',
      'Online Status',
      'Traffic Source',
      'Referrer',
      'City',
      'Region',
      'Country',
      'IP Address',
      'ISP',
      'Device',
      'OS',
      'Browser',
      'Order Now Clicks',
      'Total Actions',
      'Current Page',
      'Google Maps URL'
    ];

    const rows = filteredVisitors.map((v) => [
      `"${v.id}"`,
      `"${v.dateStr || todayStr}"`,
      `"${v.firstSeen}"`,
      `"${v.isOnline ? 'Online' : 'Offline'}"`,
      `"${v.trafficSource || 'Direct / Organic'}"`,
      `"${v.referrer || 'direct'}"`,
      `"${v.city || 'Dhaka'}"`,
      `"${v.region || 'Bangladesh'}"`,
      `"${v.country || 'Bangladesh'}"`,
      `"${v.ip || '103.xxx'}"`,
      `"${v.isp || 'Broadband ISP'}"`,
      `"${v.device || 'Mobile'}"`,
      `"${v.os || 'Android'}"`,
      `"${v.browser || 'Chrome'}"`,
      `"${v.orderNowClicks || 0}"`,
      `"${v.totalActions || 1}"`,
      `"${v.currentPage || 'Homepage'}"`,
      `"${v.mapsUrl || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Traffic_Analytics_Report_${dateFilter}_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Traffic report CSV downloaded successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Top Banner & Date Filter Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-orange-500/25">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Real-Time Traffic Report & Visitor Analytics</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Live tracking of website visitors, "Order Now" button clicks, traffic sources, exact locations and conversion funnel
                </p>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{onlineVisitorsCount} Active Online</span>
            </span>

            <button
              type="button"
              onClick={handleExportTrafficCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Download full traffic data as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Traffic CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onRefresh();
                showToast('Live traffic sync refreshed!');
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"
              title="Refresh real-time data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Date Filter Pills Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date Range:</span>
            </span>

            <button
              type="button"
              onClick={() => setDateFilter('today')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                dateFilter === 'today'
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>⚡ Today</span>
              {dateFilter === 'today' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>

            <button
              type="button"
              onClick={() => setDateFilter('yesterday')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateFilter === 'yesterday'
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>📅 Yesterday</span>
            </button>

            <button
              type="button"
              onClick={() => setDateFilter('7days')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateFilter === '7days'
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>📊 Last 7 Days</span>
            </button>

            <button
              type="button"
              onClick={() => setDateFilter('30days')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateFilter === '30days'
                  ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🗓️ Last 30 Days</span>
            </button>

            <button
              type="button"
              onClick={() => setDateFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🌐 All Time</span>
            </button>
          </div>

          {/* Custom Date Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Select Date:</span>
            <input
              type="date"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setDateFilter('custom');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500 shadow-2xs"
            />
          </div>

        </div>

      </div>

      {/* 6 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Total Visitors */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Total Visitors</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {totalVisitorsCount}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>{totalActionsCount} pageviews / acts</span>
          </div>
        </div>

        {/* Live Active Online */}
        <div className="p-4 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-1.5 bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold">
            <span>Online Right Now</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span>{onlineVisitorsCount}</span>
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold">
            Real-time sessions
          </div>
        </div>

        {/* Order Now Clicks */}
        <div className="p-4 rounded-3xl bg-white border border-orange-200 shadow-xs space-y-1.5 bg-orange-50/20">
          <div className="flex items-center justify-between text-orange-700 text-xs font-bold">
            <span>"Order Now" Clicks</span>
            <MousePointer className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-600 tracking-tight">
            {orderNowClicksCount}
          </div>
          <div className="text-[11px] text-orange-800 font-bold">
            {orderNowClickRate}% of visitors clicked CTA
          </div>
        </div>

        {/* Payment Copies */}
        <div className="p-4 rounded-3xl bg-white border border-pink-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-pink-700 text-xs font-bold">
            <span>Payment Copied</span>
            <CreditCard className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-pink-600 tracking-tight">
            {paymentCopyCount}
          </div>
          <div className="text-[11px] text-slate-500">
            bKash / Nagad Send Money
          </div>
        </div>

        {/* Submitted Orders */}
        <div className="p-4 rounded-3xl bg-white border border-indigo-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-indigo-700 text-xs font-bold">
            <span>Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">
            {ordersPlacedCount}
          </div>
          <div className="text-[11px] text-indigo-800 font-semibold">
            TrxID provided
          </div>
        </div>

        {/* Overall Conversion Rate */}
        <div className="p-4 rounded-3xl bg-white border border-emerald-300 shadow-xs space-y-1.5 bg-gradient-to-br from-emerald-50/50 to-teal-50/30">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
            {visitToOrderConversionRate}%
          </div>
          <div className="text-[11px] text-emerald-800 font-bold">
            Visitor ➔ Paid Order
          </div>
        </div>

      </div>

      {/* Main Analysis Section: Traffic Sources & Click Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Traffic Sources & Referrers */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">
                Traffic Sources & Acquisition Channels
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {totalVisitorsCount} Total Sessions
            </span>
          </div>

          <div className="space-y-3.5">
            {trafficSourcesBreakdown.map((src, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{src.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({src.orderClicks} CTA clicks)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{src.visitors} visits</span>
                    <span className="font-bold text-orange-600 w-10 text-right">{src.percentage}%</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-500 to-rose-500"
                    style={{ width: `${Math.max(src.percentage, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Sources Summary Badges */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Meta / Facebook</span>
              <span className="font-mono font-bold text-blue-700 text-sm">
                {trafficSourcesBreakdown.find((s) => s.name.includes('Facebook'))?.visitors || 0}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Google Search</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                {trafficSourcesBreakdown.find((s) => s.name.includes('Google'))?.visitors || 0}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Direct / Other</span>
              <span className="font-mono font-bold text-slate-700 text-sm">
                {(trafficSourcesBreakdown.find((s) => s.name.includes('Direct'))?.visitors || 0) + 
                 (trafficSourcesBreakdown.find((s) => s.name.includes('WhatsApp'))?.visitors || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): "Order Now" Clicks by Button Location */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MousePointer className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">
                "Order Now" Clicks by Location
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-mono font-bold">
              {orderNowClicksCount} Total Clicks
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Real-time heat-tracking of which CTA buttons across the landing page drive the most checkout clicks:
          </p>

          <div className="space-y-3">
            {orderButtonBreakdown.map((item, idx) => {
              const maxClicks = Math.max(...orderButtonBreakdown.map((b) => b.clicks), 1);
              const pct = Math.round((item.clicks / maxClicks) * 100);

              return (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate">{item.buttonName}</span>
                    <span className="font-mono font-black text-orange-600">{item.clicks} clicks</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversion Funnel Mini Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-50/80 to-amber-50/60 border border-orange-200/80 text-xs space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Checkout Funnel Efficiency:</span>
              <span className="font-mono text-orange-700 font-bold">{orderNowClickRate}% Click Rate</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              For every 100 visitors landing on the page, approximately <strong>{orderNowClickRate}</strong> click to view the order submission form.
            </p>
          </div>
        </div>

      </div>

      {/* Second Row: Geographic Locations & Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Locations / Cities (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">
                Visitor Geographic Locations & Networks
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {locationsBreakdown.length} Cities Detected
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {locationsBreakdown.map((loc, idx) => (
              <div key={idx} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{loc.city}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({loc.region})</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono truncate block max-w-xs">
                      ISP: {loc.isp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono font-black text-slate-900">{loc.count} visitors</span>
                    <span className="text-[11px] text-orange-600 font-bold block">{loc.percentage}%</span>
                  </div>

                  {loc.mapsUrl && (
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="View exact city location on Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Platform Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">
                Devices & Screen Breakdown
              </h3>
            </div>
          </div>

          {/* Mobile vs Desktop Split */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Smartphone className="w-4 h-4 text-orange-600" />
                <span>Mobile Devices</span>
              </span>
              <span className="font-mono font-black text-slate-900">
                {deviceStats.mobile} ({deviceStats.mobilePct}%)
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Desktop Computers</span>
              </span>
              <span className="font-mono font-black text-slate-900">
                {deviceStats.desktop} ({deviceStats.desktopPct}%)
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              <div 
                className="h-full bg-orange-500" 
                style={{ width: `${deviceStats.mobilePct || 70}%` }}
                title={`Mobile: ${deviceStats.mobilePct}%`}
              />
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${deviceStats.desktopPct || 30}%` }}
                title={`Desktop: ${deviceStats.desktopPct}%`}
              />
            </div>
          </div>

          {/* OS & Browser Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Top Mobile OS in Bangladesh</span>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Android (Chrome & Samsung):</span>
              <span className="font-mono font-bold text-slate-900">~85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">iOS (Apple iPhone / Safari):</span>
              <span className="font-mono font-bold text-slate-900">~15%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Real-Time Live Activity & Click Stream */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600 animate-pulse" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Live Real-Time Activity & Click Stream
              </h3>
              <p className="text-xs text-slate-500">
                Chronological real-time feed of clicks, button taps, chat opens, and order submissions
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveEventCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeEventCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({filteredActivities.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveEventCategory('clicks')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeEventCategory === 'clicks'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🎯 Order Clicks
            </button>
            <button
              type="button"
              onClick={() => setActiveEventCategory('payments')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeEventCategory === 'payments'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              💳 Payment Copies
            </button>
            <button
              type="button"
              onClick={() => setActiveEventCategory('orders')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeEventCategory === 'orders'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🛍️ Submissions
            </button>
            <button
              type="button"
              onClick={() => setActiveEventCategory('chats')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeEventCategory === 'chats'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              💬 Support Chats
            </button>
          </div>
        </div>

        {/* Events Feed List */}
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {eventFeed.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
              No activity events found for the selected date range.
            </div>
          ) : (
            eventFeed.map((act) => {
              const isOrderClick = act.eventType === 'order_now_click' || act.category === 'click';
              const isPayment = act.eventType === 'payment_copy' || act.category === 'payment';
              const isOrderSubmit = act.eventType === 'order_submit' || act.category === 'order';
              const isChat = act.eventType === 'chat_open' || act.category === 'chat';

              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-2xl border transition-all text-xs flex items-start gap-3.5 shadow-2xs ${
                    isOrderClick
                      ? 'bg-orange-50/40 border-orange-200 hover:border-orange-300'
                      : isPayment
                      ? 'bg-pink-50/40 border-pink-200 hover:border-pink-300'
                      : isOrderSubmit
                      ? 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-300'
                      : isChat
                      ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0 mt-0.5 border border-slate-200">
                    {isOrderClick ? (
                      <MousePointer className="w-4 h-4 text-orange-600" />
                    ) : isPayment ? (
                      <CreditCard className="w-4 h-4 text-pink-600" />
                    ) : isOrderSubmit ? (
                      <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    ) : isChat ? (
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Activity className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          isOrderClick
                            ? 'bg-orange-100 text-orange-800 border-orange-200'
                            : isPayment
                            ? 'bg-pink-100 text-pink-800 border-pink-200'
                            : isOrderSubmit
                            ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                            : isChat
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {act.statusBadge || act.category}
                        </span>
                        <h4 className="font-bold text-slate-900 sm:text-sm">{act.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{act.timestamp}</span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{act.details}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                      <span>Visitor: {act.visitorId}</span>
                      {act.city && <span>Location: {act.city}</span>}
                      {act.device && <span>Device: {act.device}</span>}
                      {act.source && <span className="text-orange-600 font-semibold">Source: {act.source}</span>}
                      {act.elementClicked && <span>Element: {act.elementClicked}</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Full Visitors Roster Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Visitor Roster ({tableVisitors.length})
            </h3>
            <p className="text-xs text-slate-500">
              Complete list of visitor sessions during selected date filter with direct location lookup
            </p>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={visitorSearchQuery}
                onChange={(e) => setVisitorSearchQuery(e.target.value)}
                placeholder="Search visitor, city, IP..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setVisitorDeviceFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  visitorDeviceFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setVisitorDeviceFilter('online')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  visitorDeviceFilter === 'online' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Online
              </button>
              <button
                type="button"
                onClick={() => setVisitorDeviceFilter('mobile')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  visitorDeviceFilter === 'mobile' ? 'bg-white text-orange-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setVisitorDeviceFilter('desktop')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  visitorDeviceFilter === 'desktop' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-y border-slate-200 text-[11px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-3.5">Visitor ID & Status</th>
                <th className="py-3 px-3.5">Traffic Source</th>
                <th className="py-3 px-3.5">City & Network</th>
                <th className="py-3 px-3.5">Device & Browser</th>
                <th className="py-3 px-3.5 text-center">Order Clicks</th>
                <th className="py-3 px-3.5">Last Seen</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableVisitors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No visitor records found.
                  </td>
                </tr>
              ) : (
                tableVisitors.map((vis) => (
                  <tr key={vis.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{vis.id}</span>
                        {vis.isOnline ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px]">
                            Offline
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">IP: {vis.ip || '103.xxx'}</span>
                    </td>

                    <td className="py-3 px-3.5">
                      <span className="font-semibold text-slate-800 block">
                        {vis.trafficSource || 'Direct / Organic'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px] block">
                        {vis.referrer || 'direct'}
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="font-bold text-slate-900">{vis.city || 'Dhaka'}, {vis.country || 'Bangladesh'}</div>
                      <span className="text-[10px] text-slate-500 truncate max-w-[140px] block">{vis.isp}</span>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="text-slate-800 font-medium">{vis.device || 'Mobile'} ({vis.os || 'Android'})</div>
                      <span className="text-[10px] text-slate-400">{vis.browser || 'Chrome'}</span>
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      {(vis.orderNowClicks || 0) > 0 ? (
                        <span className="px-2 py-1 rounded-lg bg-orange-100 text-orange-800 font-mono font-black text-xs">
                          {vis.orderNowClicks}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0</span>
                      )}
                    </td>

                    <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500">
                      {vis.lastActive}
                    </td>

                    <td className="py-3 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {vis.mapsUrl && (
                          <a
                            href={vis.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                            title="View location in Google Maps"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedVisitorModal(vis)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Visitor Details Modal */}
      {selectedVisitorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Visitor Session: {selectedVisitorModal.id}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    First Seen: {selectedVisitorModal.firstSeen}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisitorModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Location</span>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedVisitorModal.city || 'Dhaka'}, {selectedVisitorModal.country || 'Bangladesh'}
                </span>
                <span className="text-[11px] text-slate-500 block">{selectedVisitorModal.region}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">IP Address & ISP</span>
                <span className="font-mono font-bold text-slate-900">{selectedVisitorModal.ip}</span>
                <span className="text-[11px] text-slate-500 block truncate">{selectedVisitorModal.isp}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Traffic Channel</span>
                <span className="font-bold text-orange-600">{selectedVisitorModal.trafficSource}</span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">{selectedVisitorModal.referrer}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Device & OS</span>
                <span className="font-bold text-slate-800">{selectedVisitorModal.device}</span>
                <span className="text-[11px] text-slate-500 block">{selectedVisitorModal.os} · {selectedVisitorModal.browser}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Pages Visited in Session:</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedVisitorModal.pagesVisited || []).map((page, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    {page}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {selectedVisitorModal.mapsUrl ? (
                <a
                  href={selectedVisitorModal.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open Location in Google Maps</span>
                </a>
              ) : <div />}

              <button
                type="button"
                onClick={() => setSelectedVisitorModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {copiedTextToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 border border-emerald-500/40 text-xs font-bold animate-fadeIn">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span>{copiedTextToast}</span>
        </div>
      )}

    </div>
  );
};
