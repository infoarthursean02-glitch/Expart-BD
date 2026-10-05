import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          
          {/* Column 1: Business Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-600/30">
                E
              </div>
              <div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                  Expart <span className="text-orange-600">BD</span>
                </span>
                <span className="block text-[11px] text-orange-600 font-semibold">
                  প্রফেশনাল ফেসবুক মনিটাইজেশন সার্ভিস
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Expart BD শুধুমাত্র ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস প্রদানকারী একটি নির্ভরযোগ্য প্ল্যাটফর্ম। ভিডিও ক্রিয়েটর, পেজ ওনার ও ব্র্যান্ডদের প্রফেশনাল সেটআপ ও মেটা পলিসি গাইডেন্স দেওয়াই আমাদের লক্ষ্য।
            </p>
            <div className="text-xs text-orange-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              প্যাকেজ ফি: মাত্র ৳২,৯৯৯ (এককালীন)
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              দ্রুত লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-orange-600 transition-colors">হোমপেজ</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-orange-600 transition-colors">কেন Expart BD</a>
              </li>
              <li>
                <a href="#whats-included" className="hover:text-orange-600 transition-colors">সার্ভিস তালিকা</a>
              </li>
              <li>
                <a href="#package" className="hover:text-orange-600 transition-colors">প্যাকেজ ও ফি (৳২,৯৯৯)</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-orange-600 transition-colors">যেভাবে কাজ করে</a>
              </li>
              <li>
                <a href="#creators" className="hover:text-orange-600 transition-colors">ক্রিয়েটরদের জন্য</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-600 transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Payment & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              পেমেন্ট তথ্য
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">বিকাশ ও নগদ নম্বর (Send Money)</span>
                <span className="font-mono text-base font-bold text-slate-900 block">+8801601300122</span>
                <span className="text-[11px] text-slate-500">০১৬০১-৩০০১২২</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px]">নিরাপদ বাংলাদেশি পেমেন্ট ট্র্যাকিং</span>
              </div>
            </div>
          </div>

          {/* Column 4: Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              প্ল্যাটফর্ম নোটিশ
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Expart BD একটি স্বাধীন ডিজিটাল সার্ভিস ও কনসালট্যান্সি এজেন্সি। Facebook ও Meta হলো Meta Platforms, Inc.-এর রেজিস্টার্ড ট্রেডমার্ক। আমরা মেটা কোম্পানির অফিশিয়াল কোনো প্রতিনিধি নই। মনিটাইজেশন সংক্রান্ত সকল চূড়ান্ত সিদ্ধান্ত মেটা কর্তৃপক্ষের নিয়মাবলির উপর নির্ভরশীল।
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Expart BD. সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-600">বিকাশ/নগদ: 01601300122</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">প্যাকেজ: ৳২,৯৯৯</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors ml-2 cursor-pointer border border-slate-200 shadow-xs"
              title="উপরে যান"
              aria-label="উপরে যান"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
