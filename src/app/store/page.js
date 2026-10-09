// app/store/page.js
import { Store } from "@/components/stores/store";
import { storeConfig } from "@/data/store";
// SESUAIKAN: nama export data produk/sponsor kamu di "@/data/store"
import { sponsors } from "@/data/store";
import { formatRupiah } from "@/lib/store-utils";

// Cari produk beserta sponsornya berdasarkan id/slug
function findProduct(key) {
  if (!key) return null;
  for (const sponsor of sponsors ?? []) {
    const product = sponsor.products?.find(
      (p) => String(p.id ?? p.slug) === String(key),
    );
    if (product) return { product, sponsor };
  }
  return null;
}

function firstProductImage() {
  for (const sponsor of sponsors ?? []) {
    const img = sponsor.products?.find((p) => p.images?.length)?.images[0];
    if (img) return img;
  }
  return undefined;
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const found = findProduct(params?.produk);

  // Link ke produk tertentu: /store?produk=<id>
  if (found) {
    const { product, sponsor } = found;
    const title = `${product.name} — ${formatRupiah(product.price)}`;
    const description = `${product.description ?? ""} Sponsor: ${sponsor.name}.`.trim();
    const images = product.images?.[0]
      ? [{ url: product.images[0], alt: product.name }]
      : undefined;

    return {
      title,
      description,
      alternates: { canonical: `/store?produk=${params.produk}` },
      openGraph: {
        title,
        description,
        type: "website",
        url: `/store?produk=${params.produk}`,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: images?.map((i) => i.url),
      },
    };
  }

  // Link ke halaman store secara umum: /store
  const title = "GCC Workshop Store — Merchandise & Produk";
  const description = `Merchandise dan produk dari sponsor. Ambil di ${storeConfig.pickupPoint} atau COD/QRIS, pesan lewat WhatsApp.`;
  const cover = firstProductImage();

  return {
    title,
    description,
    alternates: { canonical: "/store" },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/store",
      images: cover ? [{ url: cover, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default function Page() {
  return <Store />;
}