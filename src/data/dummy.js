export const eventInfo = {
  name: "GCC Workshop",
  edition: "Edisi ke-2",
  year: "2026",
  tagline: "Gamatika Coding Club",
  theme: "Introduction to Data Science & Machine Learning: From Data to Predictions",
  webinarTitle: "Demystifying Data Science & ML: How Computers Learn from Data",
  workshopTitle: "Building Your First Predictive Model: A Beginner's Guide to DS",
  date: "Sabtu, 24 Oktober 2026",
  time: "08.00 - 13.05 WITA",
  location: "Aula MIPA, Universitas Mataram",
  price: "Rp XX.000",
};

export const stats = [
  { label: "Edisi terselenggara", value: "2", suffix: "x" },
  { label: "Alumni peserta", value: "300", suffix: "+" },
  { label: "Pemateri & pembicara", value: "10", suffix: "+" },
  { label: "Kepuasan peserta", value: "97", suffix: "%" },
];

export const galleryPhotos = [
  {
    id: "p1",
    src: "/images/peserta3.webp",
    caption: "GCC 2024 — Sesi kerja kelompok",
  },
  {
    id: "p2",
    src: "/images/peserta4.webp",
    caption: "GCC 2024 — Networking session",
  },
  {
    id: "p3",
    src: "/images/peserta5.webp",
    caption: "GCC 2023 — Demo day peserta",
  },
  {
    id: "p4",
    src: "/images/peserta6.webp",
    caption: "GCC 2023 — Foto bersama penutupan",
  },
  {
    id: "p5",
    src: "/images/peserta7.webp",
    caption: "GCC 2022 — Sesi tanya jawab",
  },
  {
    id: "p6",
    src: "/images/peserta8.webp",
    caption: "GCC 2022 — Antusiasme peserta",
  },
];

export const galleryVideos = [
  {
    id: "v1",
    thumbnail: "https://picsum.photos/seed/gcc-video-1/900/600",
    title: "Recap GCC 2025",
    src: "https://res.cloudinary.com/detetmaw8/video/upload/f_auto,q_auto/v1786348929/workshop6_ix02q9.mp4",
  },
  {
    id: "v2",
    thumbnail: "https://picsum.photos/seed/gcc-video-2/900/600",
    title: "Cuplikan Workshop — Track Web Dev",
    src: "https://res.cloudinary.com/detetmaw8/video/upload/f_auto,q_auto/v1786348929/workshop2_ri1tnw.mp4",
  },
  {
    id: "v6",
    thumbnail: "https://picsum.photos/seed/gcc-video-3/900/600",
    title: "Testimoni Peserta GCC 2024",
    src: "https://res.cloudinary.com/detetmaw8/video/upload/f_auto,q_auto/v1786348929/workshop7_u3usjh.mp4",
  },
  {
    id: "v7",
    thumbnail: "https://picsum.photos/seed/gcc-video-4/900/600",
    title: "Testimoni Peserta GCC 2024",
    src: "https://res.cloudinary.com/detetmaw8/video/upload/f_auto,q_auto/v1786348929/workshop1_lsv3rq.mp4",
  },
];

// Rundown resmi acara (sumber: SUSUNAN_ACARA_GCC.docx), dirangkum untuk landing page.
// Item protokoler pembukaan (kalam ilahi, lagu kebangsaan, sambutan2) digabung jadi satu
// entri "Seremonial Pembukaan" biar timeline publik gak kepanjangan.
export const agenda = [
  {
    time: "08.00",
    title: "Registrasi Peserta",
    desc: "Ambil ID-Card, dan starter kit di meja registrasi.",
  },
  {
    time: "09.00",
    title: "Seremonial Pembukaan",
    desc: "Pembukaan MC, lagu kebangsaan, laporan ketua panitia, dan sambutan dari Ketua Umum GCC, Pembina GCC, Kaprodi Matematika, hingga Dekan FMIPA.",
  },
  {
    time: "10.05",
    title: "Foto Bersama & Persiapan Materi",
    desc: "Sesi foto bersama tamu undangan, dilanjutkan pengalihan ke moderator dan pembacaan CV pemateri.",
  },
  {
    time: "10.20",
    title: "Webinar — Demystifying Data Science & ML",
    desc: "Penyampaian materi \"How Computers Learn from Data\" langsung oleh pemateri.",
  },
  {
    time: "10.50",
    title: "Quiz Sesi 1",
    desc: "Uji pemahaman peserta lewat kuis interaktif seputar materi webinar.",
  },
  {
    time: "11.00",
    title: "ISHOMA",
    desc: "Istirahat, sholat, dan makan siang bersama.",
  },
  {
    time: "11.50",
    title: "Workshop — Building Your First Predictive Model",
    desc: "Latihan hands-on membangun model prediktif pertamamu, dibimbing langsung oleh pemateri.",
  },
  {
    time: "12.25",
    title: "Quiz Sesi 2",
    desc: "Kuis penutup sekaligus evaluasi hasil latihan peserta.",
  },
  {
    time: "12.45",
    title: "Pemberian Hadiah & Sertifikasi",
    desc: "Hadiah untuk peserta terbaik, serta penyerahan plakat dan sertifikat kepada pemateri.",
  },
  {
    time: "12.55",
    title: "Hiburan & Penutupan",
    desc: "Hiburan penutup sekaligus serah terima dari moderator ke MC untuk menutup acara.",
  },
];

export const tracks = [
  { value: "web-dev", label: "Web Development" },
  { value: "mobile-dev", label: "Mobile Development" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "data-ai", label: "Data & AI" },
  { value: "cloud-devops", label: "Cloud & DevOps" },
];

export const sponsors = {
  platinum: [{ name: "Nusantara Cloud" }, { name: "Awan Digital" }],
  gold: [
    { name: "Kopi & Koding" },
    { name: "DevHive Studio" },
    { name: "Bit Sembilan" },
  ],
  silver: [
    { name: "Ruang Kerja" },
    { name: "Sinergi Teknologi" },
    { name: "Kertas Kerja" },
    { name: "Warna Digital" },
  ],
  community: [
    { name: "Komunitas Kode Lokal" },
    { name: "Himpunan Developer Muda" },
    { name: "UMKM Digital Hub" },
    { name: "Radio Kampus FM" },
  ],
};

export const testimonials = [
  {
    name: "Salsa Amelinda",
    role: "Peserta GCC 2024",
    quote:
      "Materinya langsung praktik, bukan cuma teori. Mentornya juga sabar banget nemenin sampai project jadi.",
  },
  {
    name: "Fajar Ramadhan",
    role: "Peserta GCC 2024",
    quote:
      "Dari sini aku ketemu circle developer baru dan akhirnya berani mulai freelance. Worth it banget!",
  },
  {
    name: "Putri Andini",
    role: "Peserta GCC 2024",
    quote:
      "Suasananya hangat, gak kaku. Bahkan yang masih pemula banget kayak aku tetap bisa ngikutin dengan nyaman.",
  },
  {
    name: "Yoga Pratama",
    role: "Peserta GCC 2023",
    quote:
      "Goodie bag-nya lengkap, tapi yang paling berharga tetap ilmunya. Recommended buat yang mau switch career.",
  },
];

export const faqs = [
  {
    q: "Apakah workshop ini cocok untuk pemula?",
    a: "Sangat cocok. Materi disusun dari konsep dasar Data Science & ML sampai praktik langsung, dan pemateri akan mendampingi selama sesi latihan.",
  },
  {
    q: "Apa saja yang perlu dibawa peserta?",
    a: "Cukup bawa laptop yang sudah terisi daya, charger, dan semangat belajar. Modul serta koneksi internet sudah disediakan panitia.",
  },
  {
    q: "Bagaimana cara pembayaran biaya pendaftaran?",
    a: "Pembayaran dilakukan via transfer ke rekening panitia yang tertera di halaman pendaftaran, lalu unggah bukti transfer pada form.",
  },
  {
    q: "Apakah mendapat sertifikat setelah mengikuti acara?",
    a: "Ya, setiap peserta yang hadir penuh akan menerima e-certificate resmi dari panitia GCC Workshop 2026.",
  },
];

export const speakers = [
  {
    name: "Pak Tri",
    role: "Dosen",
    institution: "Universitas Mataram (UNRAM)",
    bio: "Mengajar dan aktif membina mahasiswa di bidang ilmu komputer selama bertahun-tahun, dengan fokus pada pengembangan perangkat lunak dan pembelajaran pemrograman yang aplikatif.",
    quote: "Belajar itu bukan soal secepat apa kamu paham, tapi seberani apa kamu mulai.",
    tags: ["Data Sciences", "Basis Data", "Machine Learning"],
    photo: "https://i.pravatar.cc/400?img=55",
    portfolioUrl: "#", // TODO: ganti dengan profil/portofolio asli
    portfolioLabel: "CV",
  },
];