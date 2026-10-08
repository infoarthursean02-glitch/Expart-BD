import React, { useState } from 'react';
import { CheckSquare, Square, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';
import { recordActivity } from '../utils/activityTracker';

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
    setChecks((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      const count = Object.values(updated).filter(Boolean).length;
      recordActivity(
        'navigation',
        'Eligibility Self-Audit Checked',
        `Evaluated criteria: ${key}. Preparedness score: ${Math.round((count / 4) * 100)}%`,
        'Self-Audit',
        'eligibility_check',
        `Audit Item: ${key}`
      );
      return updated;
    });
  };

  const completedCount = Object.values(checks).filter(Boolean).length;
  const percentage = Math.round((completedCount / 4) * 100);

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-slate-950 text-white border-y border-slate-800">
      {/* Background Cyber Glow & Radial Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Tech Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Top Bar Terminal Lights */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 pl-2 border-l border-slate-800 hidden sm:inline-block">
                audit.expartbd.com · v2.4
              </span>
            </div>

            {/* Badge with official ExpartBD Logo icon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold">
              <ExpartBDLogo variant="icon" iconClassName="w-3.5 h-3.5 shrink-0" />
              <span>স্বয়ংক্রিয় পেজ সেলফ-চেক অডিট</span>
            </div>
          </div>

          {/* Heading Area & Interactive Score Meter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                আপনার পেজ কি মনিটাইজেশনের জন্য প্রস্তুত?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                নিচের ৪টি গুরুত্বপূর্ণ বিষয় ক্লিক করে আপনার পেজের প্রাথমিক অবস্থান নির্ণয় করুন। সম্পূর্ণ প্রস্তুতিতে আমাদের টিম আপনাকে সার্বক্ষণিক সহায়তা দেবে।
              </p>
            </div>

            {/* Live Auditor Score Gauge */}
            <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 shadow-inner">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">
                  প্রস্তুতি স্কোর
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                  {completedCount} / ৪ টি প্রস্তুত
                </span>
              </div>
              <div className="relative w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[3px] shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white font-mono font-black text-sm">
                  {percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interactive Checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => toggleCheck('followers')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none group ${
                checks.followers
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              {checks.followers ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className={`font-bold text-sm ${checks.followers ? 'text-white' : 'text-slate-200'}`}>
                  সক্রিয় ফেসবুক পেজ বা প্রোফাইল
                </div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  ভিডিও কনটেন্ট পাবলিশিং ও নিয়মিত ফলোয়ার যোগাযোগ বজায় আছে
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('content')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none group ${
                checks.content
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              {checks.content ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className={`font-bold text-sm ${checks.content ? 'text-white' : 'text-slate-200'}`}>
                  নিজস্ব অরিজিনাল ভিডিও কনটেন্ট
                </div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  কপিরাইট ফ্রি ভিডিও এবং মেটা গাইডলাইনসম্মত ক্রিয়েশন রয়েছে
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('policy')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none group ${
                checks.policy
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              {checks.policy ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className={`font-bold text-sm ${checks.policy ? 'text-white' : 'text-slate-200'}`}>
                  পার্টনার পলিসি কমপ্লায়েন্স
                </div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  পেজে বর্তমানে কোনো কমিউনিটি স্ট্যান্ডার্ড ভায়োলেশন নেই
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleCheck('payout')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none group ${
                checks.payout
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              {checks.payout ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className={`font-bold text-sm ${checks.payout ? 'text-white' : 'text-slate-200'}`}>
                  বাংলাদেশি ব্যাংক ও পেআউট রেডি
                </div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  ট্যাক্স (TIN) তথ্য ও ব্যাংক অ্যাকাউন্ট পেআউটের জন্য প্রস্তুত রাখা
                </div>
              </div>
            </button>
          </div>

          {/* Footer Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-400 text-center sm:text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>কোনো একটি বিষয় অসম্পূর্ণ থাকলেও সমস্যা নেই — আমাদের প্যাকেজে সম্পূর্ণ সেটআপ সহায়তা অন্তর্ভুক্ত।</span>
            </div>
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold shrink-0 cursor-pointer shadow-lg shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>প্যাকেজ অর্ডার করুন (৳২,৯৯৯)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
