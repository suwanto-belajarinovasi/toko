import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { digitalAccess, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    // 1. Validasi Token di Database
    const accessData = await db
      .select({
        id: digitalAccess.id,
        downloadCount: digitalAccess.downloadCount,
        fileUrl: products.fileUrl,
        productName: products.name,
      })
      .from(digitalAccess)
      .innerJoin(products, eq(digitalAccess.productId, products.id))
      .where(eq(digitalAccess.downloadToken, token))
      .limit(1);

    const access = accessData[0];

    // 2. Jika token tidak valid atau tidak ditemukan
    if (!access) {
      return new NextResponse(
        JSON.stringify({ error: "Token akses tidak valid atau sudah kedaluwarsa." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Update counter dan waktu unduh terakhir
    await db
      .update(digitalAccess)
      .set({
        downloadCount: (access.downloadCount || 0) + 1,
        lastDownloadAt: new Date(),
      })
      .where(eq(digitalAccess.id, access.id));

    // 4. Proses Pengiriman File
    // Di aplikasi production, fileUrl biasanya berisi URL Private S3 / Vercel Blob.
    // Di sini kita merealisasikan mekanisme secure redirect atau file buffer.
    
    if (!access.fileUrl) {
      // Mockup jika belum ada URL file yang dimasukkan ke produk (Data Dummy)
      const dummyContent = `Ini adalah file digital mock-up untuk produk: ${access.productName}\nTerima kasih telah berbelanja di Belajar Inovasi Store!`;
      
      return new NextResponse(dummyContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="${access.productName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt"`,
        },
      });
    }

    // Jika menggunakan Cloud Storage Terpisah (AWS S3, R2, Vercel Blob):
    // Cara Teraman 1: Return Pre-Signed URL (redirect sementara)
    return NextResponse.redirect(access.fileUrl, 302);

    /* 
    Cara Teraman 2 (Murni disembunyikan via Buffer/Stream):
    const fileResponse = await fetch(access.fileUrl);
    const fileBuffer = await fileResponse.arrayBuffer();
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": fileResponse.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${access.productName}.zip"`,
      },
    });
    */

  } catch (error) {
    console.error("Download Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Terjadi kesalahan pada server saat memproses unduhan." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
