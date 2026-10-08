import { db } from "@/db";
import { orders, products, users } from "@/db/schema";
import { sql, eq, inArray } from "drizzle-orm";
import { formatRupiah } from "@/lib/utils";
import { CreditCard, Package, ShoppingCart, Users } from "lucide-react";

export default async function AdminDashboard() {
  // Ambil metrik dari database
  const totalSalesResult = await db
    .select({ total: sql<number>`COALESCE(SUM(${orders.total}), 0)` })
    .from(orders)
    .where(inArray(orders.paymentStatus, ["PAID"]));

  const totalOrdersResult = await db.select({ count: sql<number>`count(*)` }).from(orders);
  
  const pendingPaymentsResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
    .where(eq(orders.paymentStatus, "UNPAID"));

  const totalProductsResult = await db.select({ count: sql<number>`count(*)` }).from(products);

  const stats = [
    { label: "Total Penjualan", value: formatRupiah(totalSalesResult[0].total), icon: CreditCard, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Pesanan", value: totalOrdersResult[0].count.toString(), icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Menunggu Pembayaran", value: pendingPaymentsResult[0].count.toString(), icon: CreditCard, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Total Produk", value: totalProductsResult[0].count.toString(), icon: Package, color: "text-brand-600", bg: "bg-brand-100" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Ikhtisar Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
        <p className="text-sm text-gray-500">Belum ada grafik yang ditambahkan. Anda dapat melihat detail transaksi pada menu Pesanan.</p>
      </div>
    </div>
  );
}
