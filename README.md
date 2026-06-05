# Todo App — Local Setup Guide

Project ini terdiri dari dua bagian:

- **`server/`** — Backend Express.js + Prisma + PostgreSQL (port 5000)
- **`client/`** — Frontend Next.js (port 3000)

---

## Prasyarat

Pastikan sudah terinstall di komputer kamu:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) (running di local)
- npm / yarn / pnpm

---

## 1. Setup Server

### Masuk ke folder server

```bash
cd server
```

### Install dependencies

```bash
npm install
```

### Buat file `.env`

Buat file `.env` di dalam folder `server/`, lalu isi seperti berikut:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/NAMA_DATABASE"

ACCESS_SECRET_KEY="isi_dengan_random_string_rahasia"
REFRESH_SECRET_KEY="isi_dengan_random_string_rahasia_lain"

PORT=5000
```

> Ganti `USER`, `PASSWORD`, dan `NAMA_DATABASE` sesuai konfigurasi PostgreSQL kamu.
> Untuk `ACCESS_SECRET_KEY` dan `REFRESH_SECRET_KEY`, bisa gunakan string random apa saja, misalnya dari `openssl rand -base64 32`.

### Generate Prisma Client

```bash
npx prisma generate
```

### Jalankan migrasi database

```bash
npx prisma migrate deploy
```

### Jalankan server

```bash
npm run dev
```

Server berjalan di `http://localhost:5000`

---

## 2. Setup Client

### Masuk ke folder client

```bash
cd client
```

### Install dependencies

```bash
npm install
```

### Buat file `.env.local`

Buat file `.env.local` di dalam folder `client/`, lalu isi:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Jalankan client

```bash
npm run dev
```

Client berjalan di `http://localhost:3000`

---

## Menjalankan Keduanya Sekaligus

Buka **dua terminal terpisah**:

**Terminal 1 — Server:**
```bash
cd server
npm run dev
```

**Terminal 2 — Client:**
```bash
cd client
npm run dev
```

Lalu buka browser ke `http://localhost:3000`.

---

## Troubleshooting: Error Loading Terus-Menerus di Browser (Turbopack Cache)

Jika halaman di browser terus loading / stuck dan tidak mau tampil, kemungkinan cache Turbopack corrupt. Hapus dengan cara berikut:

```bash
cd client

# Hapus cache Next.js / Turbopack
rm -rf .next

# Jalankan ulang
npm run dev
```

Jika masih bermasalah, coba hapus juga `node_modules` dan install ulang:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## Struktur Endpoint API (Server)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/auth/register` | Daftar akun baru |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout |
| GET | `/post` | Ambil semua todo milik user |
| POST | `/post` | Buat todo baru |
| PATCH | `/post/:id` | Update todo |
| DELETE | `/post/:id` | Hapus todo |