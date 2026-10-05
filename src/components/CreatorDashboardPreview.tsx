import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  PlaySquare, 
  Users, 
  Sparkles, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  Flame
} from 'lucide-react';

export const CreatorDashboardPreview: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Sunset Blaze Soft Glow behind dashboard */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 via-rose-400/20 to-amber-300/25 rounded-3xl blur-2xl opacity-80 -z-10" />

      {/* Main Container */}
      <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden text-slate-800">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="ml-2 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600/20" />
              মেটা প্রফেশনাল ড্যাশবোর্ড · কনটেন্ট মনিটাইজেশন
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              পলিসি অনুবর্তী
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          
          {/* Header Page Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-orange-50/40 border border-orange-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white shadow-md text-lg">
                E
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">আপনার ফেসবুক পেজ</h4>
                  <CheckCircle2 className="w-4 h-4 text-orange-600 fill-orange-600/20" />
                </div>
                <p className="text-xs text-slate-500">ভিডিও কনটেন্ট ক্রিয়েটর · বাংলাদেশ</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">সার্ভিস স্ট্যাটাস</div>
              <div className="text-xs font-bold text-orange-600 flex items-center gap-1 justify-end">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Expart BD অ্যাক্টিভ
              </div>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>এলিজিবল ওয়াচ টাইম</span>
                <Clock className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900">৬০,০০০+ মিনিট</div>
              <div className="text-[11px] text-emerald-600 flex items-center gap-0.5 mt-0.5 font-semibold">
                <TrendingUp className="w-3 h-3" /> ট্র্যাক করা হচ্ছে
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>সক্রিয় ফলোয়ার</span>
                <Users className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900">১০,০০০+</div>
              <div className="text-[11px] text-orange-600 flex items-center gap-0.5 mt-0.5 font-semibold">
                <ArrowUpRight className="w-3 h-3" /> গ্রোথ অপ্টিমাইজড
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>পেজ কোয়ালিটি</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-base sm:text-lg font-black text-emerald-600">০ ভায়োলেশন</div>
              <div className="text-[11px] text-slate-500 mt-0.5">গ্রিন স্ট্যান্ডার্ড</div>
            </div>
          </div>

          {/* Monetization Tools Overview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PlaySquare className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-900 tracking-wide">
                  মনিটাইজেশন টুলস সেটিংস
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">মেটা পলিসি অনুযায়ী</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">ইন-স্ট্রিম অ্যাডস (অন-ডিমান্ড ও রিলস)</div>
                    <div className="text-[11px] text-slate-500">ভিডিও বিজ্ঞাপন সেটিংস ও অপ্টিমাইজেশন</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                  সেটআপ গাইড
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">স্টারস ও ফ্যান সাপোর্ট কনফিগারেশন</div>
                    <div className="text-[11px] text-slate-500">দর্শকদের গিফটিং সুবিধা চালু করার সহায়তা</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                  রেডি করা হবে
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">বাংলাদেশি ব্যাংক ও পেআউট তথ্য সেটিংস</div>
                    <div className="text-[11px] text-slate-500">টিন (TIN) সার্টিফিকেট ও ব্যাংক বিস্তারিত গাইডেন্স</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  স্টেপ-বাই-স্টেপ
                </span>
              </div>
            </div>
          </div>

          {/* Realism Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-600">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
            <span>
              সিমুলেটেড ড্যাশবোর্ড প্রিভিউ। আমরা মেটার নিয়ম অনুযায়ী প্রফেশনাল সেটআপ ও গাইডেন্স প্রদান করি। চূড়ান্ত অনুমোদন মেটা প্ল্যাটফর্মের সিদ্ধান্তের উপর নির্ভরশীল।
            </span>
          </div>

        </div>

        {/* Floating Mini Highlight Card */}
        <div className="hidden sm:flex absolute -bottom-2 -right-2 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-orange-200 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <div className="text-xs font-bold text-slate-900">
            প্যাকেজ মূল্য: <span className="text-orange-600 font-black">৳২,৯৯৯</span>
          </div>
        </div>

      </div>
    </div>
  );
};
