import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// --- USERS TABLE ---
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  phone: text('phone'),
  role: text('role', { enum: ['CUSTOMER', 'ADMIN'] }).default('CUSTOMER').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// --- CATEGORIES TABLE ---
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// --- PRODUCTS TABLE ---
export const products = sqliteTable('products', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  categoryId: text('category_id').references(() => categories.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description'),
  price: real('price').notNull(),
  originalPrice: real('original_price'), // Untuk harga coret
  thumbnail: text('thumbnail'), // URL gambar sampul
  fileUrl: text('file_url'), // Path internal file digital yang aman
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  stockStatus: text('stock_status', { enum: ['AVAILABLE', 'UNAVAILABLE'] }).default('AVAILABLE'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
}, (table) => ({
  categoryIdx: index('product_category_idx').on(table.categoryId),
  slugIdx: index('product_slug_idx').on(table.slug),
}));

// --- ORDERS TABLE ---
export const orders = sqliteTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  orderNumber: text('order_number').notNull().unique(), // e.g., INV-20261008-XXXX
  userId: text('user_id').references(() => users.id), // Bisa null jika mengizinkan guest checkout
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  subtotal: real('subtotal').notNull(),
  discount: real('discount').default(0),
  total: real('total').notNull(),
  paymentMethod: text('payment_method', { enum: ['SHOPEEPAY', 'BTN', 'BCA'] }).notNull(),
  paymentStatus: text('payment_status', { enum: ['UNPAID', 'REVIEW', 'PAID', 'FAILED'] }).default('UNPAID'),
  orderStatus: text('order_status', { enum: ['PENDING_PAYMENT', 'PAYMENT_REVIEW', 'PAID', 'COMPLETED', 'CANCELLED', 'EXPIRED'] }).default('PENDING_PAYMENT'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
}, (table) => ({
  orderNumberIdx: index('order_number_idx').on(table.orderNumber),
  userOrderIdx: index('user_order_idx').on(table.userId),
}));

// --- ORDER ITEMS TABLE ---
export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  orderId: text('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: text('product_id').references(() => products.id).notNull(),
  productName: text('product_name').notNull(), // Snapshot nama produk saat dibeli
  price: real('price').notNull(), // Snapshot harga saat dibeli
  quantity: integer('quantity').notNull().default(1),
  subtotal: real('subtotal').notNull(),
});

// --- PAYMENTS TABLE (Bukti Bayar) ---
export const payments = sqliteTable('payments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  orderId: text('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  paymentMethod: text('payment_method').notNull(),
  amount: real('amount').notNull(),
  proofUrl: text('proof_url').notNull(), // URL storage eksternal/internal
  proofFilename: text('proof_filename').notNull(),
  status: text('status', { enum: ['PENDING', 'VERIFIED', 'REJECTED'] }).default('PENDING'),
  verifiedBy: text('verified_by').references(() => users.id), // ID Admin yang memverifikasi
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// --- DIGITAL ACCESS TABLE (Token Download & Keamanan) ---
export const digitalAccess = sqliteTable('digital_access', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  orderId: text('order_id').references(() => orders.id).notNull(),
  productId: text('product_id').references(() => products.id).notNull(),
  downloadToken: text('download_token').notNull().unique(), // Secure token URL
  downloadCount: integer('download_count').default(0),
  lastDownloadAt: integer('last_download_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }), // Opsional: batas waktu akses
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// --- SETTINGS TABLE ---
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  key: text('key').notNull().unique(), // e.g., 'STORE_NAME', 'WA_NUMBER'
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});
