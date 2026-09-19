"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const REGISTRATION_ALLOWED_FOLDERS = [
  "workshop-registration/payment-proof",
  "workshop-registration/ig-proof",
];

export async function getRegistrationUploadSignature(folder) {
  if (!REGISTRATION_ALLOWED_FOLDERS.includes(folder)) {
    return { success: false, message: "Folder upload tidak valid." };
  }

  const timestamp = Math.round(Date.now() / 1000);
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp, upload_preset: uploadPreset },
    process.env.CLOUDINARY_API_SECRET,
  );

  return {
    success: true,
    data: {
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder,
      uploadPreset,
    },
  };
}