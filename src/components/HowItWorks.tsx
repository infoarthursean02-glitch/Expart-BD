import React from 'react';
import { Send, Settings, Headset, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOrderClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOrderClick }) => {
  const steps = [
    {
      step: '০১',
      title: 'Place Your Order',
      bnTitle: 'অর্ডার ও TrxID প্রদান করুন',
      quote: 'Click Order Now and send your details.',
      description: 'বিকাশ বা নগদ নম্বরে (০১৬০১-৩০০১২২) ফি পাঠিয়ে TrxID সহ অর্ডার ফর্মটি সাবমিট করুন।',
      icon: Send,
    },
    {
      step: '০২',
      title: 'We Process Your Service',
      bnTitle: 'অটোমেটিক ভেরিফিকেশন ও প্রসেসিং',
      quote: 'Our team reviews your information and starts the service process.',
      description: 'অ্যাডমিন প্যানেলে TrxID কনফার্ম হওয়ার সাথে সাথে টিম আপনার পেজের মনিটাইজেশন সেটআপ শুরু করবে।',
      icon: Settings,
    },
    {
      step: '০৩',
      title: 'Get Support',
      bnTitle: 'সার্বক্ষণিক সহায়তা ও আপডেট',
      quote: 'Receive updates and assistance throughout the process.',
      description: 'পুরো প্রক্রিয়া সম্পন্ন হওয়া পর্যন্ত নিয়মিত ট্র্যাকিং, পলিসি গাইডেন্স এবং টেকনিক্যাল সহায়তা পাবেন।',
      icon: Headset,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 relative overflow-hidden bg-[#0c0814]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-400 font-bold">
            সহজ ৩টি ধাপ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            যেভাবে কাজ করে (How It Works)
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            অত্যন্ত সহজ ও স্বচ্ছ ৩টি ধাপে Expart BD থেকে ফেসবুক মনিটাইজেশন সার্ভিস গ্রহণ করুন।
          </p>
        </div>

        {/* 3-Step Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-500/40 via-rose-500/40 to-amber-500/40 -translate-y-12 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-8 rounded-3xl bg-[#160d26]/80 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600/15 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl sm:text-5xl font-black text-white/20 group-hover:text-orange-500/70 transition-colors font-mono">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-rose-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-orange-600 group-hover:to-rose-600 group-hover:text-white transition-all group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                      {step.bnTitle}
                    </h3>
                    <p className="text-xs text-orange-400 font-mono">
                      {step.title}
                    </p>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 pt-1">
                    <p className="text-xs sm:text-sm font-semibold text-orange-200/90 leading-relaxed bg-[#201035]/60 p-2.5 rounded-xl border border-orange-500/20">
                      "{step.quote}"
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    স্বয়ংক্রিয় প্রসেস
                  </span>
                  <span className="font-mono text-[11px] text-orange-400 font-bold">ধাপ {idx + 1}/৩</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
          >
            <span>এখনই ১ম ধাপ শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
