export const storeConfig = {
  title: "Workshop Store",
  // Titik ambil barang untuk metode "Ambil di FMIPA"
  pickupPoint: "FMIPA Mehibun",
  // Ongkir COD / QRIS: Rp1.000 per km, dihitung panitia lewat Google Maps
  // (rute dari lokasi panitia penjual ke lokasi pembeli, lihat jarak tempuhnya)
  shippingPerKm: 1500,
};

// Panitia yang memegang barang. Pesanan dikirim ke WhatsApp panitia yang memegang produknya.
// GANTI nama & nomor (format internasional, tanpa "+" dan spasi).
export const sellers = [
  { id: "anang", name: "Anangs", whatsapp: "6285119697871" },
  { id: "agus", name: "Agus", whatsapp: "6281234567893" },
];

export const deliveryMethods = [
  {
    id: "pickup",
    label: "Ambil di FMIPA",
    desc: "Ambil langsung di FMIPA, tanpa ongkir.",
    waLabel: "Ambil langsung di FMIPA",
    delivery: false,
  },
  {
    id: "cod",
    label: "COD",
    desc: "Diantar panitia, bayar tunai saat barang sampai.",
    waLabel: "COD (diantar)",
    delivery: true,
  },
  {
    id: "qris",
    label: "QRIS",
    desc: "Diantar panitia, bayar lewat QRIS.",
    waLabel: "QRIS (diantar)",
    delivery: true,
  },
];

// ============================================================
// DATA INDOSAT OOREDOO (3)
// Salin 2 objek di bawah ke data/store.js:
//   1. indosatSponsor -> masukkan ke array `sponsors`
//   2. indosatProduct -> masukkan ke array `products`
// Bagian bertanda TODO perlu kamu isi / cek dulu.
// ============================================================

export const indosatSponsor = {
  id: "indosat-ooredoo",
  name: "Indosat Ooredoo",
  tagline: "Operator seluler, sponsor workshop dengan kartu perdana Tri(3).",
};

export const indosatProduct = {
  id: "kartu-tri-3gb",
  sponsorId: "indosat-ooredoo",
  sellerId: "anang", // TODO: ganti dengan id panitia yang memegang kartunya (lihat `sellers`)
  name: "Kartu Perdana Tri(3) + Kuota 3GB",
  category: "Kartu Perdana",
  price: 25000,
  originalPrice: null,
  stock: 50, // TODO: isi jumlah kartu yang benar-benar tersedia
  sold: 10,
  images: [
    "/stores/kartu3/kartu-3-1.jpeg",
    "/stores/kartu3/kartu-3-2.jpeg",
    "/stores/kartu3/kartu-3-3.jpeg",
  ], // TODO: taruh foto di /public/store/
  description:
    "Kartu perdana Tri(3) dari Indosat Ooredoo. Sudah termasuk kuota internet, dan langganan aplikasi hiburan.",
  features: [
    "Kartu perdana Tri(3)",
    "Kuota internet 3GB",
    "Langganan aplikasi peremium: (Viu/WeTv/IQiY) Selama 1 Bulan",
  ],
  reviews: [
    {
      id: "hata",
      name: "Hata",
      rating: 5,
      date: "9 oktober 2026",
      comment:
        "Sumpah kartunya bagus banget, gak nyesel kalian beli disini guys, kuotanya lumayanlah sepadan dengan harga, dan yang paling bagus ini bisa dapet premium buat nonton drama korea di Viu. Mantap!",
      images: ["/stores/kartu3/review-1.jpeg", "/stores/kartu3/review-2.jpeg"],
    },
    {
      id: "r2",
      name: "Nadia Safitri",
      rating: 5,
      date: "28 September 2026",
      comment: "Sumpah gokil sih ini kartu, cuman 25k doang udah bisa dapet yang 5G, mana udah nyaman banget pake kartu 3, langsung dah kubeli dua saking bagusnya, rekomendasi banget buat kalian yang mau beli kartu perdana + 5G + dapet bonus, langsung aja beli disini.",
      images: ["/stores/kartu3/review-3.jpeg"],
    },
    {
      id: "r3",
      name: "Ahmad Fauzan",
      rating: 4,
      date: "1 Oktober 2026",
      comment:
        "Gimana yaa, intinya bagus dah kartunya.",
      images: [],
    },
  ],
};

export const sponsors = [{ ...indosatSponsor }];

export const products = [{ ...indosatProduct }];
