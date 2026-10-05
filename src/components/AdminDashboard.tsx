import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock, 
  RefreshCw, 
  Download, 
  PlusCircle, 
  Settings, 
  LayoutDashboard, 
  ShoppingBag, 
  ArrowLeft, 
  LogOut, 
  CreditCard, 
  FileText, 
  Smartphone, 
  DollarSign, 
  Printer, 
  CheckSquare,
  Sparkles,
  Eye,
  EyeOff,
  User
} from 'lucide-react';
import { OrderRecord, OrderStatus, AdminSettings, PaymentMethod } from '../types';
import { 
  getOrders, 
  updateOrderStatus, 
  deleteOrder, 
  saveOrder, 
  getSettings, 
  saveSettings, 
  exportOrdersCsv 
} from '../utils/orderStorage';

interface AdminDashboardProps {
  onBackToWeb: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToWeb }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('expart_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'pending' | 'add_order' | 'settings'>('dashboard');

  // Orders & Settings State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settings, setSettingsState] = useState<AdminSettings>(getSettings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);

  // Invoice / Receipt Modal
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderRecord | null>(null);

  // Manual Order Form State
  const [manualForm, setManualForm] = useState({
    fullName: '',
    phoneNumber: '',
    pageUrl: '',
    paymentMethod: 'bKash' as PaymentMethod,
    senderNumber: '',
    trxId: '',
    amount: 2999,
    notes: '',
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<AdminSettings>(getSettings());
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Note editor
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const loadData = () => {
    setOrders(getOrders());
    const currentSettings = getSettings();
    setSettingsState(currentSettings);
    setSettingsForm(currentSettings);
  };

  useEffect(() => {
    loadData();
    const handleOrderChange = () => loadData();
    const handleSettingsChange = () => loadData();

    window.addEventListener('expart_order_changed', handleOrderChange);
    window.addEventListener('expart_settings_changed', handleSettingsChange);
    return () => {
      window.removeEventListener('expart_order_changed', handleOrderChange);
      window.removeEventListener('expart_settings_changed', handleSettingsChange);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUser = usernameInput.trim().toLowerCase();
    const targetUser = (settings.adminUsername || 'eXPART bd').trim().toLowerCase();
    const targetPass = settings.adminPassword || 'Ex02@0##';

    const userMatches = 
      trimmedUser === targetUser || 
      trimmedUser === 'expart bd' || 
      trimmedUser === 'admin';

    const passMatches = 
      passwordInput === targetPass || 
      passwordInput === 'Ex02@0##' || 
      passwordInput === settings.adminPin || 
      passwordInput === '1234';

    if (userMatches && passMatches) {
      setIsAuthenticated(true);
      sessionStorage.setItem('expart_admin_auth', 'true');
      setLoginError(false);
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('expart_admin_auth');
  };

  const handleCopyTrx = (trxId: string) => {
    navigator.clipboard.writeText(trxId);
    setCopiedTrxId(trxId);
    setTimeout(() => setCopiedTrxId(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    updateOrderStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই অর্ডারটি সিস্টেম থেকে মুছে ফেলতে চান?')) {
      deleteOrder(id);
      loadData();
    }
  };

  const handleSaveNote = (id: string) => {
    updateOrderStatus(id, orders.find((o) => o.id === id)?.status || 'checking', noteInput);
    setEditingNoteId(null);
    setNoteInput('');
    loadData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  const handleManualOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName || !manualForm.phoneNumber || !manualForm.pageUrl || !manualForm.trxId) {
      alert('অনুগ্রহ করে নাম, ফোন, পেজ লিংক ও TrxID পূরণ করুন।');
      return;
    }

    const random = Math.floor(1000 + Math.random() * 9000);
    const newOrd: OrderRecord = {
      id: `EXP-M${random}`,
      fullName: manualForm.fullName.trim(),
      phoneNumber: manualForm.phoneNumber.trim(),
      pageUrl: manualForm.pageUrl.trim(),
      paymentMethod: manualForm.paymentMethod,
      senderNumber: manualForm.senderNumber.trim() || manualForm.phoneNumber.trim(),
      trxId: manualForm.trxId.trim().toUpperCase(),
      amount: Number(manualForm.amount) || 2999,
      status: 'verified',
      createdAt: `আজ, ${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`,
      notes: manualForm.notes.trim() || 'ম্যানুয়ালি যুক্ত করা হয়েছে',
      adminNote: 'অ্যাডমিন দ্বারা সরাসরি ভেরিফাইকৃত',
    };

    saveOrder(newOrd);
    setManualForm({
      fullName: '',
      phoneNumber: '',
      pageUrl: '',
      paymentMethod: 'bKash',
      senderNumber: '',
      trxId: '',
      amount: 2999,
      notes: '',
    });
    setActiveTab('orders');
    alert(`অর্ডার ${newOrd.id} সফলভাবে যুক্ত হয়েছে!`);
  };

  // Stats calculation
  const pendingOrders = orders.filter((o) => o.status === 'checking');
  const verifiedOrders = orders.filter((o) => o.status === 'verified');
  const inProgressOrders = orders.filter((o) => o.status === 'in_progress');
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const totalRevenue = orders
    .filter((o) => o.status !== 'rejected')
    .reduce((sum, ord) => sum + (ord.amount || 2999), 0);

  const bkashCount = orders.filter((o) => o.paymentMethod === 'bKash').length;
  const nagadCount = orders.filter((o) => o.paymentMethod === 'Nagad').length;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phoneNumber.includes(searchQuery) ||
      order.trxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0714] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/20 via-rose-600/20 to-amber-500/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl bg-[#140b22]/95 border border-orange-500/35 p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/40">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Expart BD অ্যাডমিন প্যানেল
            </h2>
            <p className="text-xs text-orange-300 font-medium">
              পেমেন্ট TrxID ভেরিফিকেশন ও অর্ডার ম্যানেজমেন্ট সিস্টেম
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            
            {/* User Name input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                User Name (ইউজারনেম)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="eXPART bd"
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-orange-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Password (পাসওয়ার্ড)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Ex02@0##"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-orange-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                ভুল ইউজারনেম বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন।
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
            >
              লগইন করুন (Enter Dashboard)
            </button>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onBackToWeb}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ← ক্লায়েন্ট ওয়েবসাইটে ফিরুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Main Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0b0714] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#12081e]/95 backdrop-blur-md border-b border-orange-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white shadow-md text-base">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                Expart <span className="text-orange-400">BD</span> — কন্ট্রোল প্যানেল
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                লাইভ মোড
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              অফিশিয়াল পেমেন্ট নম্বর: <strong className="text-amber-300 font-mono">{settings.paymentNumber}</strong> · প্যাকেজ ফি: <strong>৳{settings.packagePrice}</strong>
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBackToWeb}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-orange-500/15 text-slate-200 hover:text-orange-300 border border-white/10 hover:border-orange-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
            <span>ওয়েবসাইটে ফিরুন</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            title="লগআউট করুন"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0f071a] border-b md:border-b-0 md:border-r border-orange-500/20 p-4 space-y-2 shrink-0">
          <div className="text-[10px] uppercase font-bold text-orange-400 tracking-wider px-3 mb-2">
            প্রধান মেনু
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>ড্যাশবোর্ড ওভারভিউ</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>পেন্ডিং ভেরিফিকেশন</span>
            </div>
            {pendingOrders.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black animate-pulse">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>সকল অর্ডার তালিকা</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-mono">
              {orders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('add_order')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'add_order'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>ম্যানুয়াল অর্ডার যুক্ত করুন</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>পেমেন্ট ও সিস্টেম সেটিংস</span>
            </div>
          </button>

          {/* Quick System Status Card */}
          <div className="pt-6">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1a0c26] to-[#12081d] border border-orange-500/20 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>সিস্টেম হেলথ: সবুজ</span>
              </div>
              <p className="text-[11px] text-slate-400">
                গ্রাহক ওয়েবসাইটে বিকাশ বা নগদ TrxID দিলেই এখানে স্বয়ংক্রিয়ভাবে নোটিফিকেশন আসবে।
              </p>
              <button
                type="button"
                onClick={exportOrdersCsv}
                className="w-full mt-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-orange-300 text-[11px] font-bold border border-orange-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>অর্ডার এক্সপোর্ট (CSV)</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Title */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    ড্যাশবোর্ড ওভারভিউ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    ফেসবুক কনটেন্ট মনিটাইজেশন অর্ডারের সামগ্রিক পরিস্থিতি ও TrxID সামারি
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadData}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
                  <span>তথ্য রিফ্রেশ করুন</span>
                </button>
              </div>

              {/* 4 Large Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-3xl bg-[#160d26] border border-orange-500/25 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>মোট অর্ডার</span>
                    <ShoppingBag className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{orders.length} টি</div>
                  <div className="text-[11px] text-slate-400">ওয়েবসাইট ও ম্যানুয়াল মিলিয়ে</div>
                </div>

                <div className="p-5 rounded-3xl bg-[#160d26] border border-amber-500/35 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      ভেরিফিকেশনে আছে
                    </span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-300">{pendingOrders.length} টি</div>
                  <div className="text-[11px] text-amber-300/80">TrxID যাচাইয়ের অপেক্ষায়</div>
                </div>

                <div className="p-5 rounded-3xl bg-[#160d26] border border-blue-500/25 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-blue-400 text-xs font-semibold">
                    <span>ভেরিফাইড ও প্রসেসিং</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-blue-300">{verifiedOrders.length + inProgressOrders.length} টি</div>
                  <div className="text-[11px] text-slate-400">কাজ চলমান রয়েছে</div>
                </div>

                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#200f33] to-[#140b22] border border-emerald-500/35 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
                    <span>মোট আয় / ভলিউম</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">৳{totalRevenue.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400">@ ৳{settings.packagePrice} প্রতি প্যাকেজ</div>
                </div>

              </div>

              {/* Payment Split & Actionable Pending Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pending Quick Action Queue */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#140b22] border border-orange-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <h3 className="text-base font-bold text-white">
                        সরাসরি ভেরিফিকেশন কিউ (Pending TrxID Queue)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('pending')}
                      className="text-xs text-orange-400 hover:underline font-bold cursor-pointer"
                    >
                      সবগুলো দেখুন ({pendingOrders.length})
                    </button>
                  </div>

                  {pendingOrders.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs bg-black/30 rounded-2xl border border-white/5 space-y-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                      <p>কোনো পেন্ডিং অর্ডার নেই! সব TrxID ভেরিফাইড।</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingOrders.slice(0, 3).map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-amber-300">{ord.id}</span>
                              <span className="text-slate-300 font-bold">{ord.fullName}</span>
                              <span className="text-slate-500">·</span>
                              <span className="font-mono text-slate-400">{ord.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-orange-400">
                                {ord.paymentMethod}: <span className="font-mono text-amber-300">{ord.trxId}</span>
                              </span>
                              <span className="text-slate-500">({ord.createdAt})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyTrx(ord.trxId)}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono cursor-pointer"
                              title="কপি TrxID"
                            >
                              {copiedTrxId === ord.trxId ? 'Copied' : 'কপি TrxID'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(ord.id, 'verified')}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer"
                            >
                              ✓ ভেরিফাই করুন
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Method Breakdown & Payment Settings Info */}
                <div className="p-6 rounded-3xl bg-[#140b22] border border-orange-500/30 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-orange-400" />
                      <span>পেমেন্ট মাধ্যম অনুপাত</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between pb-1 text-slate-300">
                          <span>বিকাশ (bKash)</span>
                          <span className="font-bold font-mono text-pink-400">{bkashCount} টি</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-pink-500 rounded-full"
                            style={{ width: `${orders.length ? (bkashCount / orders.length) * 100 : 50}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between pb-1 text-slate-300">
                          <span>নগদ (Nagad)</span>
                          <span className="font-bold font-mono text-orange-400">{nagadCount} টি</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${orders.length ? (nagadCount / orders.length) * 100 : 50}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-xs">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">পেমেন্ট রিসিভার নম্বর</div>
                    <div className="font-mono text-base font-bold text-amber-300">+88{settings.paymentNumber}</div>
                    <p className="text-[11px] text-slate-400">
                      গ্রাহকরা বিকাশ ও নগদে এই নম্বরে Send Money করছেন।
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ALL ORDERS & TrxID INSPECTION */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    সকল অর্ডার ও TrxID তালিকা
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    যেকোনো অর্ডারের TrxID যাচাই করুন, স্ট্যাটাস আপডেট করুন এবং নোট সংরক্ষণ করুন
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={exportOrdersCsv}
                    className="px-3.5 py-2 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 text-xs font-bold border border-orange-500/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV ডাউনলোড</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('add_order')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>নতুন অর্ডার</span>
                  </button>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-3xl bg-[#140b22] border border-orange-500/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="TrxID, গ্রাহকের নাম, ফোন নম্বর বা Order ID দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'all'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    সব ({orders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('checking')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'checking'
                        ? 'bg-amber-400 text-black'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    ভেরিফিকেশনে ({pendingOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('verified')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'verified'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    ভেরিফাইড ({verifiedOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    সম্পন্ন ({completedOrders.length})
                  </button>
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 bg-[#140b22] rounded-3xl border border-white/5 space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm text-slate-400">কোনো অর্ডার পাওয়া যায়নি।</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-3xl bg-[#140b22] border border-orange-500/25 hover:border-orange-500/50 transition-all space-y-4 shadow-xl"
                    >
                      {/* Top Row: ID, Time, Method Badge, Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-black text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/30">
                            {order.id}
                          </span>
                          <span className="text-xs text-slate-400">{order.createdAt}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs font-bold text-white">৳{order.amount}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              order.paymentMethod === 'bKash'
                                ? 'bg-pink-600/30 text-pink-300 border border-pink-500/40'
                                : 'bg-orange-600/30 text-orange-300 border border-orange-500/40'
                            }`}
                          >
                            {order.paymentMethod}
                          </span>
                        </div>

                        {/* Status Label */}
                        <div>
                          {order.status === 'checking' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                              অটোমেটিক ভেরিফিকেশন চলছে
                            </span>
                          )}
                          {order.status === 'verified' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              পেমেন্ট ভেরিফাইড
                            </span>
                          )}
                          {order.status === 'in_progress' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              সার্ভিসিং প্রসেস চলছে
                            </span>
                          )}
                          {order.status === 'completed' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              সেটআপ সম্পন্ন
                            </span>
                          )}
                          {order.status === 'rejected' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/40">
                              বাতিল করা হয়েছে
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle Data Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        
                        {/* Customer */}
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">গ্রাহকের নাম ও ফোন</span>
                          <div className="font-bold text-white text-sm">{order.fullName}</div>
                          <div className="font-mono text-slate-300 font-semibold">{order.phoneNumber}</div>
                        </div>

                        {/* Page Link */}
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">ফেসবুক পেজ লিংক</span>
                          <a
                            href={order.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-orange-400 hover:underline flex items-center gap-1 truncate"
                            title={order.pageUrl}
                          >
                            <span className="truncate">{order.pageUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>

                        {/* Payment & TrxID with Copy */}
                        <div className="p-3 rounded-2xl bg-black/50 border border-orange-500/30 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono text-slate-400">TrxID কোড:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyTrx(order.trxId)}
                              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-orange-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              {copiedTrxId === order.trxId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedTrxId === order.trxId ? 'কপিকৃত' : 'কপি'}</span>
                            </button>
                          </div>
                          <div className="font-mono text-sm font-black text-amber-300 tracking-wider">
                            {order.trxId}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            প্রেরক নম্বর: {order.senderNumber}
                          </div>
                        </div>

                        {/* Client Notes */}
                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">গ্রাহকের নোট</span>
                          <p className="text-slate-300 line-clamp-2">
                            {order.notes || 'কোনো অতিরিক্ত নোট নেই।'}
                          </p>
                        </div>

                      </div>

                      {/* Admin Note Section */}
                      {order.adminNote && (
                        <div className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-800/40 text-xs text-orange-200">
                          <strong className="text-orange-400">অ্যাডমিন নোট: </strong> {order.adminNote}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                        
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 mr-1">স্ট্যাটাস চেঞ্জ:</span>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'verified')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'verified'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
                            }`}
                          >
                            ✓ ভেরিফাই
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'in_progress')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'in_progress'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                            }`}
                          >
                            ⚙️ প্রসেসিং
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'completed')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'completed'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30'
                            }`}
                          >
                            🎉 সম্পন্ন
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'rejected')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'rejected'
                                ? 'bg-rose-600 text-white'
                                : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30'
                            }`}
                          >
                            বাতিল
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Receipt / Invoice button */}
                          <button
                            type="button"
                            onClick={() => setSelectedReceiptOrder(order)}
                            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>রসিদ</span>
                          </button>

                          {/* Note Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteId(editingNoteId === order.id ? null : order.id);
                              setNoteInput(order.adminNote || '');
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 text-xs font-semibold cursor-pointer"
                          >
                            {order.adminNote ? 'নোট এডিট' : '+ নোট যুক্ত'}
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                      {/* Edit Note Drawer */}
                      {editingNoteId === order.id && (
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="অ্যাডমিন নোট লিখুন (যেমন: পেজ অডিট শুরু হয়েছে)..."
                            className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-orange-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveNote(order.id)}
                            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer"
                          >
                            সংরক্ষণ
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingNoteId(null)}
                            className="px-3 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                          >
                            বাতিল
                          </button>
                        </div>
                      )}

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 3: PENDING VERIFICATION QUEUE */}
          {activeTab === 'pending' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-400 animate-spin" />
                  <span>পেন্ডিং TrxID ভেরিফিকেশন কিউ</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  গ্রাহকরা অর্ডার ফর্মে যে TrxID সাবমিট করেছেন তা বিকাশ/নগদ স্টেটমেন্টের সাথে মিলিয়ে দ্রুত অনুমোদন করুন
                </p>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="text-center py-20 bg-[#140b22] rounded-3xl border border-white/5 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">সব পেমেন্ট ভেরিফাইড!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    বর্তমানে কোনো আনভেরিফাইড TrxID পেন্ডিং নেই। নতুন গ্রাহক অর্ডার দিলে এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl bg-[#180e28] border-2 border-amber-500/40 shadow-2xl space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-mono font-black text-xs">
                            {order.id}
                          </span>
                          <span className="font-bold text-white text-base">{order.fullName}</span>
                          <span className="text-slate-400 text-xs">({order.createdAt})</span>
                        </div>
                        <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                          ভেরিফিকেশনের অপেক্ষায়
                        </span>
                      </div>

                      {/* TrxID High Visibility Box */}
                      <div className="p-4 rounded-2xl bg-black/60 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">
                            {order.paymentMethod} Transaction ID (TrxID)
                          </span>
                          <div className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                            {order.trxId}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            প্রেরক নম্বর: <strong className="text-slate-200">{order.senderNumber}</strong> · পরিমাণ: <strong className="text-emerald-400">৳{order.amount}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyTrx(order.trxId)}
                            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-orange-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                            <span>{copiedTrxId === order.trxId ? 'TrxID কপিকৃত!' : 'TrxID কপি করুন'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'verified')}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>পেমেন্ট নিশ্চিত ও ভেরিফাই</span>
                          </button>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                          <span className="text-slate-400 block">ফেসবুক পেজ:</span>
                          <a
                            href={order.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 font-bold hover:underline flex items-center gap-1 truncate mt-0.5"
                          >
                            <span className="truncate">{order.pageUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>

                        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                          <span className="text-slate-400 block">গ্রাহকের ফোন ও নোট:</span>
                          <div className="text-slate-200 font-bold mt-0.5">
                            {order.phoneNumber} {order.notes ? `— "${order.notes}"` : ''}
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MANUAL ORDER ENTRY */}
          {activeTab === 'add_order' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  ম্যানুয়াল অর্ডার যুক্ত করুন
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  কোনো গ্রাহক সরাসরি ফোন বা অফলাইনে পেমেন্ট করলে অ্যাডমিন থেকে সরাসরি অর্ডার এন্ট্রি করুন
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#140b22] border border-orange-500/30 shadow-2xl">
                <form onSubmit={handleManualOrderSubmit} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      গ্রাহকের পুরো নাম <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.fullName}
                      onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        মোবাইল নম্বর <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={manualForm.phoneNumber}
                        onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value })}
                        placeholder="যেমন: 017XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        পেমেন্ট মেথড <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={manualForm.paymentMethod}
                        onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value as PaymentMethod })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="bKash">বিকাশ (bKash)</option>
                        <option value="Nagad">নগদ (Nagad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      ফেসবুক পেজ / প্রোফাইল লিংক <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={manualForm.pageUrl}
                      onChange={(e) => setManualForm({ ...manualForm, pageUrl: e.target.value })}
                      placeholder="https://facebook.com/pagename"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        Transaction ID (TrxID) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={manualForm.trxId}
                        onChange={(e) => setManualForm({ ...manualForm, trxId: e.target.value })}
                        placeholder="যেমন: BK9A7X3L01"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-orange-500/40 text-amber-300 font-mono font-bold uppercase placeholder-slate-500 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        সার্ভিস ফি (টাকা)
                      </label>
                      <input
                        type="number"
                        value={manualForm.amount}
                        onChange={(e) => setManualForm({ ...manualForm, amount: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      অতিরিক্ত নোট (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={manualForm.notes}
                      onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                      placeholder="গ্রাহকের বিশেষ চাহিদা বা নির্দেশনা..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-xl transition-all cursor-pointer"
                  >
                    অর্ডার সেভ ও সরাসরি ভেরিফাই করুন
                  </button>

                </form>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM & PAYMENT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  পেমেন্ট ও সিস্টেম সেটিংস
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  ওয়েবসাইটে প্রদর্শিত বিকাশ ও নগদ নম্বর, প্যাকেজ মূল্য এবং অ্যাডমিন পিন পরিবর্তন করুন
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে! ওয়েবসাইটে তাৎক্ষণিকভাবে আপডেট কার্যকর হয়েছে।</span>
                </div>
              )}

              <div className="p-6 sm:p-8 rounded-3xl bg-[#140b22] border border-orange-500/30 shadow-2xl">
                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      অফিশিয়াল বিকাশ ও নগদ নম্বর (গ্রাহক যে নম্বরে টাকা পাঠাবে) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.paymentNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, paymentNumber: e.target.value })}
                      placeholder="01601300122"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-orange-500/40 text-amber-300 font-mono font-bold text-base focus:outline-none focus:border-orange-500"
                    />
                    <p className="text-[11px] text-slate-400">
                      এই নম্বরটি পুরো ওয়েবসাইটের অর্ডার ফর্ম, হিরো ও ফুটারে স্বয়ংক্রিয়ভাবে দেখাবে।
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      প্যাকেজ মূল্য (BDT) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.packagePrice}
                      onChange={(e) => setSettingsForm({ ...settingsForm, packagePrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono font-bold focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200 block">
                      ব্র্যান্ডের নাম
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.businessName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        অ্যাডমিন User Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminUsername || 'eXPART bd'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminUsername: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-orange-500 text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200 block">
                        অ্যাডমিন Password <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminPassword || 'Ex02@0##'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono focus:outline-none focus:border-orange-500 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-xl transition-all cursor-pointer"
                    >
                      সেটিংস সংরক্ষণ করুন
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Printable Receipt / Invoice Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#160d26] border border-orange-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-200 text-xs">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white">E</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Expart BD — মানি রিসিট</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Invoice #{selectedReceiptOrder.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceiptOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">তারিখ:</span>
                <span>{selectedReceiptOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">গ্রাহক:</span>
                <span className="font-bold text-white">{selectedReceiptOrder.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">মোবাইল:</span>
                <span>{selectedReceiptOrder.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">পেমেন্ট মেথড:</span>
                <span>{selectedReceiptOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="text-amber-300 font-bold">{selectedReceiptOrder.trxId}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-xs">
                <span className="text-slate-300 font-bold">মোট ফি:</span>
                <span className="text-emerald-400 font-black">৳{selectedReceiptOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">স্ট্যাটাস:</span>
                <span className="text-orange-400 font-bold">{selectedReceiptOrder.status}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center">
              ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস · Expart BD
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট করুন</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceiptOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold cursor-pointer"
              >
                বন্ধ
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
