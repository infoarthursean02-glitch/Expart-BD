import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Sparkles, CreditCard } from 'lucide-react';
import { CreatorDashboardPreview } from './CreatorDashboardPreview';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const scrollToPackage = () => {
    document.getElementById('package')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0b0714]">
      
      {/* Sunset Blaze Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-orange-600/20 via-rose-600/15 to-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-rose-600/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-orange-500/12 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>প্রফেশনাল ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.2]">
                আপনার ফেসবুক কনটেন্টকে আয়ের সুযোগে রূপান্তর করুন{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500">
                  (Expart BD)
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-orange-200/90 font-bold">
                Facebook Content Monetization Service
              </p>
            </div>

            {/* Bangla Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              আপনার Facebook Content Monetization শুরু করার জন্য প্রয়োজনীয় সার্ভিস এখন এক প্যাকেজে। বিকাশ ও নগদ পেমেন্ট করে TrxID দিন এবং স্বয়ংক্রিয় ভেরিফিকেশনে সার্ভিস গ্রহণ করুন।
            </p>

            {/* Price Highlight Banner */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="p-3.5 sm:px-5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#210f36] to-[#160b24] border border-orange-500/40 shadow-inner flex items-baseline gap-3">
                <span className="text-xs uppercase tracking-wider text-orange-300/80 font-semibold">
                  প্যাকেজ মূল্য:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                  মাত্র ৳২,৯৯৯
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  (এককালীন সার্ভিস ফি)
                </span>
              </div>

              {/* bKash & Nagad Badge */}
              <div className="px-3.5 py-2.5 rounded-2xl bg-[#1a0f28] border border-white/10 flex items-center gap-2 text-xs">
                <CreditCard className="w-4 h-4 text-orange-400" />
                <span className="text-slate-300">বিকাশ ও নগদ: </span>
                <span className="font-mono font-bold text-amber-300">01601300122</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>অর্ডার করুন ও TrxID দিন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToPackage}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1b0e2d] hover:bg-[#25133d] text-orange-300 font-bold text-sm sm:text-base border border-orange-500/35 hover:border-orange-500/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>প্যাকেজ বিবরণী দেখুন</span>
              </button>
            </div>

            {/* Highlights */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>ক্রিয়েটরদের জন্য বিশেষ গাইডলাইন</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>মেটা পলিসি অনুবর্তী সহায়তা</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>স্বয়ংক্রিয় TrxID ভেরিফিকেশন</span>
              </div>
            </div>

          </div>

          {/* Right Column Visual */}
          <div className="lg:col-span-6 xl:col-span-5">
            <CreatorDashboardPreview />
          </div>

        </div>
      </div>
    </section>
  );
};
