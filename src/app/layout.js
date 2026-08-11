import { Unbounded, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata = {
  title: "GCC Workshop 2026 — Growth Coding Community",
  description:
    "Workshop coding tahunan Growth Coding Community. Belajar langsung praktik bareng pemateri industri, edisi ke-6, 14 November 2026 di Surabaya.",
  keywords: [
    "GCC Workshop",
    "Growth Coding Community",
    "workshop coding 2026",
    "belajar coding Surabaya",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2C2C2A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${unbounded.variable} ${jakarta.variable} ${jbmono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}