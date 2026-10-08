export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Belajar Inovasi Store</h3>
            <p className="text-gray-600 max-w-sm">
              Platform penyedia produk digital profesional seperti ebook, template, dan aplikasi untuk mendukung produktivitas dan bisnis Anda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Tautan</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/shop" className="hover:text-brand-600">Katalog Produk</a></li>
              <li><a href="/about" className="hover:text-brand-600">Tentang Kami</a></li>
              <li><a href="/contact" className="hover:text-brand-600">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Bantuan</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/faq" className="hover:text-brand-600">FAQ</a></li>
              <li><a href="/cara-pembelian" className="hover:text-brand-600">Cara Pembelian</a></li>
              <li><a href="/konfirmasi" className="hover:text-brand-600">Konfirmasi Pembayaran</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Belajar Inovasi Store. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
