/**
 * Expart BD Official Automated QA Knowledge Base & Engine
 * Contains all 50 official Facebook Monetization Questions, Answers, and Action Triggers.
 */

export interface AutomatedQAItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  actionType?: 'upload_screenshot' | 'send_page_link' | 'order_package';
  actionPrompt?: string;
}

export const AUTOMATED_QA_CATEGORIES = [
  'সব প্রশ্ন',
  'সার্ভিস শুরু ও লিংক',
  'ফলোয়ার ও এলিজিবিলিটি',
  'সিকিউরিটি ও অ্যাক্সেস',
  'প্যাকেজ ও ফি',
  'সময় ও গ্যারান্টি',
  'রিজেকশন ও পলিসি ইস্যু',
  'কনটেন্ট ও কপিরাইট',
  'বাংলাদেশ ও পেআউট',
] as const;

export const AUTOMATED_QA_LIST: AutomatedQAItem[] = [
  // 1. সার্ভিস শুরু ও লিংক
  {
    id: 'qa-1',
    category: 'সার্ভিস শুরু ও লিংক',
    question: 'Monetization service নিতে হলে কী করতে হবে?',
    answer:
      'প্রথমে আপনার Page/Profile-এর link বা প্রয়োজনীয় basic information দিতে হবে। আমরা account status ও monetization-related issues দেখে আপনাকে জানাব—আপনার ক্ষেত্রে কী কী প্রয়োজন, সম্ভাব্য সমস্যা কোথায় এবং কোন service উপযুক্ত হবে।',
    keywords: ['service নিতে হলে', 'কী করতে হবে', 'শুরু করতে', 'কি করতে হবে', 'service kivabe nebo', 'service nite'],
    actionType: 'send_page_link',
    actionPrompt: 'আপনার ফেসবুক পেজ বা প্রোফাইল লিংক পাঠান',
  },
  {
    id: 'qa-2',
    category: 'সার্ভিস শুরু ও লিংক',
    question: 'শুধু Page link দিলেই হবে?',
    answer:
      'প্রাথমিক assessment-এর জন্য Page/Profile link যথেষ্ট হতে পারে। তবে account-এর Monetization বা Policy status যাচাই করতে প্রয়োজন অনুযায়ী কিছু additional information বা screenshot চাইতে পারি।',
    keywords: ['শুধু page link', 'shudhu link', 'page link dilei hobe', 'link dilei hobe'],
    actionType: 'upload_screenshot',
    actionPrompt: 'আপনার ড্যাশবোর্ড বা পলিসি স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-3',
    category: 'ফলোয়ার ও এলিজিবিলিটি',
    question: 'আমার page monetization eligible কিনা check করে দেবেন?',
    answer:
      'জি, আমরা আপনার available Monetization/Professional Dashboard information এবং policy status দেখে eligibility assessment করতে পারি। আপনি relevant screenshot বা প্রয়োজনীয় information দিলে আমরা আপনার বর্তমান অবস্থাটা বুঝিয়ে বলব।',
    keywords: ['eligible kina check', 'check করে দেবেন', 'eligibility check', 'check kore diben'],
    actionType: 'upload_screenshot',
    actionPrompt: 'মনিটাইজেশন ড্যাশবোর্ডের স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-4',
    category: 'ফলোয়ার ও এলিজিবিলিটি',
    question: 'আমার follower কম, তবুও কি monetization সম্ভব?',
    answer:
      'শুধু follower সংখ্যা দিয়ে monetization eligibility নির্ধারণ হয় না। কোন monetization feature-এর জন্য আবেদন করছেন, account status, content quality, policy compliance এবং অন্যান্য Meta requirements গুরুত্বপূর্ণ। তাই আপনার account দেখে specific assessment করতে হবে।',
    keywords: ['follower কম', 'kom follower', 'follower kom', 'monetization shombhob'],
  },
  {
    id: 'qa-5',
    category: 'ফলোয়ার ও এলিজিবিলিটি',
    question: 'আমার ১ হাজার follower আছে, monetize হবে?',
    answer:
      'শুধু ১,০০০ follower থাকলেই monetization নিশ্চিত হয় না। আপনার account কোন feature-এর জন্য eligible এবং বর্তমানে কোনো policy/content issue আছে কি না—এসব আগে দেখতে হবে।',
    keywords: ['১ হাজার follower', '1000 follower', '1k follower', '1 hazar follower'],
  },
  {
    id: 'qa-6',
    category: 'ফলোয়ার ও এলিজিবিলিটি',
    question: 'আমার ১০ হাজার follower আছে, কিন্তু monetization নেই কেন?',
    answer:
      'Follower count একমাত্র eligibility factor নয়। আপনার content originality, policy status, account history, region এবং নির্দিষ্ট monetization feature-এর requirements-এর কারণে eligibility না-ও হতে পারে। আপনার dashboard/status দেখলে কারণটি আরও নির্দিষ্টভাবে বলা যাবে।',
    keywords: ['১০ হাজার follower', '10000 follower', '10k follower', 'monetization নেই কেন', '10k follower monetize'],
    actionType: 'upload_screenshot',
    actionPrompt: 'ড্যাশবোর্ড স্ট্যাটাসের স্ক্রিনশট দিন',
  },
  {
    id: 'qa-7',
    category: 'ফলোয়ার ও এলিজিবিলিটি',
    question: 'আমার page নতুন, monetize করানো যাবে?',
    answer:
      'নতুন Page-এর ক্ষেত্রে eligibility নির্ভর করবে Meta-এর বর্তমান requirements এবং আপনার account/content status-এর ওপর। শুধু নতুন হওয়া বা পুরোনো হওয়া দিয়ে নিশ্চিত সিদ্ধান্ত দেওয়া যায় না।',
    keywords: ['page নতুন', 'notun page', 'new page', 'নতুন পেজ monetize'],
  },
  {
    id: 'qa-8',
    category: 'সার্ভিস শুরু ও লিংক',
    question: 'Monetization করাতে আপনাদের কী কী লাগবে?',
    answer:
      'সাধারণত Page/Profile link এবং account-এর relevant Monetization/Policy status প্রয়োজন হয়। Case অনুযায়ী dashboard screenshot, content information বা অন্য প্রয়োজনীয় তথ্য চাইতে পারি। প্রয়োজনের বাইরে sensitive login information দেওয়া উচিত নয়।',
    keywords: ['কী কী লাগবে', 'ki ki lagbe', 'আপনাদের কি কি লাগবে', 'requirements ki'],
    actionType: 'upload_screenshot',
    actionPrompt: 'প্রয়োজনীয় ড্যাশবোর্ড স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-9',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'Facebook password দিতে হবে?',
    answer:
      'আপনার password অযথা কাউকে দেওয়া উচিত নয়। আমরা প্রয়োজনীয় কাজের জন্য কোন access বা information দরকার তা আগে পরিষ্কারভাবে জানাব। Security-এর জন্য password/OTP-এর মতো sensitive information শেয়ার না করাই নিরাপদ।',
    keywords: ['password দিতে হবে', 'fb password', 'facebook password', 'password dite hobe'],
  },
  {
    id: 'qa-10',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'OTP দিতে হবে?',
    answer:
      'Security verification-এর ক্ষেত্রে Meta নিজস্ব system-এর মাধ্যমে OTP চাইতে পারে, কিন্তু আপনার OTP অন্য কারও সঙ্গে share করা উচিত নয়। আমরা কোনো sensitive verification code চ্যাটে চেয়ে নেব না।',
    keywords: ['otp দিতে হবে', 'otp lagbe', 'otp dite hobe'],
  },
  {
    id: 'qa-11',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'Business Manager access দিতে হবে?',
    answer:
      'Service-এর ধরন অনুযায়ী Business Manager/Business Portfolio access প্রয়োজন হতে পারে। তবে access দেওয়ার আগে কোন permission কেন প্রয়োজন তা পরিষ্কারভাবে জেনে নিন এবং অপ্রয়োজনীয় full control দেওয়া এড়িয়ে চলুন।',
    keywords: ['business manager access', 'bm access', 'portfolio access', 'বিজনেস ম্যানেজার'],
  },
  {
    id: 'qa-12',
    category: 'প্যাকেজ ও ফি',
    question: 'Monetization করতে কত টাকা লাগে?',
    answer:
      'Service fee account-এর condition এবং আপনি কোন service নিচ্ছেন তার ওপর নির্ভর করে। আপনার Page/Profile-এর status দেখে আমরা applicable package ও price জানিয়ে দেব। Current price: 2,999।',
    keywords: ['কত টাকা লাগে', 'service fee', 'koto taka lage', 'price koto', 'প্যাকেজ মূল্য'],
    actionType: 'order_package',
    actionPrompt: '৳২,৯৯৯ প্যাকেজে অর্ডার ফর্ম পূরণ করুন',
  },
  {
    id: 'qa-13',
    category: 'প্যাকেজ ও ফি',
    question: 'কাজ না হলে টাকা ফেরত দেবেন?',
    answer:
      'Refund সম্পূর্ণভাবে আমাদের stated refund policy-এর ওপর নির্ভর করে। Meta-এর approval আমাদের direct control-এর মধ্যে নয়, তাই payment করার আগে applicable refund terms অবশ্যই জেনে নিন। আমাদের refund policy: (no refund)',
    keywords: ['টাকা ফেরত দেবেন', 'refund pabo', 'refund policy', 'taka ferot'],
  },
  {
    id: 'qa-14',
    category: 'প্যাকেজ ও ফি',
    question: 'Discount আছে?',
    answer:
      'বর্তমানে কোনো active discount থাকলে আমরা জানিয়ে দেব। আপনার প্রয়োজন অনুযায়ী available package ও price জানতে Page/Profile details পাঠাতে পারেন।',
    keywords: ['discount আছে', 'discount pabo', 'kom rakha jabe', 'discount ache'],
  },
  {
    id: 'qa-15',
    category: 'সময় ও গ্যারান্টি',
    question: 'Monetization হতে কত সময় লাগে?',
    answer:
      'নির্দিষ্ট সময় guarantee করা যায় না, কারণ review ও approval Meta-এর systems-এর ওপর নির্ভর করে। আপনার account condition অনুযায়ী estimated processing time [28days] হতে পারে, তবে এটি guaranteed approval time নয়।',
    keywords: ['কত সময় লাগে', 'koto shomoy lage', 'processing time', 'koto din'],
  },
  {
    id: 'qa-16',
    category: 'সময় ও গ্যারান্টি',
    question: 'আজকে দিলে আজকেই monetize হবে?',
    answer:
      'এটি guarantee করা সম্ভব নয়। Meta-এর review/eligibility process-এর সময় account অনুযায়ী পরিবর্তিত হতে পারে। আমরা আমাদের side-এর required কাজ যথাযথভাবে করার চেষ্টা করি, কিন্তু final approval Meta-এর হাতে।',
    keywords: ['আজকে দিলে আজকেই', 'ajke dilei ajke', 'same day monetize'],
  },
  {
    id: 'qa-17',
    category: 'সময় ও গ্যারান্টি',
    question: '২৪ ঘণ্টার মধ্যে হবে?',
    answer:
      '২৪ ঘণ্টার approval guarantee করা ঠিক হবে না। যদি আপনার account already eligible থাকে এবং শুধু নির্দিষ্ট setup প্রয়োজন হয়, process দ্রুত হতে পারে; কিন্তু Meta review প্রয়োজন হলে সময় বেশি লাগতে পারে।',
    keywords: ['২৪ ঘণ্টার মধ্যে', '24 ghonta', '24 hours', '24 hour monetize'],
  },
  {
    id: 'qa-18',
    category: 'সময় ও গ্যারান্টি',
    question: 'কতদিন অপেক্ষা করতে হবে?',
    answer:
      'আপনার account-এর current status এবং কোন monetization feature-এর জন্য কাজ হচ্ছে তার ওপর নির্ভর করবে। Assessment করার পর সম্ভাব্য timeline জানানো হবে।',
    keywords: ['কতদিন অপেক্ষা', 'koto din opekkha', 'wait korte hobe'],
  },
  {
    id: 'qa-19',
    category: 'সময় ও গ্যারান্টি',
    question: '100% monetization guarantee করেন?',
    answer:
      'Meta-এর final approval আমাদের control-এর বাইরে, তাই 100% approval guarantee দেওয়া সম্ভব নয়। আমরা আপনার account assessment করে eligible হওয়ার সম্ভাবনা, সমস্যা এবং প্রয়োজনীয় steps সম্পর্কে সঠিক information দেওয়ার চেষ্টা করি।',
    keywords: ['100% guarantee', '১০০% গ্যারান্টি', 'guarantee koren', 'guarantee ache'],
  },
  {
    id: 'qa-20',
    category: 'সময় ও গ্যারান্টি',
    question: 'টাকা দিলে নিশ্চিত monetization হবে?',
    answer:
      'Payment service process-এর জন্য হতে পারে, কিন্তু payment করলেই Meta approval নিশ্চিত হয় না। Account eligibility ও policy compliance-এর ওপর final result নির্ভর করে।',
    keywords: ['টাকা দিলে নিশ্চিত', 'taka dile nishchit', 'payment korle hobe'],
  },
  {
    id: 'qa-21',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'আপনারা কি Facebook-এর employee?',
    answer:
      'না। আমরা independent service provider হিসেবে কাজ করি। আমরা Meta/Facebook-এর employee নই এবং Meta-এর internal approval system-এর direct control আমাদের নেই।',
    keywords: ['facebook এর employee', 'meta employee', 'facebook er staff'],
  },
  {
    id: 'qa-22',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'আপনারা কি Meta-এর ভিতর থেকে monetization approve করেন?',
    answer:
      'না। Monetization approval Meta-এর নিজস্ব system ও review process-এর মাধ্যমে হয়। আমরা service provider হিসেবে assessment, guidance এবং applicable setup/process-এ সহায়তা করি।',
    keywords: ['ভিতর থেকে approve', 'vitor theke approve', 'internal approve'],
  },
  {
    id: 'qa-23',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'আমার monetization reject হয়েছে। এখন কী করব?',
    answer:
      'প্রথমে rejection-এর exact reason দেখতে হবে। আপনি Monetization Dashboard-এর notice/rejection screenshot দিলে আমরা issueটি বুঝে বলতে পারব এটি policy, content, eligibility নাকি অন্য কোনো কারণে হয়েছে এবং available next step কী হতে পারে।',
    keywords: ['reject হয়েছে', 'monetization reject', 'rejected hoyeche', 'reject hole ki korbo'],
    actionType: 'upload_screenshot',
    actionPrompt: 'রিজেকশন নোটিশের স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-24',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Monetization application rejected হলে আবার apply করা যাবে?',
    answer:
      'অনেক ক্ষেত্রে available review/appeal বা পুনরায় eligibility অর্জনের পথ থাকতে পারে, তবে এটি rejection reason-এর ওপর নির্ভর করে। আগে rejection notice দেখে সঠিক option নির্ধারণ করা উচিত।',
    keywords: ['rejected হলে আবার apply', 're-apply', 'abar apply kora jabe'],
    actionType: 'upload_screenshot',
    actionPrompt: 'রিজেকশন নোটিশের স্ক্রিনশট পাঠান',
  },
  {
    id: 'qa-25',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Rejected page কি monetize করানো সম্ভব?',
    answer:
      'কিছু rejection fixable হতে পারে, আবার কিছু ক্ষেত্রে eligibility না থাকলে অপেক্ষা বা content/account improvement প্রয়োজন হতে পারে। আমরা আগে rejection reason দেখে তারপর realistic solution জানাব।',
    keywords: ['rejected page কি monetize', 'rejected page monetize shombhob'],
  },
  {
    id: 'qa-26',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Appeal করে monetization আনতে পারবেন?',
    answer:
      'আপনার account-এ যদি official appeal/review option available থাকে, আমরা process সম্পর্কে guide করতে পারি। তবে appeal-এর final decision Meta নেয় এবং approval guarantee করা যায় না।',
    keywords: ['appeal করে monetization', 'appeal kora jabe', 'appeal guide'],
  },
  {
    id: 'qa-27',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'আমার monetization disabled হয়ে গেছে, ঠিক করে দিতে পারবেন?',
    answer:
      'প্রথমে disable হওয়ার কারণ জানতে হবে। Monetization status-এর notice বা screenshot দিলে আমরা issue assess করে বলতে পারব এটি policy/content/eligibility-related কি না এবং available remediation বা appeal option আছে কি না।',
    keywords: ['monetization disabled', 'disable হয়ে গেছে', 'disabled thik kora'],
    actionType: 'upload_screenshot',
    actionPrompt: 'ডিসাবল নোটিশের স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-28',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Monetization disable হওয়ার পর আবার চালু করা যায়?',
    answer:
      'কারণের ওপর নির্ভর করে কিছু ক্ষেত্রে eligibility ফিরে পাওয়ার সুযোগ থাকতে পারে। তবে সব disabled account recover করা সম্ভব—এমন guarantee দেওয়া যাবে না।',
    keywords: ['disable হওয়ার পর আবার চালু', 'disabled recover', 'abar chalu kora jay'],
  },
  {
    id: 'qa-29',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Policy violation-এর কারণে monetization বন্ধ হয়েছে। কী করব?',
    answer:
      'প্রথমে কোন policy এবং কোন content-এর কারণে issue হয়েছে তা identify করতে হবে। সমস্যাযুক্ত content থাকলে applicable policy অনুযায়ী correction করতে হবে এবং account-এ available review/appeal option থাকলে সেটি ব্যবহার করা যেতে পারে।',
    keywords: ['policy violation', 'পলিসি ভায়োলেশন', 'monetization bondho'],
    actionType: 'upload_screenshot',
    actionPrompt: 'পলিসি ভায়োলেশনের স্ক্রিনশট দিন',
  },
  {
    id: 'qa-30',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'আমার page-এ copyright আছে। Monetization হবে?',
    answer:
      'Copyright issue থাকলে monetization eligibility প্রভাবিত হতে পারে। আগে আপনার copyright status ও affected content দেখতে হবে। Rights না থাকা content ব্যবহার করে monetization করার চেষ্টা করা নিরাপদ নয়।',
    keywords: ['page এ copyright', 'কপিরাইট আছে', 'copyright issue', 'copyright thakle'],
  },
  {
    id: 'qa-31',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'অন্যের ভিডিও upload করে monetize করা যাবে?',
    answer:
      'শুধু অন্যের ভিডিও re-upload করে monetization করার ওপর নির্ভর করা উচিত নয়। Copyright ownership এবং Meta-এর originality requirements গুরুত্বপূর্ণ।',
    keywords: ['অন্যের ভিডিও upload', 'onner video', 'reupload video', 'other video upload'],
  },
  {
    id: 'qa-32',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'Reused content থাকলে monetization হবে?',
    answer:
      'Reused বা unoriginal content monetization eligibility-এর ক্ষেত্রে সমস্যা তৈরি করতে পারে। আপনার content কীভাবে তৈরি হচ্ছে এবং কতটা original value যোগ করা হচ্ছে—এসব review করা প্রয়োজন।',
    keywords: ['reused content', 'unoriginal content', 'রিইউজড কনটেন্ট'],
  },
  {
    id: 'qa-33',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'অন্যের ভিডিওতে নিজের voice দিলেই original হয়ে যাবে?',
    answer:
      'শুধু voice যোগ করলেই automatically original content হয়ে যায়—এমন নয়। Content-এর overall transformation, meaningful contribution এবং applicable policies গুরুত্বপূর্ণ।',
    keywords: ['নিজের voice দিলেই', 'voiceover dile', 'voice dile original'],
  },
  {
    id: 'qa-34',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'AI দিয়ে video বানালে monetize হবে?',
    answer:
      'AI ব্যবহার করলেই automatically monetization বন্ধ হয় না। তবে content original, valuable এবং applicable Meta policies অনুযায়ী হতে হবে। Misleading বা policy-violating AI content সমস্যা তৈরি করতে পারে।',
    keywords: ['ai দিয়ে video', 'ai video', 'artificial intelligence video', 'ai content monetize'],
  },
  {
    id: 'qa-35',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'বাংলাদেশ থেকে Facebook monetization করা যায়?',
    answer:
      'Monetization feature country ও account অনুযায়ী available হতে পারে। আপনার account-এ কোন feature available তা Professional Dashboard/Monetization section দেখে নিশ্চিত করা সবচেয়ে ভালো।',
    keywords: ['বাংলাদেশ থেকে monetization', 'bangladesh theke monetization', 'bd theke monetize'],
  },
  {
    id: 'qa-36',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'Bangladesh page হলে আপনারা কাজ করেন?',
    answer:
      'জি, Bangladesh-based clients-এর account assessment ও available Facebook monetization services নিয়ে আমরা কাজ করি। আপনার Page/Profile status পাঠালে আপনার ক্ষেত্রে কী করা সম্ভব তা জানানো যাবে।',
    keywords: ['bangladesh page হলে', 'bangladeshi page', 'bd client kaj koren'],
  },
  {
    id: 'qa-37',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'Bangladesh থেকে payout নেওয়া যাবে?',
    answer:
      'Payout availability এবং payment method account ও country-এর ওপর নির্ভর করে। আপনার account-এ Meta বর্তমানে কোন payout method দেখাচ্ছে সেটি যাচাই করা প্রয়োজন।',
    keywords: ['bangladesh থেকে payout', 'bd payout', 'bank payout bangladesh', 'টাকা তোলা যাবে'],
  },
  {
    id: 'qa-38',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'Monetization হলে টাকা কোথায় আসে?',
    answer:
      'Eligible monetization earnings Meta-এর configured payout account/method-এর মাধ্যমে প্রদান করা হয়। আপনার account-এ কোন payout method available সেটি payout settings থেকে দেখতে হবে।',
    keywords: ['টাকা কোথায় আসে', 'taka kothay ashe', 'payout account', 'bank account taka'],
  },
  {
    id: 'qa-39',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'Monetization হওয়ার পর সঙ্গে সঙ্গে টাকা পাওয়া যাবে?',
    answer:
      'সাধারণত earnings তৈরি হওয়ার পর applicable payout threshold, payment setup এবং Meta-এর payout schedule অনুযায়ী payment process হয়। Monetization enable হওয়া এবং টাকা হাতে পাওয়া একই বিষয় নয়।',
    keywords: ['সঙ্গে সঙ্গে টাকা পাওয়া যাবে', 'shonge shonge taka', 'instant payout'],
  },
  {
    id: 'qa-40',
    category: 'বাংলাদেশ ও পেআউট',
    question: 'Monetization হলে মাসে কত টাকা আয় হবে?',
    answer:
      'নির্দিষ্ট monthly income guarantee করা যায় না। Earnings content performance, audience, geography, advertiser demand, monetization feature এবং অন্যান্য factors-এর ওপর নির্ভর করে।',
    keywords: ['মাসে কত টাকা আয়', 'monthly income', 'mashe koto taka', 'earning koto hobe'],
  },
  {
    id: 'qa-41',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Page Quality খারাপ হলে monetize হবে?',
    answer:
      'Page Quality বা policy-related restrictions থাকলে monetization eligibility প্রভাবিত হতে পারে। আগে restriction-এর কারণ দেখে সেটি resolve করার সম্ভাবনা যাচাই করা উচিত।',
    keywords: ['page quality খারাপ', 'page quality issue', 'page quality red', 'page quality yellow'],
  },
  {
    id: 'qa-42',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Page-এ warning আছে, তারপরও monetize হবে?',
    answer:
      'Warning-এর ধরন গুরুত্বপূর্ণ। সব warning একই ধরনের restriction তৈরি করে না। Screenshot দিলে আমরা বুঝতে সাহায্য করতে পারব কোন issueটি monetization-এর জন্য গুরুত্বপূর্ণ।',
    keywords: ['page এ warning', 'warning ache', 'warning thakleo'],
    actionType: 'upload_screenshot',
    actionPrompt: 'ওয়ার্নিং স্ক্রিনশট আপলোড করুন',
  },
  {
    id: 'qa-43',
    category: 'রিজেকশন ও পলিসি ইস্যু',
    question: 'Account restricted হলে monetization করাতে পারবেন?',
    answer:
      'Restriction-এর কারণ না দেখে কোনো promise করা যাবে না। আগে restriction notice review করতে হবে, তারপর available recovery/review option থাকলে সেটি নিয়ে guide করা যাবে।',
    keywords: ['account restricted', 'restricted hole', 'অ্যাকাউন্ট রেস্ট্রিক্টেড'],
    actionType: 'upload_screenshot',
    actionPrompt: 'রেস্ট্রিকশন নোটিশের স্ক্রিনশট দিন',
  },
  {
    id: 'qa-44',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'Monetization পাওয়ার জন্য কী ধরনের content বানাব?',
    answer:
      'Original, audience-focused এবং নিয়মিত valuable content তৈরি করা সবচেয়ে গুরুত্বপূর্ণ। আপনার niche অনুযায়ী educational, entertainment, informational বা অন্য ধরনের original content strategy তৈরি করা যেতে পারে।',
    keywords: ['কী ধরনের content বানাব', 'ki dhoroner content', 'content idea'],
  },
  {
    id: 'qa-45',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'শুধু Reels দিলেই monetization হবে?',
    answer:
      'শুধু Reels post করলেই monetization নিশ্চিত নয়। Content originality, account eligibility, policy compliance এবং applicable monetization program-এর requirements পূরণ করতে হবে।',
    keywords: ['শুধু reels দিলেই', 'shudhu reels', 'reels monetization'],
  },
  {
    id: 'qa-46',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'প্রতিদিন কতগুলো video upload করব?',
    answer:
      'নির্দিষ্ট সংখ্যা সবার জন্য একই নয়। Quality, consistency এবং audience response-এর ওপর ভিত্তি করে posting strategy তৈরি করা ভালো। অতিরিক্ত low-quality/repetitive content এড়িয়ে চলুন।',
    keywords: ['প্রতিদিন কতগুলো video', 'protidin koyta video', 'daily video upload'],
  },
  {
    id: 'qa-47',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'আপনাদের service নিতে Facebook password দিতে হবে?',
    answer:
      'Security-এর কারণে password share না করাই ভালো। কোন কাজের জন্য কী ধরনের access/information প্রয়োজন তা আমরা আগে জানাব।',
    keywords: ['service নিতে password', 'apnader password dite hobe'],
  },
  {
    id: 'qa-48',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'আমার account নিরাপদ থাকবে তো?',
    answer:
      'Account security অত্যন্ত গুরুত্বপূর্ণ। আমরা অপ্রয়োজনীয় sensitive information না নেওয়ার নীতি অনুসরণ করি। Client-এরও উচিত password, OTP, recovery code বা অন্য sensitive credential কারও সঙ্গে share না করা।',
    keywords: ['account নিরাপদ থাকবে', 'account safe thakbe', 'security safe'],
  },
  {
    id: 'qa-49',
    category: 'সিকিউরিটি ও অ্যাক্সেস',
    question: 'আমার Facebook account hack হওয়ার chance আছে?',
    answer:
      'যেকোনো account-এ security risk থাকতে পারে, বিশেষ করে password/OTP share করলে। তাই strong password, two-factor authentication এবং Meta-এর official security features ব্যবহার করা উচিত।',
    keywords: ['account hack হওয়ার chance', 'hack hobe kina', 'account hack chance'],
  },
  {
    id: 'qa-50',
    category: 'কনটেন্ট ও কপিরাইট',
    question: 'Viral video দিলে monetization হবে?',
    answer:
      'Viral হওয়া এবং monetization eligibility আলাদা বিষয়। Viral content audience বাড়াতে সাহায্য করতে পারে, কিন্তু account-কে applicable monetization requirements পূরণ করতে হবে।',
    keywords: ['viral video দিলে', 'viral holei monetization', 'viral video monetization'],
  },
];

export interface AutoReplyResult {
  text: string;
  actionType?: 'upload_screenshot' | 'send_page_link' | 'order_package' | 'request_contact_info';
  actionPrompt?: string;
  matchedQuestion?: string;
  isEscalation?: boolean;
}

/**
 * Intelligent automatic response matching
 * 1. Matches keywords from the official QA database instantly
 * 2. Never displays any phone numbers
 * 3. Detects complex/unusual problems and asks user for contact info (Name, Phone, Page Link) so Admin can review and reach out
 */
export const generateAutoReply = async (userMessage: string): Promise<AutoReplyResult> => {
  const clean = userMessage.trim().toLowerCase();

  if (!clean) {
    return {
      text: 'অনুগ্রহ করে আপনার প্রশ্নটি লিখুন। আপনি আপনার পেজের সমস্যা বিস্তারিত লিখলেই আমরা প্রাসঙ্গিক সমাধান জানিয়ে দেব।',
    };
  }

  // 1. Exact or near-exact question match from knowledge base
  for (const item of AUTOMATED_QA_LIST) {
    const qLower = item.question.toLowerCase();
    if (clean === qLower || clean.includes(qLower) || qLower.includes(clean)) {
      return {
        text: item.answer,
        actionType: item.actionType,
        actionPrompt: item.actionPrompt,
        matchedQuestion: item.question,
      };
    }
  }

  // 2. Keyword score matching across all official items
  let bestItem: AutomatedQAItem | null = null;
  let bestScore = 0;

  for (const item of AUTOMATED_QA_LIST) {
    let score = 0;
    for (const kw of item.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += 3;
      }
    }

    // Also check tokenized words in question
    const qWords = item.question.toLowerCase().split(/\s+/);
    for (const word of qWords) {
      if (word.length > 3 && clean.includes(word)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  // If good keyword match found, deliver instant answer
  if (bestItem && bestScore >= 2) {
    return {
      text: bestItem.answer,
      actionType: bestItem.actionType,
      actionPrompt: bestItem.actionPrompt,
      matchedQuestion: bestItem.question,
    };
  }

  // 3. General greeting or basic inquiry
  if (/^(hi|hello|hey|সালাম|আসসালামু আলাইকুম|hlo|hii|good morning|good evening)/i.test(clean)) {
    return {
      text: 'আসসালামু আলাইকুম! Expart BD লাইভ সাপোর্টে স্বাগতম। ফেসবুক কনটেন্ট মনিটাইজেশন, পলিসি ইস্যু বা সেটআপ সংক্রান্ত আপনার যেকোনো সমস্যা বা প্রশ্ন এখানে বিস্তারিত লিখুন—আমরা সঙ্গে সঙ্গে উত্তর ও সমাধান জানিয়ে দেব।',
      actionType: 'send_page_link',
      actionPrompt: 'আপনার ফেসবুক পেজ লিংক দিন',
    };
  }

  // 4. Escalation Trigger: Unusual / complex / specific / contact / admin-needed issue
  // When visitor mentions unusual difficulties, hacking, copyright strikes, legal issues, or questions that don't match standard Q&A
  const isUnusualOrComplex = 
    /অস্বাভাবিক|সমস্যা|ঝামেলা|হ্যাক|হ্যাকড|আইনি|কোর্ট|স্ট্রাইক|ব্লক|ব্যান|স্থগিত|রেস্ট্রিক্ট|জরুরি|অ্যাডমিন|কথা বলতে চাই|কল দিতে|ফোন দিতে|অভিযোগ|কথা বলা যাবে|মানুষের সাথে|contact|talk|call|admin|problem|complex|strike|hacked|stolen|ban/i.test(clean) ||
    clean.length > 40;

  if (isUnusualOrComplex) {
    return {
      text: 'আপনার বিষয়টি একটি বিশেষ ও স্পেসিফিক সমস্যা। আমাদের সিস্টেম এটি রেকর্ড করেছে এবং আমাদের অ্যাডমিন সরাসরি এটি তদন্ত করে দেখবেন।\n\nঅনুগ্রহ করে নিচে আপনার নাম, যোগাযোগ নম্বর ও পেজ লিংক দিন। অ্যাডমিন আপনার তথ্য পর্যালোচনা করে সরাসরি আপনার সাথে যোগাযোগ করবেন।',
      actionType: 'request_contact_info',
      actionPrompt: 'আপনার যোগাযোগের তথ্য দিন',
      isEscalation: true,
    };
  }

  // 5. Default intelligent response (strictly no phone number)
  return {
    text: 'আপনার প্রশ্নের জন্য ধন্যবাদ! Expart BD-এর বিশেষায়িত ফেসবুক কনটেন্ট মনিটাইজেশন প্যাকেজ (৳২,৯৯৯) সংক্রান্ত যেকোনো তথ্য জানতে চাইলে বা আপনার পেজের স্পেসিফিক কোনো সমস্যা থাকলে বিস্তারিত জানাতে পারেন। আপনি পেজ লিংক অথবা ড্যাশবোর্ডের স্ক্রিনশট দিলেও আমরা সাথে সাথে রিভিউ করে সমাধান জানিয়ে দেব।',
    actionType: 'upload_screenshot',
    actionPrompt: 'ড্যাশবোর্ড স্ক্রিনশট বা পেজ লিংক দিন',
  };
};
