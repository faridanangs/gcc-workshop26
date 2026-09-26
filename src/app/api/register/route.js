// app/api/register/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      throw new Error("GOOGLE_APPS_SCRIPT_URL belum di-set di environment.");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 detik — lebih lama dari tryLock(15000) di Apps Script

    let res;
    try {
      res = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(body),
        redirect: "follow",
        signal: controller.signal,
      });
    } catch (fetchErr) {
      if (fetchErr.name === "AbortError") {
        throw new Error(
          "Google Apps Script terlalu lama merespons (>8 detik). Kemungkinan banyak pendaftar bersamaan. Coba lagi.",
        );
      }
      throw fetchErr;
    } finally {
      clearTimeout(timeoutId);
    }

    const rawText = await res.text();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error(
        "Apps Script tidak mengembalikan JSON yang valid — kemungkinan URL salah atau deployment belum di-set 'Anyone'.",
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Gagal menyimpan data" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API /register error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}