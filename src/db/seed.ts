import { db } from './index';
import { users, categories, products } from './schema';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Mulai melakukan seeding database...');

  // 1. Buat Admin
  const adminPassword = process.env.ADMIN_PASSWORD || 'rahasia123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await db.insert(users).values({
    name: 'Administrator',
    email: process.env.ADMIN_EMAIL || 'admin@belajarinovasi.com',
    passwordHash: hashedPassword,
    role: 'ADMIN',
  }).onConflictDoNothing();

  // 2. Buat Kategori
  const categoryData = [
    { name: 'Ebook', slug: 'ebook', description: 'Buku digital dan modul panduan.' },
    { name: 'Template', slug: 'template', description: 'Template dokumen, Excel, dan presentasi.' },
    { name: 'Aplikasi', slug: 'aplikasi', description: 'Source code dan aplikasi siap pakai.' },
  ];
  
  const insertedCategories = await db.insert(categories).values(categoryData).returning();

  // 3. Buat Produk Dummy Profesional
  if (insertedCategories.length > 0) {
    const ebookCat = insertedCategories.find(c => c.slug === 'ebook')?.id;
    const templateCat = insertedCategories.find(c => c.slug === 'template')?.id;
    const appCat = insertedCategories.find(c => c.slug === 'aplikasi')?.id;

    await db.insert(products).values([
      {
        categoryId: templateCat!,
        name: 'Template Administrasi Sekolah Profesional (Excel)',
        slug: 'template-administrasi-sekolah-excel',
        description: 'Kumpulan template Excel otomatis untuk manajemen nilai, presensi, dan keuangan sekolah. Dirancang khusus untuk memudahkan pekerjaan tata usaha dan guru.',
        shortDescription: 'Template Excel otomatis untuk manajemen nilai, presensi, dan keuangan.',
        price: 150000,
        originalPrice: 250000,
        isFeatured: true,
      },
      {
        categoryId: ebookCat!,
        name: 'Ebook: Strategi Implementasi Kurikulum Merdeka',
        slug: 'ebook-strategi-kurikulum-merdeka',
        description: 'Panduan lengkap dan praktis bagi kepala sekolah dan guru dalam merancang modul ajar dan mengimplementasikan Kurikulum Merdeka secara efektif di instansi masing-masing.',
        shortDescription: 'Panduan praktis implementasi Kurikulum Merdeka untuk guru.',
        price: 75000,
        originalPrice: 100000,
        isFeatured: false,
      },
      {
        categoryId: appCat!,
        name: 'Source Code Sistem Informasi Akademik Terpadu',
        slug: 'source-code-sistem-akademik',
        description: 'Source code aplikasi berbasis web lengkap dengan fitur manajemen siswa, guru, jadwal pelajaran, dan raport digital. Menggunakan tech stack modern yang mudah dikustomisasi.',
        shortDescription: 'Sistem Informasi Akademik Web lengkap dengan fitur manajemen siswa.',
        price: 850000,
        originalPrice: 1200000,
        isFeatured: true,
      }
    ]);
  }

  console.log('Seeding selesai!');
}

main().catch((err) => {
  console.error('Error saat seeding:', err);
  process.exit(1);
});
