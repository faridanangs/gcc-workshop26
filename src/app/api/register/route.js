// app/api/register/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const rawText = await res.text();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error("Apps Script tidak mengembalikan JSON yang valid — kemungkinan URL salah atau deployment belum di-set 'Anyone'.");
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Gagal menyimpan data" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API /register error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}