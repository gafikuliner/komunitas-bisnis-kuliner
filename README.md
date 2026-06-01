# Komunitas Bisnis Kuliner Indonesia

Aplikasi web komunitas untuk pelaku bisnis kuliner di Indonesia — dibangun dengan **Next.js 14**, **TypeScript**, **Tailwind CSS**, dan **Supabase**.

## Status Proyek

### Tahap 1 — Selesai
- ✅ Struktur proyek Next.js 14
- ✅ Skema database Supabase (`anggota` + `artikel`)
- ✅ Halaman beranda (landing page)
- ✅ Form pendaftaran anggota
- ✅ Dashboard anggota

### Tahap 2 — Selesai
- ✅ Direktori anggota (`/direktori`) dengan kartu anggota
- ✅ Pencarian anggota (nama usaha, filter kota & kategori)
- ✅ Edit profil usaha (`/profil`)
- ✅ Tombol Edit Profil di dashboard

### Belum dibuat
- ⏳ Informasi bisnis kuliner (artikel)
- ⏳ Dashboard admin
- ⏳ Chat AI — **menunggu persetujuan Anda**

---

## Prasyarat

Sebelum memulai, pastikan komputer Anda sudah memiliki:

1. **Node.js** versi 18 atau lebih baru — unduh di [https://nodejs.org](https://nodejs.org)
2. Akun **Supabase** gratis — daftar di [https://supabase.com](https://supabase.com)

Cek instalasi Node.js:

```bash
node -v
npm -v
```

---

## Langkah 1: Install Dependensi

Buka terminal (PowerShell atau Command Prompt), masuk ke folder proyek:

```bash
cd "d:\Gudang Cursor Jerry"
npm install
```

---

## Langkah 2: Setup Supabase

### 2.1 Buat Proyek Supabase

1. Login ke [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Klik **New Project**
3. Isi nama proyek, password database, dan pilih region terdekat (misalnya Singapore)
4. Tunggu hingga proyek selesai dibuat

### 2.2 Jalankan SQL Database

1. Di dashboard Supabase, buka menu **SQL Editor**
2. Klik **New query**
3. Buka file `supabase/schema.sql` di proyek ini, salin seluruh isinya
4. Tempel ke SQL Editor, lalu klik **Run**
5. Pastikan tidak ada error — tabel `anggota` dan `artikel` akan dibuat

**Penting untuk Edit Profil:** Jika database sudah dibuat di tahap 1, jalankan juga file `supabase/migrations/002_update_anggota_policy.sql` di SQL Editor agar fitur edit profil berfungsi.

### 2.3 Ambil Kredensial API

1. Buka **Project Settings** → **API**
2. Salin:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Langkah 3: Konfigurasi Environment

1. Salin file contoh environment:

```bash
copy .env.local.example .env.local
```

2. Buka `.env.local` dengan editor teks, isi nilai Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Simpan file

---

## Langkah 4: Jalankan Aplikasi

Mode pengembangan (hot reload):

```bash
npm run dev
```

Buka browser: [http://localhost:3000](http://localhost:3000)

Build untuk produksi:

```bash
npm run build
npm start
```

---

## Struktur Folder

```
├── supabase/
│   └── schema.sql          # SQL untuk membuat tabel di Supabase
├── src/
│   ├── app/
│   │   ├── page.tsx        # Halaman beranda
│   │   ├── daftar/         # Form pendaftaran
│   │   └── dashboard/      # Dashboard anggota (minimal)
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── daftar/         # Form pendaftaran
│   │   └── ui/             # Komponen UI
│   ├── lib/
│   │   ├── supabase.ts     # Koneksi Supabase
│   │   └── anggota.ts      # Fungsi database anggota
│   └── types/
│       └── index.ts        # Tipe TypeScript
├── .env.local.example
├── package.json
└── README.md
```

---

## Halaman yang Tersedia

| URL | Keterangan |
|-----|------------|
| `/` | Halaman beranda |
| `/daftar` | Form pendaftaran anggota |
| `/dashboard` | Dashboard anggota |
| `/profil` | Edit profil usaha |
| `/direktori` | Direktori & pencarian anggota |

---

## Alur Pendaftaran

1. Pengguna membuka `/daftar`
2. Mengisi form (data wajib + opsional)
3. Data disimpan ke tabel `anggota` di Supabase
4. Notifikasi sukses ditampilkan
5. Otomatis diarahkan ke `/dashboard` dengan profil ringkas

---

## Tahap Berikutnya (Menunggu Persetujuan Anda)

- Halaman artikel & artikel contoh
- Dashboard admin
- **Chat AI** — hanya setelah Anda menyetujui

---

## Bantuan

Jika ada error saat `npm install` atau menjalankan aplikasi, pastikan Node.js sudah terinstall dengan benar dan file `.env.local` sudah diisi kredensial Supabase yang valid.
