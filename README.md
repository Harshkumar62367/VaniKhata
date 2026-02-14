# VaniKhata: Voice-First Digital Ledger (वाणीखाता)

## 🛍️ Bridging the Digital Divide
**VaniKhata (वाणीखाता)** is an AI-powered merchant dashboard designed for the next billion users. In a landscape where small Kirana store owners find digital bookkeeping tedious, VaniKhata introduces a **zero-typing interface**.

By leveraging **Gemini 2.0 Flash**, the app transcribes multi-dialect audio (Hinglish, Kannada-English, Hindi), extracts structured order data, and intelligently flags credit (*Udhaar*) transactions—all from a simple voice recording.

<img width="1705" height="836" alt="image" src="https://github.com/user-attachments/assets/012d1c1a-b668-4ca1-9df9-1a882a73a1dc" />


---

## ⚡ Core Features

### 🎙️ Multilingual Voice-to-JSON
Converts messy, real-world audio into structured orders instantly. Supports mixed dialects like Hinglish and Kanglish.

### 💳 Smart Udhaar Detection
Automatically flags credit requests based on linguistic intent (e.g., *"Iska paisa baad mein dungi"*, *"Khate mein likh lo"*).

### 📊 Bento Dashboard
A high-fidelity, glanceable UI for tracking daily sales, pending credits, and trending items.

### 💡 Smart Summaries
AI-driven business insights that suggest cross-selling opportunities (e.g., *"Customer bought milk, suggest bread"*).

### 🐘 Serverless Persistence
Real-time data sync using **Neon (PostgreSQL)** and **Prisma ORM**.

---

## 🛠️ Technical Stack

- **Frontend:** Next.js 15, Tailwind CSS, Shadcn UI
- **Backend:** Node.js, Express, Multer
- **AI Model:** Gemini 2.0 Flash (Multimodal Audio API)
- **Database:** Neon (PostgreSQL)
- **ORM:** Prisma v7.4.0
- **Deployment:** Vercel (Frontend) + Koyeb (Backend)

---

## 🚀 Installation & Setup

### 1. Backend (Server)

```bash
cd server
npm install
```

**Environment Variables (`server/.env`):**
```env
DATABASE_URL="your_neon_connection_string"
GEMINI_API_KEY="your_google_ai_studio_key"
PORT=8000
```

**Initialize Database:**
```bash
npx prisma generate
npx prisma db push
npm start
```

### 2. Frontend (Client)

```bash
cd client
npm install
```

**Environment Variables (`client/.env.local`):**
```env
# Local Development
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Production (Koyeb)
# NEXT_PUBLIC_BACKEND_URL=https://your-app.koyeb.app
```

**Run App:**
```bash
npm run dev
```

---

## 🌟 The Impact

**VaniKhata removes the "typing barrier."**
It allows a merchant to maintain a digital ledger at the speed of speech, ensuring they never miss a credit entry or a sales trend. It is built for the reality of the Indian marketplace—where business happens in conversation, not keystrokes.

---

### 👨‍💻 Developed for Gemini Developer Competition
**Team:** VaniKhata
**Focus:** Multimodal Audio Understanding & Utility for Bharat.
