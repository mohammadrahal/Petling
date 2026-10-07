import Link from "next/link";
import Image from "next/image";
import CompanionStage from "@/components/CompanionStage";
import SubjectIcon from "@/components/SubjectIcon";
import { ArrowRight, Check, Clock, Mic, Shield, Speech } from "@/components/Icons";
import { COMPANIONS, DEFAULT_COMPANION } from "@/lib/companions";

/* The sequence is real — an egg has to hatch before it can grow — so it is
   numbered. Nothing else in the app is. */
const STEPS = [
  {
    heading: "Choose a companion",
    body: "They arrive as an egg. Your child picks who they want to practise with.",
    art: { src: "/characters/egg.png", alt: "A speckled egg" },
  },
  {
    heading: "Talk, out loud",
    body: "A few minutes a day. Your companion asks about words, numbers and stories, in English and Arabic.",
    art: null,
  },
  {
    heading: "Watch them grow",
    body: "Answers earn treats. The egg hatches, and your companion grows through each stage.",
    art: { src: "/characters/pip.png", alt: "Pip, hatched" },
  },
];

const PARENT_CONTROLS = [
  {
    Icon: Clock,
    heading: "You set the daily limit",
    body: "Talk time is capped at whatever you choose. The session ends by itself.",
  },
  {
    Icon: Speech,
    heading: "Learning topics only",
    body: "Companions ask and answer about words, numbers and stories. Nothing else.",
  },
  {
    Icon: Shield,
    heading: "Nothing is kept",
    body: "Speech is used to answer in the moment, then discarded. No ads, no third-party tracking.",
  },
];

export default function HomePage() {
  const pip = DEFAULT_COMPANION;

  return (
    <>
      {/* The hero is the mechanism: a question, a child saying it out loud, and
          the answer coming back in both languages. */}
      <section className="border-b border-clay-edge bg-clay">
        <div className="mx-auto grid max-w-shelf items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
              Learn a language by saying it out loud.
            </h1>

            <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft">
              Your companion asks a question. Your child answers out loud. The
              companion answers back, in English and{" "}
              <span lang="ar" className="font-display font-semibold text-ink">
                العربية
              </span>
              . For children aged 3 to 8.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/choose"
                className="press press-coral inline-flex min-h-14 items-center rounded-full bg-coral px-8 font-display text-lg font-bold text-ink"
              >
                Choose a companion
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-semibold text-coral-ink underline-offset-4 hover:underline"
              >
                How it works
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-md">
            <CompanionStage
              src={pip.portrait ?? pip.img}
              alt="Pip, a coral bear"
              size={300}
              breathing
              priority
              className="mx-auto"
            />

            <figcaption className="mt-8 rounded-region border border-shell-edge bg-shell p-6">
              <p className="text-sm text-ink-soft">A turn with Pip sounds like this.</p>

              <p className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
                How do you say <span className="text-coral-ink">cat</span> in Arabic?
              </p>

              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-shell-edge pt-4">
                <p className="font-display text-xl font-semibold text-ink">Qittah</p>
                <p lang="ar" dir="rtl" className="font-display text-2xl font-bold text-ink">
                  قطة
                </p>
                <Check className="size-6 shrink-0 text-leaf" title="Said correctly" />
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-shelf px-5 py-16">
        <h2 className="font-display text-3xl font-bold text-ink">Hatch, talk, grow</h2>

        <ol className="mt-10 grid gap-10 border-t border-shell-edge pt-10 md:grid-cols-3 md:gap-12">
          {STEPS.map((step, i) => (
            <li key={step.heading} className="flex gap-5">
              <span
                aria-hidden="true"
                className="font-display text-3xl font-bold leading-none text-clay-edge"
              >
                {i + 1}
              </span>
              <div>
                {step.art ? (
                  <Image
                    src={step.art.src}
                    alt={step.art.alt}
                    width={88}
                    height={88}
                    className="mb-4 size-20 object-contain"
                  />
                ) : (
                  <span className="mb-4 grid size-20 place-items-center rounded-full bg-coral-wash">
                    <Mic className="size-9 text-coral-ink" />
                  </span>
                )}
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

      <section className="border-y border-shell-edge bg-clay">
        <div className="mx-auto max-w-shelf px-5 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl font-bold text-ink">
              Six companions, six subjects
            </h2>
            <Link
              href="/choose"
              className="inline-flex items-center gap-1.5 font-semibold text-coral-ink underline-offset-4 hover:underline"
            >
              Hear them all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Ruled rows rather than six identical shadowed cards: the artwork is
              what tells them apart, so nothing is added around it. */}
          <ul className="mt-8 grid border-t border-clay-edge sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {COMPANIONS.map((c) => (
              <li key={c.id} className="border-b border-clay-edge">
                <Link href="/choose" className="group flex items-center gap-4 py-5">
                  <CompanionStage src={c.img} alt="" size={64} />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold text-ink group-hover:underline">
                      {c.name}
                    </p>
                    <p className="text-sm text-ink-soft">{c.species}</p>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-ink">
                      <SubjectIcon
                        subject={c.subject}
                        className="size-4 shrink-0 text-coral-ink"
                      />
                      {c.subjectLabel}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-shelf px-5 py-16">
        <h2 className="font-display text-3xl font-bold text-ink">
          What you control as a parent
        </h2>

        <dl className="mt-10 grid gap-10 border-t border-shell-edge pt-10 md:grid-cols-3 md:gap-12">
          {PARENT_CONTROLS.map(({ Icon, heading, body }) => (
            <div key={heading}>
              <Icon className="size-7 text-leaf" />
              <dt className="mt-4 font-display text-xl font-bold text-ink">{heading}</dt>
              <dd className="mt-2 max-w-measure leading-relaxed text-ink-soft">{body}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-measure leading-relaxed text-ink-soft">
          Petling is written to meet COPPA requirements for children under 13.{" "}
          <Link
            href="/about"
            className="font-semibold text-coral-ink underline underline-offset-4"
          >
            Read what we do and do not collect
          </Link>
          .
        </p>
      </section>
    </>
  );
}
