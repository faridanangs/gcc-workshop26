import { Unbounded, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { eventInfo } from "@/data/workshop";

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
  title: `${eventInfo.name} ${eventInfo.year} — ${eventInfo.tagline}`,
  description: `Workshop tahunan ${eventInfo.tagline}, ${eventInfo.edition}. Tema "${eventInfo.theme}" — belajar langsung praktik bareng pemateri. ${eventInfo.date}, ${eventInfo.location}.`,
  keywords: [
    "GCC Workshop",
    "Gamatika Coding Club",
    `workshop coding ${eventInfo.year}`,
    "Data Science",
    "Machine Learning",
    "workshop coding Mataram",
    "Universitas Mataram",
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