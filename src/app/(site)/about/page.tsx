import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ParentNav from "@/components/ParentNav";
import CompanionStage from "@/components/CompanionStage";
import SubjectIcon from "@/components/SubjectIcon";
import { ArrowRight, Check, Clock, Close, Globe, Mic } from "@/components/Icons";
import { COMPANIONS } from "@/lib/companions";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "What a Petling session is, what the app collects, what it does not, and what you control as a parent.",
};

const STEPS = [
  {
    heading: "Your child chooses a companion",
    body: "Six companions, each with a subject and a voice. The one they pick arrives as an egg, and can be swapped at any time without losing progress.",
    art: { src: "/characters/egg.png", alt: "A speckled egg" },
  },
  {
    heading: "They talk for a few minutes",
    body: "The companion asks a question out loud. Your child answers out loud. If they would rather not speak, every question can be tapped instead, so a quiet day is still a day of practice.",
    art: null,
  },
  {
    heading: "The companion grows",
    body: "Correct answers earn berries and stars. Enough stars and the egg hatches, then grows through each stage. Progress is the only reward — there is nothing to buy inside a session.",
    art: { src: "/characters/pip.png", alt: "Pip, hatched" },
  },
];

const COLLECTED = [
  "The words your child practised, so the next question can follow on.",
  "Stars, berries and streak counts, so the companion can grow.",
  "A parent email address, if you ask for the weekly summary.",
];

const NOT_COLLECTED = [
  "Recordings of your child's voice. Speech is turned into text to answer in the moment, then discarded.",
  "Your child's full name, photo, address or school.",
  "Anything shared with advertisers or data brokers. There are no ads and no third-party trackers.",
];

const CONTROLS = [
  {
    Icon: Clock,
    heading: "Daily talk time",
    body: "Set a cap between 5 and 30 minutes. The session ends on its own when the time is up, mid-question if need be.",
  },
  {
    Icon: Mic,
    heading: "Speaking is optional",
    body: "Every question can be answered by tapping. The microphone is only ever on while your child is holding a turn.",
  },
  {
    Icon: Globe,
    heading: "Both languages, or one",
    body: "Questions come in English and Arabic. Turn either one off if your child is only working on the other.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ParentNav />

      <div className="mx-auto max-w-shelf px-5 py-14">
        <header className="max-w-measure">
          <h1 className="font-display text-4xl font-extrabold text-ink">
            How Petling works
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Petling gives a child aged 3 to 8 a reason to say a new word out loud
            every day. A companion asks, they answer, and the companion grows. This
            page explains what a session is, and exactly what the app does and does
            not keep.
          </p>
        </header>

        <section aria-labelledby="session" className="mt-16">
          <h2 id="session" className="font-display text-3xl font-bold text-ink">
            A session, start to finish
          </h2>

          <ol className="mt-8 border-t border-shell-edge">
            {STEPS.map((step, i) => (
              <li
                key={step.heading}
                className="flex flex-col gap-5 border-b border-shell-edge py-8 sm:flex-row sm:gap-8"
              >
                <div className="flex shrink-0 items-center gap-5 sm:w-32">
                  <span
                    aria-hidden="true"
                    className="font-display text-3xl font-bold leading-none text-shell-edge"
                  >
                    {i + 1}
                  </span>
                  {step.art ? (
                    <Image
                      src={step.art.src}
                      alt={step.art.alt}
                      width={72}
                      height={72}
                      className="size-16 object-contain"
                    />
                  ) : (
                    <span className="grid size-16 place-items-center rounded-full bg-coral-wash">
                      <Mic className="size-8 text-coral-ink" />
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {step.heading}
                  </h3>
                  <p className="mt-2 max-w-measure leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/*
          The claim this app has to earn. Two plain lists beat a shield badge: a
          parent can check each line against what the app actually does.
        */}
        <section aria-labelledby="data" className="mt-16">
          <h2 id="data" className="font-display text-3xl font-bold text-ink">
            What we keep, and what we don&rsquo;t
          </h2>

          <div className="mt-8 grid gap-10 border-t border-shell-edge pt-8 md:grid-cols-2 md:gap-14">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">We keep</h3>
              <ul className="mt-4 space-y-4">
                {COLLECTED.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                    <Check className="mt-1 size-5 shrink-0 text-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-ink">
                We never keep
              </h3>
              <ul className="mt-4 space-y-4">
                {NOT_COLLECTED.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                    <Close className="mt-1 size-5 shrink-0 text-berry" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-measure leading-relaxed text-ink-soft">
            Petling is written to meet the requirements COPPA sets for services used
            by children under 13: a parent sets up the account, a parent can see and
            delete everything held about their child, and nothing is shared for
            advertising. COPPA has no certification scheme, so no badge here claims
            one.
          </p>
        </section>

        <section aria-labelledby="controls" className="mt-16">
          <h2 id="controls" className="font-display text-3xl font-bold text-ink">
            What you control
          </h2>

          <dl className="mt-8 grid gap-10 border-t border-shell-edge pt-8 md:grid-cols-3 md:gap-12">
            {CONTROLS.map(({ Icon, heading, body }) => (
              <div key={heading}>
                <Icon className="size-7 text-leaf" />
                <dt className="mt-4 font-display text-xl font-bold text-ink">
                  {heading}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{body}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/profile"
            className="mt-8 inline-flex items-center gap-1.5 font-semibold text-coral-ink underline-offset-4 hover:underline"
          >
            Open progress and limits
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section aria-labelledby="companions" className="mt-16">
          <h2 id="companions" className="font-display text-3xl font-bold text-ink">
            The six companions
          </h2>
          <p className="mt-3 max-w-measure leading-relaxed text-ink-soft">
            Each one leads on a different subject and has their own voice, so a
            child who gets bored of counting can go and read instead.
          </p>

          <ul className="mt-8 grid border-t border-shell-edge sm:grid-cols-2 sm:gap-x-12">
            {COMPANIONS.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-4 border-b border-shell-edge py-5"
              >
                <CompanionStage src={c.img} alt="" size={60} />
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold text-ink">{c.name}</p>
                  <p className="text-sm text-ink-soft">{c.species}</p>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-ink">
                    <SubjectIcon
                      subject={c.subject}
                      className="size-4 shrink-0 text-coral-ink"
                    />
                    {c.subjectLabel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-shell-edge pt-10">
          <p className="max-w-measure leading-relaxed text-ink-soft">
            Still deciding? Everything above works on the free plan. You only need a
            paid plan once your child is ready for open conversation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/choose"
              className="press press-coral inline-flex min-h-14 items-center rounded-full bg-coral px-7 font-display font-bold text-ink"
            >
              Choose a companion
            </Link>
            <Link
              href="/contact"
              className="press press-shell inline-flex min-h-14 items-center rounded-full border border-shell-edge bg-shell px-7 font-display font-bold text-ink"
            >
              Ask us something
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
