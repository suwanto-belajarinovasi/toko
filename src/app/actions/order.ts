"use server";

import { db } from "@/db";
import { products, orders, orderItems } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { generateId } from "@/lib/utils"; // Kita akan buat utility ini

type CheckoutData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "SHOPEEPAY" | "BTN" | "BCA";
  cartItems: { id: string; quantity: number }[];
};

export async function createOrder(data: CheckoutData) {
  try {
    if (!data.cartItems || data.cartItems.length === 0) {
      throw new Error("Keranjang belanja kosong.");
    }

    // 1. Ambil ID produk dari keranjang
    const productIds = data.cartItems.map((item) => item.id);

    // 2. FETCH HARGA ASLI DARI DATABASE (Secure)
    const dbProducts = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
      })
      .from(products)
      .where(inArray(products.id, productIds));

    if (dbProducts.length !== productIds.length) {
      throw new Error("Beberapa produk tidak ditemukan atau tidak aktif.");
    }

    // 3. Hitung Total Sebenarnya
    let subtotal = 0;
    const finalOrderItems = data.cartItems.map((cartItem) => {
      const product = dbProducts.find((p) => p.id === cartItem.id)!;
      const itemSubtotal = product.price * cartItem.quantity;
      subtotal += itemSubtotal;

      return {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        subtotal: itemSubtotal,
      };
    });

    // 4. Generate Order Number (INV-YYYYMMDD-XXXX)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `INV-${dateStr}-${randomStr}`;

    // 5. Simpan Order ke Database
    // Karena libSQL belum sepenuhnya support nested transaction di edge, 
    // kita lakukan insert berurutan secara aman.
    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      paymentMethod: data.paymentMethod,
      subtotal: subtotal,
      total: subtotal, // belum ada logika kupon diskon
      orderStatus: "PENDING_PAYMENT",
      paymentStatus: "UNPAID",
    }).returning({ id: orders.id, orderNumber: orders.orderNumber });

    // 6. Simpan Order Items
    await db.insert(orderItems).values(
      finalOrderItems.map(item => ({
        ...item,
        orderId: newOrder.id,
      }))
    );

    return { success: true, orderNumber: newOrder.orderNumber };
  } catch (error: any) {
    console.error("Error creating order:", error);
    return { success: false, message: error.message || "Gagal membuat pesanan." };
  }
}
