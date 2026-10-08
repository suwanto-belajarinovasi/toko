"use client";

import Link from "next/link";
import { useCart } from "@/components/store/CartContext";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null; // Mencegah hydration error

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="bg-gray-50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja Kosong</h1>
        <p className="text-gray-600 mb-8">Anda belum menambahkan produk digital apapun ke dalam keranjang.</p>
        <Link href="/shop">
          <Button size="lg">Mulai Belanja</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List Produk */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-24 aspect-[4/3] bg-gray-100 rounded-md overflow-hidden shrink-0 relative">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
              </div>
              
              <div className="flex-1">
                <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-brand-600 line-clamp-2">
                  {item.name}
                </Link>
                <div className="text-brand-600 font-bold mt-1">{formatRupiah(item.price)}</div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} produk)</span>
                <span className="font-medium text-gray-900">{formatRupiah(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Diskon</span>
                <span className="font-medium text-gray-900">Rp 0</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-extrabold text-brand-600">{formatRupiah(cartTotal)}</span>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full gap-2">
                Lanjut ke Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
