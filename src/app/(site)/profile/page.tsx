"use client";

import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import CompanionStage from "@/components/CompanionStage";
import SubjectIcon from "@/components/SubjectIcon";
import {
  Abacus,
  Book,
  Check,
  Clock,
  Flame,
  Globe,
  Lock,
  Mail,
  Shield,
  Speech,
  Star,
} from "@/components/Icons";
import { useCompanion, useSettings } from "@/lib/companion-store";

/** Nothing is wired to an account, so the figures live here and say so. */
const SAMPLE = {
  childName: "Mira",
  age: 5,
  stage: "Baby",
  level: 2,
  streakDays: 7,
  wordsLearned: 142,
  stars: 18,
  week: [
    { day: "Mon", short: "M", lessons: 3 },
    { day: "Tue", short: "T", lessons: 4 },
    { day: "Wed", short: "W", lessons: 2 },
    { day: "Thu", short: "T", lessons: 5 },
    { day: "Fri", short: "F", lessons: 3 },
    { day: "Sat", short: "S", lessons: 4 },
    { day: "Sun", short: "S", lessons: 1 },
  ],
};

const BADGES = [
  { Icon: Speech, label: "Said a first word", earned: true },
  { Icon: Flame, label: "Five days in a row", earned: true },
  { Icon: Abacus, label: "Counted to twenty", earned: true },
  { Icon: Star, label: "Ten lessons finished", earned: true },
  { Icon: Book, label: "Read a whole story", earned: false },
];

export default function ProfilePage() {
  const companion = useCompanion();
  // Each change is written straight to storage, which is what makes the
  // "Saved" note at the end of the form true.
  const [settings, update] = useSettings();

  const weekTotal = SAMPLE.week.reduce((sum, d) => sum + d.lessons, 0);
  const busiest = SAMPLE.week.reduce((a, b) => (b.lessons > a.lessons ? b : a));
  const scaleMax = Math.max(...SAMPLE.week.map((d) => d.lessons));

  return (
    <>
      <ParentNav />

      <div className="mx-auto max-w-shelf px-5 py-14">
        <header className="max-w-measure">
          <h1 className="font-display text-4xl font-extrabold text-ink">
            {SAMPLE.childName}&rsquo;s progress
          </h1>
          <p className="mt-3 text-ink-soft">
            Age {SAMPLE.age} · practising with {companion.name}, {SAMPLE.stage}{" "}
            stage {SAMPLE.level}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Showing sample progress. The limits and preferences below are real and
            are saved in this browser.
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div>
            {/*
              One series over seven ordinal days, so: one hue, no legend (the
              caption names the series), only the busiest day labelled rather
              than a number on every bar, and a table underneath for anyone who
              cannot read the bars.
            */}
            <section aria-labelledby="week-heading">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="week-heading"
                  className="font-display text-2xl font-bold text-ink"
                >
                  This week
                </h2>
                <p className="text-sm text-ink-soft">
                  {weekTotal} lessons finished
                </p>
              </div>

              <figure className="mt-6">
                <div className="flex h-40 items-end gap-0.5">
                  {SAMPLE.week.map((d) => {
                    const isBusiest = d.day === busiest.day;
                    return (
                      <div
                        key={d.day}
                        className="group relative flex h-full flex-1 flex-col justify-end"
                      >
                        {isBusiest && (
                          <p className="mb-1 text-center font-display text-sm font-bold text-ink">
                            {d.lessons}
                          </p>
                        )}

                        <div
                          className="w-full rounded-t-[4px] bg-leaf-mark"
                          style={{
                            height: `${(d.lessons / scaleMax) * 100}%`,
                          }}
                        />

                        {/* Per-bar hover value, since only one bar is labelled. */}
                        <p className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-shell opacity-0 transition-opacity group-hover:opacity-100">
                          {d.day}: {d.lessons}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-shell-edge pt-2">
                  <div className="flex gap-0.5">
                    {SAMPLE.week.map((d) => (
                      <p
                        key={d.day}
                        className="flex-1 text-center text-xs text-ink-soft"
                      >
                        <span aria-hidden="true" className="sm:hidden">
                          {d.short}
                        </span>
                        <span className="hidden sm:inline">{d.day}</span>
                        <span className="sr-only">{d.day}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <figcaption className="mt-3 text-sm text-ink-soft">
                  Lessons finished each day. Busiest day was {busiest.day}, with{" "}
                  {busiest.lessons}.
                </figcaption>
              </figure>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-coral-ink underline-offset-4 hover:underline">
                  Show as a table
                </summary>
                <table className="mt-3 w-full max-w-xs text-left text-sm">
                  <caption className="sr-only">
                    Lessons finished each day this week
                  </caption>
                  <thead>
                    <tr className="border-b border-shell-edge">
                      <th scope="col" className="py-2 font-semibold text-ink">
                        Day
                      </th>
                      <th scope="col" className="py-2 font-semibold text-ink">
                        Lessons
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE.week.map((d) => (
                      <tr key={d.day} className="border-b border-shell-edge">
                        <th scope="row" className="py-2 font-normal text-ink-soft">
                          {d.day}
                        </th>
                        <td className="py-2 text-ink">{d.lessons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>

              <dl className="mt-8 flex flex-wrap gap-10 border-t border-shell-edge pt-6">
                {[
                  { Icon: Flame, value: SAMPLE.streakDays, unit: "days in a row" },
                  { Icon: Book, value: SAMPLE.wordsLearned, unit: "words practised" },
                  { Icon: Star, value: SAMPLE.stars, unit: "stars this stage" },
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

            <section aria-labelledby="badges-heading" className="mt-14">
              <h2
                id="badges-heading"
                className="font-display text-2xl font-bold text-ink"
              >
                What {SAMPLE.childName} has earned
              </h2>

              <ul className="mt-6 grid gap-x-10 border-t border-shell-edge sm:grid-cols-2">
                {BADGES.map(({ Icon, label, earned }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-b border-shell-edge py-4"
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full ${
                        earned ? "bg-sun-wash text-ink" : "bg-shell-edge text-ink-soft"
                      }`}
                    >
                      {earned ? <Icon className="size-5" /> : <Lock className="size-5" />}
                    </span>
                    <p className={earned ? "text-ink" : "text-ink-soft"}>
                      {label}
                      {!earned && (
                        <span className="block text-sm text-ink-soft">
                          Not yet earned
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="settings-heading" className="mt-14">
              <h2
                id="settings-heading"
                className="font-display text-2xl font-bold text-ink"
              >
                Limits and preferences
              </h2>

              <div className="mt-6 space-y-8 border-t border-shell-edge pt-8">
                <div>
                  <label
                    htmlFor="talk-minutes"
                    className="flex items-center gap-2 font-display font-semibold text-ink"
                  >
                    <Clock className="size-5 text-leaf" />
                    Daily talk time
                  </label>
                  <p className="mt-1 max-w-measure text-sm text-ink-soft">
                    A session ends by itself when the time is up, even mid-question.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <input
                      id="talk-minutes"
                      type="range"
                      min={5}
                      max={30}
                      step={5}
                      value={settings.talkMinutes}
                      onChange={(e) => update({ talkMinutes: Number(e.target.value) })}
                      className="h-2 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-shell-edge accent-coral"
                    />
                    <output
                      htmlFor="talk-minutes"
                      className="shrink-0 font-display font-bold text-ink"
                    >
                      {settings.talkMinutes} minutes
                    </output>
                  </div>
                </div>

                <fieldset>
                  <legend className="flex items-center gap-2 font-display font-semibold text-ink">
                    <Globe className="size-5 text-leaf" />
                    Languages to practise
                  </legend>
                  <p className="mt-1 max-w-measure text-sm text-ink-soft">
                    Turn one off to focus on the other. At least one stays on.
                  </p>
                  <div className="mt-4 flex gap-6">
                    {(
                      [
                        ["english", "English"],
                        ["arabic", "Arabic"],
                      ] as const
                    ).map(([key, label]) => {
                      const other = key === "english" ? "arabic" : "english";
                      return (
                        <label key={key} className="flex items-center gap-2.5 text-ink">
                          <input
                            type="checkbox"
                            checked={settings[key]}
                            // The last remaining language cannot be switched off.
                            disabled={settings[key] && !settings[other]}
                            onChange={(e) => update({ [key]: e.target.checked })}
                            className="size-5 accent-coral"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={settings.weeklyEmail}
                      onChange={(e) => update({ weeklyEmail: e.target.checked })}
                      className="mt-1 size-5 shrink-0 accent-coral"
                    />
                    <span>
                      <span className="flex items-center gap-2 font-display font-semibold text-ink">
                        <Mail className="size-5 text-leaf" />
                        Email me a weekly summary
                      </span>
                      <span className="mt-1 block max-w-measure text-sm text-ink-soft">
                        What {SAMPLE.childName} practised and where they got stuck.
                        One email on Sunday, and nothing else.
                      </span>
                    </span>
                  </label>
                </div>

                <p className="flex items-center gap-2 text-sm text-leaf">
                  <Check className="size-4" />
                  Saved
                </p>
              </div>
            </section>

            <section aria-labelledby="data-heading" className="mt-14">
              <h2
                id="data-heading"
                className="font-display text-2xl font-bold text-ink"
              >
                {SAMPLE.childName}&rsquo;s data
              </h2>
              <p className="mt-3 max-w-measure leading-relaxed text-ink-soft">
                You can see everything held about your child and delete all of it,
                which is the part of COPPA that matters most in practice. Deleting
                removes the progress, the stars and the companion, and cannot be
                undone.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="press press-sm press-shell inline-flex min-h-12 items-center rounded-full border border-shell-edge bg-shell px-6 font-display font-semibold text-ink"
                >
                  Request a copy
                </Link>
                <Link
                  href="/contact"
                  className="press press-sm press-shell inline-flex min-h-12 items-center rounded-full border border-berry bg-shell px-6 font-display font-semibold text-berry"
                >
                  Delete everything
                </Link>
              </div>
            </section>
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-region border border-shell-edge bg-clay p-6">
              <CompanionStage
                src={companion.img}
                alt={`${companion.name}, a ${companion.species.toLowerCase()}`}
                size={140}
                className="mx-auto"
              />
              <p className="mt-4 text-center font-display text-xl font-bold text-ink">
                {companion.name}
              </p>
              <p className="text-center text-sm text-ink-soft">
                {SAMPLE.stage} stage {SAMPLE.level}
              </p>

              <dl className="mt-5 space-y-3 border-t border-clay-edge pt-5 text-sm">
                <div className="flex items-start gap-2">
                  <SubjectIcon
                    subject={companion.subject}
                    className="mt-0.5 size-4 shrink-0 text-coral-ink"
                  />
                  <div>
                    <dt className="text-ink-soft">Practises</dt>
                    <dd className="text-ink">{companion.subjectLabel}</dd>
                  </div>
                </div>
              </dl>

              <Link
                href="/choose"
                className="mt-5 inline-block text-sm font-semibold text-coral-ink underline-offset-4 hover:underline"
              >
                Switch companion
              </Link>
            </div>

            <p className="mt-6 flex gap-2.5 text-sm leading-relaxed text-ink-soft">
              <Shield className="mt-0.5 size-5 shrink-0 text-leaf" />
              <span>
                No ads and no third-party tracking.{" "}
                <Link
                  href="/about"
                  className="font-semibold text-coral-ink underline underline-offset-4"
                >
                  What we keep
                </Link>
                .
              </span>
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
