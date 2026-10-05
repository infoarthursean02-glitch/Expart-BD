import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';

interface FinalCtaProps {
  onOrderClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOrderClick }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#1a0f2e] text-white border-t border-slate-800">
      {/* Dynamic Ambient Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-orange-600/20 via-rose-600/15 to-purple-600/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-14 text-center space-y-8 shadow-2xl backdrop-blur-md">
          
          {/* Badge with official ExpartBD Logo */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider shadow-inner">
            <ExpartBDLogo variant="icon" iconClassName="w-4 h-4 shrink-0" />
            <span>Expart BD · বিশ্বস্ত ফেসবুক মনিটাইজেশন পার্টনার</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              আপনার ফেসবুক মনিটাইজেশন যাত্রা শুরু করতে প্রস্তুত?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Expart BD-এর প্রফেশনাল ফেসবুক মনিটাইজেশন প্যাকেজের মাধ্যমে আজই আপনার পেজ প্রস্তুত করুন।
            </p>
            <p className="text-xs sm:text-sm text-amber-400 font-semibold">
              বিকাশ ও নগদ পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই স্বয়ংক্রিয় ভেরিফিকেশন শুরু হবে।
            </p>
          </div>

          {/* Price Box */}
          <div className="inline-block p-4 sm:px-8 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold mb-1">
              সম্পূর্ণ প্যাকেজ এককালীন ফি
            </span>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400">
              মাত্র ৳২,৯৯৯
            </span>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={onOrderClick}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>এখনই অর্ডার করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Safety Reassurance */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>নিরাপদ বিকাশ ও নগদ পেমেন্ট</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>১০০% পলিসি অনুবর্তী কারিগরি সহায়তা</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
