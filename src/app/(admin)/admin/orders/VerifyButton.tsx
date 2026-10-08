"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifyPayment } from "@/app/actions/admin";
import { Loader2, CheckCircle } from "lucide-react";

export default function VerifyButton({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isLoading, setIsLoading] = useState(false);

  if (currentStatus === "PAID" || currentStatus === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
        <CheckCircle className="w-4 h-4" /> Lunas
      </span>
    );
  }

  const handleVerify = async () => {
    if (!confirm("Apakah Anda yakin ingin memverifikasi pembayaran ini? Akses file digital akan otomatis diberikan ke pembeli.")) return;
    
    setIsLoading(true);
    const res = await verifyPayment(orderId);
    setIsLoading(false);

    if (res.success) {
      alert("Pesanan berhasil diverifikasi!");
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <Button 
      size="sm" 
      onClick={handleVerify} 
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
    >
      {isLoading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
      Terima Pembayaran
    </Button>
  );
}
