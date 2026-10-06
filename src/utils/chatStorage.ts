import { ChatMessage, ChatSession, ClientLocationData } from '../types';
import { generateAutoReply } from './chatAiEngine';

const CHAT_STORAGE_KEY = 'expart_bd_chats_v1';
const CURRENT_SESSION_ID_KEY = 'expart_current_chat_session_id';

export const getChatSessions = (): ChatSession[] => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading chat sessions', e);
    return [];
  }
};

export const saveChatSessions = (sessions: ChatSession[]): void => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new CustomEvent('expart_chat_changed'));
  } catch (e) {
    console.error('Error saving chat sessions', e);
  }
};

export const getCurrentSessionId = (): string => {
  let id = localStorage.getItem(CURRENT_SESSION_ID_KEY);
  if (!id) {
    id = `chat-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    localStorage.setItem(CURRENT_SESSION_ID_KEY, id);
  }
  return id;
};

export const getOrCreateCurrentSession = (location?: ClientLocationData): ChatSession => {
  const sessionId = getCurrentSessionId();
  const sessions = getChatSessions();
  let session = sessions.find((s) => s.id === sessionId);

  if (!session) {
    const now = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    session = {
      id: sessionId,
      clientName: 'গ্রাহক (অনলাইন ভিজিটর)',
      clientLocation: location,
      createdAt: now,
      updatedAt: now,
      unreadCountForAdmin: 0,
      status: 'active',
      messages: [
        {
          id: `msg-${Date.now()}-welcome`,
          sender: 'bot',
          text: 'আসসালামু আলাইকুম! Expart BD লাইভ সাপোর্ট টিমে স্বাগতম। আমাদের প্রতিনিধি অ্যাক্টিভ আছেন, আপনি সাজেস্টেড প্রশ্ন করুন অথবা আপনার প্রশ্নটি লিখুন—আমরা সঙ্গে সঙ্গে বিস্তারিত উত্তর দেব।',
          timestamp: now,
        },
      ],
    };
    saveChatSessions([session, ...sessions]);
  }
  return session;
};

export const sendClientMessage = async (
  text: string,
  location?: ClientLocationData,
  attachmentUrl?: string,
  attachmentName?: string
): Promise<ChatSession> => {
  const sessionId = getCurrentSessionId();
  const sessions = getChatSessions();
  let session = sessions.find((s) => s.id === sessionId);

  const now = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

  if (!session) {
    session = {
      id: sessionId,
      clientName: 'গ্রাহক (অনলাইন ভিজিটর)',
      clientLocation: location,
      createdAt: now,
      updatedAt: now,
      unreadCountForAdmin: 1,
      status: 'active',
      messages: [],
    };
    sessions.unshift(session);
  }

  // Add client message
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}-client`,
    sender: 'client',
    text: text.trim() || (attachmentUrl ? '📸 স্ক্রিনশট আপলোড করেছি' : ''),
    timestamp: now,
    attachmentUrl,
    attachmentName,
  };
  session.messages.push(userMsg);
  session.updatedAt = now;
  session.unreadCountForAdmin += 1;
  if (location && !session.clientLocation) {
    session.clientLocation = location;
  }

  saveChatSessions([...sessions]);

  // Short realistic delay for typing feel
  await new Promise((res) => setTimeout(res, 500));

  let botReplyText = '';
  let botActionType: 'upload_screenshot' | 'send_page_link' | 'order_package' | undefined;

  if (attachmentUrl) {
    botReplyText =
      'ধন্যবাদ! আপনার পাঠানো স্ক্রিনশটটি সফলভাবে রিসিভ হয়েছে। আমাদের টিম স্ক্রিনশটটি দেখে আপনার পেজের অবস্থা ও পলিসি স্ট্যাটাস যাচাই করছে। আপনার পেজ/প্রোফাইল লিংক দেওয়া না থাকলে নিচে লিংকটি দিতে পারেন।';
    botActionType = 'send_page_link';
  } else {
    const result = await generateAutoReply(text);
    botReplyText = result.text;
    botActionType = result.actionType;
  }

  const botMsg: ChatMessage = {
    id: `msg-${Date.now()}-bot`,
    sender: 'bot',
    text: botReplyText,
    actionType: botActionType,
    timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
  };

  session.messages.push(botMsg);
  session.updatedAt = botMsg.timestamp;
  saveChatSessions([...sessions]);

  return session;
};

export const sendAdminReply = (sessionId: string, text: string): ChatSession | null => {
  const sessions = getChatSessions();
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return null;

  const now = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
  const adminMsg: ChatMessage = {
    id: `msg-${Date.now()}-admin`,
    sender: 'admin',
    text: text.trim(),
    timestamp: now,
  };

  session.messages.push(adminMsg);
  session.updatedAt = now;
  session.unreadCountForAdmin = 0;

  saveChatSessions([...sessions]);
  return session;
};

export const markSessionAsReadByAdmin = (sessionId: string): void => {
  const sessions = getChatSessions();
  const session = sessions.find((s) => s.id === sessionId);
  if (session && session.unreadCountForAdmin > 0) {
    session.unreadCountForAdmin = 0;
    saveChatSessions([...sessions]);
  }
};
