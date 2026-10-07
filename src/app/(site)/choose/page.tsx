"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CompanionStage from "@/components/CompanionStage";
import SubjectIcon from "@/components/SubjectIcon";
import { Berry, Check, Egg, Speaker } from "@/components/Icons";
import { COMPANIONS, DEFAULT_COMPANION } from "@/lib/companions";
import { chooseCompanion } from "@/lib/companion-store";

export default function ChoosePage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(DEFAULT_COMPANION.id);
  const [speakingLang, setSpeakingLang] = useState<"en" | "ar" | null>(null);
  const [voiceUnavailable, setVoiceUnavailable] = useState(false);

  const chosen = COMPANIONS.find((c) => c.id === selectedId) ?? DEFAULT_COMPANION;

  // Keep the latest companion in a ref so the unmount cleanup below does not
  // need to re-run every time the selection changes.
  const stopSpeech = useRef(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  useEffect(() => () => stopSpeech.current(), []);

  const speak = (lang: "en" | "ar") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceUnavailable(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(chosen.greeting[lang]);
    utterance.lang = lang === "ar" ? "ar-SA" : "en-US";
    utterance.pitch = chosen.voice.pitch;
    utterance.rate = chosen.voice.rate;

    setSpeakingLang(lang);
    utterance.onend = () => setSpeakingLang(null);
    utterance.onerror = () => {
      setSpeakingLang(null);
      setVoiceUnavailable(true);
    };

    window.speechSynthesis.speak(utterance);
  };

  const choose = () => {
    stopSpeech.current();
    chooseCompanion(chosen.id);
    router.push("/dashboard");
  };

  return (
    <div className="bg-clay">
      <div className="mx-auto max-w-shelf px-5 py-12">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Who would you like to talk to?
        </h1>
        <p className="mt-3 max-w-measure text-lg text-ink-soft">
          Tap a companion to hear them say hello. You can change your mind later.
        </p>

        {/* Big tap targets. The selected one gets a coral ring and a tick —
            the two things that already mean "chosen" elsewhere in the app. */}
        <ul
          className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4"
          role="list"
        >
          {COMPANIONS.map((c) => {
            const isChosen = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={isChosen}
                  onClick={() => {
                    setSelectedId(c.id);
                    setSpeakingLang(null);
                    stopSpeech.current();
                  }}
                  className={`flex w-full flex-col items-center gap-2 rounded-region border-2 p-3 transition-colors ${
                    isChosen
                      ? "border-coral bg-shell"
                      : "border-transparent hover:bg-shell/70"
                  }`}
                >
                  <span className="relative">
                    <CompanionStage src={c.img} alt="" size={72} />
                    {isChosen && (
                      <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-coral text-ink">
                        <Check className="size-4" />
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-display text-sm ${
                      isChosen ? "font-bold text-ink" : "text-ink-soft"
                    }`}
                  >
                    {c.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <section
          aria-live="polite"
          className="mt-12 grid items-center gap-10 border-t border-clay-edge pt-12 lg:grid-cols-[auto_1fr] lg:gap-16"
        >
          <CompanionStage
            src={chosen.portrait ?? chosen.img}
            alt={`${chosen.name}, a ${chosen.species.toLowerCase()}`}
            size={300}
            className="mx-auto"
          />

          <div>
            <p className="font-display text-base font-semibold text-coral-ink">
              {chosen.species}
            </p>
            <h2 className="font-display text-4xl font-extrabold text-ink">
              {chosen.name}
            </h2>

            <blockquote className="mt-5 border-l-4 border-sun pl-5">
              <p className="font-display text-2xl font-semibold leading-snug text-ink">
                {chosen.greeting.en}
              </p>
              <p
                lang="ar"
                dir="rtl"
                className="mt-2 font-display text-2xl font-semibold leading-snug text-ink-soft"
              >
                {chosen.greeting.ar}
              </p>
            </blockquote>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => speak("en")}
                className="press press-sm press-shell inline-flex min-h-11 items-center gap-2 rounded-full border border-shell-edge bg-shell px-5 font-display font-semibold text-ink"
              >
                <Speaker className="size-5 text-coral-ink" />
                {speakingLang === "en" ? "Speaking…" : "Hear it in English"}
              </button>
              <button
                type="button"
                onClick={() => speak("ar")}
                className="press press-sm press-shell inline-flex min-h-11 items-center gap-2 rounded-full border border-shell-edge bg-shell px-5 font-display font-semibold text-ink"
              >
                <Speaker className="size-5 text-coral-ink" />
                <span>
                  {speakingLang === "ar" ? "Speaking…" : "Hear it in "}
                  {speakingLang !== "ar" && <span lang="ar">العربية</span>}
                </span>
              </button>
            </div>

            {voiceUnavailable && (
              <p className="mt-3 max-w-measure text-sm text-ink-soft">
                This browser will not play the greeting. Everything else works, and{" "}
                {chosen.name} will still listen and reply during a session.
              </p>
            )}

            <dl className="mt-8 grid gap-4 border-t border-clay-edge pt-6 sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink-soft">
                  <SubjectIcon subject={chosen.subject} className="size-4" />
                  Practises
                </dt>
                <dd className="mt-1 font-display font-semibold text-ink">
                  {chosen.subjectLabel}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink-soft">
                  <Berry className="size-4" />
                  Favourite treat
                </dt>
                <dd className="mt-1 font-display font-semibold text-ink">
                  {chosen.treat}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm text-ink-soft">
                  <Egg className="size-4" />
                  Starts as
                </dt>
                <dd className="mt-1 font-display font-semibold text-ink">
                  An egg, stage 1
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={choose}
              className="press press-coral mt-9 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-coral px-8 font-display text-lg font-bold text-ink sm:w-auto"
            >
              <Image
                src={chosen.img}
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              Start with {chosen.name}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
