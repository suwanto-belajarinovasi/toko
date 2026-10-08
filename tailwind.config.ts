import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Memastikan semua file di dalam src terbaca
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', 
          600: '#2563eb', // Biru Utama (Toko Online Profesional)
          900: '#1e3a8a',
        },
        accent: {
          50: '#f0fdf4',
          500: '#22c55e', 
          600: '#16a34a', // Hijau (Untuk tombol sekunder/sukses)
        },
        background: '#f8fafc', // Putih kebiruan yang sangat lembut untuk background
        foreground: '#0f172a', // Hitam kebiruan untuk teks agar elegan
      },
    },
  },
  plugins: [],
};
export default config;
