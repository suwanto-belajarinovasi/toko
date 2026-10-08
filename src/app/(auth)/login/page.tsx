import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Masuk | Belajar Inovasi Store",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl border border-gray-200 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Masuk ke Akun Anda</h2>
          <p className="mt-2 text-sm text-gray-600">
            Atau{" "}
            <Link href="/register" className="font-medium text-brand-600 hover:text-brand-500">
              daftar akun baru
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#">
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 text-sm outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Ingat saya
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-brand-600 hover:text-brand-500">
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <div>
            <Button type="button" className="w-full h-11 text-base">
              Masuk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
