import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  HelpCircle,
  Search,
  Camera,
  Image as ImageIcon,
  ExternalLink,
  CreditCard,
  CheckCircle2,
  Paperclip,
  Headphones
} from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';
import { ChatSession, ClientLocationData } from '../types';
import {
  getOrCreateCurrentSession,
  sendClientMessage,
  getChatSessions,
} from '../utils/chatStorage';
import { captureClientLocation } from '../utils/clientLocation';
import { AUTOMATED_QA_LIST, AUTOMATED_QA_CATEGORIES, AutomatedQAItem } from '../utils/chatAiEngine';
import { recordActivity } from '../utils/activityTracker';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clientLocation, setClientLocation] = useState<ClientLocationData | undefined>();
  
  // QA Drawer State
  const [showQaDrawer, setShowQaDrawer] = useState(false);
  const [qaSearch, setQaSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব প্রশ্ন');

  // Interactive Action Popups
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [showPageLinkModal, setShowPageLinkModal] = useState(false);
  const [pageLinkInput, setPageLinkInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize session and location
  useEffect(() => {
    captureClientLocation().then((loc) => {
      setClientLocation(loc);
      setSession(getOrCreateCurrentSession(loc));
    });

    const handleChatChange = () => {
      const all = getChatSessions();
      const currId = session?.id || getOrCreateCurrentSession().id;
      const found = all.find((s) => s.id === currId);
      if (found) {
        setSession(found);
      }
    };

    window.addEventListener('expart_chat_changed', handleChatChange);
    return () => window.removeEventListener('expart_chat_changed', handleChatChange);
  }, [session?.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && !showQaDrawer) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.messages, isTyping, isOpen, showQaDrawer]);

  const handleSend = async (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim() || isTyping) return;

    setInputText('');
    setShowQaDrawer(false);
    setIsTyping(true);

    try {
      recordActivity('chat', 'লাইভ চ্যাটে প্রশ্ন করেছেন', `প্রশ্ন: "${message.slice(0, 80)}"`, 'সাপোর্ট চ্যাট');
      const updated = await sendClientMessage(message, clientLocation);
      setSession(updated);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle Screenshot Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('স্ক্রিনশটের সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setIsTyping(true);
      setShowScreenshotModal(false);
      try {
        const updated = await sendClientMessage(
          '📸 আমার ফেসবুক মনিটাইজেশন/পলিসি স্ক্রিনশট আপলোড করেছি',
          clientLocation,
          dataUrl,
          file.name
        );
        setSession(updated);
      } catch (err) {
        console.error('Error uploading screenshot:', err);
      } finally {
        setIsTyping(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle Page Link Submission
  const handlePageLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageLinkInput.trim()) return;

    const link = pageLinkInput.trim();
    setPageLinkInput('');
    setShowPageLinkModal(false);
    await handleSend(`আমার ফেসবুক পেজ লিংক: ${link}`);
  };

  // Scroll to order form
  const handleScrollToOrder = () => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById('order-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Filtered QA list
  const filteredQa = AUTOMATED_QA_LIST.filter((item) => {
    const matchesCategory =
      selectedCategory === 'সব প্রশ্ন' || item.category === selectedCategory;
    const matchesSearch =
      !qaSearch.trim() ||
      item.question.toLowerCase().includes(qaSearch.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(qaSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <aside aria-label="Customer live chat assistant" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Hidden file input for screenshot upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Floating Chat Box */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30">
                <ExpartBDLogo variant="icon" iconClassName="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">
                    Expart BD লাইভ সাপোর্ট টিম
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-white/90 font-medium">
                  আমাদের প্রতিনিধি একটিভ আছেন · আপনি সাজেস্টেড প্রশ্ন করুন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Question Icon Toggle Button */}
              <button
                type="button"
                onClick={() => setShowQaDrawer(!showQaDrawer)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  showQaDrawer
                    ? 'bg-white text-orange-700 shadow-md'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                title="সকল প্রশ্ন তালিকা দেখুন"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">সাজেস্টেড প্রশ্ন</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
                title="চ্যাট মিনিমাইজ করুন"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* QA DRAWER / POPUP: When Question Icon is Clicked */}
          {showQaDrawer ? (
            <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
              <div className="p-3 bg-white border-b border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Headphones className="w-4 h-4 text-emerald-600" />
                    <span>আমাদের প্রতিনিধি একটিভ আছেন, আপনি সাজেস্টেড প্রশ্ন করুন:</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQaDrawer(false)}
                    className="text-xs text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={qaSearch}
                    onChange={(e) => setQaSearch(e.target.value)}
                    placeholder="প্রশ্ন খুঁজুন (যেমন: ফলোয়ার, রিজেকশন, ফি)..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Categories Horizontal Scroll */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                  {AUTOMATED_QA_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-orange-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredQa.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    কোনো প্রশ্ন পাওয়া যায়নি।
                  </div>
                ) : (
                  filteredQa.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSend(item.question)}
                      className="w-full text-left p-3 rounded-2xl bg-white hover:bg-orange-50/70 border border-slate-200 hover:border-orange-300 transition-all text-xs font-semibold text-slate-800 flex items-start justify-between gap-2 shadow-2xs group cursor-pointer"
                    >
                      <span className="group-hover:text-orange-700 leading-snug">
                        {item.question}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.actionType === 'upload_screenshot' && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSend(item.question);
                              setTimeout(() => {
                                fileInputRef.current?.click();
                              }, 350);
                            }}
                            className="px-2 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 text-[10px] font-bold flex items-center gap-1 border border-orange-300 transition-colors shadow-2xs cursor-pointer"
                            title="স্ক্রিনশট আপলোড করুন"
                          >
                            <Camera className="w-3 h-3 text-orange-600" />
                            <span>স্ক্রিনশট</span>
                          </span>
                        )}
                        <span className="text-[10px] font-normal text-orange-600 bg-orange-50 group-hover:bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
                          জিজ্ঞেস করুন →
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Standard Messages Stream */
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
              {session?.messages.map((msg) => {
                const isClient = msg.sender === 'client';
                const isAdmin = msg.sender === 'admin';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div className="flex items-end gap-1.5 max-w-[90%]">
                      {!isClient && (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mb-0.5">
                          {isAdmin ? (
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                          ) : (
                            <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                      )}

                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-line shadow-xs ${
                          isClient
                            ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white rounded-br-xs'
                            : isAdmin
                            ? 'bg-amber-50 text-slate-900 border border-amber-300 rounded-bl-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {isAdmin && (
                          <div className="text-[10px] font-bold text-amber-700 mb-1 flex items-center gap-1">
                            <span>👨‍💼 অ্যাডমিন উত্তর</span>
                          </div>
                        )}
                        {!isClient && !isAdmin && (
                          <div className="text-[10px] font-bold text-emerald-700 mb-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>লাইভ সাপোর্ট টিম (Live Support Team)</span>
                          </div>
                        )}

                        {/* Text */}
                        <div>{msg.text}</div>

                        {/* Attachment Thumbnail if client uploaded image */}
                        {msg.attachmentUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-white/30 shadow-sm max-w-[200px]">
                            <img
                              src={msg.attachmentUrl}
                              alt="Uploaded screenshot"
                              className="w-full max-h-36 object-cover cursor-pointer hover:opacity-95"
                              onClick={() => setPreviewImage(msg.attachmentUrl || null)}
                            />
                            <div className="text-[10px] bg-black/50 text-white px-2 py-0.5 text-center">
                              স্ক্রিনশট সংযুক্ত
                            </div>
                          </div>
                        )}

                        {/* Interactive Action Trigger Buttons based on reply */}
                        {!isClient && msg.actionType === 'upload_screenshot' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Camera className="w-3.5 h-3.5 text-orange-600" />
                              <span>📸 স্ক্রিনশট আপলোড করুন</span>
                            </button>
                          </div>
                        )}

                        {!isClient && msg.actionType === 'send_page_link' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setShowPageLinkModal(true)}
                              className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                              <span>🔗 পেজ বা প্রোফাইল লিংক দিন</span>
                            </button>
                          </div>
                        )}

                        {!isClient && msg.actionType === 'order_package' && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={handleScrollToOrder}
                              className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                              <span>💳 প্যাকেজ অর্ডার করুন (৳২,৯৯৯)</span>
                            </button>
                          </div>
                        )}

                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 px-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200 w-fit animate-pulse">
                  <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                  <span>লাইভ সাপোর্ট টিম উত্তর লিখছে...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quick FAQ Suggestion Bar */}
          {!showQaDrawer && (
            <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 flex items-center justify-center text-xs">
              <button
                type="button"
                onClick={() => setShowQaDrawer(true)}
                className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-orange-700 hover:text-orange-800 transition-colors cursor-pointer w-full py-0.5"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                <span>আমাদের প্রতিনিধি একটিভ আছেন · সাজেস্টেড প্রশ্ন করুন</span>
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            {/* Question icon in input box */}
            <button
              type="button"
              onClick={() => setShowQaDrawer(!showQaDrawer)}
              className="w-9 h-9 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="সকল প্রশ্ন তালিকা"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder="আপনার প্রশ্নটি লিখুন..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-amber-500 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-orange-600/20 shrink-0"
              title="মেসেজ পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Page Link Submission Modal Popup */}
      {showPageLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ExternalLink className="w-4 h-4 text-orange-600" />
                <span>আপনার ফেসবুক পেজ লিংক দিন</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPageLinkModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePageLinkSubmit} className="space-y-3">
              <input
                type="url"
                required
                value={pageLinkInput}
                onChange={(e) => setPageLinkInput(e.target.value)}
                placeholder="https://facebook.com/yourpagename"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                চ্যাটে লিংক পাঠান
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-lg max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}

      {/* Floating Trigger Bubble Button (Right Side) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>

        {isOpen ? (
          <>
            <X className="w-5 h-5 text-white" />
            <span>চ্যাট বন্ধ করুন</span>
          </>
        ) : (
          <>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="tracking-wide">লাইভ চ্যাট</span>
            <span className="hidden sm:inline-block text-[11px] font-normal opacity-90 border-l border-white/30 pl-2">
              ২৪/৭ ইনস্ট্যান্ট রিপ্লাই
            </span>
          </>
        )}
      </button>

    </aside>
  );
};
