import React from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const scrollToPackage = () => {
    document.getElementById('package')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white">
      
      {/* Sunset Blaze Soft Warm Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-orange-100/60 via-rose-100/40 to-amber-100/50 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-rose-100/40 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-orange-100/40 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(249, 115, 22, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Trust Badge (Hidden on mobile per user request) */}
        <div className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold tracking-wide mx-auto">
          <ExpartBDLogo variant="icon" iconClassName="w-4 h-4 shrink-0" />
          <span>Expart BD · অফিশিয়াল ফেসবুক মনিটাইজেশন সেটআপ</span>
        </div>

        {/* Headline */}
        <div>
          <h1 className="font-heading text-3xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
            প্রফেশনাল ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস
          </h1>
        </div>

        {/* Price Highlight Banner */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <div className="p-3.5 sm:px-5 sm:py-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 shadow-sm flex items-baseline gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
              প্যাকেজ মূল্য:
            </span>
            <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600">
              মাত্র ৳২,৯৯৯
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (এককালীন সার্ভিস ফি)
            </span>
          </div>

          {/* bKash & Nagad Badge (Hidden on mobile per user request) */}
          <div className="hidden md:flex px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 items-center gap-2 text-xs">
            <CreditCard className="w-4 h-4 text-orange-600" />
            <span className="text-slate-700 font-semibold">পেমেন্ট মাধ্যম: </span>
            <span className="font-bold text-slate-900">বিকাশ ও নগদ (Send Money)</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/25 hover:shadow-orange-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>অর্ডার করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={scrollToPackage}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>প্যাকেজ বিবরণী দেখুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
