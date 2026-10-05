import React from 'react';
import { Award, Compass, Headphones, Sparkles, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'প্রফেশনাল গাইডেন্স (Professional Assistance)',
      quote: 'আপনার Facebook monetization journey-তে professional guidance ও support।',
      description: 'মেটা পলিসি ও বিজনেস স্যুটের জটিল নিয়মনীতি সহজভাবে বুঝিয়ে আপনার পেজকে মনিটাইজেশনের উপযোগী করা।',
      iconColor: 'text-orange-600',
    },
    {
      icon: Compass,
      title: 'সহজ ও স্পষ্ট পদ্ধতি (Simple Process)',
      quote: 'সহজ ও পরিষ্কার process-এর মাধ্যমে service নেওয়ার সুবিধা।',
      description: 'কোনো জটিলতা নেই—বিকাশ বা নগদে পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই ধাপে ধাপে কাজ শুরু হয়।',
      iconColor: 'text-rose-600',
    },
    {
      icon: Headphones,
      title: 'ডেডিকেটেড অর্ডার সাপোর্ট (Dedicated Support)',
      quote: 'Order করার পর প্রয়োজনীয় support ও communication।',
      description: 'অর্ডারের শুরু থেকে শেষ পর্যন্ত আমাদের অ্যাডমিন ও সাপোর্ট টিম আপনার পেজের পাশে থাকবে।',
      iconColor: 'text-amber-600',
    },
    {
      icon: Sparkles,
      title: 'কনটেন্ট ক্রিয়েটর ফোকাসড (Creator Focused)',
      quote: 'Facebook content creators এবং page owners-এর জন্য বিশেষভাবে তৈরি।',
      description: 'ভিডিও নির্মাতা, রিলস পাবলিশার ও ফেসবুক পেজ অ্যাডমিনদের বাস্তব চাহিদা অনুযায়ী ডিজাইনকৃত।',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-600 font-bold">
            বিশ্বস্ততার প্রতীক · Expart BD
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            কেন আমাদের ফেসবুক মনিটাইজেশন সার্ভিস বেছে নেবেন?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            আমরা সাধারণ কোনো মার্কেটিং এজেন্সি নই — আমাদের বিশেষায়িত সেবা শুধুমাত্র ফেসবুক কনটেন্ট মনিটাইজেশনকে ঘিরে।
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-600">০{idx + 1}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Bangla Quote */}
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed bg-orange-50/60 p-3 rounded-xl border border-orange-200/60">
                      "{feature.quote}"
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs text-orange-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-orange-500 shrink-0" />
                  <span>বাংলাদেশের ক্রিয়েটরদের উপযোগী বিশ্বস্ত সার্ভিস</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
