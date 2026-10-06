import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Persistence directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CHATS_FILE = path.join(DATA_DIR, 'chats.json');

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
if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, INITIAL_ORDERS);
}

// API Routes
app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = readJsonFile(ORDERS_FILE, INITIAL_ORDERS);
  res.json({ success: true, orders });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.id) {
    res.status(400).json({ success: false, error: 'Invalid order data' });
    return;
  }

  const currentOrders: any[] = readJsonFile(ORDERS_FILE, INITIAL_ORDERS);
  const exists = currentOrders.some((o) => o.id === newOrder.id);
  const updated = exists
    ? currentOrders.map((o) => (o.id === newOrder.id ? { ...o, ...newOrder } : o))
    : [newOrder, ...currentOrders];

  writeJsonFile(ORDERS_FILE, updated);
  res.json({ success: true, order: newOrder, orders: updated });
});

app.patch('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const currentOrders: any[] = readJsonFile(ORDERS_FILE, INITIAL_ORDERS);
  const updated = currentOrders.map((o) => (o.id === id ? { ...o, ...updates } : o));
  writeJsonFile(ORDERS_FILE, updated);
  res.json({ success: true, orders: updated });
});

app.delete('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const currentOrders: any[] = readJsonFile(ORDERS_FILE, INITIAL_ORDERS);
  const updated = currentOrders.filter((o) => o.id !== id);
  writeJsonFile(ORDERS_FILE, updated);
  res.json({ success: true, orders: updated });
});

app.get('/api/settings', (_req: Request, res: Response) => {
  const settings = readJsonFile(SETTINGS_FILE, null);
  res.json({ success: true, settings });
});

app.post('/api/settings', (req: Request, res: Response) => {
  const newSettings = req.body;
  writeJsonFile(SETTINGS_FILE, newSettings);
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
  res.json({ success: true, chats: updated });
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
