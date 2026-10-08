import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatRupiah } from "@/lib/utils";

export const metadata = {
  title: "Katalog Produk | Belajar Inovasi Store",
};

export default async function ShopPage() {
  // Melakukan fetch semua produk aktif, dilengkapi dengan nama kategorinya
  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      shortDescription: products.shortDescription,
      price: products.price,
      originalPrice: products.originalPrice,
      thumbnail: products.thumbnail,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.isActive, true))
    .orderBy(desc(products.createdAt));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Katalog Produk</h1>
        <p className="text-gray-600 max-w-2xl">
          Jelajahi koleksi produk digital kami. Mulai dari template produktivitas, ebook pembelajaran, hingga source code aplikasi siap pakai.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts.length === 0 ? (
          <p className="text-gray-500 col-span-full py-10 text-center bg-white rounded-xl border">
            Belum ada produk yang tersedia di katalog.
          </p>
        ) : (
          allProducts.map((product) => (
            <div key={product.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col">
              <div className="aspect-[4/3] bg-gray-100 w-full relative">
                {product.thumbnail ? (
                  <img src={product.thumbnail} alt={product.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Belum ada gambar
                  </div>
                )}
                {product.categoryName && (
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded text-gray-700 shadow-sm">
                    {product.categoryName}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-auto pt-4">
                  <span className="font-bold text-gray-900 text-lg">{formatRupiah(product.price)}</span>
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
    </div>
  );
}
