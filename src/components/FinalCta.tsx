import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCtaProps {
  onOrderClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOrderClick }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0a0612]">
      {/* Sunset Radiance */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/25 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-orange-600/18 via-rose-600/15 to-amber-500/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#180e28]/95 to-[#10071c]/95 border border-orange-500/35 p-8 sm:p-14 text-center space-y-8 shadow-2xl backdrop-blur-xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Expart BD · বিশ্বস্ত ফেসবুক মনিটাইজেশন পার্টনার</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              আপনার ফেসবুক মনিটাইজেশন যাত্রা শুরু করতে প্রস্তুত?
            </h2>
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Expart BD-এর প্রফেশনাল ফেসবুক মনিটাইজেশন প্যাকেজের মাধ্যমে আজই আপনার পেজ প্রস্তুত করুন।
            </p>
            <p className="text-sm sm:text-base text-orange-300/90 font-semibold">
              বিকাশ ও নগদ পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই স্বয়ংক্রিয় ভেরিফিকেশন শুরু হবে।
            </p>
          </div>

          {/* Price Box */}
          <div className="inline-block p-4 sm:px-8 sm:py-4 rounded-2xl bg-black/60 border border-orange-500/30 shadow-inner">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
              সম্পূর্ণ প্যাকেজ এককালীন ফি
            </span>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
              মাত্র ৳২,৯৯৯
            </span>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={onOrderClick}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>এখনই অর্ডার করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Safety Reassurance */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>নিরাপদ পেমেন্ট ট্র্যাকিং · সার্বক্ষণিক কাস্টমার সাপোর্ট · কোনো পাসওয়ার্ড চাওয়া হয় না</span>
          </div>

        </div>
      </div>
    </section>
  );
};
