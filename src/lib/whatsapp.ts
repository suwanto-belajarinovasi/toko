export function generateWhatsAppLink(
  orderNumber: string,
  customerName: string,
  totalAmount: number,
  paymentMethod: string
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "085895283075";
  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalAmount);

  const message = `Halo Admin Belajar Inovasi Store,

Saya ingin melakukan konfirmasi pembayaran.

Nomor Pesanan: ${orderNumber}
Nama: ${customerName}
Total: ${formattedTotal}
Metode Pembayaran: ${paymentMethod}

Saya sudah melakukan pembayaran. Mohon verifikasinya.
Terima kasih.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
