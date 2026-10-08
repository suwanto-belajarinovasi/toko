import { ShieldCheck, Zap, Users } from "lucide-react";

export const metadata = {
  title: "Tentang Kami | Belajar Inovasi Store",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Belajar Inovasi</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Platform terpercaya yang menyediakan produk digital berkualitas untuk mendukung produktivitas, pendidikan, dan bisnis Anda di era digital.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cepat & Praktis</h3>
          <p className="text-gray-600">Semua produk digital kami dirancang untuk langsung bisa digunakan (plug-and-play), menghemat ratusan jam waktu kerja Anda.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-peach-50 text-peach-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Kualitas Terjamin</h3>
          <p className="text-gray-600">Kami memastikan setiap *source code*, *template*, dan modul telah melewati standar uji profesional sebelum dipublikasikan.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Dukungan Pelanggan</h3>
          <p className="text-gray-600">Anda tidak dilepas begitu saja. Kami menyediakan dukungan responsif via WhatsApp jika Anda mengalami kendala pengunduhan.</p>
        </div>
      </div>

      <div className="bg-brand-900 rounded-3xl p-10 md:p-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Siap Meningkatkan Produktivitas?</h2>
        <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ratusan profesional dan tenaga pendidik lainnya yang telah menghemat waktu mereka menggunakan produk dari Belajar Inovasi Store.
        </p>
        <a href="/shop" className="inline-block bg-white text-brand-900 font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
          Jelajahi Katalog Produk
        </a>
      </div>
    </div>
  );
}
