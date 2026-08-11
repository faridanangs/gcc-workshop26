# GCC Workshop 2026 — Landing Page

Landing page untuk acara **GCC Workshop 2026** (Growth Coding Community), dibangun dengan Next.js App Router, Tailwind CSS, komponen ala shadcn/ui, Framer Motion, dan react-icons. Tema warna mengikuti palet **Terracotta Hangat** (terracotta, krem hangat, amber, cokelat gelap).

## Tech stack

- Next.js `16.3.0` (App Router, `src/app`)
- React `19.2.8` / React DOM `19.2.8`
- Tailwind CSS 3
- Komponen UI bergaya shadcn/ui (ditulis manual di `src/components/ui`, memakai Radix UI di baliknya)
- Framer Motion untuk animasi
- Sonner untuk toast notifikasi
- react-icons (Feather icons)

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk build produksi:

```bash
npm run build
npm run start
```

> **Catatan koneksi internet:** saat build pertama kali, Next.js akan mengunduh font Google (Unbounded, Plus Jakarta Sans, JetBrains Mono) lewat `next/font/google`. Pastikan koneksi internet aktif saat `npm run build` / `npm run dev` pertama kali dijalankan.

## Struktur penting

```
src/
  app/
    layout.js         -> font, metadata, toaster global
    page.js            -> merangkai semua section
    globals.css         -> design token warna & utility kustom
  components/
    ui/                 -> komponen dasar ala shadcn/ui
    sections/           -> Navbar, Hero, About, Agenda, Gallery, Mentors,
                           Testimonials, Sponsors, RegistrationForm, FAQ, Footer, MobileCta
  data/
    dummy.js            -> SEMUA data dummy (foto, video, pemateri, sponsor, FAQ, agenda)
```

## Mengganti data dummy dengan data asli

Semua konten placeholder ada di satu file: **`src/data/dummy.js`**. Cukup edit file ini untuk:

- `eventInfo` — nama acara, tanggal, lokasi, biaya pendaftaran
- `stats` — angka statistik di hero
- `galleryPhotos` / `galleryVideos` — ganti `src` dengan URL foto/video asli (atau taruh file di folder `public/` lalu pakai path lokal, mis. `/images/foto1.jpg`)
- `agenda` — rundown acara
- `tracks` — pilihan kelas/track di form pendaftaran
- `mentors` — daftar pemateri & foto
- `sponsors` — daftar sponsor per tier (Platinum/Gold/Silver/Community). Saat ini ditampilkan sebagai kartu nama (bukan logo gambar) — kalau ada logo asli, komponen `SponsorCard` di `src/components/sections/sponsors.jsx` bisa diubah untuk menampilkan `<img>` logo.
- `testimonials`, `faqs` — testimoni & pertanyaan umum

## Form pendaftaran

Form di `src/components/sections/registration-form.jsx` saat ini **disimulasikan di sisi klien** (tidak ada backend sungguhan) — setelah submit, akan muncul toast sukses lewat Sonner. Field yang tersedia:

- Nama lengkap, email, no. WhatsApp, asal kampus/perusahaan (wajib)
- Kategori peserta, track workshop, ukuran kaos (wajib, dropdown)
- Level pengalaman (opsional)
- Motivasi (opsional)
- **Upload bukti pembayaran** (wajib, gambar/PDF maks 5MB)
- Checkbox persetujuan syarat & ketentuan

Untuk menyambungkan ke backend sungguhan (mis. Google Sheets, database, atau email), ganti isi fungsi `handleSubmit` di file tersebut dengan pemanggilan API (`fetch`) ke endpoint kamu — termasuk mengirim file lewat `FormData`.

## Kustomisasi warna

Semua warna terpusat di `tailwind.config.js` (palet `clay`, `amber`, `ink`, `cream`) dan `src/app/globals.css` (CSS variable `--primary`, `--background`, dst). Ubah di sana untuk konsisten di seluruh halaman.
