"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { Copy, Check, UploadCloud, MessageCircle } from "lucide-react";

type PaymentClientProps = {
  orderNumber: string;
  customerName: string;
  total: number;
  paymentMethod: string;
};

const BANK_DETAILS = {
  SHOPEEPAY: { bank: "ShopeePay", number: "085895283075", owner: "Suwanto" },
  BTN: { bank: "Bank BTN", number: "1236301570067655", owner: "Suwanto" },
  BCA: { bank: "Bank BCA", number: "8240415501", owner: "Suwanto" },
};

export default function PaymentClient({ orderNumber, customerName, total, paymentMethod }: PaymentClientProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const bankInfo = BANK_DETAILS[paymentMethod as keyof typeof BANK_DETAILS];
  const waLink = generateWhatsAppLink(orderNumber, customerName, total, bankInfo.bank);

  const handleCopy = () => {
    navigator.clipboard.writeText(bankInfo.number);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Validasi ukuran max 2MB di client
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 2MB.");
        return;
      }
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);
    
    // TODO Phase 7: Implementasi upload riil ke storage terpisah (misal AWS S3 / Vercel Blob)
    // Saat ini kita simulasikan proses upload berhasil untuk transisi ke tahap WhatsApp
    setTimeout(() => {
      setIsUploading(false);
      alert("Bukti pembayaran berhasil diunggah! Silakan lanjutkan konfirmasi via WhatsApp.");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Instruksi Transfer */}
      <div className="bg-white border border-brand-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Instruksi Pembayaran</h2>
        <p className="text-sm text-gray-600 mb-6">
          Silakan transfer tepat sebesar <strong className="text-brand-600">{formatRupiah(total)}</strong> ke rekening berikut:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{bankInfo.bank}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold tracking-wider text-gray-900">{bankInfo.number}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              className="gap-2 text-xs h-8"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? "Tersalin" : "Salin"}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">A.n. <span className="font-semibold">{bankInfo.owner}</span></p>
        </div>
        
        <p className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded border border-red-100">
          * Pastikan nominal pembayaran sesuai dengan total pesanan Anda.
        </p>
      </div>

      {/* Upload Bukti Pembayaran */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Bukti Transfer</h2>
        <form onSubmit={handleUpload}>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center mb-4 hover:bg-gray-50 transition-colors relative">
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 font-medium">
              {file ? file.name : "Klik untuk memilih file (JPG, PNG, PDF)"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Maksimal 2MB</p>
            <input 
              type="file" 
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              required
            />
          </div>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full"
            disabled={!file || isUploading}
          >
            {isUploading ? "Mengunggah..." : "Simpan Bukti Pembayaran"}
          </Button>
        </form>
      </div>

      {/* Konfirmasi WhatsApp */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 shadow-sm text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi ke Admin</h2>
        <p className="text-sm text-gray-600 mb-6">
          Setelah transfer dan mengunggah bukti, klik tombol di bawah untuk mempercepat verifikasi pesanan Anda.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white border-none">
            <MessageCircle className="w-5 h-5" />
            Konfirmasi Pembayaran via WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
