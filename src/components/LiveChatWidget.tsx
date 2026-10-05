import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { ExpartBDLogo } from './ExpartBDLogo';
import { ChatSession, ClientLocationData } from '../types';
import {
  getOrCreateCurrentSession,
  sendClientMessage,
  getChatSessions,
} from '../utils/chatStorage';
import { captureClientLocation } from '../utils/clientLocation';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clientLocation, setClientLocation] = useState<ClientLocationData | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.messages, isTyping, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim() || isTyping) return;

    setInputText('');
    setIsTyping(true);

    try {
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

  const quickQuestions = [
    'প্যাকেজের মূল্য কত?',
    'কীভাবে পেমেন্ট করব?',
    'TrxID কীভাবে দেব?',
    'মনিটাইজেশনের শর্ত কী?',
  ];

  return (
    <aside aria-label="Customer live chat assistant" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Floating Chat Box */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30">
                <ExpartBDLogo variant="icon" iconClassName="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">
                    Expart BD লাইভ চ্যাট
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <span>অটোমেটিক ইনস্ট্যান্ট রিপ্লাই · ২৪/৭ লাইভ</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
              title="চ্যাট মিনিমাইজ করুন"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
            {session?.messages.map((msg) => {
              const isClient = msg.sender === 'client';
              const isAdmin = msg.sender === 'admin';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-end gap-1.5 max-w-[85%]">
                    {!isClient && (
                      <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 mb-0.5">
                        {isAdmin ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-orange-600" />
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
                        <div className="text-[10px] font-bold text-orange-600 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>অটোমেটিক রিপ্লাই</span>
                        </div>
                      )}
                      {msg.text}
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
                <Bot className="w-3.5 h-3.5 text-orange-600" />
                <span>Expart BD অ্যাসিস্ট্যান্ট উত্তর তৈরি করছে...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 text-[11px] font-medium border border-slate-200 hover:border-orange-300 shrink-0 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder="আপনার প্রশ্নটি এখানে লিখুন..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-amber-500 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-orange-600/20"
              title="মেসেজ পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
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
