"use client";

import { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiArrowLeft,
  FiGrid,
  FiInfo,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { deliveryMethods, storeConfig } from "@/data/store";
import { QtyStepper, SafeImage } from "./shared";
import { buildWhatsAppUrl, formatRupiah } from "@/lib/store-utils";

const methodIcons = { pickup: FiShoppingBag, cod: FiTruck, qris: FiGrid };

// text-base di HP supaya iPhone tidak zoom otomatis saat input difokus
const inputCls =
  "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 font-body text-base text-ink-900 outline-none transition placeholder:text-ink-900/40 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/25 sm:text-sm";

export function CheckoutForm({
  product,
  sponsor,
  seller,
  qty,
  onQtyChange,
  onBack,
}) {
  const { shippingPerKm, pickupPoint } = storeConfig;

  const [methodId, setMethodId] = useState("pickup");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);
  const nameRef = useRef(null);

  const method = deliveryMethods.find((m) => m.id === methodId);
  const subtotal = product.price * qty;
  const valid = name.trim().length > 0;
  const showNameError = touched && !valid;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) {
      setTouched(true);
      nameRef.current?.focus();
      return;
    }
    const url = buildWhatsAppUrl({
      product,
      sponsor,
      seller,
      qty,
      method,
      name,
      note,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 sm:gap-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 inline-flex w-fit items-center gap-2 py-1 pr-2 font-body text-sm font-semibold text-ink-900/70 transition hover:text-ink-900"
      >
        <FiArrowLeft /> Kembali
      </button>

      <div>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Checkout
        </h2>
        <p className="mt-1 font-body text-[13px] leading-relaxed text-ink-900/60 sm:text-sm">
          Pesananmu dikirim ke WhatsApp untuk
          dikonfirmasi.
        </p>
      </div>

      {/* Produk + jumlah */}
      <div className="rounded-2xl border border-ink-900/10 bg-white p-3 sm:p-4">
        <div className="flex gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-100 sm:h-20 sm:w-20">
            <SafeImage
              src={product.images?.[0]}
              alt={product.name}
              sizes="80px"
              label={product.name}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-body text-xs text-ink-900/60">{sponsor.name}</p>
            <p className="line-clamp-2 font-display text-[15px] font-semibold leading-snug sm:text-base">
              {product.name}
            </p>
            <p className="mt-0.5 font-body text-sm text-ink-900/70">
              {formatRupiah(product.price)}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink-900/10 pt-3">
          <QtyStepper
            value={qty}
            onChange={onQtyChange}
            max={Math.max(1, product.stock)}
          />
          <p className="text-right">
            <span className="block font-body text-[11px] text-ink-900/50">
              Subtotal
            </span>
            <span className="font-display text-base font-bold">
              {formatRupiah(subtotal)}
            </span>
          </p>
        </div>
      </div>

      {/* Nama */}
      <div>
        <label
          htmlFor="co-name"
          className="mb-1.5 block font-body text-sm font-semibold"
        >
          Nama pemesan
        </label>
        <input
          ref={nameRef}
          id="co-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkapmu"
          autoComplete="name"
          aria-required="true"
          aria-invalid={showNameError}
          aria-describedby={showNameError ? "co-name-err" : undefined}
          className={`${inputCls} ${showNameError ? "!border-red-500 !ring-2 !ring-red-500/20" : ""}`}
        />
        {showNameError && (
          <p
            id="co-name-err"
            className="mt-1.5 font-body text-xs font-medium text-red-600"
          >
            Nama wajib diisi dulu ya.
          </p>
        )}
      </div>

      {/* Metode */}
      <fieldset>
        <legend className="mb-2 font-body text-sm font-semibold">
          Pengambilan barang
        </legend>
        <div role="radiogroup" className="grid gap-2">
          {deliveryMethods.map((m) => {
            const Icon = methodIcons[m.id];
            const active = m.id === methodId;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMethodId(m.id)}
                className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition sm:p-3.5 ${
                  active
                    ? "border-clay-500 bg-clay-500/5 ring-2 ring-clay-500/25"
                    : "border-ink-900/10 bg-white hover:border-ink-900/30"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${
                    active
                      ? "bg-clay-500 text-white"
                      : "bg-ink-900/5 text-ink-900"
                  }`}
                >
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-body text-sm font-semibold">
                      {m.label}
                    </span>
                    <span className="shrink-0 font-body text-xs font-semibold">
                      {m.delivery
                        ? `${formatRupiah(shippingPerKm)}/km`
                        : "Gratis"}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-body text-xs leading-snug text-ink-900/60">
                    {m.desc}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Info ongkir untuk COD / QRIS */}
      {method.delivery && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-clay-500/40 bg-clay-500/5 p-3.5 sm:gap-3 sm:p-4">
          <FiInfo className="mt-0.5 shrink-0 text-clay-500" />
          <div className="font-body text-[13px] leading-relaxed text-ink-900/80 sm:text-sm">
            <p className="font-semibold text-ink-900">
              Ongkir dihitung lewat WhatsApp
            </p>
            <ol className="mt-1.5 list-decimal space-y-1 pl-4">
              <li>Tekan tombol pesan, chat ke {seller.name} akan terbuka.</li>
              <li>Kirim share location (serlok) rumah atau tempatmu.</li>
              <li>
                Panitia cek jarak tempuhnya di Google Maps, lalu menyebutkan
                ongkir {formatRupiah(shippingPerKm)} per km.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Catatan */}
      <div>
        <label
          htmlFor="co-note"
          className="mb-1.5 block font-body text-sm font-semibold"
        >
          Catatan{" "}
          <span className="font-normal text-ink-900/50">(opsional)</span>
        </label>
        <input
          id="co-note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Contoh: titip di satpam"
          className={inputCls}
        />
      </div>

      {/* Ringkasan */}
      <dl className="space-y-2 rounded-2xl bg-ink-900 p-4 font-body text-[13px] text-cream-50 sm:p-5 sm:text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-cream-100/70">
            Subtotal: {" "} ({qty} x {formatRupiah(product.price)})
          </dt>
          <dd className="shrink-0 font-semibold">{formatRupiah(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-cream-100/70">Ongkir</dt>
          <dd className="text-right font-semibold">
            {method.delivery ? "Dihitung via WhatsApp" : "Gratis"}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-t border-cream-50/15 pt-3">
          <dt className="text-sm sm:text-base">
            {method.delivery ? "Total (belum ongkir)" : "Total"}
          </dt>
          <dd className="font-display text-xl font-bold text-amber-500 sm:text-2xl">
            {formatRupiah(subtotal)}
          </dd>
        </div>
        {!method.delivery && (
          <p className="pt-1 text-xs text-cream-100/60">
            Ambil di {pickupPoint}.
          </p>
        )}
      </dl>

      {/* Tombol pesan: menempel di bawah layar pada HP supaya selalu terjangkau */}
      <div className="sticky bottom-0 -mx-4 border-t border-ink-900/10 bg-cream-50/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="flex items-center gap-3">
          <div className="shrink-0 sm:hidden">
            <p className="font-body text-[11px] leading-none text-ink-900/60">
              {method.delivery ? "Belum ongkir" : "Total"}
            </p>
            <p className="mt-1 font-display text-lg font-bold leading-none">
              {formatRupiah(subtotal)}
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-clay-500 px-5 py-3.5 font-body text-[15px] font-bold text-white transition hover:brightness-110 active:scale-[0.99] sm:gap-2.5 sm:py-4 sm:text-base"
          >
            <FaWhatsapp size={19} /> Pesan via WhatsApp
          </button>
        </div>
      </div>
    </form>
  );
}
