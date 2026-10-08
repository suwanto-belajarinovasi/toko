"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/store/CartContext";
import { useEffect, useState } from "react";

export function CartIcon() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors">
      <ShoppingCart className="w-5 h-5" />
      {mounted && cartCount > 0 && (
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-brand-600 text-[10px] font-bold text-white flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
