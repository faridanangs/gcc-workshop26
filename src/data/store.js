export const storeConfig = {
  title: "Workshop Store",
  // Titik ambil barang untuk metode "Ambil di FMIPA"
  pickupPoint: "FMIPA Mehibun",
  // Ongkir COD / QRIS: Rp1.000 per km, dihitung panitia lewat Google Maps
  // (rute dari lokasi panitia penjual ke lokasi pembeli, lihat jarak tempuhnya)
  shippingPerKm: 1000,
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
// DATA INDOSAT OOREDOO (IM3)
// Salin 2 objek di bawah ke data/store.js:
//   1. indosatSponsor -> masukkan ke array `sponsors`
//   2. indosatProduct -> masukkan ke array `products`
// Bagian bertanda TODO perlu kamu isi / cek dulu.
// ============================================================

export const indosatSponsor = {
  id: "indosat-ooredoo",
  name: "Indosat Ooredoo",
  tagline: "Operator seluler, sponsor workshop dengan kartu perdana IM3.",
};

export const indosatProduct = {
  id: "kartu-im3-3gb",
  sponsorId: "indosat-ooredoo",
  sellerId: "anang", // TODO: ganti dengan id panitia yang memegang kartunya (lihat `sellers`)
  name: "Kartu Perdana IM3 + Kuota 3GB",
  category: "Kartu Perdana",
  price: 25000,
  originalPrice: null,
  stock: 50, // TODO: isi jumlah kartu yang benar-benar tersedia
  sold: 9,
  images: ["/store/im3-1.jpg", "/store/im3-2.jpg"], // TODO: taruh foto di /public/store/
  description:
    "Kartu perdana IM3 dari Indosat Ooredoo. Sudah termasuk kuota internet, bonus penyimpanan Google, dan langganan aplikasi hiburan.",
  features: [
    "Kartu perdana IM3",
    "Kuota internet 3GB",
    "Bonus penyimpanan Google 180GB",
    "Langganan aplikasi: WeTV, Vidio, dan lainnya", // TODO: lengkapi daftar aplikasinya
    // TODO (opsional): tambahkan masa aktif kuota & masa berlaku bonus/langganan
  ],
  reviews: [
    {
      id: "r1",
      name: "Rizky Pratama",
      rating: 5,
      date: "2026-09-21",
      comment:
        "Aromanya wangi banget pas dibuka. Cocok buat begadang ngerjain tugas ML, rasanya halus nggak terlalu asam.",
      images: ["/store/reviews/kopi-r1-1.jpg", "/store/reviews/kopi-r1-2.jpg"],
    },
    {
      id: "r2",
      name: "Nadia Safitri",
      rating: 5,
      date: "2026-09-18",
      comment: "Packing rapi, kopinya masih fresh. Bakal repeat order.",
      images: ["/store/reviews/kopi-r2-1.jpg"],
    },
    {
      id: "r3",
      name: "Ahmad Fauzan",
      rating: 4,
      date: "2026-09-12",
      comment:
        "Rasanya enak, cuma gilingan bubuknya agak kasar buat espresso. Kalau tubruk pas.",
      images: [],
    },
  ],
};


export const sponsors = [{ ...indosatSponsor }];

export const products = [{ ...indosatProduct }];

