"use client";

import { useCart } from "@/components/store/CartContext";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/order";
import { Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push("/cart"); // Redirect jika keranjang kosong
    }
  }, [items, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get("name") as string,
      customerEmail: formData.get("email") as string,
      customerPhone: formData.get("whatsapp") as string,
      paymentMethod: formData.get("paymentMethod") as "SHOPEEPAY" | "BTN" | "BCA",
      cartItems: items.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    // Validasi basic
    if (!data.customerName || !data.customerEmail || !data.customerPhone || !data.paymentMethod) {
      setError("Mohon lengkapi semua data formulir.");
      setIsLoading(false);
      return;
    }

    // Call Server Action
    const result = await createOrder(data);

    if (result.success && result.orderNumber) {
      clearCart(); // Bersihkan keranjang client
      router.push(`/payment/${result.orderNumber}`); // Arahkan ke halaman bayar
    } else {
      setError(result.message || "Terjadi kesalahan sistem. Silakan coba lagi.");
      setIsLoading(false);
    }
  }

  if (!isMounted || items.length === 0) return null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        {/* Form Data Pembeli */}
        <div className="flex-1 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Pembeli</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="nama@email.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Akses produk akan dihubungkan ke email ini.</p>
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                  <input 
                    type="text" 
                    id="whatsapp" 
                    name="whatsapp" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>
            
            <div className="space-y-3">
              {[
                { id: "BCA", name: "Transfer Bank BCA", desc: "Dicek manual (10-30 menit)" },
                { id: "BTN", name: "Transfer Bank BTN", desc: "Dicek manual (10-30 menit)" },
                { id: "SHOPEEPAY", name: "ShopeePay", desc: "Scan/Transfer (10-30 menit)" }
              ].map((method) => (
                <label key={method.id} className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50">
                  <div className="flex items-center h-5">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method.id} 
                      required
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-semibold text-gray-900 block">{method.name}</span>
                    <span className="text-gray-500 block">{method.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
            
            <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-900">{item.quantity}x</span>
                    <span className="text-gray-600 line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 shrink-0">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-900">Total Pembayaran</span>
                <span className="font-extrabold text-brand-600">{formatRupiah(cartTotal)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Pesanan Sedang Dibuat...
                </>
              ) : (
                "Buat Pesanan Sekarang"
              )}
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              Dengan membuat pesanan, Anda menyetujui syarat & ketentuan kami.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
