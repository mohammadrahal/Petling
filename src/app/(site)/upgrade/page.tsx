"use client";

import { useState } from "react";
import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import CompanionStage from "@/components/CompanionStage";
import { Check, Close, Clock, Shield, Speech } from "@/components/Icons";
import { DEFAULT_COMPANION } from "@/lib/companions";

type Period = "monthly" | "yearly";

const PLANS: Record<Period, { price: string; per: string; note: string }> = {
  monthly: { price: "$7.99", per: "a month", note: "Cancel whenever you like." },
  yearly: {
    price: "$59",
    per: "a year",
    note: "Works out at $4.92 a month.",
  },
};

/** null means the row is not included on that plan. */
const COMPARISON: { feature: string; free: string | null; family: string | null }[] = [
  { feature: "All six companions", free: "Included", family: "Included" },
  { feature: "Daily talk time", free: "5 minutes", family: "Up to 30, you set it" },
  { feature: "Set lessons: words, numbers, stories", free: "Included", family: "Included" },
  { feature: "Open conversation about learning topics", free: null, family: "Included" },
  { feature: "Stars, stages and growth", free: "Included", family: "Included" },
  { feature: "Weekly summary email", free: null, family: "Included" },
  { feature: "Second and third child", free: null, family: "Included" },
  { feature: "Advertising", free: "None", family: "None" },
];

export default function UpgradePage() {
  const [period, setPeriod] = useState<Period>("yearly");
  const [notice, setNotice] = useState(false);
  const plan = PLANS[period];
  const companion = DEFAULT_COMPANION;

  return (
    <>
      <ParentNav />

      <div className="mx-auto max-w-shelf px-5 py-14">
        <header className="max-w-measure">
          <h1 className="font-display text-4xl font-extrabold text-ink">Plans</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Everything a child needs to practise daily is on the free plan. The
            Family plan adds longer sessions, open conversation, and a weekly
            summary for you.
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <section aria-labelledby="compare-heading">
            <h2 id="compare-heading" className="font-display text-2xl font-bold text-ink">
              What each plan includes
            </h2>

            <table className="mt-6 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-shell-edge">
                  <th scope="col" className="py-3 pr-4 font-display font-bold text-ink">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th
                    scope="col"
                    className="w-32 py-3 pr-4 font-display font-bold text-ink"
                  >
                    Free
                  </th>
                  <th scope="col" className="w-44 py-3 font-display font-bold text-ink">
                    Family
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-shell-edge align-top">
                    <th
                      scope="row"
                      className="py-3.5 pr-4 font-normal leading-snug text-ink"
                    >
                      {row.feature}
                    </th>
                    {[row.free, row.family].map((value, i) => (
                      <td key={i} className="py-3.5 pr-4">
                        {value === null ? (
                          <span className="flex items-center gap-1.5 text-ink-soft">
                            <Close className="size-4 shrink-0" />
                            <span className="sr-only">Not included</span>
                          </span>
                        ) : (
                          <span className="flex items-start gap-1.5 text-ink">
                            <Check className="mt-0.5 size-4 shrink-0 text-leaf" />
                            {value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-10 space-y-6 border-t border-shell-edge pt-8">
              <p className="flex max-w-measure gap-3 leading-relaxed text-ink-soft">
                <Clock className="mt-0.5 size-5 shrink-0 text-leaf" />
                Open conversation still obeys the daily limit you set, and still ends
                on its own when the time is up.
              </p>
              <p className="flex max-w-measure gap-3 leading-relaxed text-ink-soft">
                <Speech className="mt-0.5 size-5 shrink-0 text-leaf" />
                Companions stay on learning topics on both plans. Paying does not
                open up what they will talk about.
              </p>
              <p className="flex max-w-measure gap-3 leading-relaxed text-ink-soft">
                <Shield className="mt-0.5 size-5 shrink-0 text-leaf" />
                Neither plan shows ads or shares anything with advertisers. If you
                cancel, the account drops back to the free plan and progress is kept.
              </p>
            </div>
          </section>

          {/* The decision, kept in one column so the page asks for one thing. */}
          <aside>
            <div className="rounded-region border border-shell-edge bg-clay p-6">
              <CompanionStage
                src={companion.img}
                alt=""
                size={120}
                className="mx-auto"
              />

              <h2 className="mt-5 text-center font-display text-xl font-bold text-ink">
                Family plan
              </h2>

              <fieldset className="mt-5">
                <legend className="sr-only">Choose how to pay</legend>
                <div className="flex flex-col gap-2.5">
                  {(["yearly", "monthly"] as const).map((key) => {
                    const option = PLANS[key];
                    const selected = period === key;
                    return (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-baseline gap-3 rounded-region border-2 bg-shell px-4 py-3 ${
                          selected ? "border-coral" : "border-shell-edge"
                        }`}
                      >
                        <input
                          type="radio"
                          name="period"
                          value={key}
                          checked={selected}
                          onChange={() => setPeriod(key)}
                          className="size-4 shrink-0 accent-coral"
                        />
                        <span className="flex-1">
                          <span className="font-display text-lg font-bold text-ink">
                            {option.price}
                          </span>{" "}
                          <span className="text-ink-soft">{option.per}</span>
                          <span className="mt-0.5 block text-sm text-ink-soft">
                            {option.note}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => setNotice(true)}
                className="press press-coral mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-coral px-6 font-display text-lg font-bold text-ink"
              >
                Choose {plan.price} {plan.per}
              </button>

              {/* Honest about the state of the build, in place of the previous
                  alert() that claimed talking had been unlocked. */}
              <p aria-live="polite" className="mt-3 min-h-5 text-sm text-ink-soft">
                {notice
                  ? "Payment is not connected yet, so nothing has been charged."
                  : null}
              </p>

              <p className="mt-4 text-center text-sm text-ink-soft">
                Or stay on the free plan —{" "}
                <Link
                  href="/dashboard"
                  className="font-semibold text-coral-ink underline underline-offset-4"
                >
                  back to {companion.name}
                </Link>
              </p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              Questions about billing or safety?{" "}
              <Link
                href="/contact"
                className="font-semibold text-coral-ink underline underline-offset-4"
              >
                Ask us
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
