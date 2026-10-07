"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Close, House, Menu, Mic, Paw, Shield, Sprout } from "@/components/Icons";

/**
 * Two audiences share this app: a child who wants to talk to their companion,
 * and a parent who wants to check on them and set limits. The nav says so,
 * instead of listing every route in one flat row.
 */
const CHILD_LINKS = [
  { href: "/", label: "Home", Icon: House },
  { href: "/choose", label: "Companions", Icon: Paw },
  { href: "/dashboard", label: "Today", Icon: Sprout },
];

const PARENT_LINK = { href: "/about", label: "For parents", Icon: Shield };

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Navigating closes the drawer. Adjusting during render rather than in an
  // effect avoids a frame where the new page shows under an open menu.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isOn = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-shell-edge bg-shell">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-shell"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-shelf items-center gap-4 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/characters/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full"
            priority
          />
          <span className="font-display text-xl font-bold text-ink">Petling</span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 md:flex">
          {CHILD_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isOn(href) ? "page" : undefined}
              className={`border-b-2 pb-0.5 text-base transition-colors ${
                isOn(href)
                  ? "border-coral font-semibold text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}

          <span className="h-5 w-px bg-shell-edge" aria-hidden="true" />

          <Link
            href={PARENT_LINK.href}
            aria-current={isOn(PARENT_LINK.href) ? "page" : undefined}
            className={`border-b-2 pb-0.5 text-base transition-colors ${
              isOn(PARENT_LINK.href)
                ? "border-coral font-semibold text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {PARENT_LINK.label}
          </Link>
        </nav>

        <Link
          href="/talk"
          className="press press-sm press-coral ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 font-display font-bold text-ink md:ml-0"
        >
          <Mic className="size-5" />
          Talk
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border border-shell-edge text-ink md:hidden"
        >
          {menuOpen ? <Close className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-shell-edge bg-shell px-5 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {[...CHILD_LINKS, PARENT_LINK].map(({ href, label, Icon }) => (
              <li key={href} className="border-b border-shell-edge last:border-0">
                <Link
                  href={href}
                  aria-current={isOn(href) ? "page" : undefined}
                  className="flex items-center gap-3 py-3.5 text-base text-ink"
                >
                  <Icon
                    className={`size-5 ${isOn(href) ? "text-coral" : "text-ink-soft"}`}
                  />
                  <span className={isOn(href) ? "font-semibold" : undefined}>
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
