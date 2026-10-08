"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/store/CartContext";
import { ShoppingCart, Check } from "lucide-react";

type AddToCartProps = {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string | null;
    slug: string;
  };
};

export function AddToCartButton({ product }: AddToCartProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button 
      size="lg" 
      className="w-full gap-2" 
      onClick={handleAdd}
      variant={isAdded ? "secondary" : "primary"}
    >
      {isAdded ? (
        <>
          <Check className="w-5 h-5" />
          Ditambahkan ke Keranjang
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Tambah ke Keranjang
        </>
      )}
    </Button>
  );
}
