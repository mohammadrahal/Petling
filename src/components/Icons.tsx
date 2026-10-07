/**
 * One icon set, one grid, one stroke weight.
 *
 * Emoji render differently on every platform, carry no stroke relationship to
 * the type around them, and are read aloud by screen readers as their CLDR
 * name ("rolling on the floor laughing"), so they are not used as icons
 * anywhere in this app. Everything here is drawn on a 24px grid at 1.75
 * stroke with round caps, to sit with the rounded display face.
 *
 * Icons are decorative by default (aria-hidden). Pass a `title` only when the
 * icon is the sole content of a control and nothing else labels it.
 */

type IconProps = {
  className?: string;
  title?: string;
};

function Svg({
  className = "size-5",
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ---------- navigation ---------- */

export function House(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.5 20.5v-6h5v6" />
    </Svg>
  );
}

export function Menu(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function Close(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ArrowRight(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeft(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Svg>
  );
}

export function Check(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m5 13 4.2 4.2L19 7" />
    </Svg>
  );
}

export function Door(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="m9 8-4 4 4 4" />
      <path d="M15 12H5" />
    </Svg>
  );
}

export function Lock(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Svg>
  );
}

/* ---------- voice ---------- */

export function Mic(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
      <path d="M8.5 21h7" />
    </Svg>
  );
}

export function Speaker(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 9.5h3L11.5 6v12L7 14.5H4z" />
      <path d="M15 9.5a3.6 3.6 0 0 1 0 5" />
      <path d="M17.5 7a7 7 0 0 1 0 10" />
    </Svg>
  );
}

export function Waveform(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 11v2M8 8v8M12 5v14M16 8v8M20 11v2" />
    </Svg>
  );
}

export function Speech(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L5 21l1.1-3.3A6.6 6.6 0 0 1 4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
    </Svg>
  );
}

export function Hint(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1 1 1.7v.4h5v-.4c0-.7.4-1.3 1-1.7A6 6 0 0 0 12 3Z" />
      <path d="M9.5 19h5M10.5 21.5h3" />
    </Svg>
  );
}

/* ---------- the companion ---------- */

export function Egg(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3c-3.4 0-6 4.6-6 8.7A6 6 0 0 0 18 11.7C18 7.6 15.4 3 12 3Z" />
      <path d="m9 12 1.8 1.4L9.3 15l2 1.3" />
    </Svg>
  );
}

export function Sprout(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21v-8" />
      <path d="M12 13C9 13 7 11 7 8c3 0 5 2 5 5Z" />
      <path d="M12 13c0-3 2-5 5-5 0 3-2 5-5 5Z" />
    </Svg>
  );
}

export function Paw(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 13.8c-2.2 0-4 1.5-4 3.3 0 1.3 1 2.4 2.3 2.4.6 0 1.1-.2 1.7-.2s1.1.2 1.7.2c1.3 0 2.3-1.1 2.3-2.4 0-1.8-1.8-3.3-4-3.3Z" />
      <circle cx="7.4" cy="11" r="1.8" />
      <circle cx="10.4" cy="7.6" r="1.8" />
      <circle cx="13.6" cy="7.6" r="1.8" />
      <circle cx="16.6" cy="11" r="1.8" />
    </Svg>
  );
}

export function Heart(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 20s-7-4.3-7-9.1A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.9C19 15.7 12 20 12 20Z" />
    </Svg>
  );
}

export function Berry(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 7.5c-3.4 0-6 2.5-6 5.5 0 3.7 2.9 8 6 8s6-4.3 6-8c0-3-2.6-5.5-6-5.5Z" />
      <path d="M12 7.5v-3" />
      <path d="M9 4.6c1.1 0 2.2.7 3 1.6.8-.9 1.9-1.6 3-1.6" />
    </Svg>
  );
}

/* ---------- learning ---------- */

export function Book(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 6.6C10.5 5.1 8.5 4.6 6 4.6c-.8 0-1.5 0-2 .2v13c.5-.1 1.2-.2 2-.2 2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2 .8 0 1.5 0 2 .2v-13c-.5-.1-1.2-.2-2-.2-2.5 0-4.5.5-6 2Z" />
      <path d="M12 6.6v13" />
    </Svg>
  );
}

export function Abacus(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
      <circle cx="8" cy="7.5" r="1.7" />
      <circle cx="15" cy="7.5" r="1.7" />
      <circle cx="11" cy="12" r="1.7" />
      <circle cx="17.5" cy="12" r="1.7" />
      <circle cx="7" cy="16.5" r="1.7" />
      <circle cx="13" cy="16.5" r="1.7" />
    </Svg>
  );
}

export function Star(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m12 3.8 2.6 5.3 5.8.85-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.85z" />
    </Svg>
  );
}

export function Flame(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21c3.3 0 6-2.4 6-5.5 0-4-4-5.6-4-9.5-3 1.5-4 4-4 6 0-1-.5-2-1.5-3C7 10.6 6 12.6 6 15.5 6 18.6 8.7 21 12 21Z" />
    </Svg>
  );
}

export function Chart(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V7M17 20v-9" />
    </Svg>
  );
}

/* ---------- parents ---------- */

export function Shield(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.2 19 5.7v5.6c0 4.5-3 8-7 9.9-4-1.9-7-5.4-7-9.9V5.7z" />
      <path d="m9 11.8 2.2 2.2L15.2 10" />
    </Svg>
  );
}

export function Globe(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3c2.4 2.4 3.7 5.5 3.7 9S14.4 18.6 12 21c-2.4-2.4-3.7-5.5-3.7-9S9.6 5.4 12 3Z" />
    </Svg>
  );
}

export function Clock(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 2.2" />
    </Svg>
  );
}

export function Mail(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7.2 7.1 5.2a2 2 0 0 0 2.2 0l7.1-5.2" />
    </Svg>
  );
}

export function Palette(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3a9 9 0 0 0 0 18c1.3 0 2.2-1 2.2-2.1 0-1-.8-1.8-.8-2.7 0-1 .8-1.7 1.8-1.7h2.3A3.5 3.5 0 0 0 21 11c0-4.5-4-8-9-8Z" />
      <circle cx="8.4" cy="9.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}
