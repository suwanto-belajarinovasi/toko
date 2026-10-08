import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders, orderItems, digitalAccess, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: { orderNumber: string } }) {
  return { title: `Pesanan ${params.orderNumber} | Belajar Inovasi Store` };
}

export default async function CustomerOrderPage({ params }: { params: { orderNumber: string } }) {
  // 1. Ambil data pesanan
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, params.orderNumber))
    .limit(1);

  const order = orderResult[0];
  if (!order) notFound();

  // 2. Ambil detail produk yang dibeli
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  // 3. Ambil token akses digital jika pesanan sudah PAID
  let accessTokens: any[] = [];
  if (order.paymentStatus === "PAID") {
    accessTokens = await db
      .select({
        productId: digitalAccess.productId,
        token: digitalAccess.downloadToken,
        productName: products.name,
      })
      .from(digitalAccess)
      .leftJoin(products, eq(digitalAccess.productId, products.id))
      .where(eq(digitalAccess.orderId, order.id));
  }

  const isPaid = order.paymentStatus === "PAID";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
          <p className="text-gray-500 mt-1">{order.orderNumber}</p>
        </div>
        <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold ${
          isPaid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
        }`}>
          {isPaid ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          {isPaid ? "PEMBAYARAN BERHASIL" : "MENUNGGU VERIFIKASI"}
        </div>
      </div>

      {!isPaid && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-800">Akses Digital Belum Terbuka</h3>
            <p className="text-sm text-orange-700 mt-1">
              Admin sedang meninjau pembayaran Anda. Jika Anda belum melakukan konfirmasi, silakan klik tombol di bawah ini.
            </p>
            <Link href={`/payment/${order.orderNumber}`}>
              <Button size="sm" variant="outline" className="mt-3 bg-white hover:bg-orange-100 border-orange-300 text-orange-700">
                Halaman Konfirmasi Pembayaran
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900">Produk yang Anda Beli</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {items.map((item) => {
            // Cari token akses khusus untuk produk ini
            const access = accessTokens.find(a => a.productId === item.productId);

            return (
              <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">Jumlah: {item.quantity}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">{formatRupiah(item.subtotal)}</span>
                  
                  {isPaid ? (
                    access ? (
                      <a href={`/api/download/${access.token}`} target="_blank" rel="noopener noreferrer">
                        <Button className="gap-2 bg-brand-600 hover:bg-brand-700">
                          <Download className="w-4 h-4" /> Download
                        </Button>
                      </a>
                    ) : (
                      <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100">Token Gagal Dimuat</span>
                    )
                  ) : (
                    <Button disabled variant="outline" className="gap-2 text-gray-400">
                      <Download className="w-4 h-4" /> Terkunci
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
