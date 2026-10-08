"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
// import { createProduct } from "@/app/actions/admin"; // Akan dibuat di langkah 4

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Logika form submit ke server action akan disambungkan di sini
    setTimeout(() => {
      alert("Produk berhasil disimpan!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Produk Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Tambahkan produk digital, atur harga, dan diskon.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Informasi Dasar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Informasi Produk</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  placeholder="Contoh: Template Excel Keuangan Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  placeholder="Muncul di kartu katalog produk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap</label>
                <textarea 
                  rows={6}
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-none"
                  placeholder="Jelaskan fitur, manfaat, dan isi dari produk digital ini secara lengkap..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Harga & Diskon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga Normal (Coret) <span className="text-xs text-gray-400 font-normal">(Opsional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-gray-500 font-medium">Rp</span>
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="250000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Harga ini akan dicoret merah untuk efek psikologis diskon.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Harga Jual Akhir</label>
                <div className="relative">
                  <span className="absolute left-4 top-2 text-brand-600 font-bold">Rp</span>
                  <input 
                    type="number" 
                    required 
                    className="w-full pl-11 pr-4 py-2 border-2 border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-brand-50/30"
                    placeholder="99000"
                  />
                </div>
                <p className="text-xs text-brand-600 mt-1">Harga sebenarnya yang akan dibayar pembeli.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media & Status */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Media Digital</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Cover (Thumbnail)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-brand-500 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Klik untuk upload gambar</span>
                  <span className="text-xs text-gray-400 mt-1">Rekomendasi rasio 4:3 (JPG, PNG)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Produk (PDF/ZIP/RAR)</label>
                <div className="border-2 border-dashed border-green-200 bg-green-50/50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-green-50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-green-700">Upload File Digital Anda</span>
                  <span className="text-xs text-green-600 mt-1">File ini yang akan di-download pembeli.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Status Visibilitas</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500" defaultChecked />
                <span className="text-sm font-medium text-gray-700">Aktifkan Produk</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500" />
                <span className="text-sm font-medium text-gray-700">Jadikan Produk Unggulan</span>
              </label>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full gap-2 text-base h-12 shadow-md" disabled={isLoading}>
            <Save className="w-5 h-5" />
            {isLoading ? "Menyimpan..." : "Simpan & Publikasikan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
