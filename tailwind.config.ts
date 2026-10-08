import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6', // Ungu utama
          600: '#7c3aed',
          900: '#4c1d95',
        },
        peach: {
          50: '#fff1f2',
          500: '#f43f5e',
        },
        background: '#FAFAFA', // Abu-abu sangat lembut untuk background
        foreground: '#171717',
      },
    },
  },
  plugins: [],
};
export default config;
