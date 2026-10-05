import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, ArrowRight } from 'lucide-react';

interface EligibilityCheckerProps {
  onOrderClick: () => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ onOrderClick }) => {
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    followers: false,
    content: false,
    policy: false,
    payout: false,
  });

  const toggleCheck = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checks).filter(Boolean).length;

  return (
    <section className="py-14 sm:py-16 relative overflow-hidden bg-[#0e0818] border-y border-orange-500/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#160d26]/80 border border-orange-500/25 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>স্বয়ংক্রিয় পেজ সেলফ-চেক টুল</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                আপনার পেজ কি মনিটাইজেশনের জন্য প্রস্তুত?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                নিচের ৪টি গুরুত্বপূর্ণ বিষয় ক্লিক করে আপনার পেজের প্রাথমিক অবস্থান জেনে নিন:
              </p>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/50 border border-orange-500/30 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">অগ্রগতি</span>
                <span className="text-base font-bold text-orange-400">
                  {completedCount} / ৪ টি সম্পন্ন
                </span>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-rose-600 flex items-center justify-center font-black text-sm text-white shadow-md">
                {Math.round((completedCount / 4) * 100)}%
              </div>
            </div>
          </div>

          {/* 4 Interactive Checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => toggleCheck('followers')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                checks.followers
                  ? 'bg-orange-950/40 border-orange-500 text-white'
                  : 'bg-black/40 border-white/10 text-slate-300 hover:border-orange-500/40'
              }`}
            >
              {checks.followers ? (
                <CheckSquare className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-white text-sm">সক্রিয় ফেসবুক পেজ বা প্রোফাইল</div>
                <div className="text-slate-400 mt-0.5">ভিডিও কনটেন্ট পাবলিশিং ও নিয়মিত ফলোয়ার যোগাযোগ</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('content')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                checks.content
                  ? 'bg-orange-950/40 border-orange-500 text-white'
                  : 'bg-black/40 border-white/10 text-slate-300 hover:border-orange-500/40'
              }`}
            >
              {checks.content ? (
                <CheckSquare className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-white text-sm">নিজস্ব অরিজিনাল ভিডিও কনটেন্ট</div>
                <div className="text-slate-400 mt-0.5">কপিরাইট ফ্রি ভিডিও এবং মেটা গাইডলাইনসম্মত ক্রিয়েশন</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('policy')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                checks.policy
                  ? 'bg-orange-950/40 border-orange-500 text-white'
                  : 'bg-black/40 border-white/10 text-slate-300 hover:border-orange-500/40'
              }`}
            >
              {checks.policy ? (
                <CheckSquare className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-white text-sm">পার্টনার পলিসি কমপ্লায়েন্স</div>
                <div className="text-slate-400 mt-0.5">পেজে কোনো পলিসি ইস্যু বা ভায়োলেশন নেই</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('payout')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                checks.payout
                  ? 'bg-orange-950/40 border-orange-500 text-white'
                  : 'bg-black/40 border-white/10 text-slate-300 hover:border-orange-500/40'
              }`}
            >
              {checks.payout ? (
                <CheckSquare className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-bold text-white text-sm">বাংলাদেশি ব্যাংক ও পেআউট রেডি</div>
                <div className="text-slate-400 mt-0.5">ব্যাংক অ্যাকাউন্ট ও ট্যাক্স তথ্য প্রস্তুত রাখা</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-center sm:text-left">
              এই বিষয়গুলোর কোনো একটি নিয়ে সমস্যা থাকলেও চিন্তার কিছু নেই — আমাদের প্যাকেজে সম্পূর্ণ সেটআপ সহায়তা অন্তর্ভুক্ত।
            </span>
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-bold shrink-0 cursor-pointer shadow-md"
            >
              <span>প্যাকেজ অর্ডার করুন (৳২,৯৯৯)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
