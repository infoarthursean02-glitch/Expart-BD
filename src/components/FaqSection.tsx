import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, CreditCard } from 'lucide-react';
import { FaqItem } from '../types';
import { getFaqs } from '../utils/orderStorage';
import { ExpartBDLogo } from './ExpartBDLogo';

export const FaqSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(getFaqs());
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleFaqsChange = () => setFaqs(getFaqs());
    window.addEventListener('expart_faqs_changed', handleFaqsChange);
    return () => window.removeEventListener('expart_faqs_changed', handleFaqsChange);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-26 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <ExpartBDLogo variant="icon" iconClassName="w-4 h-4 shrink-0" />
            <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            প্রশ্নোত্তর ও সাধারণ জিজ্ঞাসা
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ফেসবুক মনিটাইজেশন প্যাকেজ ও পেমেন্ট পদ্ধতি সম্পর্কে আপনার যাবতীয় প্রশ্নের স্পষ্ট উত্তর
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-orange-50/30 border-orange-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-orange-200 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-gradient-to-tr from-orange-600 to-rose-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    <p className="bg-white p-3.5 rounded-xl border border-slate-200 text-slate-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-orange-50/70 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                বিকাশ ও নগদ পেমেন্ট সংক্রান্ত তথ্য
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                অফিশিয়াল পেমেন্ট নম্বর (বিকাশ ও নগদ পার্সোনাল): <span className="font-mono text-slate-900 font-bold">+8801929027577</span>
              </p>
            </div>
          </div>
          <a
            href="#order-form"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold shrink-0 hover:from-orange-500 hover:to-rose-500 transition-all shadow-sm"
          >
            অর্ডার ফর্মে যান
          </a>
        </div>

      </div>
    </section>
  );
};
