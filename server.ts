import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Disable browser caching for all /api endpoints to ensure 100% fresh data
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// SSE Real-time client connection pool
let sseClients: Response[] = [];

function broadcastSSE(type: string, data: any) {
  const payload = JSON.stringify({ type, data, timestamp: Date.now() });
  sseClients.forEach((client) => {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch {
      // client disconnected
    }
  });
}

// Keep SSE connections active with a heartbeat every 15s
setInterval(() => {
  broadcastSSE('heartbeat', { time: Date.now() });
}, 15000);

// Persistence directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const DELETED_ORDERS_FILE = path.join(DATA_DIR, 'deleted_orders.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CHATS_FILE = path.join(DATA_DIR, 'chats.json');
const FEATURES_FILE = path.join(DATA_DIR, 'features.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json');

// Initial seed containing the client order EXP-3543 from user screenshot
const INITIAL_ORDERS = [
  {
    id: 'EXP-3543',
    fullName: 'Mizan',
    phoneNumber: '01601300122',
    pageUrl: 'https://facebook.com/mizan.page',
    paymentMethod: 'bKash',
    senderNumber: '01601300122',
    trxId: 'BDHINDKRXR',
    extraTrxChars: '9A',
    amount: 2999,
    status: 'checking',
    createdAt: 'আজ, ১২:৪৯ PM',
    notes: 'ফেসবুক পেজ মনিটাইজেশন সেটআপ',
    clientLocation: {
      ip: '103.145.74.12',
      city: 'ঢাকা',
      country: 'বাংলাদেশ',
      formattedAddress: 'ঢাকা, বাংলাদেশ',
      latitude: 23.8103,
      longitude: 90.4125,
      mapsUrl: 'https://www.google.com/maps?q=23.8103,90.4125',
      source: 'ip',
      device: 'Desktop',
      os: 'Windows',
      browser: 'Chrome'
    }
  }
];

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile(filePath: string, data: unknown): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initialize files if not existing
const DEFAULT_SETTINGS = {
  paymentNumber: '+8801929027577',
  packagePrice: 2999,
  businessName: 'Expart BD',
  adminUsername: 'eXPART bd',
  adminPassword: 'Ex02@0##',
  adminPin: '1234',
  announcementActive: false,
  announcementText: '🔥 বিশেষ অফার: সম্পূর্ণ ফেসবুক মনিটাইজেশন প্যাকেজ এখন মাত্র ৳২,৯৯৯ টাকায়!',
};

if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, INITIAL_ORDERS);
}
if (!fs.existsSync(SETTINGS_FILE)) {
  writeJsonFile(SETTINGS_FILE, DEFAULT_SETTINGS);
} else {
  const currentSettings: any = readJsonFile(SETTINGS_FILE, DEFAULT_SETTINGS);
  if (!currentSettings.paymentNumber || currentSettings.paymentNumber.includes('01908769186') || currentSettings.paymentNumber.includes('01601300122')) {
    currentSettings.paymentNumber = '+8801929027577';
    writeJsonFile(SETTINGS_FILE, currentSettings);
  }
}

// API Routes
app.get('/api/realtime-stream', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  res.write(`data: ${JSON.stringify({ type: 'connected', time: Date.now() })}\n\n`);
  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter((client) => client !== res);
  });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  const orders: any[] = readJsonFile(ORDERS_FILE, []);
  const deleted: string[] = readJsonFile(DELETED_ORDERS_FILE, []);
  const filtered = orders.filter((o) => !deleted.includes(o.id));
  res.json({ success: true, orders: filtered });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.id) {
    res.status(400).json({ success: false, error: 'Invalid order data' });
    return;
  }

  const deleted: string[] = readJsonFile(DELETED_ORDERS_FILE, []);
  // If permanently deleted and not explicitly un-deleting, do not resurrect
  if (deleted.includes(newOrder.id) && !newOrder.forceRestore) {
    const orders: any[] = readJsonFile(ORDERS_FILE, []);
    const filtered = orders.filter((o) => !deleted.includes(o.id));
    res.json({ success: true, ignored: true, orders: filtered });
    return;
  }

  if ((newOrder.isNewSubmission || newOrder.forceRestore) && deleted.includes(newOrder.id)) {
    const updatedDeleted = deleted.filter((d) => d !== newOrder.id);
    writeJsonFile(DELETED_ORDERS_FILE, updatedDeleted);
  }

  const currentOrders: any[] = readJsonFile(ORDERS_FILE, []);
  const exists = currentOrders.some((o) => o.id === newOrder.id);
  const updated = exists
    ? currentOrders.map((o) => (o.id === newOrder.id ? { ...o, ...newOrder } : o))
    : [newOrder, ...currentOrders];

  writeJsonFile(ORDERS_FILE, updated);
  const currentDeleted: string[] = readJsonFile(DELETED_ORDERS_FILE, []);
  const cleanUpdated = updated.filter((o: any) => !currentDeleted.includes(o.id));
  broadcastSSE('orders', cleanUpdated);
  res.json({ success: true, order: newOrder, orders: cleanUpdated });
});

app.patch('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const currentOrders: any[] = readJsonFile(ORDERS_FILE, []);
  const updated = currentOrders.map((o) => (o.id === id ? { ...o, ...updates } : o));
  writeJsonFile(ORDERS_FILE, updated);
  const currentDeleted: string[] = readJsonFile(DELETED_ORDERS_FILE, []);
  const cleanUpdated = updated.filter((o: any) => !currentDeleted.includes(o.id));
  broadcastSSE('orders', cleanUpdated);
  res.json({ success: true, orders: cleanUpdated });
});

app.delete('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const currentOrders: any[] = readJsonFile(ORDERS_FILE, []);
  const updated = currentOrders.filter((o) => o.id !== id);
  writeJsonFile(ORDERS_FILE, updated);

  const deleted: string[] = readJsonFile(DELETED_ORDERS_FILE, []);
  if (!deleted.includes(id)) {
    deleted.push(id);
    writeJsonFile(DELETED_ORDERS_FILE, deleted);
  }

  const cleanUpdated = updated.filter((o: any) => !deleted.includes(o.id));
  broadcastSSE('orders', cleanUpdated);
  res.json({ success: true, orders: cleanUpdated });
});

app.get('/api/settings', (_req: Request, res: Response) => {
  const settings = readJsonFile(SETTINGS_FILE, null);
  res.json({ success: true, settings });
});

app.post('/api/settings', (req: Request, res: Response) => {
  const newSettings = req.body;
  writeJsonFile(SETTINGS_FILE, newSettings);
  broadcastSSE('settings', newSettings);
  res.json({ success: true, settings: newSettings });
});

app.get('/api/chats', (_req: Request, res: Response) => {
  const chats = readJsonFile(CHATS_FILE, []);
  res.json({ success: true, chats });
});

app.post('/api/chats', (req: Request, res: Response) => {
  const session = req.body;
  if (!session || !session.id) {
    res.status(400).json({ success: false, error: 'Invalid chat session' });
    return;
  }
  const currentChats: any[] = readJsonFile(CHATS_FILE, []);
  const index = currentChats.findIndex((c) => c.id === session.id);
  let updated;
  if (index >= 0) {
    updated = [...currentChats];
    updated[index] = session;
  } else {
    updated = [session, ...currentChats];
  }
  writeJsonFile(CHATS_FILE, updated);
  broadcastSSE('chats', updated);
  res.json({ success: true, chats: updated });
});

// Features / Services API
const DEFAULT_PACKAGE_FEATURES = [
  { id: 'feat-1', text: 'Facebook Monetization Assistance', bn: 'মনিটাইজেশন সেটিংস ও কারিগরি সহায়তা' },
  { id: 'feat-2', text: 'Professional Support', bn: 'অভিজ্ঞ এক্সপার্টদের সার্বক্ষণিক দিকনির্দেশনা' },
  { id: 'feat-3', text: 'Creator-focused Guidance', bn: 'ভিডিও ও রিলস কনটেন্ট নির্মাতাদের জন্য বিশেষ গাইডলাইন' },
  { id: 'feat-4', text: 'Order Support', bn: 'অর্ডারের শুরু থেকে শেষ পর্যন্ত নিয়মিত ট্র্যাকিং' },
  { id: 'feat-5', text: 'Page Eligibility Audit', bn: 'পেজ এলিজিবিলিটি ও পলিসি ভায়োলেশন চেকিং' },
  { id: 'feat-6', text: 'Payout & Tax Setup Guidance', bn: 'ব্যাংক তথ্য ও পেআউট কনফিগারেশন সংক্রান্ত সাহায্য' },
];

app.get('/api/features', (_req: Request, res: Response) => {
  const features = readJsonFile(FEATURES_FILE, DEFAULT_PACKAGE_FEATURES);
  res.json({ success: true, features });
});

app.post('/api/features', (req: Request, res: Response) => {
  const feature = req.body;
  const current = readJsonFile(FEATURES_FILE, DEFAULT_PACKAGE_FEATURES);
  const exists = current.some((f: any) => f.id === feature.id);
  const updated = exists ? current.map((f: any) => f.id === feature.id ? feature : f) : [...current, feature];
  writeJsonFile(FEATURES_FILE, updated);
  broadcastSSE('features', updated);
  res.json({ success: true, features: updated });
});

app.delete('/api/features/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const current = readJsonFile(FEATURES_FILE, DEFAULT_PACKAGE_FEATURES);
  const updated = current.filter((f: any) => f.id !== id);
  writeJsonFile(FEATURES_FILE, updated);
  broadcastSSE('features', updated);
  res.json({ success: true, features: updated });
});

// Visitors API
app.get('/api/visitors', (_req: Request, res: Response) => {
  const visitors = readJsonFile(VISITORS_FILE, []);
  res.json({ success: true, visitors });
});

app.post('/api/visitors', (req: Request, res: Response) => {
  const visitor = req.body;
  const current = readJsonFile(VISITORS_FILE, []);
  const exists = current.some((v: any) => v.id === visitor.id);
  const updated = exists ? current.map((v: any) => v.id === visitor.id ? visitor : v) : [visitor, ...current];
  writeJsonFile(VISITORS_FILE, updated);
  broadcastSSE('visitors', updated);
  res.json({ success: true, visitors: updated });
});

// Activities API
app.get('/api/activities', (_req: Request, res: Response) => {
  const activities = readJsonFile(ACTIVITIES_FILE, []);
  res.json({ success: true, activities });
});

app.post('/api/activities', (req: Request, res: Response) => {
  const activity = req.body;
  const current = readJsonFile(ACTIVITIES_FILE, []);
  const updated = [activity, ...current.slice(0, 499)];
  writeJsonFile(ACTIVITIES_FILE, updated);
  broadcastSSE('activities', updated);
  res.json({ success: true, activities: updated });
});

async function main() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Expart BD server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
