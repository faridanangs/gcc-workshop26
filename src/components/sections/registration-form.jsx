"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiLoader,
  FiCopy,
  FiFileText,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { eventInfo, tracks } from "@/data/dummy";

const CATEGORY_OPTIONS = [
  { value: "mahasiswa", label: "Mahasiswa" },
  { value: "profesional", label: "Profesional" },
  { value: "umum", label: "Umum" },
];

const initialForm = {
  fullName: "",
  whatsapp: "",
  institution: "",
  category: "",
  motivation: "",
  agree: false,
};

export function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar", {
        description: "Maksimal ukuran bukti pembayaran adalah 5MB.",
      });
      return;
    }
    setFile(selected);
  };

  const copyAccount = () => {
    navigator.clipboard?.writeText(
      "1234 5678 9099 — a.n. Panitia GCC Workshop",
    );
    toast("Nomor rekening disalin", {
      description: "Silakan tempel di aplikasi m-banking kamu.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agree) {
      toast.error("Belum menyetujui syarat & ketentuan", {
        description: "Centang persetujuan terlebih dahulu sebelum mendaftar.",
      });
      return;
    }
    if (!file) {
      toast.error("Bukti pembayaran belum diunggah", {
        description: "Unggah screenshot atau foto bukti transfer kamu.",
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Pendaftaran berhasil dikirim!", {
        description: `Terima kasih ${form.fullName || "peserta"}, sudah mendaftar di ${eventInfo.name} ${eventInfo.year}.`,
        icon: <FiCheckCircle className="h-4 w-4" />,
      });
      setForm(initialForm);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1600);
  };

  return (
    <section id="daftar" className="relative bg-cream-100/60 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: info & payment */}
          <div>
            <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
              // form-pendaftaran
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Amankan kursimu di {eventInfo.name} {eventInfo.year}.
            </h2>
            <p className="mt-4 text-ink-900/60">
              Kuota terbatas. Lengkapi data diri, transfer biaya pendaftaran,
              lalu unggah buktinya di form pendaftaran.
            </p>

            <div className="mt-8 rounded-2xl border-2 border-ink-900/10 bg-cream-50 p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-900/45">
                Biaya pendaftaran
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-clay-500">
                {eventInfo.price}
              </p>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-ink-900 px-4 py-3.5">
                <div>
                  <p className="text-xs text-cream-100/55">
                    Transfer ke rekening
                  </p>
                  <p className="font-mono text-sm font-semibold text-cream-50">
                    1234 5678 9099
                  </p>
                  <p className="text-xs text-cream-100/55">
                    a.n. Panitia GCC Workshop
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-clay-500"
                  aria-label="Salin nomor rekening"
                >
                  <FiCopy className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-900/50">
                Sudah termasuk modul digital, snack &amp; makan siang,
                e-certificate, serta merchandise eksklusif GCC {eventInfo.year}.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border-2 border-ink-900/8 bg-cream-50 p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Label htmlFor="fullName">Nama lengkap</Label>
                <Input
                  id="fullName"
                  required
                  placeholder="cth. Nadia Rahmawati"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-1">
                <Label htmlFor="institution">Asal kampus / perusahaan</Label>
                <Input
                  id="institution"
                  required
                  placeholder="cth. Universitas Airlangga"
                  value={form.institution}
                  onChange={(e) => updateField("institution", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Kategori peserta</Label>
                <Select
                  name="category"
                  required
                  value={form.category}
                  onValueChange={(v) => updateField("category", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="motivation">
                  Motivasi ikut workshop (opsional)
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Ceritakan singkat harapanmu mengikuti GCC Workshop..."
                  value={form.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="sm:col-span-2">
                <Label>Bukti pembayaran</Label>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    id="paymentProof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!file ? (
                    <label
                      htmlFor="paymentProof"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-900/20 bg-cream-100/50 px-4 py-8 text-center transition-colors hover:border-clay-500/50 hover:bg-clay-100/40"
                    >
                      <FiUploadCloud className="h-6 w-6 text-clay-500" />
                      <span className="text-sm font-semibold text-ink-900">
                        Klik untuk unggah bukti transfer
                      </span>
                      <span className="text-xs text-ink-900/45">
                        JPG, PNG, atau PDF · maks. 5MB
                      </span>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border-2 border-clay-500/30 bg-clay-100/40 px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <FiFileText className="h-5 w-5 shrink-0 text-clay-600" />
                        <span className="truncate text-sm font-medium text-ink-900">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-900/50 hover:bg-ink-900/10 hover:text-ink-900"
                        aria-label="Hapus file"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => updateField("agree", e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-ink-900/30 accent-[#D85A30]"
                />
                <label
                  htmlFor="agree"
                  className="text-sm leading-relaxed text-ink-900/65"
                >
                  Saya menyatakan data yang diisi benar dan menyetujui syarat
                  &amp; ketentuan penyelenggaraan {eventInfo.name}{" "}
                  {eventInfo.year}.
                </label>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-8 w-full"
            >
              {submitting ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" /> Mengirim
                  pendaftaran...
                </>
              ) : (
                <>
                  Kirim pendaftaran <FiArrowRight />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
