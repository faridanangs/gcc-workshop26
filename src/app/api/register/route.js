// // app/api/register/route.js
// import { NextResponse } from "next/server";
// import { google } from "googleapis";

// const SHEET_NAME = "Pendaftaran";

// function formatTimestamp() {
//   const options = {
//     timeZone: "Asia/Makassar", // WITA — sesuaikan kalau spreadsheet-mu pakai timezone lain
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   };
//   const parts = new Intl.DateTimeFormat("en-GB", options).formatToParts(
//     new Date(),
//   );
//   const map = {};
//   parts.forEach(({ type, value }) => (map[type] = value));
//   return `${map.day}/${map.month}/${map.year} ${map.hour}:${map.minute}:${map.second}`;
// }

// function getSheetsClient() {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       // Vercel/env vars nyimpen \n sebagai teks literal, jadi perlu diubah jadi newline asli
//       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     },
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });

//   return google.sheets({ version: "v4", auth });
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     if (
//       !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
//       !process.env.GOOGLE_PRIVATE_KEY ||
//       !process.env.GOOGLE_SHEET_ID
//     ) {
//       throw new Error(
//         "Konfigurasi Google Sheets belum lengkap di environment variables.",
//       );
//     }

//     const {
//       fullName,
//       whatsapp,
//       email,
//       institution,
//       motivation,
//       igProofUrl,
//       paymentProofUrl,
//     } = body;

//     // Validasi dasar biar nggak ada baris kosong/rusak masuk ke sheet
//     if (!fullName || !whatsapp || !email || !institution) {
//       return NextResponse.json(
//         {
//           error: "Data wajib (nama, whatsapp, email, instansi) belum lengkap.",
//         },
//         { status: 400 },
//       );
//     }

//     const sheets = getSheetsClient();
//     const whatsappFormatted = "'" + String(whatsapp); // biar angka 0 di depan nggak hilang

//     const appendResult = await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: `${SHEET_NAME}!A:H`,
//       valueInputOption: "USER_ENTERED",
//       insertDataOption: "INSERT_ROWS",
//       requestBody: {
//         values: [
//           [
//             "'" + formatTimestamp(),
//             fullName,
//             whatsappFormatted,
//             email,
//             institution,
//             motivation || "",
//             igProofUrl || "",
//             paymentProofUrl || "",
//           ],
//         ],
//       },
//     });

//     // TAMBAHIN INI — buat lihat persis kemana data ini ditulis
//     console.log(
//       "Sheets append result:",
//       JSON.stringify(appendResult.data, null, 2),
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("API /register error:", err);

//     // Error umum: spreadsheet belum di-share ke service account
//     if (err.message?.includes("The caller does not have permission")) {
//       return NextResponse.json(
//         {
//           error:
//             "Server belum punya akses ke spreadsheet. Cek apakah sudah di-share ke service account.",
//         },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json(
//       { error: err.message || "Gagal menyimpan data pendaftaran." },
//       { status: 500 },
//     );
//   }
// }
