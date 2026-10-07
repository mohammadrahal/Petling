"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "How it works" },
  { href: "/profile", label: "Progress and limits" },
  { href: "/upgrade", label: "Plans" },
  { href: "/contact", label: "Get help" },
];

/**
 * Sub-navigation for the four parent-facing pages. Before this they were only
 * reachable by typing the URL.
 */
export default function ParentNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="For parents" className="border-b border-shell-edge bg-shell">
      <ul className="mx-auto flex max-w-shelf gap-6 overflow-x-auto px-5">
        {LINKS.map(({ href, label }) => {
          const current = pathname.startsWith(href);
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={`inline-block border-b-2 py-3 text-sm transition-colors ${
                  current
                    ? "border-coral font-semibold text-ink"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
