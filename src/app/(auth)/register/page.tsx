import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Daftar Akun | Belajar Inovasi Store",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Buat Akun Baru</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none transition-colors"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none transition-colors"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                required
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none transition-colors"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none transition-colors"
                placeholder="Minimal 8 karakter"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-2 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Saya setuju dengan <a href="#" className="text-brand-600 hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-brand-600 hover:underline">Kebijakan Privasi</a>.
              </label>
            </div>
          </div>

          <div>
            <Button type="button" className="w-full h-11 text-base shadow-md hover:shadow-lg transition-shadow">
              Daftar Sekarang
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
