# PAMA Website

Professional Home Services website built with React + Vite.

## 📁 Project Structure

```
pama-website/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                        # Entry point
    ├── App.jsx                         # Root component (mode switcher)
    ├── data/
    │   └── defaults.js                 # Services, testimonials, info data
    ├── utils/
    │   └── styles.js                   # Shared style objects
    └── components/
        ├── Logo.jsx                    # PAMA logo component
        ├── QrSvg.jsx                   # QR code SVG
        ├── admin/
        │   ├── AdminLogin.jsx          # Admin login screen
        │   └── AdminPanel.jsx          # Full admin dashboard
        └── public/
            └── PublicSite.jsx          # Public-facing website
```

## 🚀 How to Run

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Start development server
```bash
npm run dev
```

### Step 3 — Open in browser
Visit: **http://localhost:5173**

## 🔐 Admin Access

- Press **Ctrl + Shift + A**, or
- Click the tiny **⚙️ Admin** button at bottom-right
- Username: `admin`
- Password: `pama@2026`

## 🏗️ Build for Production
```bash
npm run build
```
