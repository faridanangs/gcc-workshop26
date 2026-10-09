import { storeConfig } from "@/data/store";

export const formatRupiah = (n) =>
  `Rp${new Intl.NumberFormat("id-ID").format(Math.max(0, Math.round(n)))}`;

// timeZone UTC supaya hasil server & client sama (tidak error hydration)
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export function getRatingStats(reviews = []) {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let total = 0;
  reviews.forEach((r) => {
    dist[r.rating] += 1;
    total += r.rating;
  });
  const count = reviews.length;
  return { count, avg: count ? total / count : 0, dist };
}

// Pesan WhatsApp ke panitia penjual.
// Ongkir TIDAK dihitung di sini: untuk COD/QRIS panitia menghitungnya di chat
// setelah pembeli kirim share location (serlok).
export function buildWhatsAppUrl({ product, sponsor, seller, qty, method, name, note }) {
  const subtotal = product.price * qty;

  const lines = [
    `Halo kak, aku mau pesan dari GCC ${storeConfig.title} `,
    "",
    `*Produk:* ${product.name}`,
    `*Sponsor:* ${sponsor.name}`,
    `*Jumlah:* ${qty} x ${formatRupiah(product.price)}`,
    `*Subtotal:* ${formatRupiah(subtotal)}`,
    "",
    `*Metode:* ${method.waLabel}`,
  ];

  if (method.delivery) {
    lines.push(
      `*Ongkir:* ${formatRupiah(storeConfig.shippingPerKm)}/km, dihitung dari jarak tempuh di Google Maps`,
      "_Aku kirim share location (serlok) setelah pesan ini ya kak._",
    );
  } else {
    lines.push("*Ongkir:* Gratis");
  }

  lines.push("", `*Nama:* ${name.trim()}`);
  if (note?.trim()) lines.push(`*Catatan:* ${note.trim()}`);

  const number = seller.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
