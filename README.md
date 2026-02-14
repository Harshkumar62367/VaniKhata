# 🚀 Deployment & Demo Guide: VaniKhata

## ✅ Pre-Deployment Checklist

### 1. Backend (Koyeb)
- **Push Latest Code:** Ensure all local changes are committed and pushed to GitHub.
  ```bash
  git add .
  git commit -m "Finalizing for deployment"
  git push origin main
  ```
- **Verify Environment Variables on Koyeb:**
  - `DATABASE_URL`: (Your Neon connection string)
  - `GEMINI_API_KEY`: (Your Google AI Studio key)
  - `PORT`: 8000

### 2. Frontend (Vercel/Netlify)
- **Deploy the `client` folder:** When importing the repo, set the *Root Directory* to `client`.
- **Set Environment Variable:**
  - `NEXT_PUBLIC_BACKEND_URL`: `https://evident-catie-harsh-projects-3a2ca74b.koyeb.app` (Your Koyeb URL)
  - *Note: Do NOT include trailing slash `/`.*

---

## 🎥 Video Demo Script

**Goal:** Showcase real-time voice AI, Udhaar tracking, and live stats.

### **Scene 1: The Setup (0:00 - 0:15)**
- **Visual:** Show the empty dashboard (or clean state).
- **Narration:** "Meet VaniKhata, the AI-powered assistant for Kirana store owners. It manages orders, credits, and inventory purely through voice."

### **Scene 2: The Logic (0:15 - 0:45)**
- **Action:** Click the **Voice Recorder** (Mic Button).
- **Voice Command (Hindi/Hinglish):**
  > *"Bhaiya, do packet milk, ek bread aur paanch kilo chawal de do. Aur haan, Maggi bhi daal dena."*
- **Visual:**
  1.  **Transcript Tile:** Shows the live transcription and English translation ("Brother, give 2 packets milk...").
  2.  **Order Queue:** Instantly populates with the order (Green 'Paid' status).
  3.  **Stats Bar:** Revenue and Order Count update automatically.

### **Scene 3: The "Udhaar" Magic (0:45 - 1:15)**
- **Action:** Record another order.
- **Voice Command (Critical):**
  > *"Suniyega, ek kilo cheeni aur chai patti de dijiye. **Iske paise main kal dungi, khate mein likh lena.**"*
- **Visual:**
  1.  **Transcript:** Highlights the credit intent.
  2.  **Order Queue:** Shows the order with a **Red 'Udhaar' Badge**.
  3.  **Udhaar Ledger:** Updates with the new credit entry.
- **Narration:** "VaniKhata intelligently detects credit requests ('Khate mein likh lo') and automatically tags the transaction as Udhaar, so you never miss a payment."

### **Scene 4: Insights & Conclusion (1:15 - 1:30)**
- **Visual:** Hover over the **Stats Bar** to show typical daily metrics.
- **Narration:** "From voice to ledger in seconds. No typing, no errors. This is the future of Kirana tech."

---

## 🧹 Resetting for the Video
To clear all data for a fresh start:
1. Open your terminal in `server/`.
2. Run: `npx prisma db push --force-reset`
3. This creates a clean slate.
