import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Smartphone, 
  CreditCard,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { OrderRecord, PaymentMethod, AdminSettings } from '../types';
import { saveOrder, getSettings } from '../utils/orderStorage';

interface OrderFormProps {}

export const OrderForm: React.FC<OrderFormProps> = () => {
  const [settings, setSettings] = useState<AdminSettings>(getSettings());
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bKash');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [notes, setNotes] = useState('');

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);

  React.useEffect(() => {
    const handleSettings = () => setSettings(getSettings());
    window.addEventListener('expart_settings_changed', handleSettings);
    return () => window.removeEventListener('expart_settings_changed', handleSettings);
  }, []);

  const officialNumber = settings.paymentNumber || '01601300122';

  const handleCopyOfficialNumber = () => {
    navigator.clipboard.writeText(officialNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const generateOrderId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `EXP-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !pageUrl || !senderNumber || !trxId) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য ও TrxID প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const timeString = `আজ, ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: OrderRecord = {
      id: generateOrderId(),
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      pageUrl: pageUrl.trim(),
      paymentMethod,
      senderNumber: senderNumber.trim(),
      trxId: trxId.trim().toUpperCase(),
      amount: 2999,
      status: 'checking', // Automatic verification in progress
      createdAt: timeString,
      notes: notes.trim(),
    };

    setTimeout(() => {
      // Save order to localStorage for admin panel
      saveOrder(newOrder);
      setSubmittedOrder(newOrder);
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedOrder(null);
    setFullName('');
    setPhoneNumber('');
    setPageUrl('');
    setSenderNumber('');
    setTrxId('');
    setNotes('');
  };

  return (
    <section id="order-form" className="py-20 sm:py-28 relative overflow-hidden bg-[#0c0814]">
      
      {/* Sunset Blaze Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-600/15 via-rose-600/10 to-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>সরাসরি পেমেন্ট ও অর্ডার ভেরিফিকেশন</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            অর্ডার ফর্ম ও পেমেন্ট তথ্য
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            বিকাশ অথবা নগদ এর মাধ্যমে পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই স্বয়ংক্রিয় ভেরিফিকেশন শুরু হবে।
          </p>
        </div>

        {/* Order Card Container */}
        <div className="relative rounded-3xl bg-[#140b22]/90 border border-orange-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          {!submittedOrder ? (
            <div>
              {/* Package Summary Bar */}
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#1d0e30] border border-orange-500/25 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-rose-600 flex items-center justify-center text-white font-black shadow-md shadow-orange-600/30 text-lg">
                    E
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      ফেসবুক কনটেন্ট মনিটাইজেশন প্যাকেজ
                    </h3>
                    <p className="text-xs text-orange-300/80">
                      Expart BD · সম্পূর্ণ প্রফেশনাল সেটআপ ও গাইডেন্স
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">এককালীন মোট ফি</span>
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                    ৳২,৯৯৯
                  </span>
                </div>
              </div>

              {/* Payment Method Selector Box */}
              <div className="mb-8 space-y-4">
                <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
                  ১. পেমেন্ট মেথড নির্বাচন করুন (Select Payment Method) <span className="text-rose-400">*</span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {/* bKash Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bKash')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'bKash'
                        ? 'bg-pink-950/40 border-pink-500 shadow-lg shadow-pink-500/20'
                        : 'bg-[#180e28] border-white/10 hover:border-pink-500/40 opacity-75'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-600 text-white font-extrabold flex items-center justify-center shadow-md">
                      bK
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-white text-sm block">বিকাশ (bKash)</span>
                      <span className="text-[11px] text-pink-300 font-medium">Send Money</span>
                    </div>
                  </button>

                  {/* Nagad Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Nagad')}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'Nagad'
                        ? 'bg-orange-950/40 border-orange-500 shadow-lg shadow-orange-500/20'
                        : 'bg-[#180e28] border-white/10 hover:border-orange-500/40 opacity-75'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-extrabold flex items-center justify-center shadow-md">
                      NG
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-white text-sm block">নগদ (Nagad)</span>
                      <span className="text-[11px] text-orange-300 font-medium">Send Money</span>
                    </div>
                  </button>
                </div>

                {/* Payment Instructions & Number Display Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/50 via-[#231238] to-rose-950/40 border border-orange-500/35 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-orange-400" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {paymentMethod === 'bKash' ? 'বিকাশ' : 'নগদ'} পেমেন্ট নম্বর:
                      </span>
                    </div>

                    {/* Copyable Official Number */}
                    <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-xl border border-orange-500/40">
                      <span className="font-mono text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                        +88{officialNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyOfficialNumber}
                        className="p-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 transition-colors cursor-pointer"
                        title="নম্বর কপি করুন"
                      >
                        {copiedNumber ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 bg-black/30 p-3 rounded-xl border border-white/5">
                    <p className="font-semibold text-orange-300">
                      পেমেন্ট নির্দেশিকা:
                    </p>
                    <p>
                      ১. আপনার {paymentMethod === 'bKash' ? 'bKash' : 'Nagad'} অ্যাপ অথবা ডায়াল কোড ব্যবহার করে <strong>{officialNumber}</strong> নম্বরে <strong>Send Money</strong> অপশনের মাধ্যমে ঠিক <strong>৳২,৯৯৯</strong> টাকা পাঠান।
                    </p>
                    <p>
                      ২. টাকা পাঠানোর পর এসএমএস বা অ্যাপে প্রাপ্ত <strong>Transaction ID (TrxID)</strong> টি কপি করে নিচের ফর্মে বসিয়ে সাবমিট করুন।
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider pb-1">
                  ২. আপনার পেজ ও অর্ডারের তথ্য দিন (Order Information)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-200">
                      আপনার পুরো নাম <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                    />
                  </div>

                  {/* Mobile Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-200">
                      মোবাইল নম্বর <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                    />
                  </div>
                </div>

                {/* Facebook Page Link */}
                <div className="space-y-1.5">
                  <label htmlFor="pageUrl" className="block text-xs font-semibold text-slate-200">
                    ফেসবুক পেজ / প্রোফাইল লিংক <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="url"
                    id="pageUrl"
                    required
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    placeholder="https://facebook.com/yourpagename"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                  />
                  <p className="text-[11px] text-slate-400">
                    যে ফেসবুক পেজের জন্য মনিটাইজেশন সেটআপ সার্ভিস নিতে চান।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sender Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="senderNumber" className="block text-xs font-semibold text-slate-200">
                      প্রেরক {paymentMethod === 'bKash' ? 'বিকাশ' : 'নগদ'} নম্বর <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="senderNumber"
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                    />
                  </div>

                  {/* Transaction ID */}
                  <div className="space-y-1.5">
                    <label htmlFor="trxId" className="block text-xs font-semibold text-slate-200">
                      Transaction ID (TrxID) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="trxId"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="যেমন: BK9A7X3L01 বা NG84FD9902"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-orange-500/50 text-amber-300 font-mono font-bold tracking-wider placeholder-slate-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm uppercase"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label htmlFor="notes" className="block text-xs font-semibold text-slate-200">
                    অতিরিক্ত কোনো তথ্য বা মেসেজ (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="আপনার পেজ সম্পর্কে কোনো বিশেষ তথ্য থাকলে লিখুন..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                  />
                </div>

                {/* Security Reassurance */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>TrxID সাবমিট করার সাথে সাথে এটি অ্যাডমিন প্যানেলে স্বয়ংক্রিয় ভেরিফিকেশনে যুক্ত হবে।</span>
                </div>

                {/* Submit Order Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        TrxID ভেরিফিকেশনে যুক্ত হচ্ছে...
                      </span>
                    ) : (
                      <>
                        <span>অর্ডার কনফার্ম করুন (TrxID ভেরিফাই)</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Automatic Verification Screen */
            <div className="text-center py-6 sm:py-8 space-y-6">
              
              {/* Radar Status Icon */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                <span className="absolute inset-2 rounded-full bg-amber-500/30 animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-rose-600 text-white flex items-center justify-center shadow-xl shadow-orange-600/40">
                  <ShieldCheck className="w-9 h-9" />
                </div>
              </div>

              {/* Status Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  অটোমেটিক ভেরিফিকেশন চলছে...
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  ধন্যবাদ, আপনার TrxID সফলভাবে জমা হয়েছে!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  অর্ডার আইডি: <strong className="text-orange-400 font-mono text-base">{submittedOrder.id}</strong>
                </p>
              </div>

              {/* Order & Verification Details Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-orange-500/30 text-left max-w-lg mx-auto space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">সার্ভিস প্যাকেজ:</span>
                  <span className="font-semibold text-white">ফেসবুক মনিটাইজেশন (৳২,৯৯৯)</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">গ্রাহকের নাম:</span>
                  <span className="font-semibold text-white">{submittedOrder.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">মোবাইল নম্বর:</span>
                  <span className="font-mono text-slate-200">{submittedOrder.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">পেমেন্ট মেথড:</span>
                  <span className="font-semibold text-orange-400">{submittedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Transaction ID (TrxID):</span>
                  <span className="font-mono font-bold text-amber-300">{submittedOrder.trxId}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">প্রেরক নম্বর:</span>
                  <span className="font-mono text-slate-200">{submittedOrder.senderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">লাইভ ভেরিফিকেশন স্ট্যাটাস:</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Checking by Admin
                  </span>
                </div>
              </div>

              {/* Notice for Customer */}
              <div className="p-4 rounded-xl bg-orange-950/30 border border-orange-500/25 max-w-lg mx-auto text-xs text-orange-200/90 leading-relaxed text-left">
                <p className="font-semibold text-orange-300 mb-1">
                  পরবর্তী ধাপ:
                </p>
                <p>
                  আপনার প্রদানকৃত TrxID টি আমাদের অ্যাডমিন প্যানেলে রিসিভ হয়েছে। এক্সপার্ট বিডি অ্যাডমিন টিম পেমেন্ট কনফার্ম করে দ্রুত আপনার দেওয়া নম্বরে যোগাযোগ করবে এবং আপনার ফেসবুক পেজের মনিটাইজেশন কাজ শুরু করবে।
                </p>
              </div>

              {/* Actions */}
              <div className="max-w-md mx-auto flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>নতুন অর্ডার সাবমিট করুন</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
