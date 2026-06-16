# Rayya Water

Aplikasi Dikembangkan sebagai bagian dari mata kuliah MPPL.

## Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 19 | UI Library |
| TypeScript | 5.8 | Type Safety |
| Vite | 6 | Build Tool & Dev Server |
| Tailwind CSS | 4 | Utility-First CSS |
| Motion (Framer Motion) | 12 | Animasi & Transisi |
| Lucide React | 0.546 | Ikon |

## Fitur

- Login & Registrasi Pelanggan
- Dashboard pemesanan air galon (Refill / Galon Baru)
- Pilihan metode pembayaran (COD, E-Wallet, Bank Transfer)
- Riwayat pesanan
- Profil pelanggan
- Tampilan Mobile Frame (bingkai HP realistis)

## Cara Setup

### Prerequisites

- Node.js >= 18
- npm

### Instalasi

```bash
# 1. Clone repository
git clone <url-repo>

# 2. Masuk ke direktori project
cd rayya-water

# 3. Install dependencies
npm install

# 4. Copy file environment
cp .env.example .env

# 5. Isi GEMINI_API_KEY di file .env (opsional)

# 6. Jalankan dev server
npm run dev
```

Buka browser dan akses `http://localhost:3000`.

### Available Scripts

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Jalankan dev server di port 3000 |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview hasil build |
| `npm run lint` | Type check dengan TypeScript |

## Struktur Projek

```
rayya-water/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── src/
    ├── main.tsx                 # Entry point
    ├── App.tsx                  # Root component, routing screen
    ├── types.ts                 # TypeScript enums & interfaces
    ├── index.css                # Global styles & Tailwind config
    └── components/
        ├── MobileFrame.tsx          # Bingkai tampilan HP
        ├── KurirLoginScreen.tsx     # Halaman login pelanggan
        ├── RegisterScreen.tsx       # Halaman registrasi akun
        ├── SuccessScreen.tsx        # Halaman sukses pendaftaran
        ├── DashboardScreen.tsx      # Dashboard utama (order, nav)
        ├── CustomerHomeTab.tsx      # Tab beranda
        ├── CustomerProfileTab.tsx   # Tab profil pelanggan
        ├── OrderHistoryTab.tsx      # Tab riwayat pesanan
        ├── OrderDetailModal.tsx     # Modal detail pesanan
        ├── PaymentScreen.tsx        # Layar pembayaran
        └── ControlPanel.tsx         # Panel kontrol demo
```


### Ini adalah aplikasi SPA (Single Page Application) mobile-first untuk layanan pengantaran air galon. Menggunakan React 19 + TypeScript + Tailwind CSS 4 + Vite 6. State management menggunakan useState bawaan React (tanpa Redux/Zustand). Tidak ada database — semua data dikelola di memori.