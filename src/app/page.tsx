import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { formatRupiah } from '@/lib/utils';
import { ShieldCheck, Zap, Download } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate setiap 60 detik

export default async function HomePage() {
  // Ambil data produk unggulan (Featured) dari database Turso
  const featuredProducts = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
    limit: 4,
    orderBy: [desc(products.createdAt)],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Produk Digital yang Membantu Anda <br className="hidden lg:block"/> Bekerja Lebih Cepat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Temukan ebook, template administrasi, aplikasi, dan berbagai produk digital praktis yang dirancang khusus untuk mempermudah kebutuhan belajar, kerja, dan bisnis Anda.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="px-8">Lihat Katalog Produk</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-8">Cara Membeli</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Akses Instan</h3>
              <p className="text-gray-600 text-sm">Produk digital langsung tersedia untuk diunduh setelah pembayaran diverifikasi oleh admin.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-peach-50 text-peach-500 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transaksi Aman</h3>
              <p className="text-gray-600 text-sm">Pembayaran transparan melalui rekening bank resmi dan konfirmasi langsung via WhatsApp.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Kualitas Profesional</h3>
              <p className="text-gray-600 text-sm">Semua file, template, dan aplikasi dirancang siap pakai (production-ready) untuk bisnis Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Produk Unggulan</h2>
              <p className="text-gray-600 mt-2">Pilihan terbaik untuk meningkatkan produktivitas Anda.</p>
            </div>
            <Link href="/shop" className="text-brand-600 font-medium hover:underline hidden sm:block">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length === 0 ? (
              <p className="text-gray-500 col-span-full">Belum ada produk unggulan saat ini.</p>
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col">
                  {/* Aspect ratio box untuk Thumbnail */}
                  <div className="aspect-[4/3] bg-gray-100 w-full relative">
                    {product.thumbnail ? (
                       // Akan diubah menjadi <Image> jika menggunakan real images
                      <img src={product.thumbnail} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                      {product.shortDescription || product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="font-bold text-gray-900">{formatRupiah(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <Link href={`/product/${product.slug}`}>
                      <Button className="w-full" variant="outline">Lihat Detail</Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full">Lihat Semua Produk</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
