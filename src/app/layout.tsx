import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Lexend } from "next/font/google";
import "./globals.css";

// Carries Latin and Arabic in one family, so a bilingual sentence keeps one
// voice instead of falling back mid-string.
const display = Baloo_Bhaijaan_2({
  subsets: ["latin", "arabic"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Drawn for reading proficiency in young readers, which is who reads this.
const body = Lexend({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Petling — learn a language out loud",
    template: "%s · Petling",
  },
  description:
    "Children aged 3 to 8 practise English and Arabic by speaking with a companion that hatches and grows as they learn.",
};

export const viewport: Viewport = {
  themeColor: "#fbf6ef",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
