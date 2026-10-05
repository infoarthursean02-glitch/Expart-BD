import React from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';

export const TrustNotice: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-[#faf7f2] border-y border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Certificate Card with Double Border Effect */}
        <div className="relative rounded-3xl bg-white border-2 border-stone-300/80 p-7 sm:p-12 shadow-xl shadow-stone-900/5">
          
          <div className="space-y-7">
            
            {/* Header Area with Official Brand Seal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-stone-100 to-white border border-stone-300 flex items-center justify-center shadow-sm shrink-0">
                  <ExpartBDLogo variant="icon" iconClassName="w-9 h-9 shrink-0" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                      গুরুত্বপূর্ণ নোটিশ (Important Notice)
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 font-semibold mt-0.5">
                    স্বচ্ছতা, সততা ও পলিসি কমপ্লায়েন্স — Expart BD-এর মূল ভিত্তি
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>মেটা পলিসি অনুবর্তী গাইডেন্স</span>
              </div>
            </div>

            {/* Core Required Statement in Editorial Callout */}
            <div className="p-6 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 text-sm sm:text-base leading-relaxed">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-2">
                অফিশিয়াল ডিসক্লেইমার (Official Disclaimer)
              </div>
              <p className="font-semibold text-stone-900 italic font-sans leading-relaxed">
                "We provide professional assistance for Facebook monetization. Monetization eligibility, approval and availability are controlled by Facebook/Meta and may vary depending on account status, content, region and platform policies. We do not guarantee approval or specific earnings."
              </p>
              
              <div className="mt-5 pt-5 border-t border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-1.5">
                <p className="text-stone-900 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                  সহজ বাংলায় ব্যাখ্যা:
                </p>
                <p>
                  আমরা সম্পূর্ণ মেটা প্ল্যাটফর্মের অফিশিয়াল নীতিমালা মেনে আপনার পেজ সেটআপ, এলিজিবিলিটি অডিট এবং মনিটাইজেশনের কারিগরি সহায়তা নিশ্চিত করি। ফেসবুক মনিটাইজেশন চূড়ান্ত অনুমোদন ও উপার্জনের সম্পূর্ণ নিয়ন্ত্রণ মেটা (Meta/Facebook) অ্যালগরিদমের হাতে। আমরা কোনো অনৈতিক "১০০% গ্যারান্টি" বা ফেক প্রতিশ্রুতির ব্যবসা করি না।
                </p>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>অফিশিয়াল মেটা গাইডেন্স</span>
                </div>
                <p className="text-stone-500">
                  মেটা পলিসি মেনে প্রতিটি ধাপ সম্পন্ন করা হয়।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>নিরাপদ ও নির্ভরযোগ্য</span>
                </div>
                <p className="text-stone-500">
                  আপনার পেজ ও তথ্য সবসময় নিরাপদ থাকে।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-amber-600" />
                  <span>স্বচ্ছ ক্যাশ রিসিট</span>
                </div>
                <p className="text-stone-500">
                  পেমেন্টের পর ডিজিটাল মানি রিসিট প্রদান করা হয়।
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
