import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Belajar Inovasi Store",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-bold text-xl text-brand-900 tracking-tight">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Belajar Inovasi Store</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium">
            <ShoppingCart className="w-5 h-5" /> Pesanan
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium">
            <Package className="w-5 h-5" /> Produk
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium">
            <Users className="w-5 h-5" /> Pelanggan
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium">
            <Settings className="w-5 h-5" /> Pengaturan
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 rounded-md hover:bg-red-50 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
