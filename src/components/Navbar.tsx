"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, MenuIcon, CloseIcon } from "@/components/Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Screen 4 (Talk) has its own immersive fullscreen HUD
  if (pathname === "/talk") {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home", emoji: "🏡" },
    { href: "/choose", label: "Choose Pet", emoji: "🐾" },
    { href: "/dashboard", label: "Dashboard", emoji: "🌟" },
    { href: "/talk", label: "Talk", emoji: "💬" },
    { href: "/about", label: "About", emoji: "💡" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-xl border-b-2 border-surface-container-high shadow-[0_4px_20px_rgba(43,43,43,0.04)]">
      <div className="h-20 max-w-[1160px] mx-auto px-4 sm:px-gutter flex items-center justify-between gap-2 sm:gap-space-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
            <Image
              src="/characters/logo.png"
              alt="Petling Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-headline font-extrabold text-2xl text-primary-container tracking-tight">
            Petling
          </span>
        </Link>

        {/* Center Navigation Pills - Desktop only */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded-full border border-surface-container-high">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-headline font-bold transition-all ${
                  isActive
                    ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop CTA */}
          <Link
            href="/choose"
            className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 rounded-full bg-primary-container text-white font-headline font-extrabold text-sm shadow-[0_4px_0_#99462b] hover:translate-y-0.5 hover:shadow-[0_2px_0_#99462b] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            <span>Start Free</span>
            <ArrowRightIcon className="w-4 h-4 text-white" />
          </Link>

          {/* Quick Petling avatar button */}
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shadow-sm border-2 border-white hover:scale-105 transition-transform"
            title="My Petling"
          >
            <span className="text-lg">🌟</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container border-2 border-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5 text-on-surface" />
            ) : (
              <MenuIcon className="w-5 h-5 text-on-surface" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-surface border-b-4 border-primary-container shadow-2xl px-5 pt-4 pb-8 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-300 rounded-b-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline px-2">Navigation</span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-headline font-bold text-base transition-all ${
                      isActive
                        ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm border border-secondary-container"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{link.emoji}</span>
                      <span>{link.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-surface-container-high flex flex-col gap-3">
              <Link
                href="/choose"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary-container text-white font-headline font-extrabold text-base shadow-[0_4px_0_#99462b] active:translate-y-1 active:shadow-none transition-all text-center"
              >
                <span>Start Free Adventure</span>
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </Link>
              <p className="text-center text-xs font-body text-outline font-semibold">
                100% Kid Safe • COPPA Compliant • Ad-Free
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

