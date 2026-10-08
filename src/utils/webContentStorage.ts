// Complete Website Content Store with dynamic customization

export interface WebContent {
  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroBrandHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPriceBadge: string;
  heroButtonText: string;

  // Why Choose Us Section
  whyUsSectionTitle: string;
  whyUsSectionSubtitle: string;
  whyUsCards: Array<{
    title: string;
    quote: string;
    description: string;
  }>;

  // What's Included Section
  whatsIncludedTitle: string;
  whatsIncludedSubtitle: string;
  whatsIncludedItems: Array<{
    title: string;
    bnTitle: string;
    description: string;
  }>;
  policyNoteTitle: string;
  policyNoteEnglish: string;
  policyNoteBangla: string;

  // How It Works
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  howItWorksSteps: Array<{
    step: string;
    title: string;
    bnTitle: string;
    quote: string;
    description: string;
  }>;

  // Target Audience
  targetAudienceTitle: string;
  targetAudienceSubtitle: string;
  targetAudienceCards: Array<{
    title: string;
    badge: string;
    description: string;
    highlight: string;
  }>;

  // Trust Notice
  trustNoticeTitle: string;
  trustNoticeSubtitle: string;
  trustNoticeStatement: string;
  trustNoticeExplanation: string;

  // Final CTA
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaHighlight: string;
  finalCtaButtonText: string;

  // Footer & Branding
  brandName: string;
  brandTagline: string;
  footerAbout: string;
  copyrightText: string;
}

const WEB_CONTENT_KEY = 'expart_bd_web_content_v1';

export const DEFAULT_WEB_CONTENT: WebContent = {
  // Hero
  heroBadge: 'Expart BD · অফিশিয়াল ফেসবুক মনিটাইজেশন সেটআপ',
  heroHeadline: 'প্রফেশনাল ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস',
  heroBrandHighlight: 'Complete Content Monetize Offer',
  heroSubtitle: 'Facebook Content Monetization Service · Expart BD',
  heroDescription: 'আপনার Facebook Content Monetization শুরু করার জন্য প্রয়োজনীয় সার্ভিস এখন এক প্যাকেজে। বিকাশ ও নগদ পেমেন্ট করে TrxID দিন এবং স্বয়ংক্রিয় ভেরিফিকেশনে সার্ভিস গ্রহণ করুন।',
  heroPriceBadge: 'প্যাকেজ মূল্য: মাত্র ৳২,৯৯৯ (এককালীন সার্ভিস ফি)',
  heroButtonText: 'অর্ডার করুন',

  // Why Us
  whyUsSectionTitle: 'কেন আমাদের ফেসবুক মনিটাইজেশন সার্ভিস বেছে নেবেন?',
  whyUsSectionSubtitle: 'আমরা সাধারণ কোনো মার্কেটিং এজেন্সি নই — আমাদের বিশেষায়িত সেবা শুধুমাত্র ফেসবুক কনটেন্ট মনিটাইজেশনকে ঘিরে।',
  whyUsCards: [
    {
      title: 'প্রফেশনাল গাইডেন্স (Professional Assistance)',
      quote: 'আপনার Facebook monetization journey-তে professional guidance ও support।',
      description: 'মেটা পলিসি ও বিজনেস স্যুটের জটিল নিয়মনীতি সহজভাবে বুঝিয়ে আপনার পেজকে মনিটাইজেশনের উপযোগী করা।',
    },
    {
      title: 'সহজ ও স্পষ্ট পদ্ধতি (Simple Process)',
      quote: 'সহজ ও পরিষ্কার process-এর মাধ্যমে service নেওয়ার সুবিধা।',
      description: 'কোনো জটিলতা নেই—বিকাশ বা নগদে পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই ধাপে ধাপে কাজ শুরু হয়।',
    },
    {
      title: 'ডেডিকেটেড অর্ডার সাপোর্ট (Dedicated Support)',
      quote: 'Order করার পর প্রয়োজনীয় support ও communication।',
      description: 'অর্ডারের শুরু থেকে শেষ পর্যন্ত আমাদের অ্যাডমিন ও সাপোর্ট টিম আপনার পেজের পাশে থাকবে।',
    },
    {
      title: 'কনটেন্ট ক্রিয়েটর ফোকাসড (Creator Focused)',
      quote: 'Facebook content creators এবং page owners-এর জন্য বিশেষভাবে তৈরি।',
      description: 'ভিডিও নির্মাতা, রিলস পাবলিশার ও ফেসবুক পেজ অ্যাডমিনদের বাস্তব চাহিদা অনুযায়ী ডিজাইনকৃত।',
    },
  ],

  // What's Included
  whatsIncludedTitle: "প্যাকেজে কী কী অন্তর্ভুক্ত থাকছে? (What's Included?)",
  whatsIncludedSubtitle: 'আমাদের প্যাকেজে কোনো লুকানো চার্জ নেই — সবগুলো প্রফেশনাল সার্ভিস অন্তর্ভুক্ত মাত্র ৳২,৯৯৯ টাকায়।',
  whatsIncludedItems: [
    {
      title: 'Facebook Monetization Service',
      bnTitle: 'ফেসবুক মনিটাইজেশন সার্ভিস',
      description: 'আপনার পেজের সামগ্রিক মনিটাইজেশন সক্ষমতা পর্যালোচনা এবং টুলস সক্রিয়করণ সহায়তা।',
    },
    {
      title: 'Professional Assistance',
      bnTitle: 'প্রফেশনাল কারিগরি সহায়তা',
      description: 'মেটা বিজনেস স্যুট ও ক্রিয়েটর স্টুডিও কনফিগারেশনে দক্ষ টেকনিক্যাল টিম থেকে সরাসরি সহায়তা।',
    },
    {
      title: 'Monetization-related Guidance',
      bnTitle: 'মনিটাইজেশন সম্পর্কিত পরিপূর্ণ দিকনির্দেশনা',
      description: 'পার্টনার মনিটাইজেশন পলিসি, কপিরাইট এড়ানো এবং অরিজিনাল কন্টেন্ট স্ট্যান্ডার্ড গাইডলাইন।',
    },
    {
      title: 'Order Support',
      bnTitle: 'সার্বক্ষণিক অর্ডার সাপোর্ট',
      description: 'অর্ডার সাবমিট করার পর থেকে সেটআপের প্রতিটি ধাপে সময়োপযোগী ফলো-আপ ও ট্র্যাকিং।',
    },
    {
      title: 'Customer Communication',
      bnTitle: 'কাস্টমার কমিউনিকেশন',
      description: 'আপনার প্রতিটি প্রশ্ন ও সংশয় সমাধানে আমাদের ডেডিকেটেড টিম সবসময় যোগাযোগ রাখবে।',
    },
    {
      title: 'Step-by-step Assistance',
      bnTitle: 'স্টেপ-বাই-স্টেপ সহায়তা',
      description: 'ব্যাংক তথ্য, পেআউট অ্যাকাউন্ট কনফিগারেশন ও টিন (TIN) সার্টিফিকেট যুক্ত করার সঠিক পদ্ধতি।',
    },
  ],
  policyNoteTitle: 'মেটা পলিসি সতর্কতা (Important Policy Note)',
  policyNoteEnglish: "Eligibility and monetization approval depend on Facebook/Meta's policies and your account's eligibility.",
  policyNoteBangla: 'মনিটাইজেশনের চূড়ান্ত অনুমোদন ও উপার্জনের সকল অধিকার ফেসবুক/মেটা কর্তৃপক্ষের নিয়মের উপর নির্ভরশীল। আমরা মেটার নিয়ম মেনে আপনার পেজের যাবতীয় সেটিংস প্রস্তুত ও অডিট করে দেব।',

  // How It Works
  howItWorksTitle: 'যেভাবে কাজ করে (How It Works)',
  howItWorksSubtitle: 'অত্যন্ত সহজ ও স্বচ্ছ ৩টি ধাপে Expart BD থেকে ফেসবুক মনিটাইজেশন সার্ভিস গ্রহণ করুন।',
  howItWorksSteps: [
    {
      step: '০১',
      title: 'Place Your Order',
      bnTitle: 'অর্ডার ও TrxID প্রদান করুন',
      quote: 'Click Order Now and send your details.',
      description: 'বিকাশ বা নগদ নম্বরে ফি পাঠিয়ে TrxID সহ অর্ডার ফর্মটি সাবমিট করুন।',
    },
    {
      step: '০২',
      title: 'We Process Your Service',
      bnTitle: 'অটোমেটিক ভেরিফিকেশন ও প্রসেসিং',
      quote: 'Our team reviews your information and starts the service process.',
      description: 'অ্যাডমিন প্যানেলে TrxID কনফার্ম হওয়ার সাথে সাথে টিম আপনার পেজের মনিটাইজেশন সেটআপ শুরু করবে।',
    },
    {
      step: '০৩',
      title: 'Get Support',
      bnTitle: 'সার্বক্ষণিক সহায়তা ও আপডেট',
      quote: 'Receive updates and assistance throughout the process.',
      description: 'পুরো প্রক্রিয়া সম্পন্ন হওয়া পর্যন্ত নিয়মিত ট্র্যাকিং, পলিসি গাইডেন্স এবং টেকনিক্যাল সহায়তা পাবেন।',
    },
  ],

  // Target Audience
  targetAudienceTitle: 'ফেসবুক ক্রিয়েটরদের জন্য পারফেক্ট (Perfect For Facebook Creators)',
  targetAudienceSubtitle: 'আপনি যে ধরনের কন্টেন্টই তৈরি করুন না কেন, Expart BD আপনার পেজকে মনিটাইজেশন উপযোগী করতে প্রস্তুত।',
  targetAudienceCards: [
    {
      title: 'ভিডিও ক্রিয়েটর (Video Creators)',
      badge: 'ভিডিও ও শর্টস',
      description: 'টিউটোরিয়াল, নিউজ, ট্রাভেল বা লাইফস্টাইল ভিডিও বানান এবং ইন-স্ট্রিম অ্যাডস সেটিংস করতে চান।',
      highlight: 'ইন-স্ট্রিম অ্যাডস ও ব্যাংক ইনফো সেটআপ',
    },
    {
      title: 'ফেসবুক পেজ ওনার (Page Owners)',
      badge: 'অ্যাক্টিভ পেজ',
      description: 'একটি সচল পেজ পরিচালনা করছেন যেখানে ফলোয়ার আছে কিন্তু মনিটাইজেশন চালু করতে পারছেন না।',
      highlight: 'পেজ হেলথ অডিট ও পলিসি সমাধান',
    },
    {
      title: 'কনটেন্ট ক্রিয়েটর (Content Creators)',
      badge: 'রিলস ও বিনোদন',
      description: 'নিয়মিত ভাইরাল রিলস বানান এবং স্টারস ও মনিটাইজেশন বোনাস সুযোগের পূর্ণ সদ্ব্যবহার করতে চান।',
      highlight: 'মেটা ক্রিয়েটর স্টুডিও অপ্টিমাইজেশন',
    },
    {
      title: 'ইনফ্লুয়েন্সার (Influencers)',
      badge: 'পার্সোনাল ব্র‍্যান্ড',
      description: 'আপনার অনুসারীদের মাঝে নিজের ব্র‍্যান্ডের অবস্থান থেকে টেকনিক্যাল ঝামেলামুক্ত সমাধান চান।',
      highlight: 'অভিজ্ঞ টেকনিক্যাল টিম থেকে হ্যান্ডস-অন সাপোর্ট',
    },
    {
      title: 'ব্যবসা ও মিডিয়া প্রতিষ্ঠান (Businesses)',
      badge: 'করপোরেট পেজ',
      description: 'সংবাদ মাধ্যম, শিক্ষামূলক প্রতিষ্ঠান বা ই-কমার্স প্রতিষ্ঠান যারা ভিডিও কনটেন্ট পাবলিশ করে।',
      highlight: 'প্রফেশনাল পেজ কনফিগারেশন ও ট্যাক্স গাইডেন্স',
    },
  ],

  // Trust Notice
  trustNoticeTitle: 'গুরুত্বপূর্ণ নোটিশ (Important Notice)',
  trustNoticeSubtitle: 'স্বচ্ছতা ও বিশ্বস্ততা Expart BD-এর মূল ভিত্তি',
  trustNoticeStatement: 'We provide professional assistance for Facebook monetization. Monetization eligibility, approval and availability are controlled by Facebook/Meta and may vary depending on account status, content, region and platform policies. We do not guarantee approval or specific earnings.',
  trustNoticeExplanation: 'আমরা সম্পূর্ণ মেটা প্ল্যাটফর্মের অফিশিয়াল নীতিমালা মেনে আপনার পেজ সেটআপ, এলিজিবিলিটি অডিট এবং মনিটাইজেশনের কারিগরি সহায়তা নিশ্চিত করি। ফেসবুক মনিটাইজেশন চূড়ান্ত অনুমোদন ও উপার্জনের সম্পূর্ণ নিয়ন্ত্রণ মেটা (Meta/Facebook) অ্যালগরিদমের হাতে। আমরা কোনো অনৈতিক "১০০% গ্যারান্টি" বা ফেক প্রতিশ্রুতির ব্যবসা করি না।',

  // Final CTA
  finalCtaTitle: 'আপনার ফেসবুক মনিটাইজেশন যাত্রা শুরু করতে প্রস্তুত?',
  finalCtaDescription: 'Expart BD-এর প্রফেশনাল ফেসবুক মনিটাইজেশন প্যাকেজের মাধ্যমে আজই আপনার পেজ প্রস্তুত করুন।',
  finalCtaHighlight: 'বিকাশ ও নগদ পেমেন্ট করে TrxID দিয়ে সাবমিট করলেই স্বয়ংক্রিয় ভেরিফিকেশন শুরু হবে।',
  finalCtaButtonText: 'এখনই অর্ডার করুন',

  // Footer & Branding
  brandName: 'Expart BD',
  brandTagline: 'প্রফেশনাল ফেসবুক মনিটাইজেশন সার্ভিস',
  footerAbout: 'Expart BD শুধুমাত্র ফেসবুক কনটেন্ট মনিটাইজেশন সার্ভিস প্রদানকারী একটি নির্ভরযোগ্য প্ল্যাটফর্ম। ভিডিও ক্রিয়েটর, পেজ ওনার ও ব্র্যান্ডদের প্রফেশনাল সেটআপ ও মেটা পলিসি গাইডেন্স দেওয়াই আমাদের লক্ষ্য।',
  copyrightText: '© 2026 Expart BD. সর্বস্বত্ব সংরক্ষিত।',
};

export const getWebContent = (): WebContent => {
  try {
    const data = localStorage.getItem(WEB_CONTENT_KEY);
    if (!data) {
      localStorage.setItem(WEB_CONTENT_KEY, JSON.stringify(DEFAULT_WEB_CONTENT));
      return DEFAULT_WEB_CONTENT;
    }
    const parsed = JSON.parse(data);
    return { ...DEFAULT_WEB_CONTENT, ...parsed };
  } catch (e) {
    return DEFAULT_WEB_CONTENT;
  }
};

export const saveWebContent = (newContent: WebContent): void => {
  try {
    localStorage.setItem(WEB_CONTENT_KEY, JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('expart_web_content_changed'));
  } catch (e) {
    console.error('Error saving web content', e);
  }
};

export const resetWebContentToDefault = (): WebContent => {
  try {
    localStorage.setItem(WEB_CONTENT_KEY, JSON.stringify(DEFAULT_WEB_CONTENT));
    window.dispatchEvent(new CustomEvent('expart_web_content_changed'));
    return DEFAULT_WEB_CONTENT;
  } catch (e) {
    return DEFAULT_WEB_CONTENT;
  }
};
