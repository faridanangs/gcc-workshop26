import {
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { eventInfo } from "@/data/dummy";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 pb-8 pt-16 text-cream-100">
      <div className="container">
        <div className="grid gap-10 border-b border-cream-50/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className={`clay-stamp h-10 w-10 border-2 font-display text-sm font-bold relative border-clay-500 bg-white text-cream-50`}
              >
                <Image src="/images/logo.png" alt="Growth Coding Logo" fill />
              </span>
              <span className="font-display text-sm font-bold text-cream-50">
                {eventInfo.name}
                <span className="block font-mono text-[10px] font-medium tracking-wide opacity-60">
                  {eventInfo.edition} · {eventInfo.year}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/55">
              Workshop coding tahunan yang mempertemukan calon developer dengan
              pemateri industri lewat sesi praktik yang hangat dan membumi.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiInstagram, FiYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Sosial media GCC"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/5 text-cream-100 transition-colors hover:bg-clay-500 hover:text-cream-50"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-cream-100/45">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/70">
              <li>
                <a href="#tentang" className="hover:text-clay-500">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#rundown" className="hover:text-clay-500">
                  Rundown
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-clay-500">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#sponsor" className="hover:text-clay-500">
                  Sponsor
                </a>
              </li>
              <li>
                <a href="#daftar" className="hover:text-clay-500">
                  Daftar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-cream-100/45">
              Kontak panitia
            </p>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/70">
              <li className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                halo@gccworkshop.id
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                {eventInfo.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-cream-100/40 sm:flex-row">
          <p>
            © {eventInfo.year} {eventInfo.name}. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
