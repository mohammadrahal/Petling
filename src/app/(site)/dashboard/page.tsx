"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CompanionStage from "@/components/CompanionStage";
import SubjectIcon from "@/components/SubjectIcon";
import {
  ArrowRight,
  Berry,
  Book,
  Check,
  Flame,
  Mic,
  Paw,
  Star,
} from "@/components/Icons";
import { useCompanion } from "@/lib/companion-store";

/**
 * Nothing is wired to an account yet, so every figure on this screen comes from
 * here and the screen says so. A dashboard that presents invented numbers as a
 * child's real progress is worse than an empty one.
 */
const SAMPLE = {
  childName: "Mira",
  stage: "Baby",
  level: 2,
  streakDays: 7,
  wordsLearned: 142,
  stars: { earned: 18, needed: 25 },
  talkSecondsLeft: 192,
};

const QUESTS = [
  {
    id: "words",
    title: "Animals and fruit, in Arabic",
    subject: "letters" as const,
    stars: 3,
    done: true,
  },
  {
    id: "numbers",
    title: "Adding up to ten",
    subject: "numbers" as const,
    stars: 5,
    done: true,
  },
  {
    id: "story",
    title: "The lost kite",
    subject: "stories" as const,
    stars: 10,
    done: false,
  },
];

const MAX_BERRIES = 5;

function formatMinutes(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function DashboardPage() {
  const companion = useCompanion();
  const [fullness, setFullness] = useState(75);
  const [berries, setBerries] = useState(MAX_BERRIES);
  const [feedNote, setFeedNote] = useState<string | null>(null);
  const noteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (noteTimer.current) clearTimeout(noteTimer.current);
    },
    [],
  );

  const announce = (message: string) => {
    setFeedNote(message);
    if (noteTimer.current) clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setFeedNote(null), 4000);
  };

  const feed = () => {
    if (berries === 0) {
      announce("No berries left today. Finish a quest to earn more.");
      return;
    }
    setBerries((n) => n - 1);
    setFullness((n) => Math.min(100, n + 10));
    announce(`${companion.name} ate a berry.`);
  };

  const questsDone = QUESTS.filter((q) => q.done).length;
  const growthPercent = Math.round((SAMPLE.stars.earned / SAMPLE.stars.needed) * 100);

  return (
    <div className="bg-clay">
      <div className="mx-auto max-w-shelf px-5 py-10">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {companion.name} is waiting for you, {SAMPLE.childName}.
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Showing sample data. Progress becomes real once an account is connected.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-14">
          {/* The companion and their state: one column, one object, big. */}
          <section aria-labelledby="companion-heading">
            <h2 id="companion-heading" className="sr-only">
              Your companion
            </h2>

            <CompanionStage
              src={companion.img}
              alt={`${companion.name}, a ${companion.species.toLowerCase()}`}
              size={260}
              breathing
              priority
              className="mx-auto"
            />

            <p className="mt-5 text-center font-display text-xl font-bold text-ink">
              {SAMPLE.stage} {companion.name}
              <span className="font-semibold text-ink-soft"> · stage {SAMPLE.level}</span>
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="flex items-center gap-2 text-sm text-ink-soft">
                    <Berry className="size-4" />
                    Tummy
                  </dt>
                  <dd className="font-display text-sm font-semibold text-ink">
                    {fullness}% full
                  </dd>
                </div>
                <div
                  className="mt-2 h-3 overflow-hidden rounded-full bg-clay-edge"
                  role="progressbar"
                  aria-valuenow={fullness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${companion.name}'s tummy`}
                >
                  <div
                    className="h-full rounded-full bg-berry transition-[width] duration-500"
                    style={{ width: `${fullness}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="flex items-center gap-2 text-sm text-ink-soft">
                    <Star className="size-4" />
                    Growing to stage {SAMPLE.level + 1}
                  </dt>
                  <dd className="font-display text-sm font-semibold text-ink">
                    {SAMPLE.stars.earned} of {SAMPLE.stars.needed} stars
                  </dd>
                </div>
                <div
                  className="mt-2 h-3 overflow-hidden rounded-full bg-clay-edge"
                  role="progressbar"
                  aria-valuenow={SAMPLE.stars.earned}
                  aria-valuemin={0}
                  aria-valuemax={SAMPLE.stars.needed}
                  aria-label={`Growing to stage ${SAMPLE.level + 1}`}
                >
                  <div
                    className="h-full rounded-full bg-leaf"
                    style={{ width: `${growthPercent}%` }}
                  />
                </div>
              </div>
            </dl>

            <button
              type="button"
              onClick={feed}
              disabled={berries === 0}
              className="press press-sm press-shell mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-shell-edge bg-shell px-5 font-display font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Berry className="size-5 text-berry" />
              Feed a berry
              <span className="text-ink-soft">
                ({berries} of {MAX_BERRIES} left)
              </span>
            </button>

            {/* One live region for both the success and the empty case, so the
                message replaces itself instead of stacking. */}
            <p aria-live="polite" className="mt-2 min-h-5 text-sm text-ink-soft">
              {feedNote}
            </p>

            <Link
              href="/talk"
              className="press press-coral mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-coral px-6 font-display text-lg font-bold text-ink"
            >
              <Mic className="size-6" />
              Talk to {companion.name}
            </Link>
            <p className="mt-2 text-center text-sm text-ink-soft">
              {formatMinutes(SAMPLE.talkSecondsLeft)} of talk time left today
            </p>
          </section>

          <div>
            {/* Three numbers, set as numbers. No boxes, no shadows, no emoji. */}
            <section aria-label="This week so far">
              <dl className="grid grid-cols-3 gap-6 border-b border-clay-edge pb-8">
                {[
                  { Icon: Flame, value: SAMPLE.streakDays, unit: "days in a row" },
                  { Icon: Book, value: SAMPLE.wordsLearned, unit: "words practised" },
                  { Icon: Star, value: SAMPLE.stars.earned, unit: "stars this stage" },
                ].map(({ Icon, value, unit }) => (
                  <div key={unit}>
                    <Icon className="size-5 text-coral-ink" />
                    <dd className="mt-2 font-display text-3xl font-extrabold leading-none text-ink">
                      {value}
                    </dd>
                    <dt className="mt-1.5 text-sm text-ink-soft">{unit}</dt>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="quests-heading" className="mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="quests-heading"
                  className="font-display text-2xl font-bold text-ink"
                >
                  Today&rsquo;s three things
                </h2>
                <p className="text-sm text-ink-soft">
                  {questsDone} of {QUESTS.length} done
                </p>
              </div>

              <ul className="mt-5 border-t border-clay-edge">
                {QUESTS.map((quest) => (
                  <li
                    key={quest.id}
                    className="flex flex-wrap items-center gap-4 border-b border-clay-edge py-4"
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-full ${
                        quest.done ? "bg-leaf-wash text-leaf" : "bg-coral-wash text-coral-ink"
                      }`}
                    >
                      <SubjectIcon subject={quest.subject} className="size-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-ink">{quest.title}</p>
                      <p className="text-sm text-ink-soft">
                        Worth {quest.stars} stars
                      </p>
                    </div>

                    {quest.done ? (
                      <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf">
                        <Check className="size-4" />
                        Done
                      </p>
                    ) : (
                      <Link
                        href="/talk"
                        className="press press-sm press-coral inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 font-display font-bold text-ink"
                      >
                        Start
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-clay-edge pt-8">
              <p className="flex items-center gap-3 text-ink-soft">
                <Paw className="size-5 shrink-0 text-coral-ink" />
                Five other companions are waiting to practise with you.
              </p>
              <Link
                href="/choose"
                className="inline-flex items-center gap-1.5 font-semibold text-coral-ink underline-offset-4 hover:underline"
              >
                Switch companion
                <ArrowRight className="size-4" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
