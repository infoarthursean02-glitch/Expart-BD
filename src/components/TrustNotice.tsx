import React from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const TrustNotice: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-50/70 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Box */}
        <div className="relative rounded-3xl bg-white border border-orange-200/80 p-7 sm:p-10 shadow-xl">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  গুরুত্বপূর্ণ নোটিশ (Important Notice)
                </h3>
                <p className="text-xs text-orange-600 font-semibold">
                  স্বচ্ছতা ও বিশ্বস্ততা Expart BD-এর মূল ভিত্তি
                </p>
              </div>
            </div>

            {/* Core Required Statement */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-slate-900">
                "We provide professional assistance for Facebook monetization. Monetization eligibility, approval and availability are controlled by Facebook/Meta and may vary depending on account status, content, region and platform policies. We do not guarantee approval or specific earnings."
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1">
                <p className="text-orange-700 font-bold">
                  সহজ বাংলায় ব্যাখ্যা:
                </p>
                <p>
                  আমরা সম্পূর্ণ মেটা প্ল্যাটফর্মের অফিশিয়াল নীতিমালা মেনে আপনার পেজ সেটআপ, এলিজিবিলিটি অডিট এবং মনিটাইজেশনের কারিগরি সহায়তা নিশ্চিত করি। ফেসবুক মনিটাইজেশন চূড়ান্ত অনুমোদন ও উপার্জনের সম্পূর্ণ নিয়ন্ত্রণ মেটা (Meta/Facebook) অ্যালগরিদমের হাতে। আমরা কোনো অনৈতিক "১০০% গ্যারান্টি" বা ফেক প্রতিশ্রুতির ব্যবসা করি না।
                </p>
              </div>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">মেটা পলিসি অনুবর্তী</div>
                  <div className="text-[11px] text-slate-500">১০০% হোয়াইট হ্যাট ও নিরাপদ পদ্ধতি</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Lock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">অ্যাকাউন্ট সিকিউরিটি</div>
                  <div className="text-[11px] text-slate-500">কোনো পাসওয়ার্ড চাওয়া হয় না</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">স্বচ্ছ ভেরিফিকেশন</div>
                  <div className="text-[11px] text-slate-500">বিকাশ ও নগদ TrxID ট্র্যাকিং</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
