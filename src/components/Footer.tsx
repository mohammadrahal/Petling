import Link from "next/link";

const GROUPS = [
  {
    heading: "For children",
    links: [
      { href: "/choose", label: "Companions" },
      { href: "/dashboard", label: "Today" },
      { href: "/talk", label: "Talk" },
    ],
  },
  {
    heading: "For parents",
    links: [
      { href: "/about", label: "How it works" },
      { href: "/profile", label: "Progress and limits" },
      { href: "/upgrade", label: "Plans" },
      { href: "/contact", label: "Get help" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-shell-edge bg-shell">
      <div className="mx-auto max-w-shelf px-5 py-12">
        <div className="flex flex-wrap gap-x-16 gap-y-10">
          <div className="max-w-xs">
            <p className="font-display text-xl font-bold text-ink">Petling</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Children practise English and Arabic out loud with a companion that
              grows as they learn.
            </p>
          </div>

          {GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-display text-base font-semibold text-ink">
                {group.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/*
          Claims a children's product can actually stand behind. COPPA has no
          certifying body, so the earlier "COPPA Certified" badge was removed
          rather than reworded.
        */}
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-shell-edge pt-6">
          <p className="max-w-measure text-sm leading-relaxed text-ink-soft">
            No ads and no third-party tracking. Recordings are used to answer the
            child in the moment and are not kept afterwards. Written to meet
            COPPA requirements for children under 13 —{" "}
            <Link href="/about" className="text-coral-ink underline underline-offset-4">
              read what that means
            </Link>
            .
          </p>
          <p className="text-sm text-ink-soft">
            English and <span lang="ar">العربية</span> · © {new Date().getFullYear()} Petling
          </p>
        </div>
      </div>
    </footer>
  );
}
