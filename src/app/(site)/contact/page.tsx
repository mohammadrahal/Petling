"use client";

import { useState } from "react";
import Link from "next/link";
import ParentNav from "@/components/ParentNav";
import { Check, Clock, Globe, Mic, Shield } from "@/components/Icons";

const TOPICS = [
  { value: "safety", label: "A safety concern" },
  { value: "account", label: "My account" },
  { value: "billing", label: "Billing or a plan" },
  { value: "technical", label: "Something is not working" },
  { value: "delete-data", label: "Delete my child's data" },
  { value: "other", label: "Something else" },
];

const FAQS = [
  {
    Icon: Mic,
    q: "My child will not speak to their companion. Is that a problem?",
    a: "No. Every question can be answered by tapping one of two answers instead, and tapped answers count the same as spoken ones. Plenty of children tap for weeks before they say anything out loud.",
  },
  {
    Icon: Shield,
    q: "Does the microphone stay on during a session?",
    a: "No. It turns on when your child starts a turn and off as soon as the turn ends. Speech is turned into text to work out the answer, and the audio is discarded — nothing is stored or uploaded.",
  },
  {
    Icon: Globe,
    q: "Which browsers can do the talking?",
    a: "Speaking uses the browser's own speech recognition, which works in Chrome, Edge and Safari. Firefox does not support it yet, so on Firefox the tap answers are used instead and everything else behaves normally.",
  },
  {
    Icon: Globe,
    q: "Is the Arabic Modern Standard or a dialect?",
    a: "Modern Standard Arabic, because it is what children meet in books and at school. Words are introduced one at a time, alongside the English, rather than assuming any Arabic at home.",
  },
  {
    Icon: Clock,
    q: "Can I stop a session that is already running?",
    a: "Yes. Done ends it immediately from your child's screen, and the daily limit you set in Progress and limits ends it on its own, even mid-question.",
  },
  {
    Icon: Shield,
    q: "How do I get my child's data deleted?",
    a: "Choose “Delete my child's data” above and send the message. We delete everything held about them and confirm by email within five working days. You do not need to give a reason.",
  },
];

type Problem = { field: string; message: string };
type Status = "idle" | "sending" | "received" | "failed";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [problems, setProblems] = useState<Problem[]>([]);

  const problemFor = (field: string) =>
    problems.find((p) => p.field === field)?.message;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setProblems([]);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        const body = (await response.json()) as { problems: Problem[] };
        setProblems(body.problems ?? []);
        setStatus("idle");
        return;
      }

      if (!response.ok) throw new Error(String(response.status));

      form.reset();
      setStatus("received");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <>
      <ParentNav />

      <div className="mx-auto max-w-shelf px-5 py-14">
        <header className="max-w-measure">
          <h1 className="font-display text-4xl font-extrabold text-ink">Get help</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Questions about safety, your account or something that will not work.
            We answer within one working day, and within a few hours for anything
            flagged as a safety concern.
          </p>
        </header>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="font-display text-2xl font-bold text-ink">
              Send us a message
            </h2>

            {/* We deliberately do not ask for the child's name, age or school:
                asking would contradict what /about promises about collection. */}
            <p className="mt-2 max-w-measure text-sm text-ink-soft">
              We only need your own details. Please do not include your child&rsquo;s
              name or anything else about them — we do not need it to help.
            </p>

            {status === "received" ? (
              <div className="mt-6 rounded-region border border-leaf bg-leaf-wash p-6">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-leaf-deep">
                  <Check className="size-5" />
                  Message received
                </p>
                {/*
                  Honest about where it got to. The endpoint validates and
                  accepts the message, but no mail provider is connected, so it
                  has not actually reached anybody.
                */}
                <p className="mt-2 max-w-measure leading-relaxed text-ink">
                  Your message passed validation, but email delivery is not
                  connected in this build, so it has not reached a person yet.
                  Nothing you typed has been stored.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 font-semibold text-coral-ink underline underline-offset-4"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 max-w-xl space-y-6">
                {problems.length > 0 && (
                  <div
                    role="alert"
                    className="rounded-region border border-berry bg-berry-wash p-4"
                  >
                    <p className="font-display font-bold text-ink">
                      {problems.length === 1
                        ? "One thing needs fixing:"
                        : `${problems.length} things need fixing:`}
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-ink">
                      {problems.map((p) => (
                        <li key={p.field}>{p.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="font-display font-semibold text-ink">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={problemFor("name") ? true : undefined}
                    aria-describedby={problemFor("name") ? "name-error" : undefined}
                    className="mt-2 block w-full rounded-region border border-shell-edge bg-shell px-4 py-3 text-ink placeholder:text-ink-soft"
                  />
                  {problemFor("name") && (
                    <p id="name-error" className="mt-1.5 text-sm text-berry">
                      {problemFor("name")}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="font-display font-semibold text-ink">
                    Your email address
                  </label>
                  <p className="mt-1 text-sm text-ink-soft">
                    This is where the reply goes.
                  </p>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={problemFor("email") ? true : undefined}
                    aria-describedby={problemFor("email") ? "email-error" : undefined}
                    className="mt-2 block w-full rounded-region border border-shell-edge bg-shell px-4 py-3 text-ink"
                  />
                  {problemFor("email") && (
                    <p id="email-error" className="mt-1.5 text-sm text-berry">
                      {problemFor("email")}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="topic" className="font-display font-semibold text-ink">
                    What is this about?
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    defaultValue=""
                    required
                    aria-invalid={problemFor("topic") ? true : undefined}
                    aria-describedby={problemFor("topic") ? "topic-error" : undefined}
                    className="mt-2 block w-full rounded-region border border-shell-edge bg-shell px-4 py-3 text-ink"
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {TOPICS.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                  {problemFor("topic") && (
                    <p id="topic-error" className="mt-1.5 text-sm text-berry">
                      {problemFor("topic")}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-display font-semibold text-ink"
                  >
                    What is happening?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    aria-invalid={problemFor("message") ? true : undefined}
                    aria-describedby={problemFor("message") ? "message-error" : undefined}
                    className="mt-2 block w-full rounded-region border border-shell-edge bg-shell px-4 py-3 text-ink"
                  />
                  {problemFor("message") && (
                    <p id="message-error" className="mt-1.5 text-sm text-berry">
                      {problemFor("message")}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="press press-coral inline-flex min-h-14 items-center rounded-full bg-coral px-8 font-display text-lg font-bold text-ink disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  <p aria-live="polite" className="text-sm text-berry">
                    {status === "failed"
                      ? "That did not go through. Check your connection and try again."
                      : null}
                  </p>
                </div>
              </form>
            )}
          </section>

          <aside>
            <div className="rounded-region border border-shell-edge bg-clay p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Urgent safety concerns
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                If a companion said something you think it should not have, choose
                <span className="text-ink"> A safety concern</span> and tell us the
                date and roughly the time. We can look at the session in question
                and will reply the same day.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-lg font-bold text-ink">
                You might not need us
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-coral-ink underline underline-offset-4"
                  >
                    What we keep and what we don&rsquo;t
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-sm text-coral-ink underline underline-offset-4"
                  >
                    Change the daily talk limit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upgrade"
                    className="text-sm text-coral-ink underline underline-offset-4"
                  >
                    Compare the two plans
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <section aria-labelledby="faq-heading" className="mt-16">
          <h2 id="faq-heading" className="font-display text-3xl font-bold text-ink">
            Questions parents ask
          </h2>

          <dl className="mt-8 grid gap-x-14 border-t border-shell-edge md:grid-cols-2">
            {FAQS.map(({ Icon, q, a }) => (
              <div key={q} className="border-b border-shell-edge py-6">
                <dt className="flex gap-3 font-display text-lg font-bold text-ink">
                  <Icon className="mt-1 size-5 shrink-0 text-leaf" />
                  {q}
                </dt>
                <dd className="mt-2 max-w-measure leading-relaxed text-ink-soft">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
