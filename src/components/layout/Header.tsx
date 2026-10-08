import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            // Cari baris ini di dalam Header.tsx dan pastikan menggunakan https
<Image 
  src="https://lh3.googleusercontent.com/d/1V7RV4GJbNhX65Fv81QRhnAQxwSndHEGk" 
  alt="Belajar Inovasi Logo" 
  width={140} 
  height={40} 
  className="object-contain"
/>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-brand-600 transition-colors">Beranda</Link>
            <Link href="/shop" className="hover:text-brand-600 transition-colors">Katalog Produk</Link>
            <Link href="/about" className="hover:text-brand-600 transition-colors">Tentang</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-brand-600 text-[10px] font-bold text-white flex items-center justify-center">0</span>
          </Link>
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Masuk</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
