# Belajar Inovasi Store

Platform E-Commerce Produk Digital berbasis Next.js App Router, Turso (libSQL), dan Drizzle ORM.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: Turso (Edge SQLite)
- ORM: Drizzle ORM
- Deployment: Vercel

## Cara Menjalankan di Lokal

1. Clone repository ini.
2. Buat file `.env` berdasarkan `.env.example`.
3. Isi `TURSO_DATABASE_URL` dan `TURSO_AUTH_TOKEN`.
4. Install dependensi: `npm install`
5. Push schema ke Turso: `npm run db:push`
6. Jalankan seed data: `npm run db:seed`
7. Jalankan development server: `npm run dev`

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
