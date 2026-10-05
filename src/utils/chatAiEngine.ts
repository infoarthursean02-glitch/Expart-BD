/**
 * Expart BD Smart Automated Chat AI Engine
 * Handles automatic, intelligent replies to any question asked by clients.
 */

interface KnowledgeEntry {
  keywords: string[];
  patterns?: RegExp[];
  response: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['দাম', 'টাকা', 'খরচ', 'ফি', 'প্রাইস', 'price', 'cost', 'fee', 'charge', 'koto taka', 'koto'],
    patterns: [/কত.*টাকা/, /প্যাকেজ.*মূল্য/, /সার্ভিস.*ফি/i, /price.*koto/i],
    response:
      'আমাদের সম্পূর্ণ ফেসবুক কনটেন্ট মনিটাইজেশন প্যাকেজের মূল্য এককালীন মাত্র ৳২,৯৯৯ টাকা (কোনো হিডেন চার্জ নেই)। এর মধ্যে পেজ এলিজিবিলিটি চেক, মনিটাইজেশন সেটআপ, মেটা পলিসি গাইডেন্স এবং ব্যাংক পেআউট কনফিগারেশন সহায়তা অন্তর্ভুক্ত রয়েছে।',
  },
  {
    keywords: ['পেমেন্ট', 'বিকাশ', 'নগদ', 'টাকা পাঠাবো', 'send money', 'payment', 'bkash', 'nagad', 'number', 'নম্বর'],
    patterns: [/টাকা.*পাঠা/, /পেমেন্ট.*কীভাবে/, /বিকাশ.*নম্বর/, /নগদ.*নম্বর/],
    response:
      'আমাদের অফিশিয়াল বিকাশ ও নগদ পার্সোনাল নম্বর: 01601300122 (Send Money)। আপনার বিকাশ বা নগদ অ্যাপ থেকে ৳২,৯৯৯ টাকা Send Money করে যে Transaction ID (TrxID) পাবেন, তা আমাদের ওয়েবসাইটের অর্ডার ফর্মে সাবমিট করুন।',
  },
  {
    keywords: ['trxid', 'ট্রানজেকশন', 'ট্রানজ্যাকশন', 'আইডি', 'transaction id', 'id kothay pabo'],
    patterns: [/trxid/i, /ট্রানজেকশন আইডি/],
    response:
      'বিকাশ বা নগদ অ্যাপ থেকে ৳২,৯৯৯ টাকা Send Money করার পর কনফার্মেশন স্ক্রিনে ও মেসেজে ৮-১০ অক্ষরের একটি কোড (যেমন: BK9A7X3L01 বা NG84FD9902) দেখতে পাবেন—এটিই TrxID। এটি কপি করে অর্ডার ফর্মে দিন।',
  },
  {
    keywords: ['শর্ত', 'এলিজিবিলিটি', 'রিকোয়ারমেন্ট', 'eligibility', 'requirement', 'follower', 'watchtime', 'মিনিট', 'ফলোয়ার'],
    patterns: [/কী.*শর্ত/, /কত.*ফলোয়ার/, /কত.*ওয়াচটাইম/, /এলিজিবল/],
    response:
      'ফেসবুক ইন-স্ট্রিম অ্যাডস মনিটাইজেশনের সাধারণ শর্তাবলী:\n১. ন্যূনতম ৫,০০০ ফলোয়ার\n২. বিগত ৬০ দিনে ৬০,০০০ মিনিট ভিউ/ওয়াচটাইম\n৩. পেজে ন্যূনতম ৫টি সক্রিয় ভিডিও\n৪. মেটা পার্টনার মনিটাইজেশন পলিসি অনুবর্তী হওয়া। পেজের কোনো পলিসি ইস্যু থাকলে আমরা তা সমাধানে সাহায্য করি।',
  },
  {
    keywords: ['সময়', 'কতদিন', 'কতক্ষণ', 'delivery', 'time', 'koto din', 'shomoy'],
    patterns: [/কত.*সময়/, /কতদিন.*লাগবে/],
    response:
      'অর্ডার ও TrxID সাবমিট করার পর আমাদের অ্যাডমিন টিম দ্রুত ভেরিফিকেশন সম্পন্ন করে এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আপনার পেজের অডিট ও টেকনিক্যাল কাজ শুরু করে।',
  },
  {
    keywords: ['ব্যাংক', 'টিন', 'ট্যাক্স', 'পেআউট', 'payout', 'bank', 'tin', 'tax'],
    patterns: [/ব্যাংক.*সেটআপ/, /টাকা.*তুলব/, /ট্যাক্স.*সার্টিফিকেট/],
    response:
      'জি! ফেসবুক থেকে অর্জিত টাকা সরাসরি আপনার বাংলাদেশি ব্যাংক অ্যাকাউন্টে (ডাচ-বাংলা, ব্র্যাক, ইসলামী ব্যাংক ইত্যাদি) আনার জন্য পেআউট সেটিংস ও ট্যাক্স ইনফরমেশন (TIN) পূরণে আমাদের টিম সম্পূর্ণ কারিগরি সহায়তা প্রদান করে।',
  },
  {
    keywords: ['গ্যারান্টি', 'guarantee', 'নিশ্চয়তা', '১০০%'],
    patterns: [/গ্যারান্টি.*আছে/, /১০০%.*হবে/],
    response:
      'কোনো সৎ প্রতিষ্ঠান মেটার পক্ষ থেকে ১০০% অনুমোদনের মিথ্যা গ্যারান্টি দিতে পারে না, কারণ চূড়ান্ত অনুমোদন ফেসবুকের নিজস্ব পলিসি অ্যালগরিদমের হাতে। তবে আমরা মেটার সকল অফিশিয়াল নিয়ম মেনে পেজকে শতভাগ প্রস্তুত করি যাতে মনিটাইজেশন রিজেক্ট হওয়ার ঝুঁকি সর্বনিম্ন থাকে।',
  },
  {
    keywords: ['পলিসি', 'ইস্যু', 'ভায়োলেশন', 'রেড', 'হলুদ', 'policy', 'issue', 'violation'],
    patterns: [/পলিসি.*ইস্যু/, /ভায়োলেশন.*সমাধান/],
    response:
      'পেজে লিমিটেড অরিজিনালিটি অব কনটেন্ট (LOC) বা পলিসি ভায়োলেশন থাকলে আমাদের টিম পেজের কনটেন্ট অডিট করে সমস্যা চিহ্নিত করে এবং তা রিমুভ করার জন্য প্র্যাকটিক্যাল গাইডলাইন প্রদান করে।',
  },
  {
    keywords: ['যোগাযোগ', 'কল', 'নাম্বার', 'হেল্পলাইন', 'contact', 'call', 'phone', 'help'],
    patterns: [/যোগাযোগ.*করব/, /হেল্পলাইন/],
    response:
      'আমাদের অফিশিয়াল হটলাইন ও হোয়াটসঅ্যাপ: +8801601300122। এছাড়া এই লাইভ চ্যাটে আপনার যেকোনো প্রশ্ন করতে পারেন, আমাদের অটোমেটিক সিস্টেম সঙ্গে সঙ্গে তথ্য জানিয়ে দেবে।',
  },
  {
    keywords: ['হাই', 'হ্যালো', 'সালাম', 'hi', 'hello', 'hey', 'assalamu', 'slam'],
    patterns: [/^(hi|hello|hey|সালাম|আসসালামু আলাইকুম)/i],
    response:
      'আসসালামু আলাইকুম! Expart BD-তে আপনাকে স্বাগতম। ফেসবুক কনটেন্ট মনিটাইজেশন প্যাকেজ, পেমেন্ট পদ্ধতি বা যেকোনো তথ্যের জন্য আপনার প্রশ্নটি লিখুন। আমি আপনাকে তাৎক্ষণিক সহায়তা করছি!',
  },
];

/**
 * Intelligent automatic response generator
 */
export const generateAutoReply = async (userMessage: string): Promise<string> => {
  const clean = userMessage.trim().toLowerCase();

  if (!clean) {
    return 'অনুগ্রহ করে আপনার প্রশ্নটি লিখুন, আমি এখনই উত্তর দিচ্ছি।';
  }

  // 1. Check patterns
  for (const item of KNOWLEDGE_BASE) {
    if (item.patterns) {
      for (const pattern of item.patterns) {
        if (pattern.test(clean)) {
          return item.response;
        }
      }
    }
  }

  // 2. Score by keyword matching
  let bestScore = 0;
  let bestResponse: string | null = null;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestResponse = item.response;
    }
  }

  if (bestScore > 0 && bestResponse) {
    return bestResponse;
  }

  // 3. Smart contextual fallback for general queries
  if (clean.length < 5) {
    return 'জি, আপনার প্রশ্নটি বিস্তারিত লিখুন। যেমন: প্যাকেজের মূল্য কত, কীভাবে পেমেন্ট করবেন, অথবা মনিটাইজেশনের শর্ত কী?';
  }

  return `আপনার প্রশ্নের জন্য ধন্যবাদ! Expart BD-এর বিশেষায়িত ফেসবুক কনটেন্ট মনিটাইজেশন প্যাকেজ (৳২,৯৯৯) সংক্রান্ত যেকোনো তথ্য জানতে চাইলে আমাদের হটলাইন/বিকাশ নম্বর 01601300122-এ যোগাযোগ করতে পারেন অথবা নিচের অর্ডার ফর্মে গিয়ে সহজে অর্ডার প্লেস করতে পারেন। আপনার পেজের স্পেসিফিক কোনো সমস্যা থাকলে বিস্তারিত জানাতে পারেন।`;
};
