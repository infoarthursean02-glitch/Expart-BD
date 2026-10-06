import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Smartphone, 
  Copy, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  AlertCircle,
  Eye,
  MapPin,
  ExternalLink,
  X,
  Globe
} from 'lucide-react';
import { OrderRecord, PaymentMethod, AdminSettings } from '../types';
import { saveOrder, getSettings } from '../utils/orderStorage';
import { captureClientLocation } from '../utils/clientLocation';
import { ExpartBDLogo } from './ExpartBDLogo';

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
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  React.useEffect(() => {
    const handleSettings = () => setSettings(getSettings());
    window.addEventListener('expart_settings_changed', handleSettings);
    return () => window.removeEventListener('expart_settings_changed', handleSettings);
  }, []);

  const officialNumber = settings.paymentNumber || '+8801908769186';

  const handleCopyOfficialNumber = () => {
    navigator.clipboard.writeText(officialNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const generateOrderId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `EXP-${random}`;
  };

  const generate2ExtraChars = (): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const c1 = chars.charAt(Math.floor(Math.random() * chars.length));
    const c2 = chars.charAt(Math.floor(Math.random() * chars.length));
    return `${c1}${c2}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !pageUrl || !senderNumber || !trxId) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য ও TrxID প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const timeString = `আজ, ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const extraChars = generate2ExtraChars();

    // Capture client exact location
    let locationData;
    try {
      locationData = await captureClientLocation();
    } catch (err) {
      console.error('Error capturing client location', err);
    }

    const newOrder: OrderRecord = {
      id: generateOrderId(),
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      pageUrl: pageUrl.trim(),
      paymentMethod,
      senderNumber: senderNumber.trim(),
      trxId: trxId.trim().toUpperCase(),
      extraTrxChars: extraChars,
      amount: settings.packagePrice || 2999,
      status: 'checking',
      createdAt: timeString,
      notes: notes.trim(),
      clientLocation: locationData,
    };

    saveOrder(newOrder);
    setSubmittedOrder(newOrder);
    setIsSubmitting(false);
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
    <section id="order-form" className="py-20 sm:py-24 relative overflow-hidden bg-slate-50/70 border-t border-slate-200">
      
      {/* Soft warm glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-orange-100/50 via-rose-100/40 to-amber-100/50 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <ExpartBDLogo variant="icon" iconClassName="w-4 h-4 shrink-0" />
            <span>বিকাশ ও নগদ অফিসিয়াল পেমেন্ট</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            অর্ডার ফর্ম ও TrxID সাবমিশন
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            বিকাশ অথবা নগদে ফি পরিশোধ করে প্রাপ্ত Transaction ID (TrxID) দিয়ে অর্ডার কনফার্ম করুন।
          </p>
        </div>

        {/* Main Box */}
        <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
          
          {!submittedOrder ? (
            <div className="space-y-8">
              
              {/* Step 1: Payment Instructions Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-200/80 pb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-orange-700 tracking-wider">
                      ধাপ ১: পেমেন্ট মেথড নির্বাচন করুন
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      বিকাশ বা নগদ সিলেক্ট করুন
                    </h3>
                  </div>

                  {/* Payment Method Selector Toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bKash')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        paymentMethod === 'bKash'
                          ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-pink-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                      <span>বিকাশ (bKash)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Nagad')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        paymentMethod === 'Nagad'
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                      <span>নগদ (Nagad)</span>
                    </button>
                  </div>
                </div>

                {/* Send Money Number Display */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-orange-200">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs text-slate-500 font-semibold">
                      {paymentMethod === 'bKash' ? 'বিকাশ' : 'নগদ'} পার্সোনাল নম্বর (Send Money):
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-slate-900">
                      {officialNumber.startsWith('+88') ? officialNumber : `+88${officialNumber}`}
                    </div>
                    <div className="text-xs text-slate-500">
                      প্যাকেজ ফি: <strong className="text-orange-600">৳{settings.packagePrice || 2999} টাকা</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyOfficialNumber}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                  >
                    {copiedNumber ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">নম্বর কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>নম্বর কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-orange-100 space-y-1">
                  <p className="font-semibold text-slate-800">
                    📌 কীভাবে টাকা পাঠাবেন:
                  </p>
                  <p>
                    আপনার {paymentMethod === 'bKash' ? 'bKash' : 'Nagad'} অ্যাপ থেকে <strong>Send Money</strong> অপশনে যান। উপরের নম্বরে <strong>৳{settings.packagePrice || 2999}</strong> পাঠান। পেমেন্ট সফল হওয়ার পর স্ক্রিনে আসা <strong>Transaction ID (TrxID)</strong> কপি করে নিচের ফর্মে বসিয়ে দিন।
                  </p>
                </div>
              </div>

              {/* Step 2: Form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">
                    ধাপ ২: আপনার ও পেজের তথ্য প্রদান করুন
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: মোঃ সাকিব আহমেদ"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      যোগাযোগের মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                    />
                  </div>

                </div>

                {/* Facebook Page URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    ফেসবুক পেজ বা প্রোফাইল লিংক <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    placeholder="https://facebook.com/yourpagename"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                  />
                  <p className="text-[11px] text-slate-500">
                    যে ফেসবুক পেজের জন্য মনিটাইজেশন সার্ভিস নিতে চান তার পূর্ণ লিংক দিন।
                  </p>
                </div>

                {/* Sender Phone & TrxID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  
                  {/* Sender Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      যে নম্বর থেকে টাকা পাঠিয়েছেন <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="প্রেরক বিকাশ/নগদ নম্বর"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                    />
                  </div>

                  {/* Transaction ID (TrxID) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block flex items-center justify-between">
                      <span>Transaction ID (TrxID) <span className="text-rose-500">*</span></span>
                      <span className="text-[11px] text-orange-600 font-normal">মেসেজ বা অ্যাপে পাবেন</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="যেমন: BK9A7X3L01 বা NG84FD9902"
                      className="w-full px-4 py-3 rounded-xl bg-orange-50/40 border border-orange-300 text-slate-900 font-mono font-bold uppercase placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm shadow-xs"
                    />
                  </div>

                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-600/25 hover:shadow-orange-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        <span>অর্ডার প্রসেস হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>অর্ডার সম্পন্ন করুন ও TrxID সাবমিট করুন (৳{settings.packagePrice || 2999})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Safety Guarantee */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>TrxID দেওয়ার পর স্বয়ংক্রিয়ভাবে অ্যাডমিন সিস্টেমে ভেরিফিকেশন শুরু হবে</span>
                </div>

              </form>

            </div>
          ) : (
            /* Automatic Verification Tracking Screen */
            <div className="text-center py-6 sm:py-8 space-y-6 animate-fadeIn">
              
              {/* Radar Live Indicator */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-600/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  অর্ডার সফলভাবে জমা হয়েছে
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  অটোমেটিক ভেরিফিকেশন চলছে...
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  আপনার প্রদত্ত <strong className="text-slate-900">{submittedOrder.paymentMethod}</strong> TrxID টি আমাদের সিস্টেমে সফলভাবে রিসিভ হয়েছে।
                </p>
              </div>

              {/* Order Summary Details */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-2.5 shadow-xs">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">অর্ডার নম্বর:</span>
                  <span className="font-mono font-bold text-orange-600">{submittedOrder.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">গ্রাহকের নাম:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{submittedOrder.fullName}</span>
                    <button
                      type="button"
                      onClick={() => setShowDetailsModal(true)}
                      className="px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                      title="অর্ডারের সকল বিস্তারিত ও লাইভ লোকেশন দেখুন"
                    >
                      <Eye className="w-3.5 h-3.5 text-orange-600" />
                      <span>বিস্তারিত ও লোকেশন</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">পেমেন্ট মেথড:</span>
                  <span className="font-semibold text-orange-600">{submittedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Transaction ID (TrxID):</span>
                  <span className="font-mono font-bold text-slate-900">
                    {submittedOrder.trxId}{submittedOrder.extraTrxChars || '9A'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">প্রেরক নম্বর:</span>
                  <span className="font-mono text-slate-900">{submittedOrder.senderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">লাইভ ভেরিফিকেশন স্ট্যাটাস:</span>
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Checking by Admin
                  </span>
                </div>
              </div>

              {/* Notice for Customer */}
              <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 max-w-lg mx-auto text-xs text-slate-700 leading-relaxed text-left">
                <p className="font-semibold text-orange-700 mb-1">
                  পরবর্তী ধাপ:
                </p>
                <p>
                  আপনার প্রদানকৃত TrxID টি আমাদের অ্যাডমিন প্যানেলে রিসিভ হয়েছে। এক্সপার্ট বিডি অ্যাডমিন টিম পেমেন্ট কনফার্ম করে দ্রুত আপনার দেওয়া নম্বরে যোগাযোগ করবে এবং আপনার ফেসবুক পেজের মনিটাইজেশন কাজ শুরু করবে।
                </p>
              </div>

              {/* Actions */}
              <div className="max-w-md mx-auto flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/20 hover:scale-[1.02] transition-transform"
                >
                  <Eye className="w-4 h-4" />
                  <span>সকল বিস্তারিত ও ক্লায়েন্ট লোকেশন</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-200 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  <span>নতুন অর্ডার</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Customer Details & Exact Location Modal */}
      {showDetailsModal && submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    অর্ডার বিবরণী ও লাইভ লোকেশন
                  </h3>
                  <p className="text-xs text-white/80 font-mono">
                    Order ID: {submittedOrder.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              
              {/* Client & Page Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider block">
                  গ্রাহক ও ফেসবুক পেজের তথ্য
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">গ্রাহকের নাম:</span>
                    <strong className="text-slate-900">{submittedOrder.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">যোগাযোগ নম্বর:</span>
                    <strong className="text-slate-900 font-mono">{submittedOrder.phoneNumber}</strong>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">ফেসবুক পেজ লিংক:</span>
                  <a
                    href={submittedOrder.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline font-semibold flex items-center gap-1 break-all"
                  >
                    <span>{submittedOrder.pageUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Payment & TrxID Info */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider block">
                  পেমেন্ট ও Transaction ID (TrxID)
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">পেমেন্ট মেথড:</span>
                    <strong className="text-slate-900">{submittedOrder.paymentMethod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">প্রেরক নম্বর:</span>
                    <strong className="text-slate-900 font-mono">{submittedOrder.senderNumber}</strong>
                  </div>
                </div>
                <div className="pt-1 border-t border-orange-200/60 flex items-center justify-between">
                  <span className="text-slate-600">TrxID (অতিরিক্ত ক্যারেক্টারসহ):</span>
                  <span className="font-mono font-black text-sm text-orange-700 bg-white px-2 py-0.5 rounded border border-orange-300">
                    {submittedOrder.trxId}{submittedOrder.extraTrxChars || '9A'}
                  </span>
                </div>
              </div>

              {/* Client Exact Location Section */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>ক্লায়েন্টের সঠিক লোকেশন (Exact Location)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {submittedOrder.clientLocation?.source === 'gps' ? 'GPS নির্ভুল লোকেশন' : 'আইপি ও নেটওয়ার্ক লোকেশন'}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">শহর ও অঞ্চল:</span>
                    <strong className="text-slate-900">
                      {submittedOrder.clientLocation?.formattedAddress ||
                        `${submittedOrder.clientLocation?.city || 'Dhaka'}, ${submittedOrder.clientLocation?.country || 'Bangladesh'}`}
                    </strong>
                  </div>

                  {submittedOrder.clientLocation?.latitude && submittedOrder.clientLocation?.longitude && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">সঠিক স্থানাঙ্ক (Coordinates):</span>
                      <span className="font-mono font-semibold text-slate-800">
                        {submittedOrder.clientLocation.latitude.toFixed(4)}° N, {submittedOrder.clientLocation.longitude.toFixed(4)}° E
                      </span>
                    </div>
                  )}

                  {submittedOrder.clientLocation?.ip && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">ক্লায়েন্ট আইপি (IP Address):</span>
                      <span className="font-mono text-slate-700 font-semibold">{submittedOrder.clientLocation.ip}</span>
                    </div>
                  )}

                  {submittedOrder.clientLocation?.device && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">ডিভাইস ও ব্রাউজার:</span>
                      <span className="text-slate-700">
                        {submittedOrder.clientLocation.device} ({submittedOrder.clientLocation.os}) · {submittedOrder.clientLocation.browser}
                      </span>
                    </div>
                  )}
                </div>

                {submittedOrder.clientLocation?.mapsUrl && (
                  <div className="pt-2">
                    <a
                      href={submittedOrder.clientLocation.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>গুগল ম্যাপে লাইভ অবস্থান দেখুন (Google Maps)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
