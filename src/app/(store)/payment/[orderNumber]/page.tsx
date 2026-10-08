import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatRupiah } from "@/lib/utils";
import PaymentClient from "./PaymentClient";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { orderNumber: string } }) {
  return { title: `Pembayaran ${params.orderNumber} | Belajar Inovasi Store` };
}

export default async function PaymentPage({ params }: { params: { orderNumber: string } }) {
  // Fetch Order
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, params.orderNumber))
    .limit(1);

  const order = orderResult[0];

  if (!order) {
    notFound();
  }

  // Fetch Order Items
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-10">
        <div className="bg-green-50 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil Dibuat</h1>
        <p className="text-gray-600">Nomor Pesanan: <span className="font-semibold text-gray-900">{order.orderNumber}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ringkasan Pesanan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Detail Pesanan</h2>
          
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Nama Pembeli</span>
              <span className="font-medium text-gray-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{order.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Waktu Pesanan</span>
              <span className="font-medium text-gray-900">
                {order.createdAt ? new Date(order.createdAt).toLocaleString('id-ID') : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status Pembayaran</span>
              <span className="font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase text-xs">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Produk yang Dibeli:</h3>
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.productName}</span>
                <span className="font-medium text-gray-900">{formatRupiah(item.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Tagihan</span>
            <span className="text-xl font-extrabold text-brand-600">{formatRupiah(order.total)}</span>
          </div>
        </div>

        {/* Instruksi Pembayaran (Client Component) */}
        <PaymentClient 
          orderNumber={order.orderNumber}
          customerName={order.customerName}
          total={order.total}
          paymentMethod={order.paymentMethod}
        />
      </div>
    </div>
  );
}
