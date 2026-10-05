import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { getPackageFeatures, getSettings } from '../utils/orderStorage';
import { PackageFeatureItem, AdminSettings } from '../types';

interface PricingPackageProps {
  onOrderClick: () => void;
}

export const PricingPackage: React.FC<PricingPackageProps> = ({ onOrderClick }) => {
  const [features, setFeatures] = useState<PackageFeatureItem[]>(getPackageFeatures());
  const [settings, setSettings] = useState<AdminSettings>(getSettings());

  useEffect(() => {
    const handleFeatures = () => setFeatures(getPackageFeatures());
    const handleSettings = () => setSettings(getSettings());

    window.addEventListener('expart_features_changed', handleFeatures);
    window.addEventListener('expart_settings_changed', handleSettings);
    return () => {
      window.removeEventListener('expart_features_changed', handleFeatures);
      window.removeEventListener('expart_settings_changed', handleSettings);
    };
  }, []);

  const packageFeatures = features;

  return (
    <section id="package" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-orange-50/25 to-white">
      
      {/* Soft warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-orange-200/40 via-rose-100/30 to-amber-100/40 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>স্বচ্ছ মূল্য তালিকা · কোনো লুকানো চার্জ নেই</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            স্পেশাল প্যাকেজ (Special Package)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            একটি প্যাকেজেই আপনার ফেসবুক পেজের মনিটাইজেশন শুরু করার যাবতীয় প্রয়োজনীয় সব সার্ভিস।
          </p>
        </div>

        {/* Large Pricing Card */}
        <div className="max-w-xl mx-auto relative group">
          
          {/* Sunset Blaze Soft Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700 -z-10" />

          <div className="relative rounded-3xl bg-white border border-orange-200 p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-600 font-bold block mb-1">
                  অল-ইন-ওয়ান প্যাকেজ
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Facebook Monetization Package
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
                  One Complete Service Package (সম্পূর্ণ একটি প্যাকেজ)
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold tracking-wide">
                সেরা ডিল
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-orange-50/60 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-600 font-medium">এককালীন মোট সার্ভিস ফি</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600">
                    ৳২,৯৯৯
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ সম্পূর্ণ সেটআপ</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">
                  ✓ এককালীন পেমেন্ট (কোনো মাসিক সাবস্ক্রিপশন নেই)
                </div>
              </div>

              {/* Payment details */}
              <div className="text-right sm:border-l sm:border-orange-200/80 sm:pl-4">
                <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">
                  পেমেন্ট মাধ্যম (Send Money)
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold justify-end">
                  <span className="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-700 border border-pink-200">বিকাশ</span>
                  <span className="px-2 py-0.5 rounded-lg bg-orange-100 text-orange-700 border border-orange-200">নগদ</span>
                </div>
                <div className="text-[11px] font-mono text-slate-900 font-bold mt-1">
                  01601300122
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600">
                প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
              </div>
              <ul className="space-y-3.5">
                {packageFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">{item.text}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{item.bn}</span>
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/25 hover:shadow-orange-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Now (এখনই অর্ডার করুন)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Limited Availability Note */}
            <div className="text-center pt-2 border-t border-slate-100 space-y-1">
              <p className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Limited service availability (সীমিত স্লট উপলব্ধ)
              </p>
              <p className="text-[11px] text-slate-500">
                কোয়ালিটি বজায় রেখে প্রত্যেক ক্রিয়েটরকে ব্যক্তিগতভাবে সহায়তা দিতে প্রতি ব্যাচে সীমিত অর্ডার গ্রহণ করা হয়।
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
