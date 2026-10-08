import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Megaphone, PlusCircle } from "lucide-react";

export const metadata = {
  title: "Admin Panel | Belajar Inovasi Store",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Sidebar Profesional */}
      <aside className="w-full md:w-64 bg-brand-900 text-white shrink-0 md:min-h-screen flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-brand-800 bg-brand-950/50">
          <h1 className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
            Admin<span className="text-accent-500">Panel</span>
          </h1>
          <p className="text-brand-300 text-xs mt-1 font-medium">Belajar Inovasi Store</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 mt-4 px-3">Menu Utama</div>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <LayoutDashboard className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <ShoppingCart className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Pesanan Masuk</span>
          </Link>
          
          <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 mt-8 px-3">Katalog</div>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <Package className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Kelola Produk</span>
          </Link>
          <Link href="/admin/products/new" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <PlusCircle className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Tambah Produk</span>
          </Link>
          
          <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 mt-8 px-3">Sistem</div>
          <Link href="/admin/info" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <Megaphone className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Info & Diskon</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <Users className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Pelanggan</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-brand-50 rounded-lg hover:bg-brand-800 hover:text-white transition-all group">
            <Settings className="w-5 h-5 text-brand-400 group-hover:text-accent-400 transition-colors" /> 
            <span className="font-medium">Pengaturan</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-brand-800 bg-brand-950/30">
          <button className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
