import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Business Identity */}
          <div className="space-y-4">
            <ExpartBDLogo variant="full" theme="dark" iconClassName="w-11 h-11" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Expart BD শুধুমাত্র ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস প্রদানকারী একটি নির্ভরযোগ্য প্ল্যাটফর্ম। ভিডিও ক্রিয়েটর, পেজ ওনার ও ব্র্যান্ডদের প্রফেশনাল সেটআপ ও মেটা পলিসি গাইডেন্স দেওয়াই আমাদের লক্ষ্য।
            </p>
            <div className="text-xs text-orange-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              প্যাকেজ ফি: মাত্র ৳২,৯৯৯ (এককালীন)
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              দ্রুত লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-orange-400 transition-colors">হোমপেজ</a>
              </li>
              <li>
                <a href="#package" className="hover:text-orange-400 transition-colors">প্যাকেজ ও ফি (৳২,৯৯৯)</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-orange-400 transition-colors">যেভাবে কাজ করে</a>
              </li>
              <li>
                <a href="#creators" className="hover:text-orange-400 transition-colors">ক্রিয়েটরদের জন্য</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Payment & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              পেমেন্ট তথ্য
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 shadow-inner">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">বিকাশ ও নগদ পার্সোনাল নম্বর (Send Money)</span>
                <span className="font-mono text-base font-bold text-white block">+8801908769186</span>
                <span className="text-[11px] text-slate-400">০১৯০৮-৭৬৯১৮৬ (পার্সোনাল)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px]">নিরাপদ বাংলাদেশি পেমেন্ট ট্র্যাকিং</span>
              </div>
            </div>
          </div>

          {/* Column 4: Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              প্ল্যাটফর্ম নোটিশ
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
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
            <span className="text-slate-400">বিকাশ/নগদ (পার্সোনাল): +8801908769186</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-400">প্যাকেজ: ৳২,৯৯৯</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors ml-2 cursor-pointer border border-slate-800 shadow-sm"
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
