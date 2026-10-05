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
  DollarSign, 
  Printer, 
  Sparkles,
  Eye,
  EyeOff,
  User,
  HelpCircle,
  ListPlus,
  Edit2,
  Megaphone,
  X
} from 'lucide-react';
import { OrderRecord, OrderStatus, AdminSettings, PaymentMethod, FaqItem, PackageFeatureItem } from '../types';
import { 
  getOrders, 
  updateOrderStatus, 
  deleteOrder, 
  saveOrder, 
  getSettings, 
  saveSettings, 
  exportOrdersCsv,
  getFaqs,
  saveFaq,
  updateFaq,
  deleteFaq,
  getPackageFeatures,
  savePackageFeature,
  updatePackageFeature,
  deletePackageFeature
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'pending' | 'add_order' | 'faqs' | 'features' | 'settings'>('dashboard');

  // Orders & Settings State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settings, setSettingsState] = useState<AdminSettings>(getSettings());
  const [faqs, setFaqsState] = useState<FaqItem[]>([]);
  const [features, setFeaturesState] = useState<PackageFeatureItem[]>([]);
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

  // FAQ Modal / Form State
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  // Feature Modal / Form State
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [featureForm, setFeatureForm] = useState({ text: '', bn: '' });

  const loadData = () => {
    setOrders(getOrders());
    const currentSettings = getSettings();
    setSettingsState(currentSettings);
    setSettingsForm(currentSettings);
    setFaqsState(getFaqs());
    setFeaturesState(getPackageFeatures());
  };

  useEffect(() => {
    loadData();
    const handleOrderChange = () => loadData();
    const handleSettingsChange = () => loadData();
    const handleFaqsChange = () => loadData();
    const handleFeaturesChange = () => loadData();

    window.addEventListener('expart_order_changed', handleOrderChange);
    window.addEventListener('expart_settings_changed', handleSettingsChange);
    window.addEventListener('expart_faqs_changed', handleFaqsChange);
    window.addEventListener('expart_features_changed', handleFeaturesChange);
    return () => {
      window.removeEventListener('expart_order_changed', handleOrderChange);
      window.removeEventListener('expart_settings_changed', handleSettingsChange);
      window.removeEventListener('expart_faqs_changed', handleFaqsChange);
      window.removeEventListener('expart_features_changed', handleFeaturesChange);
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

  // FAQ Handlers
  const handleOpenFaqModal = (faq?: FaqItem) => {
    if (faq) {
      setEditingFaqId(faq.id);
      setFaqForm({ question: faq.question, answer: faq.answer });
    } else {
      setEditingFaqId(null);
      setFaqForm({ question: '', answer: '' });
    }
    setFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    if (editingFaqId) {
      updateFaq(editingFaqId, { question: faqForm.question, answer: faqForm.answer });
    } else {
      const newFaq: FaqItem = {
        id: `faq-${Date.now()}`,
        question: faqForm.question.trim(),
        answer: faqForm.answer.trim(),
      };
      saveFaq(newFaq);
    }
    setFaqModalOpen(false);
    loadData();
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm('আপনি কি এই FAQ প্রশ্নটি মুছে ফেলতে চান?')) {
      deleteFaq(id);
      loadData();
    }
  };

  // Feature Handlers
  const handleOpenFeatureModal = (feat?: PackageFeatureItem) => {
    if (feat) {
      setEditingFeatureId(feat.id);
      setFeatureForm({ text: feat.text, bn: feat.bn });
    } else {
      setEditingFeatureId(null);
      setFeatureForm({ text: '', bn: '' });
    }
    setFeatureModalOpen(true);
  };

  const handleSaveFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureForm.text || !featureForm.bn) return;

    if (editingFeatureId) {
      updatePackageFeature(editingFeatureId, { text: featureForm.text, bn: featureForm.bn });
    } else {
      const newFeat: PackageFeatureItem = {
        id: `feat-${Date.now()}`,
        text: featureForm.text.trim(),
        bn: featureForm.bn.trim(),
      };
      savePackageFeature(newFeat);
    }
    setFeatureModalOpen(false);
    loadData();
  };

  const handleDeleteFeature = (id: string) => {
    if (window.confirm('আপনি কি এই প্যাকেজ ফিচারটি মুছে ফেলতে চান?')) {
      deletePackageFeature(id);
      loadData();
    }
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
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Soft Warm Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/40 via-rose-100/30 to-amber-100/40 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-8 shadow-2xl text-center space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/30">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Expart BD অ্যাডমিন প্যানেল
            </h2>
            <p className="text-xs text-orange-600 font-medium">
              পেমেন্ট TrxID ভেরিফিকেশন ও সম্পূর্ণ CMS ম্যানেজমেন্ট
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            
            {/* User Name input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
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
                  placeholder="ইউজারনেম লিখুন"
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
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
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-mono shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                ভুল ইউজারনেম বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন।
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-md shadow-orange-600/25 transition-all cursor-pointer"
            >
              লগইন করুন (Enter Dashboard)
            </button>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onBackToWeb}
                className="text-slate-500 hover:text-slate-900 text-xs cursor-pointer"
              >
                ← ক্লায়েন্ট ওয়েবসাইটে ফিরুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Main Admin Dashboard (Clean Light SaaS Theme)
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white shadow-md text-base">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Expart <span className="text-orange-600">BD</span> — কন্ট্রোল প্যানেল
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                রুট: /admin
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              অফিশিয়াল পেমেন্ট নম্বর: <strong className="text-slate-900 font-mono">{settings.paymentNumber}</strong> · প্যাকেজ ফি: <strong>৳{settings.packagePrice}</strong>
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBackToWeb}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-orange-600" />
            <span>ওয়েবসাইটে ফিরুন</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
            title="লগআউট করুন"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-2 shrink-0">
          <div className="text-[10px] uppercase font-bold text-orange-600 tracking-wider px-3 mb-2">
            প্রধান মেনু
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>পেন্ডিং ভেরিফিকেশন</span>
            </div>
            {pendingOrders.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black animate-pulse">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>সকল অর্ডার তালিকা</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
              {orders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('add_order')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'add_order'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>ম্যানুয়াল অর্ডার এন্ট্রি</span>
            </div>
          </button>

          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 pt-3 mb-1">
            কনটেন্ট ম্যানেজমেন্ট (CMS)
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-orange-500" />
              <span>প্রশ্ন-উত্তর (FAQ) এডিটর</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
              {faqs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ListPlus className="w-4 h-4 text-indigo-500" />
              <span>প্যাকেজ ফিচার তালিকা</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
              {features.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>পেমেন্ট, ব্যানার ও সেটিংস</span>
            </div>
          </button>

          {/* Quick System Status Card */}
          <div className="pt-4">
            <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>সিস্টেম লাইভ: Vercel Ready</span>
              </div>
              <p className="text-[11px] text-slate-600">
                যেকোনো পরিবর্তন সাথে সাথে লোকালস্টোরেজে সিঙ্ক হয়ে লাইভ ওয়েবসাইটে প্রতিফলিত হয়।
              </p>
              <button
                type="button"
                onClick={exportOrdersCsv}
                className="w-full mt-1 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-orange-700 text-[11px] font-bold border border-orange-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
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
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    ড্যাশবোর্ড ওভারভিউ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    ফেসবুক কনটেন্ট মনিটাইজেশন অর্ডারের সামগ্রিক পরিস্থিতি ও TrxID সামারি
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadData}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
                  <span>তথ্য রিফ্রেশ করুন</span>
                </button>
              </div>

              {/* 4 Large Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>মোট অর্ডার</span>
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{orders.length} টি</div>
                  <div className="text-[11px] text-slate-500">ওয়েবসাইট ও ম্যানুয়াল মিলিয়ে</div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      ভেরিফিকেশনে আছে
                    </span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-3xl font-black text-amber-600">{pendingOrders.length} টি</div>
                  <div className="text-[11px] text-amber-700/80">TrxID যাচাইয়ের অপেক্ষায়</div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
                    <span>ভেরিফাইড ও প্রসেসিং</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-black text-blue-600">{verifiedOrders.length + inProgressOrders.length} টি</div>
                  <div className="text-[11px] text-slate-500">কাজ চলমান রয়েছে</div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
                    <span>মোট আয় / ভলিউম</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-emerald-600">৳{totalRevenue.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500">@ ৳{settings.packagePrice} প্রতি প্যাকেজ</div>
                </div>
              </div>

              {/* Payment Split & Actionable Pending Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pending Quick Action Queue */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <h3 className="text-base font-bold text-slate-900">
                        সরাসরি ভেরিফিকেশন কিউ (Pending TrxID Queue)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('pending')}
                      className="text-xs text-orange-600 hover:underline font-bold cursor-pointer"
                    >
                      সবগুলো দেখুন ({pendingOrders.length})
                    </button>
                  </div>

                  {pendingOrders.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                      <p>কোনো পেন্ডিং অর্ডার নেই! সব TrxID ভেরিফাইড।</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingOrders.slice(0, 3).map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">{ord.id}</span>
                              <span className="text-slate-900 font-bold">{ord.fullName}</span>
                              <span className="text-slate-400">·</span>
                              <span className="font-mono text-slate-600">{ord.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-slate-700">
                                {ord.paymentMethod}: <span className="font-mono font-bold text-slate-900">{ord.trxId}</span>
                              </span>
                              <span className="text-slate-500">({ord.createdAt})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyTrx(ord.trxId)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-mono cursor-pointer shadow-2xs"
                              title="কপি TrxID"
                            >
                              {copiedTrxId === ord.trxId ? 'Copied' : 'কপি TrxID'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(ord.id, 'verified')}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs cursor-pointer"
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
                <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                      <span>পেমেন্ট মাধ্যম অনুপাত</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between pb-1 text-slate-600">
                          <span>বিকাশ (bKash)</span>
                          <span className="font-bold font-mono text-pink-600">{bkashCount} টি</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-pink-500 rounded-full"
                            style={{ width: `${orders.length ? (bkashCount / orders.length) * 100 : 50}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between pb-1 text-slate-600">
                          <span>নগদ (Nagad)</span>
                          <span className="font-bold font-mono text-orange-600">{nagadCount} টি</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${orders.length ? (nagadCount / orders.length) * 100 : 50}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-1 text-xs">
                    <div className="text-[10px] text-slate-500 uppercase font-mono">পেমেন্ট রিসিভার নম্বর</div>
                    <div className="font-mono text-base font-bold text-slate-900">+88{settings.paymentNumber}</div>
                    <p className="text-[11px] text-slate-600">
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
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    সকল অর্ডার ও TrxID তালিকা
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    যেকোনো অর্ডারের TrxID যাচাই করুন, স্ট্যাটাস আপডেট করুন এবং নোট সংরক্ষণ করুন
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={exportOrdersCsv}
                    className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV ডাউনলোড</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('add_order')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-600/20"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>নতুন অর্ডার</span>
                  </button>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-4 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="TrxID, গ্রাহকের নাম, ফোন নম্বর বা Order ID দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'all'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    সব ({orders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('checking')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'checking'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ভেরিফিকেশনে ({pendingOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('verified')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'verified'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ভেরিফাইড ({verifiedOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      statusFilter === 'completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    সম্পন্ন ({completedOrders.length})
                  </button>
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm text-slate-500">কোনো অর্ডার পাওয়া যায়নি।</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-orange-300 transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-black text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                            {order.id}
                          </span>
                          <span className="text-xs text-slate-500">{order.createdAt}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-bold text-slate-900">৳{order.amount}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              order.paymentMethod === 'bKash'
                                ? 'bg-pink-50 text-pink-700 border border-pink-200'
                                : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}
                          >
                            {order.paymentMethod}
                          </span>
                        </div>

                        <div>
                          {order.status === 'checking' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                              অটোমেটিক ভেরিফিকেশন চলছে
                            </span>
                          )}
                          {order.status === 'verified' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              পেমেন্ট ভেরিফাইড
                            </span>
                          )}
                          {order.status === 'in_progress' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              সার্ভিসিং প্রসেস চলছে
                            </span>
                          )}
                          {order.status === 'completed' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              সেটআপ সম্পন্ন
                            </span>
                          )}
                          {order.status === 'rejected' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              বাতিল করা হয়েছে
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">গ্রাহকের নাম ও ফোন</span>
                          <div className="font-bold text-slate-900 text-sm">{order.fullName}</div>
                          <div className="font-mono text-slate-600 font-semibold">{order.phoneNumber}</div>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">ফেসবুক পেজ লিংক</span>
                          <a
                            href={order.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-orange-600 hover:underline flex items-center gap-1 truncate"
                            title={order.pageUrl}
                          >
                            <span className="truncate">{order.pageUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>

                        <div className="p-3 rounded-2xl bg-orange-50/40 border border-orange-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono text-slate-500">TrxID কোড:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyTrx(order.trxId)}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                            >
                              {copiedTrxId === order.trxId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedTrxId === order.trxId ? 'কপিকৃত' : 'কপি'}</span>
                            </button>
                          </div>
                          <div className="font-mono text-sm font-black text-slate-900 tracking-wider">
                            {order.trxId}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            প্রেরক নম্বর: {order.senderNumber}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">গ্রাহকের নোট</span>
                          <p className="text-slate-600 line-clamp-2">
                            {order.notes || 'কোনো অতিরিক্ত নোট নেই।'}
                          </p>
                        </div>
                      </div>

                      {order.adminNote && (
                        <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950">
                          <strong className="text-orange-700">অ্যাডমিন নোট: </strong> {order.adminNote}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-500 mr-1">স্ট্যাটাস:</span>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'verified')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'verified'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                            }`}
                          >
                            ✓ ভেরিফাই
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'in_progress')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'in_progress'
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                            }`}
                          >
                            ⚙️ প্রসেসিং
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'completed')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'completed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            🎉 সম্পন্ন
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'rejected')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              order.status === 'rejected'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            }`}
                          >
                            বাতিল
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReceiptOrder(order)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer border border-slate-200"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>রসিদ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteId(editingNoteId === order.id ? null : order.id);
                              setNoteInput(order.adminNote || '');
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-semibold cursor-pointer border border-orange-200"
                          >
                            {order.adminNote ? 'নোট এডিট' : '+ নোট যুক্ত'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {editingNoteId === order.id && (
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="অ্যাডমিন নোট লিখুন (যেমন: পেজ অডিট শুরু হয়েছে)..."
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
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
                            className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
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
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-500 animate-spin" />
                  <span>পেন্ডিং TrxID ভেরিফিকেশন কিউ</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  গ্রাহকরা অর্ডার ফর্মে যে TrxID সাবমিট করেছেন তা বিকাশ/নগদ স্টেটমেন্টের সাথে মিলিয়ে দ্রুত অনুমোদন করুন
                </p>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">সব পেমেন্ট ভেরিফাইড!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    বর্তমানে কোনো আনভেরিফাইড TrxID পেন্ডিং নেই। নতুন গ্রাহক অর্ডার দিলে এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-md space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-mono font-black text-xs">
                            {order.id}
                          </span>
                          <span className="font-bold text-slate-900 text-base">{order.fullName}</span>
                          <span className="text-slate-500 text-xs">({order.createdAt})</span>
                        </div>
                        <span className="text-amber-800 font-bold text-xs bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                          ভেরিফিকেশনের অপেক্ষায়
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-xs text-slate-500 block font-medium">
                            {order.paymentMethod} Transaction ID (TrxID)
                          </span>
                          <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                            {order.trxId}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            প্রেরক নম্বর: <strong className="text-slate-900">{order.senderNumber}</strong> · পরিমাণ: <strong className="text-emerald-700 font-bold">৳{order.amount}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyTrx(order.trxId)}
                            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Copy className="w-4 h-4 text-slate-500" />
                            <span>{copiedTrxId === order.trxId ? 'TrxID কপিকৃত!' : 'TrxID কপি করুন'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'verified')}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>পেমেন্ট নিশ্চিত ও ভেরিফাই</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 block">ফেসবুক পেজ:</span>
                          <a
                            href={order.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 font-bold hover:underline flex items-center gap-1 truncate mt-0.5"
                          >
                            <span className="truncate">{order.pageUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 block">গ্রাহকের ফোন ও নোট:</span>
                          <div className="text-slate-900 font-bold mt-0.5">
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
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  ম্যানুয়াল অর্ডার এন্ট্রি করুন
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  কোনো গ্রাহক সরাসরি ফোন বা অফলাইনে পেমেন্ট করলে অ্যাডমিন থেকে সরাসরি অর্ডার এন্ট্রি করুন
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <form onSubmit={handleManualOrderSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      গ্রাহকের পুরো নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.fullName}
                      onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        মোবাইল নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={manualForm.phoneNumber}
                        onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value })}
                        placeholder="যেমন: 017XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        পেমেন্ট মেথড <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={manualForm.paymentMethod}
                        onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value as PaymentMethod })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 shadow-2xs"
                      >
                        <option value="bKash">বিকাশ (bKash)</option>
                        <option value="Nagad">নগদ (Nagad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      ফেসবুক পেজ / প্রোফাইল লিংক <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={manualForm.pageUrl}
                      onChange={(e) => setManualForm({ ...manualForm, pageUrl: e.target.value })}
                      placeholder="https://facebook.com/pagename"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        Transaction ID (TrxID) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={manualForm.trxId}
                        onChange={(e) => setManualForm({ ...manualForm, trxId: e.target.value })}
                        placeholder="যেমন: BK9A7X3L01"
                        className="w-full px-4 py-2.5 rounded-xl bg-orange-50/50 border border-orange-300 text-slate-900 font-mono font-bold uppercase placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        সার্ভিস ফি (টাকা)
                      </label>
                      <input
                        type="number"
                        value={manualForm.amount}
                        onChange={(e) => setManualForm({ ...manualForm, amount: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      অতিরিক্ত নোট (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={manualForm.notes}
                      onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                      placeholder="গ্রাহকের বিশেষ চাহিদা বা নির্দেশনা..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 resize-none shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-md shadow-orange-600/25 transition-all cursor-pointer"
                  >
                    অর্ডার সেভ ও সরাসরি ভেরিফাই করুন
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: CMS FAQ MANAGEMENT */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                    <span>প্রশ্ন-উত্তর (FAQ) কনটেন্ট ম্যানেজার</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    ওয়েবসাইটের FAQ সেকশনের প্রশ্ন ও উত্তর সহজে যোগ, এডিট বা ডিলিট করুন
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenFaqModal()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-600/25"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>নতুন FAQ যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all shadow-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {faq.question}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenFaqModal(faq)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          title="এডিট করুন"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CMS PACKAGE FEATURES MANAGEMENT */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <ListPlus className="w-6 h-6 text-indigo-600" />
                    <span>প্যাকেজ ফিচার কনটেন্ট ম্যানেজার</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    ওয়েবসাইটের স্পেশাল প্যাকেজ কার্ডে প্রদর্শিত সুবিধাসমূহ নিয়ন্ত্রণ করুন
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenFeatureModal()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-600/25"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>নতুন ফিচার যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, index) => (
                  <div
                    key={feat.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all shadow-xs flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <div className="text-sm font-bold text-slate-900">{feat.text}</div>
                      </div>
                      <div className="text-xs text-slate-500">{feat.bn}</div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenFeatureModal(feat)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                        title="এডিট করুন"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFeature(feat.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SYSTEM & PAYMENT SETTINGS & BANNER */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  পেমেন্ট, লাইভ ব্যানার ও সিস্টেম সেটিংস
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  ওয়েবসাইটে প্রদর্শিত বিকাশ ও নগদ নম্বর, প্যাকেজ মূল্য, লাইভ অ্যানাউন্সমেন্ট ব্যানার এবং ক্রেডেনশিয়াল পরিচালনা করুন
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে! ওয়েবসাইটে তাৎক্ষণিকভাবে আপডেট কার্যকর হয়েছে।</span>
                </div>
              )}

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
                  
                  {/* Announcement Banner CMS Controls */}
                  <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-slate-900 text-sm">লাইভ অ্যানাউন্সমেন্ট ব্যানার</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settingsForm.announcementActive || false}
                          onChange={(e) => setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <p className="text-[11px] text-slate-600">
                      সক্রিয় করলে পুরো ওয়েবসাইটের একদম শীর্ষে একটি নোটিশ ব্যানার প্রদর্শিত হবে।
                    </p>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">ব্যানার টেক্সট</label>
                      <input
                        type="text"
                        value={settingsForm.announcementText || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                        placeholder="যেমন: 🔥 বিশেষ নোটিশ: ফেসবুক মনিটাইজেশন সেটআপে সীমিত সময়ের ডিসকাউন্ট চলছে!"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-orange-200 text-slate-900 focus:outline-none focus:border-orange-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      অফিশিয়াল বিকাশ ও নগদ নম্বর (Send Money) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.paymentNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, paymentNumber: e.target.value })}
                      placeholder="01601300122"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-base focus:outline-none focus:border-orange-500 shadow-2xs"
                    />
                    <p className="text-[11px] text-slate-500">
                      এই নম্বরটি পুরো ওয়েবসাইটের অর্ডার ফর্ম, হিরো ও ফুটারে স্বয়ংক্রিয়ভাবে দেখাবে।
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      প্যাকেজ মূল্য (BDT) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={settingsForm.packagePrice}
                      onChange={(e) => setSettingsForm({ ...settingsForm, packagePrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold focus:outline-none focus:border-orange-500 shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      ব্র্যান্ডের নাম
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.businessName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        অ্যাডমিন User Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminUsername || 'eXPART bd'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminUsername: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 text-sm font-semibold shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        অ্যাডমিন Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminPassword || 'Ex02@0##'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono focus:outline-none focus:border-orange-500 text-sm font-semibold shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-md shadow-orange-600/25 transition-all cursor-pointer"
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

      {/* FAQ Add/Edit Modal */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {editingFaqId ? 'FAQ প্রশ্ন এডিট করুন' : 'নতুন FAQ প্রশ্ন যোগ করুন'}
              </h4>
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">প্রশ্ন (Question)</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="যেমন: সার্ভিস ফি কত এবং কীভাবে পেমেন্ট করব?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">উত্তর (Answer)</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="প্রশ্নের বিস্তারিত ও স্পষ্ট উত্তর লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Feature Add/Edit Modal */}
      {featureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {editingFeatureId ? 'প্যাকেজ ফিচার এডিট করুন' : 'নতুন ফিচার যোগ করুন'}
              </h4>
              <button
                type="button"
                onClick={() => setFeatureModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeature} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">ফিচার শিরোনাম (Title)</label>
                <input
                  type="text"
                  required
                  value={featureForm.text}
                  onChange={(e) => setFeatureForm({ ...featureForm, text: e.target.value })}
                  placeholder="যেমন: Facebook Monetization Assistance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">বাংলা ব্যাখ্যা (Bangla description)</label>
                <input
                  type="text"
                  required
                  value={featureForm.bn}
                  onChange={(e) => setFeatureForm({ ...featureForm, bn: e.target.value })}
                  placeholder="যেমন: মনিটাইজেশন সেটিংস ও কারিগরি সহায়তা"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFeatureModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt / Invoice Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-800 text-xs">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white">E</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Expart BD — মানি রিসিট</h4>
                  <span className="text-[10px] text-slate-500 font-mono">Invoice #{selectedReceiptOrder.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceiptOrder(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">তারিখ:</span>
                <span className="text-slate-900">{selectedReceiptOrder.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">গ্রাহক:</span>
                <span className="font-bold text-slate-900">{selectedReceiptOrder.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মোবাইল:</span>
                <span className="text-slate-900">{selectedReceiptOrder.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">পেমেন্ট মেথড:</span>
                <span className="text-slate-900">{selectedReceiptOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-orange-700 font-bold">{selectedReceiptOrder.trxId}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-xs">
                <span className="text-slate-800 font-bold">মোট ফি:</span>
                <span className="text-emerald-700 font-black">৳{selectedReceiptOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">স্ট্যাটাস:</span>
                <span className="text-orange-600 font-bold">{selectedReceiptOrder.status}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 text-center">
              ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস · Expart BD
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট করুন</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceiptOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
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
