import React from 'react';
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const TrustNotice: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#0c0814]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Box */}
        <div className="relative rounded-3xl bg-[#150d24]/90 border border-orange-500/35 p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-rose-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  গুরুত্বপূর্ণ নোটিশ (Important Notice)
                </h3>
                <p className="text-xs text-orange-400 font-semibold">
                  স্বচ্ছতা ও বিশ্বস্ততা Expart BD-এর মূল ভিত্তি
                </p>
              </div>
            </div>

            {/* Core Required Statement */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-orange-500/25 text-slate-200 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-slate-100">
                "We provide professional assistance for Facebook monetization. Monetization eligibility, approval and availability are controlled by Facebook/Meta and may vary depending on account status, content, region and platform policies. We do not guarantee approval or specific earnings."
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                <p className="text-orange-300 font-bold">
                  সহজ বাংলায় ব্যাখ্যা:
                </p>
                <p>
                  আমরা সম্পূর্ণ মেটা প্ল্যাটফর্মের অফিশিয়াল নীতিমালা মেনে আপনার পেজ সেটআপ, এলিজিবিলিটি অডিট এবং মনিটাইজেশনের কারিগরি সহায়তা নিশ্চিত করি। ফেসবুক মনিটাইজেশন চূড়ান্ত অনুমোদন ও উপার্জনের সম্পূর্ণ নিয়ন্ত্রণ মেটা (Meta/Facebook) অ্যালগরিদমের হাতে। আমরা কোনো অনৈতিক "১০০% গ্যারান্টি" বা ফেক প্রতিশ্রুতির ব্যবসা করি না।
                </p>
              </div>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#1c0f2f] border border-white/5">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">মেটা পলিসি অনুবর্তী</div>
                  <div className="text-[11px] text-slate-400">১০০% হোয়াইট হ্যাট ও নিরাপদ পদ্ধতি</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#1c0f2f] border border-white/5">
                <Lock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">অ্যাকাউন্ট সিকিউরিটি</div>
                  <div className="text-[11px] text-slate-400">কোনো পাসওয়ার্ড চাওয়া হয় না</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#1c0f2f] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">স্বচ্ছ ভেরিফিকেশন</div>
                  <div className="text-[11px] text-slate-400">বিকাশ ও নগদ TrxID ট্র্যাকিং</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
