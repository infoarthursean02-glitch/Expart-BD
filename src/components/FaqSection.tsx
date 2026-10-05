import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CreditCard } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'ফেসবুক কনটেন্ট মনিটাইজেশন কী? (What is Facebook Content Monetization?)',
      answer:
        'ফেসবুক কনটেন্ট মনিটাইজেশন হলো মেটা প্ল্যাটফর্মের এমন একটি ব্যবস্থা যার মাধ্যমে যোগ্য ভিডিও ক্রিয়েটররা তাদের আপলোডকৃত ভিডিও বা রিলসে বিজ্ঞাপন (In-Stream Ads), স্টারস (Stars) ইত্যাদির মাধ্যমে সরাসরি আয় করতে পারেন।',
    },
    {
      id: 'faq-2',
      question: 'কারা Expart BD-এর এই সার্ভিসটি গ্রহণ করতে পারবেন? (Who can use this service?)',
      answer:
        'যেকোনো ফেসবুক ভিডিও ক্রিয়েটর, পেজ ওনার, ইনফ্লুয়েন্সার বা ব্যবসা প্রতিষ্ঠান যারা নিজেদের ফেসবুক পেজ থেকে আয়ের পথ সুগম করতে সঠিক কারিগরি সেটআপ ও মেটা পলিসি গাইডেন্স চান।',
    },
    {
      id: 'faq-3',
      question: 'সার্ভিস ফি কত এবং কীভাবে পেমেন্ট করব? (How much does the service cost?)',
      answer:
        'আমাদের সম্পূর্ণ ফেসবুক মনিটাইজেশন প্যাকেজের মূল্য এককালীন মাত্র ৳২,৯৯৯ টাকা। আপনি আমাদের অফিশিয়াল বিকাশ অথবা নগদ নম্বরে (০১৬০১-৩০০১২২) Send Money করে প্রাপ্ত Transaction ID (TrxID) দিয়ে অর্ডার কনফার্ম করতে পারবেন। কোনো লুকানো চার্জ নেই।',
    },
    {
      id: 'faq-4',
      question: 'TrxID সাবমিট করার পর কীভাবে ভেরিফিকেশন হয়? (How is payment verified?)',
      answer:
        'অর্ডার ফর্মে আপনার নাম, পেজ লিংক ও TrxID সাবমিট করার সাথে সাথে সিস্টেম স্বয়ংক্রিয়ভাবে রিকোয়েস্টটি অ্যাডমিন প্যানেলে জমা করে। আমাদের অ্যাডমিন টিম TrxID মিলিয়ে সাথে সাথে আপনার পেজের অডিট ও সার্ভিস প্রসেসিং শুরু করে।',
    },
    {
      id: 'faq-5',
      question: 'সার্ভিস প্রসেস সম্পন্ন হতে কত সময় লাগে? (How long does the process take?)',
      answer:
        'অর্ডার প্লেস করার পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমাদের টিম আপনার পেজ অডিট ও টেকনিক্যাল কাজ শুরু করে। ধাপে ধাপে সেটিংস ও ব্যাংক পেআউট কনফিগারেশন বুঝিয়ে দেওয়া হয়।',
    },
    {
      id: 'faq-6',
      question: 'মনিটাইজেশন কি শতভাগ গ্যারান্টিড? (Is monetization guaranteed?)',
      answer:
        'না, কোনো সৎ প্রতিষ্ঠান ফেসবুকের পক্ষ থেকে ১০০% অনুমোদনের গ্যারান্টি দিতে পারে না। কারণ মনিটাইজেশনের চূড়ান্ত সিদ্ধান্ত মেটা (Meta/Facebook) অ্যালগরিদম ও তাদের নিজস্ব পলিসির উপর নির্ভরশীল। আমরা মেটার নিয়ম মেনে আপনার পেজের যাবতীয় সেটিংস প্রস্তুত করি যাতে রিজেক্ট হওয়ার ঝুঁকি সর্বনিম্ন থাকে।',
    },
    {
      id: 'faq-7',
      question: 'আমার কি একটি ফেসবুক পেজ থাকা বাধ্যতামূলক? (Do I need a Facebook Page?)',
      answer:
        'হ্যাঁ, ফেসবুক কনটেন্ট মনিটাইজেশনের জন্য একটি কার্যকর ফেসবুক পেজ অথবা প্রফেশনাল মোড চালু থাকা প্রোফাইল থাকা আবশ্যক।',
    },
    {
      id: 'faq-8',
      question: 'পেমেন্ট নম্বরটি কী এবং কোনো সমস্যা হলে কার সাথে যোগাযোগ করব?',
      answer:
        'আমাদের অফিশিয়াল বিকাশ ও নগদ নম্বর হলো +8801601300122 (01601300122)। যেকোনো প্রয়োজনে আপনি আমাদের সাইটের মাধ্যমে যোগাযোগ রাখতে পারবেন অথবা অর্ডার করার সময় মেসেজ বক্সে বিস্তারিত জানাতে পারবেন।',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 relative overflow-hidden bg-[#0c0814]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest text-orange-400 font-bold">
            সাধারণ জিজ্ঞাসা
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
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
                    ? 'bg-[#170e28]/95 border-orange-500/50 shadow-lg shadow-orange-600/10'
                    : 'bg-[#140b22]/70 border-white/10 hover:border-orange-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-gradient-to-tr from-orange-600 to-rose-600 text-white rotate-180'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed animate-fadeIn">
                    <p className="bg-[#1f1135]/60 p-3.5 rounded-xl border border-orange-500/20 text-slate-200">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-[#160d26] border border-orange-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                বিকাশ ও নগদ পেমেন্ট সংক্রান্ত তথ্য
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                অফিশিয়াল পেমেন্ট নম্বর: <span className="font-mono text-amber-300 font-bold">01601300122</span>
              </p>
            </div>
          </div>
          <a
            href="#order-form"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold shrink-0 hover:from-orange-500 hover:to-rose-500 transition-all shadow-md"
          >
            অর্ডার ফর্মে যান
          </a>
        </div>

      </div>
    </section>
  );
};
