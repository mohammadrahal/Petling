/**
 * One definition of the six companions, shared by /, /choose, /dashboard and
 * /about, which each kept their own partial copy before.
 *
 * Note what is deliberately absent: a brand colour per companion. Colour in
 * this app carries a role (coral acts, sun is alive, leaf is progress), so
 * six extra identity colours would make it carry nothing. The companions are
 * told apart by their portrait and their subject, and every portrait sits on
 * the same lit disc.
 */

export type SubjectKey = "stories" | "numbers" | "letters" | "rhymes" | "music" | "calm";

export type Companion = {
  id: string;
  name: string;
  species: string;
  /** What the child practises with them. */
  subject: SubjectKey;
  subjectLabel: string;
  treat: string;
  /** First thing they say, in each language. */
  greeting: { en: string; ar: string };
  /** Web Speech API settings, so each one sounds like themselves. */
  voice: { pitch: number; rate: number };
  img: string;
  /** Larger render, where one exists. */
  portrait?: string;
};

export const COMPANIONS: Companion[] = [
  {
    id: "pip",
    name: "Pip",
    species: "Coral bear",
    subject: "stories",
    subjectLabel: "Stories and first words",
    treat: "Strawberries",
    greeting: {
      en: "Shall we read a story together?",
      ar: "مرحبا! هل نقرأ قصة؟",
    },
    voice: { pitch: 1.4, rate: 0.95 },
    img: "/characters/pip.png",
    portrait: "/characters/pip-full.png",
  },
  {
    id: "momo",
    name: "Momo",
    species: "Baby dinosaur",
    subject: "numbers",
    subjectLabel: "Counting and adding",
    treat: "Watermelon",
    greeting: {
      en: "Let's count all the way to twenty!",
      ar: "هيا نعدّ معًا!",
    },
    voice: { pitch: 1.15, rate: 0.9 },
    img: "/characters/momo.png",
  },
  {
    id: "zuzu",
    name: "Zuzu",
    species: "Star alien",
    subject: "letters",
    subjectLabel: "Letters and sounds",
    treat: "Star apples",
    greeting: {
      en: "Which letter makes this sound?",
      ar: "ما هذا الحرف؟",
    },
    voice: { pitch: 1.5, rate: 1 },
    img: "/characters/zuzu.png",
  },
  {
    id: "lulu",
    name: "Lulu",
    species: "Sunny owl",
    subject: "rhymes",
    subjectLabel: "Rhymes and reading",
    treat: "Honey puffs",
    greeting: {
      en: "I know a rhyme. Can you finish it?",
      ar: "هل تحب القوافي؟",
    },
    voice: { pitch: 1.35, rate: 0.92 },
    img: "/characters/lulu.png",
  },
  {
    id: "bumble",
    name: "Bumble",
    species: "Cloud bee",
    subject: "music",
    subjectLabel: "Singing the alphabet",
    treat: "Clover dew",
    greeting: {
      en: "Sing the alphabet with me!",
      ar: "هيا نغنّي الأبجدية!",
    },
    voice: { pitch: 1.6, rate: 1.05 },
    img: "/characters/bumble.png",
  },
  {
    id: "toby",
    name: "Toby",
    species: "Gentle otter",
    subject: "calm",
    subjectLabel: "Listening, slowly",
    treat: "River berries",
    greeting: {
      en: "Take your time. I'm listening.",
      ar: "خذ وقتك، أنا أسمعك.",
    },
    voice: { pitch: 1.1, rate: 0.88 },
    img: "/characters/toby.png",
  },
];

export const DEFAULT_COMPANION = COMPANIONS[0];

export function companionById(id: string | null | undefined): Companion {
  return COMPANIONS.find((c) => c.id === id) ?? DEFAULT_COMPANION;
}

/*
 * This module stays free of client-only code so server components can import
 * COMPANIONS directly. The browser-stored selection lives in ./companion-store.
 */
