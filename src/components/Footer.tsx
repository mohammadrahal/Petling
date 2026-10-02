"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on full-screen voice call (Talk)
  if (pathname === "/talk") {
    return null;
  }

  return (
    <footer className="w-full bg-surface-container-low border-t-2 border-surface-container-high py-8 sm:py-10 px-4 sm:px-gutter mt-auto">
      <div className="max-w-[1160px] mx-auto flex flex-col gap-7">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/characters/logo.png"
                alt="Petling Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="font-headline font-extrabold text-2xl text-primary-container">
              Petling
            </span>
          </Link>

          {/* Nav Links */}
          <nav>
            <ul className="flex flex-wrap items-center gap-5 text-sm font-bold font-headline text-on-surface-variant">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/choose" className="hover:text-primary transition-colors">
                  Choose Pet
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/talk" className="hover:text-primary transition-colors">
                  Talk
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Safety Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest rounded-full px-4 py-1.5 text-xs font-bold text-mint-dark border border-mint-fixed shadow-sm">
            <span>🛡️</span>
            <span>100% Kid Safe & COPPA Certified</span>
          </div>
        </div>

        {/* Bottom copyright & languages */}
        <div className="border-t border-surface-container-high pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-on-surface-variant font-medium">
          <div>
            © {new Date().getFullYear()} Petling. Playful learning companions for curious minds.
          </div>
          <div className="flex items-center gap-2">
            <span>Available in:</span>
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full font-bold border border-surface-container-high">
              🇬🇧 English
            </span>
            <span className="bg-surface-container-lowest px-2.5 py-0.5 rounded-full font-bold border border-surface-container-high">
              🌙 Arabic (العربية)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
