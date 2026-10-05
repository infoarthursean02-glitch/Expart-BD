import React from 'react';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface WhatIsIncludedProps {
  onOrderClick: () => void;
}

export const WhatIsIncluded: React.FC<WhatIsIncludedProps> = ({ onOrderClick }) => {
  const checklistItems = [
    {
      title: 'Facebook Monetization Service',
      bnTitle: 'ফেসবুক মনিটাইজেশন সার্ভিস',
      description: 'আপনার পেজের সামগ্রিক মনিটাইজেশন সক্ষমতা পর্যালোচনা এবং টুলস সক্রিয়করণ সহায়তা।',
    },
    {
      title: 'Professional Assistance',
      bnTitle: 'প্রফেশনাল কারিগরি সহায়তা',
      description: 'মেটা বিজনেস স্যুট ও ক্রিয়েটর স্টুডিও কনফিগারেশনে দক্ষ টেকনিক্যাল টিম থেকে সরাসরি সহায়তা।',
    },
    {
      title: 'Monetization-related Guidance',
      bnTitle: 'মনিটাইজেশন সম্পর্কিত পরিপূর্ণ দিকনির্দেশনা',
      description: 'পার্টনার মনিটাইজেশন পলিসি, কপিরাইট এড়ানো এবং অরিজিনাল কন্টেন্ট স্ট্যান্ডার্ড গাইডলাইন।',
    },
    {
      title: 'Order Support',
      bnTitle: 'সার্বক্ষণিক অর্ডার সাপোর্ট',
      description: 'অর্ডার সাবমিট করার পর থেকে সেটআপের প্রতিটি ধাপে সময়োপযোগী ফলো-আপ ও ট্র্যাকিং।',
    },
    {
      title: 'Customer Communication',
      bnTitle: 'কাস্টমার কমিউনিকেশন',
      description: 'আপনার প্রতিটি প্রশ্ন ও সংশয় সমাধানে আমাদের ডেডিকেটেড টিম সবসময় যোগাযোগ রাখবে।',
    },
    {
      title: 'Step-by-step Assistance',
      bnTitle: 'স্টেপ-বাই-স্টেপ সহায়তা',
      description: 'ব্যাংক তথ্য, পেআউট অ্যাকাউন্ট কনফিগারেশন ও টিন (TIN) সার্টিফিকেট যুক্ত করার সঠিক পদ্ধতি।',
    },
  ];

  return (
    <section id="whats-included" className="py-20 sm:py-24 relative overflow-hidden bg-[#0c0814]">
      {/* Sunset Glow Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-400 font-bold">
            অল-ইন-ওয়ান প্যাকেজ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            প্যাকেজে কী কী অন্তর্ভুক্ত থাকছে? (What's Included?)
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            আমাদের প্যাকেজে কোনো লুকানো চার্জ নেই — সবগুলো প্রফেশনাল সার্ভিস অন্তর্ভুক্ত মাত্র ৳২,৯৯৯ টাকায়।
          </p>
        </div>

        {/* Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-[#160d26]/80 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-600/15 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500/20 to-rose-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                      {item.bnTitle}
                    </h3>
                    <p className="text-xs text-orange-400/90 font-mono mt-0.5">
                      {item.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-12">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 pl-12 flex items-center justify-between text-[11px] text-slate-400">
                <span>প্যাকেজে যুক্ত</span>
                <span className="font-bold text-emerald-400">✓ অ্যাক্টিভ</span>
              </div>
            </div>
          ))}
        </div>

        {/* Required Important Note Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/35 backdrop-blur-md max-w-4xl mx-auto shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                মেটা পলিসি সতর্কতা (Important Policy Note)
              </div>
              <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
                "Eligibility and monetization approval depend on Facebook/Meta's policies and your account's eligibility."
              </p>
              <p className="text-xs text-amber-200/80 pt-0.5">
                (মনিটাইজেশনের চূড়ান্ত অনুমোদন ও উপার্জনের সকল অধিকার ফেসবুক/মেটা কর্তৃপক্ষের নিয়মের উপর নির্ভরশীল। আমরা মেটার নিয়ম মেনে আপনার পেজের যাবতীয় সেটিংস প্রস্তুত ও অডিট করে দেব।)
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
          >
            <span>এখনই অর্ডার করতে ক্লিক করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
