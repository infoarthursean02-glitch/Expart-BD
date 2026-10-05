import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

interface PricingPackageProps {
  onOrderClick: () => void;
}

export const PricingPackage: React.FC<PricingPackageProps> = ({ onOrderClick }) => {
  const packageFeatures = [
    { text: 'Facebook Monetization Assistance', bn: 'মনিটাইজেশন সেটিংস ও কারিগরি সহায়তা' },
    { text: 'Professional Support', bn: 'অভিজ্ঞ এক্সপার্টদের সার্বক্ষণিক দিকনির্দেশনা' },
    { text: 'Creator-focused Guidance', bn: 'ভিডিও ও রিলস কনটেন্ট নির্মাতাদের জন্য বিশেষ গাইডলাইন' },
    { text: 'Order Support', bn: 'অর্ডারের শুরু থেকে শেষ পর্যন্ত নিয়মিত ট্র্যাকিং' },
    { text: 'Page Eligibility Audit', bn: 'পেজ এলিজিবিলিটি ও পলিসি ভায়োলেশন চেকিং' },
    { text: 'Payout & Tax Setup Guidance', bn: 'ব্যাংক তথ্য ও পেআউট কনফিগারেশন সংক্রান্ত সাহায্য' },
  ];

  return (
    <section id="package" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#0e0818] via-[#160c24] to-[#0e0818]">
      
      {/* Sunset Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-orange-600/15 via-rose-600/15 to-amber-500/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>স্বচ্ছ মূল্য তালিকা · কোনো লুকানো চার্জ নেই</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            স্পেশাল প্যাকেজ (Special Package)
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            একটি প্যাকেজেই আপনার ফেসবুক পেজের মনিটাইজেশন শুরু করার যাবতীয় প্রয়োজনীয় সব সার্ভিস।
          </p>
        </div>

        {/* Large Pricing Card */}
        <div className="max-w-xl mx-auto relative group">
          
          {/* Sunset Blaze Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 -z-10" />

          <div className="relative rounded-3xl bg-[#140b22]/95 border border-orange-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-400 font-bold block mb-1">
                  অল-ইন-ওয়ান প্যাকেজ
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Facebook Monetization Package
                </h3>
                <p className="text-xs sm:text-sm text-orange-200/90 mt-1 font-semibold">
                  One Complete Service Package (সম্পূর্ণ একটি প্যাকেজ)
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold tracking-wide">
                সেরা ডিল
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-black/60 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-medium">এককালীন মোট সার্ভিস ফি</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                    ৳২,৯৯৯
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ সম্পূর্ণ সেটআপ</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1">
                  ✓ এককালীন পেমেন্ট (কোনো মাসিক সাবস্ক্রিপশন নেই)
                </div>
              </div>

              {/* Payment details */}
              <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                  পেমেন্ট মাধ্যম (Send Money)
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="px-2 py-0.5 rounded-lg bg-pink-600/25 text-pink-300 border border-pink-500/40">বিকাশ</span>
                  <span className="px-2 py-0.5 rounded-lg bg-orange-600/25 text-orange-300 border border-orange-500/40">নগদ</span>
                </div>
                <div className="text-[11px] font-mono text-amber-300 font-bold mt-1">
                  01601300122
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
                প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
              </div>
              <ul className="space-y-3.5">
                {packageFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="font-bold text-white">{item.text}</span>
                      <span className="block text-xs text-slate-400 mt-0.5">{item.bn}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onOrderClick}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Now (এখনই অর্ডার করুন)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Limited Availability Note */}
            <div className="text-center pt-2 border-t border-white/5 space-y-1">
              <p className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Limited service availability (সীমিত স্লট উপলব্ধ)
              </p>
              <p className="text-[11px] text-slate-400">
                কোয়ালিটি বজায় রেখে প্রত্যেক ক্রিয়েটরকে ব্যক্তিগতভাবে সহায়তা দিতে প্রতি ব্যাচে সীমিত অর্ডার গ্রহণ করা হয়।
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
