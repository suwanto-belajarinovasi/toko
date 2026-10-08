import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatRupiah } from "@/lib/utils";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { ShieldCheck, FileCheck, Infinity } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = await db.select().from(products).where(eq(products.slug, params.slug)).limit(1);
  const product = result[0];
  
  if (!product) return { title: 'Produk Tidak Ditemukan' };
  return { title: `${product.name} | Belajar Inovasi Store`, description: product.shortDescription };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      price: products.price,
      originalPrice: products.originalPrice,
      thumbnail: products.thumbnail,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, params.slug))
    .limit(1);

  const product = result[0];

  if (!product) {
    notFound();
  }

  // Hitung persentase diskon jika ada
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Kolom Kiri: Gambar Produk */}
        <div className="bg-gray-100 rounded-2xl aspect-[4/3] relative overflow-hidden border border-gray-200">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
              Pratinjau Gambar Tidak Tersedia
            </div>
          )}
        </div>

        {/* Kolom Kanan: Informasi Produk */}
        <div className="flex flex-col">
          {product.categoryName && (
            <span className="text-sm font-semibold text-brand-600 mb-2 uppercase tracking-wider">
              {product.categoryName}
            </span>
          )}
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">
              {formatRupiah(product.price)}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through mb-1">
                  {formatRupiah(product.originalPrice!)}
                </span>
                <span className="bg-peach-50 text-peach-600 font-bold text-xs px-2 py-1 rounded-md mb-1">
                  Hemat {discountPercentage}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Fitur Keamanan / Garansi Digital */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 font-medium">Akses File Digital Instan</span>
            </div>
            <div className="flex items-center gap-3">
              <Infinity className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 font-medium">Akses Selamanya</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 font-medium">Pembayaran Aman</span>
            </div>
          </div>

          {/* Action: Add to Cart */}
          <div className="mt-auto">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                thumbnail: product.thumbnail,
                slug: product.slug,
              }} 
            />
            <p className="text-xs text-center text-gray-500 mt-4">
              *Ini adalah produk digital. Tidak ada pengiriman fisik ke alamat Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
