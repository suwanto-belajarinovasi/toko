"use server";

import { db } from "@/db";
import { orders, digitalAccess, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function verifyPayment(orderId: string) {
  try {
    // 1. Update status pesanan menjadi PAID
    await db
      .update(orders)
      .set({
        paymentStatus: "PAID",
        orderStatus: "PAID",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    // 2. Ambil data order dan item produk di dalamnya
    const orderData = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    if (!orderData[0]) throw new Error("Pesanan tidak ditemukan");

    // 3. Generate Digital Access Token untuk setiap produk yang dibeli
    // Ini mencegah link download ditebak oleh publik.
    for (const item of items) {
      const uniqueToken = crypto.randomBytes(32).toString("hex");
      
      await db.insert(digitalAccess).values({
        userId: orderData[0].userId || "GUEST", // Jika guest, kita bisa pakai identifier lain
        orderId: orderId,
        productId: item.productId,
        downloadToken: uniqueToken,
      });
    }

    revalidatePath("/admin/orders");
    return { success: true, message: "Pembayaran berhasil diverifikasi. Akses digital telah dibuka." };
  } catch (error: any) {
    console.error("Gagal verifikasi pembayaran:", error);
    return { success: false, message: error.message || "Gagal memverifikasi pembayaran." };
  }
}
