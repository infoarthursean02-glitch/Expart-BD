import React, { useState, useEffect } from 'react';
import { 
  X, 
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
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { OrderRecord, OrderStatus } from '../types';
import { getOrders, updateOrderStatus, deleteOrder } from '../utils/orderStorage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const loadData = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOrderChange = () => {
      loadData();
    };
    window.addEventListener('expart_order_changed', handleOrderChange);
    return () => window.removeEventListener('expart_order_changed', handleOrderChange);
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
      setPin('');
    } else {
      setPinError(true);
    }
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

  const handleSaveNote = (id: string) => {
    updateOrderStatus(id, orders.find((o) => o.id === id)?.status || 'checking', noteText);
    setEditingNoteId(null);
    setNoteText('');
    loadData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই অর্ডারটি মুছে ফেলতে চান?')) {
      deleteOrder(id);
      loadData();
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phoneNumber.includes(searchQuery) ||
      order.trxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const countChecking = orders.filter((o) => o.status === 'checking').length;
  const countVerified = orders.filter((o) => o.status === 'verified').length;
  const countInProgress = orders.filter((o) => o.status === 'in_progress').length;
  const countCompleted = orders.filter((o) => o.status === 'completed').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'rejected')
    .reduce((sum, ord) => sum + (ord.amount || 2999), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#12091c] border border-orange-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-orange-500/20 bg-[#190d26]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/30">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Expart BD — অ্যাডমিন ম্যানেজমেন্ট প্যানেল
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Live System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                গ্রাহকদের বিকাশ ও নগদ পেমেন্ট TrxID ভেরিফিকেশন ও অর্ডার নিয়ন্ত্রণ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-xl shadow-orange-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h4 className="text-xl font-bold text-white">অ্যাডমিন প্রবেশাধিকার</h4>
              <p className="text-xs text-slate-400">
                অর্ডার ও পেমেন্ট TrxID চেক করার জন্য অ্যাডমিন পিন (PIN) প্রদান করুন। (Default PIN: <strong className="text-orange-400">1234</strong>)
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="পিন কোড লিখুন (যেমন: 1234)"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-orange-500/30 text-center text-lg tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-medium">
                  ভুল পিন কোড! অনুগ্রহ করে সঠিক পিন দিন (1234)।
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
              >
                প্যানেলে প্রবেশ করুন
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Panel Dashboard */
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#1a0f28] border border-orange-500/20">
                <div className="text-[11px] text-slate-400 uppercase font-mono">মোট অর্ডার</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">{orders.length} টি</div>
                <div className="text-[10px] text-orange-400 mt-0.5">সব রেকর্ড</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1a0f28] border border-amber-500/30">
                <div className="text-[11px] text-amber-400 uppercase font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  অটো ভেরিফিকেশন
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">{countChecking} টি</div>
                <div className="text-[10px] text-slate-400 mt-0.5">চেক পেন্ডিং</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1a0f28] border border-blue-500/25">
                <div className="text-[11px] text-blue-400 uppercase font-mono">ভেরিফাইড ও প্রসেস</div>
                <div className="text-xl sm:text-2xl font-black text-blue-300 mt-1">{countVerified + countInProgress} টি</div>
                <div className="text-[10px] text-slate-400 mt-0.5">সার্ভিসিং চলছে</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1a0f28] border border-emerald-500/25">
                <div className="text-[11px] text-emerald-400 uppercase font-mono">সম্পন্ন হয়েছে</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{countCompleted} টি</div>
                <div className="text-[10px] text-slate-400 mt-0.5">সফল সেটআপ</div>
              </div>

              <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-3.5 rounded-2xl bg-gradient-to-br from-orange-950/40 to-rose-950/40 border border-orange-500/30">
                <div className="text-[11px] text-orange-300 uppercase font-mono">মোট সার্ভিস ভ্যালু</div>
                <div className="text-xl sm:text-2xl font-black text-orange-400 mt-1">৳{totalRevenue.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">@ ৳২,৯৯৯/প্যাকেজ</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#160c24] border border-orange-500/20">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, ফোন নম্বর, TrxID বা Order ID দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                    filterStatus === 'all'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  সব ({orders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('checking')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                    filterStatus === 'checking'
                      ? 'bg-amber-500 text-black font-semibold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  ভেরিফিকেশনে ({countChecking})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('verified')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                    filterStatus === 'verified'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  ভেরিফাইড ({countVerified})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                    filterStatus === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  সম্পন্ন ({countCompleted})
                </button>
                <button
                  type="button"
                  onClick={loadData}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 ml-1 cursor-pointer"
                  title="রিফ্রেশ করুন"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-sm text-slate-400">কোনো অর্ডার পাওয়া যায়নি।</p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#180e26] border border-orange-500/20 hover:border-orange-500/40 transition-all space-y-3.5 shadow-lg"
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/25">
                            {order.id}
                          </span>
                          <span className="text-xs text-slate-400">{order.createdAt}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs font-bold text-white">৳{order.amount}</span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          {order.status === 'checking' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                              অটোমেটিক ভেরিফিকেশন চলছে
                            </span>
                          )}
                          {order.status === 'verified' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              পেমেন্ট ভেরিফাইড
                            </span>
                          )}
                          {order.status === 'in_progress' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              সার্ভিস প্রসেসিং চলছে
                            </span>
                          )}
                          {order.status === 'completed' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              সম্পন্ন হয়েছে
                            </span>
                          )}
                          {order.status === 'rejected' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                              বাতিল করা হয়েছে
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Main Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        
                        {/* Customer Info */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">গ্রাহকের নাম ও ফোন</span>
                          <div className="font-bold text-white text-sm">{order.fullName}</div>
                          <div className="font-mono text-slate-300">{order.phoneNumber}</div>
                        </div>

                        {/* Page Link */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">ফেসবুক পেজ লিংক</span>
                          <a
                            href={order.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 truncate"
                            title={order.pageUrl}
                          >
                            <span className="truncate">{order.pageUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>

                        {/* Payment & TrxID */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-orange-500/25 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono text-slate-400">পেমেন্ট মেথড</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                order.paymentMethod === 'bKash'
                                  ? 'bg-pink-600/30 text-pink-300 border border-pink-500/40'
                                  : 'bg-orange-600/30 text-orange-300 border border-orange-500/40'
                              }`}
                            >
                              {order.paymentMethod}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-0.5">
                            <div>
                              <span className="text-[10px] text-slate-400">TrxID: </span>
                              <strong className="font-mono text-amber-300 tracking-wider text-xs">
                                {order.trxId}
                              </strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyTrx(order.trxId)}
                              className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                              title="TrxID কপি করুন"
                            >
                              {copiedTrxId === order.trxId ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            প্রেরক নম্বর: {order.senderNumber}
                          </div>
                        </div>

                        {/* Customer Notes */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">নোট বা মেসেজ</span>
                          <p className="text-slate-300 line-clamp-2">
                            {order.notes || 'কোনো অতিরিক্ত নোট নেই।'}
                          </p>
                        </div>

                      </div>

                      {/* Admin Note if present */}
                      {order.adminNote && (
                        <div className="p-2 rounded-lg bg-orange-950/30 border border-orange-800/40 text-[11px] text-orange-200">
                          <strong className="text-orange-400">অ্যাডমিন নোট: </strong> {order.adminNote}
                        </div>
                      )}

                      {/* Action Bar for Admin */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 mr-1">স্ট্যাটাস পরিবর্তন:</span>
                          
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'verified')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              order.status === 'verified'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
                            }`}
                          >
                            ✓ ভেরিফাই করুন
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'in_progress')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              order.status === 'in_progress'
                                ? 'bg-purple-600 text-white'
                                : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                            }`}
                          >
                            ⚙️ প্রসেসিং শুরু
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'completed')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              order.status === 'completed'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30'
                            }`}
                          >
                            🎉 সম্পন্ন
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'rejected')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              order.status === 'rejected'
                                ? 'bg-rose-600 text-white'
                                : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30'
                            }`}
                          >
                            বাতিল
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteId(editingNoteId === order.id ? null : order.id);
                              setNoteText(order.adminNote || '');
                            }}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 cursor-pointer"
                          >
                            {order.adminNote ? 'নোট সম্পাদনা' : '+ নোট যুক্ত করুন'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
                            title="অর্ডার ডিলিট করুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Edit Note Input Drawer */}
                      {editingNoteId === order.id && (
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="অ্যাডমিন নোট লিখুন (যেমন: পেজ অডিট শেষ, পেমেন্ট কনফার্ম)..."
                            className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveNote(order.id)}
                            className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold cursor-pointer"
                          >
                            সংরক্ষণ
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                          >
                            বাতিল
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
