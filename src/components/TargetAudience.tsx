import React from 'react';
import { Video, Smartphone, Film, Rocket, Building2, CheckCircle2 } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: Video,
      title: 'ভিডিও ক্রিয়েটর (Video Creators)',
      badge: 'ভিডিও ও শর্টস',
      description: 'টিউটোরিয়াল, নিউজ, ট্রাভেল বা লাইফস্টাইল ভিডিও বানান এবং ইন-স্ট্রিম অ্যাডস সেটিংস করতে চান।',
      highlight: 'ইন-স্ট্রিম অ্যাডস ও ব্যাংক ইনফো সেটআপ',
    },
    {
      icon: Smartphone,
      title: 'ফেসবুক পেজ ওনার (Page Owners)',
      badge: 'অ্যাক্টিভ পেজ',
      description: 'একটি সচল পেজ পরিচালনা করছেন যেখানে ফলোয়ার আছে কিন্তু মনিটাইজেশন চালু করতে পারছেন না।',
      highlight: 'পেজ হেলথ অডিট ও পলিসি সমাধান',
    },
    {
      icon: Film,
      title: 'কনটেন্ট ক্রিয়েটর (Content Creators)',
      badge: 'রিলস ও বিনোদন',
      description: 'নিয়মিত ভাইরাল রিলস বানান এবং স্টারস ও মনিটাইজেশন বোনাস সুযোগের পূর্ণ সদ্ব্যবহার করতে চান।',
      highlight: 'মেটা ক্রিয়েটর স্টুডিও অপ্টিমাইজেশন',
    },
    {
      icon: Rocket,
      title: 'ইনফ্লুয়েন্সার (Influencers)',
      badge: 'পার্সোনাল ব্র‍্যান্ড',
      description: 'আপনার অনুসারীদের মাঝে নিজের ব্র‍্যান্ডের অবস্থান থেকে টেকনিক্যাল ঝামেলামুক্ত সমাধান চান।',
      highlight: 'অভিজ্ঞ টেকনিক্যাল টিম থেকে হ্যান্ডস-অন সাপোর্ট',
    },
    {
      icon: Building2,
      title: 'ব্যবসা ও মিডিয়া প্রতিষ্ঠান (Businesses)',
      badge: 'করপোরেট পেজ',
      description: 'সংবাদ মাধ্যম, শিক্ষামূলক প্রতিষ্ঠান বা ই-কমার্স প্রতিষ্ঠান যারা ভিডিও কনটেন্ট পাবলিশ করে।',
      highlight: 'প্রফেশনাল পেজ কনফিগারেশন ও ট্যাক্স গাইডেন্স',
    },
  ];

  return (
    <section id="creators" className="py-20 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-600 font-bold">
            কাদের জন্য এই সার্ভিস?
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ফেসবুক ক্রিয়েটরদের জন্য পারফেক্ট (Perfect For Facebook Creators)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            আপনি যে ধরনের কন্টেন্টই তৈরি করুন না কেন, Expart BD আপনার পেজকে মনিটাইজেশন উপযোগী করতে প্রস্তুত।
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.slice(0, 3).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-orange-300 hover:bg-white transition-all duration-300 hover:shadow-lg shadow-xs group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-orange-500" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {audiences.slice(3, 5).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-orange-300 hover:bg-white transition-all duration-300 hover:shadow-lg shadow-xs group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-orange-500" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
