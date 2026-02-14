import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: ['https://vani-khata.vercel.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
    methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'API_KEY_MISSING');

// File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.send('VaniKhata Backend is running (No DB Mode)');
});

// Process Audio Route
app.post('/api/process-audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        Analyze this Indian Kirana store order audio. 
        STRICT RULES:
        - Extract ONLY items explicitly mentioned in the audio. 
        - Do NOT hallucinate or infer items (e.g. do not add 'sugar' if user only said 'milk').
        - If the audio is background noise or unclear, return an empty items list.
        
        Tasks:
        1. Detect the language/dialect (e.g., Hinglish, Kannada-English, Hindi).
        2. Extract items and quantities into a JSON list. Translate items to English if they are in local language.
        3. Determine if it's 'Udhaar' (credit) based on phrases like 'khate mein', 'baad mein dunga', or 'kal paise dungi'.
        4. Identify localized brands (e.g., 'Nandini milk', 'Parle-G').
        5. Identify sentiment (happy, neutral, frustrated).
        6. Generate a 'smart_summary' suggestion (e.g. "Customer asked for milk, suggest bread", or "Customer is frustrated, offer discount").
        7. Return ONLY a valid JSON object with no markdown formatting: 
           { 
             "items": [{"name": "string", "quantity": "string or number", "unit": "string"}], 
             "total_estimate": 0, 
             "is_credit": boolean, 
             "language_detected": "string", 
             "raw_transcript": "string", 
             "sentiment": "string", 
             "smart_summary": "string" 
           }
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: req.file.buffer.toString('base64'),
                    mimeType: req.file.mimetype
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        let data;
        try {
            data = JSON.parse(jsonStr);
        } catch (e) {
            console.error("Failed to parse JSON from Gemini:", text);
            return res.status(500).json({ error: 'Failed to parse AI response', raw: text });
        }

        res.json(data);

    } catch (error) {
        console.error('Error processing audio:', error);
        res.status(500).json({ error: 'Failed to process audio', details: error.message });
    }
});

// Orders API
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { created_at: 'desc' },
            take: 20
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await prisma.order.create({
            data: req.body
        });
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
