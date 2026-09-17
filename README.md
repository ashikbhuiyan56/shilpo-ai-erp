# শিল্পAI (ShilpoAI) ERP - Industrial RMG AI Operating System

Official enterprise apparel manufacturing intelligence platform for Ready-Made Garments (RMG) in Bangladesh.

---

## 🚀 How to Run Locally / লোকাল মেশিনে রান করার নিয়ম

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd shilpo-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` or the port shown in your terminal.

---

## 🌐 Deploy to Vercel via GitHub / গিটহাব ও ভার্সেল দিয়ে ডিপ্লয় করার নিয়ম

হ্যাঁ, আপনি সহজেই এই কোড গিটহাবে পুশ করে ভার্সেলে লাইভ করতে পারবেন:

1. **Export or Push code to GitHub:**
   - Create a new repository on GitHub (e.g. `shilpo-ai-erp`).
   - Push your code to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of ShilpoAI ERP"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** > **"Import Git Repository"**.
   - Select your GitHub repository.
   - Vercel will automatically detect:
     - **Framework Preset:** `Vite`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click **Deploy**.

Within 60 seconds, your application will be live with a free HTTPS domain, which also grants full native camera access!
