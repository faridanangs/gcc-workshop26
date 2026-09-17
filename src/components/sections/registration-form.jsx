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
  FiMessageCircle,
} from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { eventInfo } from "@/data/workshop";
import { EncryptedText } from "../ui/encrypted-text";

// TODO: ganti sesuai akun & grup asli kamu
const IG_HANDLE = "@gamatika_coding_club";
const IG_URL = "https://instagram.com/gamatika_coding_club";
const WA_GROUP_LINK = "https://chat.whatsapp.com/KuxKmPfvGDsLdTLK0vgIL3";

const data_bank = [
  {
    name: "BRI",
    account_name: "a.n. ZILA AZIRA",
    bank_account: "357501065600534",
  },
  {
    name: "DANA",
    account_name: "a.n. ZILA AZIRA",
    bank_account: "+6281370383648",
  },
];

const initialForm = {
  fullName: "",
  whatsapp: "",
  email: "",
  institution: "",
  motivation: "",
  agree: false,
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [paymentProof, setPaymentProof] = useState(null);
  const [igProof, setIgProof] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedBankIndex, setSelectedBankIndex] = useState(0);
  const paymentInputRef = useRef(null);
  const igInputRef = useRef(null);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e, setter, label) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file terlalu besar", {
        description: `Maksimal ukuran ${label} adalah 5MB.`,
      });
      return;
    }
    setter(selected);
  };

  const copyAccount = () => {
    const bank = data_bank[selectedBankIndex];
    navigator.clipboard?.writeText(bank.bank_account);
    toast(`Nomor ${bank.name} disalin`, {
      description: "Silakan tempel di aplikasi pembayaran kamu.",
    });
  };

  const copyHandle = () => {
    navigator.clipboard?.writeText(IG_HANDLE);
    toast("Username Instagram disalin", {
      description: "Cari & follow akunnya, lalu screenshot sebagai bukti.",
    });
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      toast.error("Belum menyetujui syarat & ketentuan", {
        description: "Centang persetujuan terlebih dahulu sebelum mendaftar.",
      });
      return;
    }
    if (!paymentProof) {
      toast.error("Bukti pembayaran belum diunggah", {
        description: "Unggah screenshot atau foto bukti transfer kamu.",
      });
      return;
    }
    if (!igProof) {
      toast.error("Bukti follow Instagram belum diunggah", {
        description: `Unggah screenshot bukti kamu sudah follow ${IG_HANDLE}.`,
      });
      return;
    }

    setSubmitting(true);
    try {
      const [igBase64, paymentBase64] = await Promise.all([
        fileToBase64(igProof),
        fileToBase64(paymentProof),
      ]);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          whatsapp: form.whatsapp,
          email: form.email,
          institution: form.institution,
          motivation: form.motivation,
          igProof: { base64: igBase64, type: igProof.type, name: igProof.name },
          paymentProof: {
            base64: paymentBase64,
            type: paymentProof.type,
            name: paymentProof.name,
          },
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || "Gagal mengirim pendaftaran");
      }

      setSubmitting(false);
      setSubmitted(true);
      toast.success("Pendaftaran berhasil dikirim!", {
        description: `Terima kasih ${form.fullName || "peserta"}, sudah mendaftar di ${eventInfo.name} ${eventInfo.year}.`,
        icon: <FiCheckCircle className="h-4 w-4" />,
      });
    } catch (err) {
      setSubmitting(false);
      toast.error("Pendaftaran gagal dikirim", {
        description: err.message || "Coba lagi beberapa saat lagi.",
      });
    }
  };

  const handleRegisterAnother = () => {
    setForm(initialForm);
    setPaymentProof(null);
    setIgProof(null);
    setSubmitted(false);
    if (paymentInputRef.current) paymentInputRef.current.value = "";
    if (igInputRef.current) igInputRef.current.value = "";
  };

  const renderFileField = ({
    id,
    label,
    file,
    setFile,
    inputRef,
    helperText,
  }) => (
    <div className="mt-2">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => handleFileChange(e, setFile, label)}
        className="hidden"
      />
      {!file ? (
        <label
          htmlFor={id}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-900/20 bg-cream-100/50 px-4 py-8 text-center transition-colors hover:border-clay-500/50 hover:bg-clay-100/40"
        >
          <FiUploadCloud className="h-6 w-6 text-clay-500" />
          <span className="text-sm font-semibold text-ink-900">
            {helperText}
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
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-900/50 hover:bg-ink-900/10 hover:text-ink-900"
            aria-label="Hapus file"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section id="daftar" className="relative bg-cream-100/60 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: info, payment & IG follow */}
          <div>
            <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
              <EncryptedText
                text={`form-pendaftaran`}
                encryptedClassName="text-black"
                revealedClassName="dark:text-clay-600  text-clay-600"
                revealDelayMs={100}
              />
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Amankan kursimu di {eventInfo.name} {eventInfo.year}.
            </h2>
            <p className="mt-4 text-ink-900/60">
              Kuota terbatas. Lengkapi data diri, transfer biaya pendaftaran,
              follow Instagram GAMATIKA Coding Club, lalu unggah kedua buktinya
              di form pendaftaran.
            </p>

            {/* Payment panel */}
            <div className="mt-8 rounded-2xl border-2 border-ink-900/10 bg-cream-50 p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-900/45">
                Biaya Pendaftaran Hanya
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-clay-500">
                {eventInfo.price}
              </p>

              {/* Pilih metode pembayaran */}
              <div className="mt-5 flex gap-2">
                {data_bank.map((v, i) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setSelectedBankIndex(i)}
                    className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors ${
                      selectedBankIndex === i
                        ? "border-clay-500 bg-clay-500 text-cream-50"
                        : "border-ink-900/12 bg-cream-100/60 text-ink-900/55 hover:border-clay-500/40 hover:text-ink-900"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>

              {/* Nomor rekening/akun yang dipilih */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-900 px-4 py-3.5">
                <div>
                  <p className="text-xs text-cream-100/55">
                    Transfer ke {data_bank[selectedBankIndex].name}
                  </p>
                  <p className="mt-0.5 font-mono text-base font-semibold text-cream-50">
                    {data_bank[selectedBankIndex].bank_account}
                  </p>
                  <p className="text-xs text-cream-100/55">
                    {data_bank[selectedBankIndex].account_name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-clay-500"
                  aria-label={`Salin nomor ${data_bank[selectedBankIndex].name}`}
                >
                  <FiCopy className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-900/90">
                Sudah termasuk modul digital, snack &amp; makan siang,
                sertifikat, Souvenir, serta Dorprize yang menarik.
              </p>
            </div>

            {/* IG follow panel */}
            <div className="mt-6 rounded-2xl border-2 border-ink-900/10 bg-cream-50 p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-900/45">
                Syarat tambahan
              </p>
              <p className="mt-1 font-display text-xl font-bold text-clay-500">
                Follow Instagram GCC
              </p>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-ink-900 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <FaInstagram className="h-6 w-6 shrink-0 text-clay-400" />
                  <div>
                    <p className="text-xs text-cream-100/55">
                      Follow akun kami
                    </p>
                    <p className="font-mono text-sm font-semibold text-cream-50">
                      {IG_HANDLE}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyHandle}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-clay-500"
                  aria-label="Salin username Instagram"
                >
                  <FiCopy className="h-4 w-4" />
                </button>
              </div>
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600 hover:text-clay-500"
              >
                Open Profile Instagram GCC
                <FiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: form */}
          {!submitted ? (
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
                  <Label htmlFor="fullName">Nama lengkap*</Label>
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
                  <Label htmlFor="whatsapp">Nomor WhatsApp*</Label>
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
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="cth. nadia@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="sm:col-span-1">
                  <Label htmlFor="institution">Instansi*</Label>
                  <Input
                    id="institution"
                    required
                    placeholder="cth. Universitas Airlangga"
                    value={form.institution}
                    onChange={(e) => updateField("institution", e.target.value)}
                    className="mt-2"
                  />
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
                  <Label>Bukti follow Instagram {IG_HANDLE}*</Label>
                  {renderFileField({
                    id: "igProof",
                    label: "bukti follow Instagram",
                    file: igProof,
                    setFile: setIgProof,
                    inputRef: igInputRef,
                    helperText: "Klik untuk unggah screenshot bukti follow",
                  })}
                </div>

                <div className="sm:col-span-2">
                  <Label>Bukti pembayaran*</Label>
                  {renderFileField({
                    id: "paymentProof",
                    label: "bukti pembayaran",
                    file: paymentProof,
                    setFile: setPaymentProof,
                    inputRef: paymentInputRef,
                    helperText: "Klik untuk unggah bukti transfer",
                  })}
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
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center rounded-3xl border-2 border-clay-500/30 bg-cream-50 p-8 text-center shadow-sm sm:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clay-100 text-clay-600">
                <FiCheckCircle className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">
                Pendaftaran berhasil!
              </h3>
              <p className="mt-2 max-w-sm text-sm text-ink-900/60">
                Terima kasih {form.fullName || "peserta"}, kamu sudah terdaftar
                di {eventInfo.name} {eventInfo.year}. Gabung grup WhatsApp
                peserta untuk info selanjutnya.
              </p>

              <a
                href={WA_GROUP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5a] sm:w-auto"
              >
                <FiMessageCircle className="h-4 w-4" />
                Gabung grup WhatsApp peserta
              </a>

              <button
                type="button"
                onClick={handleRegisterAnother}
                className="mt-4 text-sm font-medium text-ink-900/50 underline-offset-4 hover:text-ink-900/80 hover:underline"
              >
                Daftar peserta lain
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
