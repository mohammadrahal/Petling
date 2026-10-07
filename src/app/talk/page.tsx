"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import CompanionStage from "@/components/CompanionStage";
import {
  ArrowLeft,
  Berry,
  Book,
  Check,
  Door,
  Hint as HintIcon,
  Mic,
  Speaker,
} from "@/components/Icons";
import { useCompanion } from "@/lib/companion-store";

/* -------------------------------------------------------------------------- */
/* Web Speech API                                                              */
/* -------------------------------------------------------------------------- */

type RecognitionResult = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  abort(): void;
  onresult: ((event: RecognitionResult) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onnomatch: (() => void) | null;
};

type RecognitionConstructor = new () => RecognitionLike;

function getRecognition(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/* -------------------------------------------------------------------------- */
/* Questions                                                                   */
/* -------------------------------------------------------------------------- */

type Question = {
  id: string;
  prompt: string;
  /** Spoken or tapped answers counted as correct. Compared lower-cased. */
  accept: string[];
  /** Shown beside the answer once it is right. */
  arabic?: string;
  /**
   * Two tappable answers, for a child who would rather not speak. They are
   * named rather than given as a pair, so it is obvious which is which:
   * previously both entries matched `accept`, so a tap could never be wrong.
   */
  answer: string;
  distractor: string;
  hint: string;
  praise: string;
};

const QUESTIONS: Question[] = [
  {
    id: "cat",
    prompt: "How do you say cat in Arabic?",
    accept: ["qittah", "qitta", "kittah", "kitta", "قطة"],
    arabic: "قطة",
    answer: "Qittah",
    distractor: "Kalb",
    hint: "It starts with a Q sound. Qit-tah.",
    praise: "Yes. Qittah means cat.",
  },
  {
    id: "add",
    prompt: "What is three plus two?",
    accept: ["5", "five", "khamsa", "خمسة"],
    arabic: "خمسة",
    answer: "Five",
    distractor: "Four",
    hint: "Hold up three fingers, then two more. Count them all.",
    praise: "Three and two make five.",
  },
  {
    id: "thanks",
    prompt: "How do you say thank you in Arabic?",
    accept: ["shukran", "shukraan", "shokran", "شكرا", "شكرًا"],
    arabic: "شكرًا",
    answer: "Shukran",
    distractor: "Sabah",
    hint: "It starts with a Sh sound. Shuk-ran.",
    praise: "Shukran. That is lovely manners.",
  },
  {
    id: "lion",
    prompt: "What sound does a lion make?",
    accept: ["roar", "rawr", "roaar"],
    answer: "Roar",
    distractor: "Moo",
    hint: "It is big and loud, and it starts with an R.",
    praise: "A big loud roar.",
  },
];

const SESSION_SECONDS = 192;
const BAR_FACTORS = [0.45, 0.7, 0.55, 1, 0.8, 0.95, 0.5, 0.75, 0.4];

type Turn =
  | { state: "asking" }
  | { state: "listening" }
  | { state: "correct"; said: string }
  | { state: "wrong"; said: string };

export default function TalkPage() {
  const companion = useCompanion();
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<Turn>({ state: "asking" });
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [berries, setBerries] = useState(0);
  const [words, setWords] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [companionSpeaking, setCompanionSpeaking] = useState(false);

  const barsRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const question = QUESTIONS[index % QUESTIONS.length];
  const sessionOver = secondsLeft === 0;

  /* ----- speaking -------------------------------------------------------- */

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.pitch = companion.voice.pitch;
      utterance.rate = companion.voice.rate;
      setCompanionSpeaking(true);
      utterance.onend = () => setCompanionSpeaking(false);
      utterance.onerror = () => setCompanionSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [companion],
  );

  /* ----- listening ------------------------------------------------------- */

  const stopListening = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    barsRef.current?.style.setProperty("--level", "0");

    // Detach the handlers before aborting, so the `end` event that abort() fires
    // cannot overwrite a result we have already graded.
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.onnomatch = null;
      recognition.abort();
    }
    recognitionRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    void audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
  }, []);

  const grade = useCallback(
    (said: string) => {
      const heard = said.toLowerCase().trim();
      const correct = question.accept.some((word) => heard.includes(word.toLowerCase()));

      if (correct) {
        setTurn({ state: "correct", said });
        setBerries((n) => n + 1);
        setWords((n) => n + 1);
        speak(question.praise);
        if (advanceRef.current) clearTimeout(advanceRef.current);
        advanceRef.current = setTimeout(() => {
          setIndex((n) => n + 1);
          setAttempts(0);
          setShowHint(false);
          setNote(null);
          setTurn({ state: "asking" });
        }, 2600);
        return;
      }

      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setTurn({ state: "wrong", said });

      // Two misses is enough. Give the answer rather than let a child get stuck.
      if (nextAttempt >= 2) {
        setShowHint(true);
        speak(`Not quite. The answer is ${question.answer}.`);
      } else {
        speak("Not quite. Have another go.");
      }
    },
    [attempts, question, speak],
  );

  /**
   * Microphone level drives the visualiser and nothing else.
   *
   * The previous version submitted `options[0]` — always the correct answer —
   * as soon as the level crossed a threshold, so any noise in the room was
   * graded as a correct answer. An answer is now only ever recorded from a real
   * recognition result or from the child tapping one.
   */
  const startListening = useCallback(async () => {
    const Recognition = getRecognition();
    if (!Recognition) {
      setNote("This browser cannot listen yet. Tap an answer below instead.");
      return;
    }

    setNote(null);
    setTurn({ state: "listening" });

    // Best effort: the levels are nice to have, recognition is what matters.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        ctx.createMediaStreamSource(stream).connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteFrequencyData(data);
          const average = data.reduce((sum, v) => sum + v, 0) / data.length;
          // Written straight to a CSS variable: the bars animate without
          // re-rendering React sixty times a second.
          barsRef.current?.style.setProperty(
            "--level",
            Math.min(1, average / 70).toFixed(3),
          );
          frameRef.current = requestAnimationFrame(tick);
        };
        tick();
      }
    } catch {
      // Permission refused or no input device. Recognition will report it too.
    }

    try {
      const recognition = new Recognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const said = event.results[0]?.[0]?.transcript ?? "";
        stopListening();
        if (said.trim()) grade(said);
        else setNote("I did not catch that. Try again, or tap an answer.");
      };

      recognition.onnomatch = () => {
        stopListening();
        setTurn({ state: "asking" });
        setNote("I did not catch that. Try again, or tap an answer.");
      };

      recognition.onerror = (event) => {
        stopListening();
        setTurn({ state: "asking" });
        setNote(
          event.error === "not-allowed"
            ? "The microphone is blocked. Allow it in your browser, or tap an answer."
            : "The microphone is not working. Tap an answer below instead.",
        );
      };

      recognition.onend = () => {
        setTurn((current) =>
          current.state === "listening" ? { state: "asking" } : current,
        );
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      stopListening();
      setTurn({ state: "asking" });
      setNote("The microphone is not working. Tap an answer below instead.");
    }
  }, [grade, stopListening]);

  /* ----- lifecycle ------------------------------------------------------- */

  // The session ends on its own, which is the daily limit a parent sets.
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((n) => (n > 0 ? n - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!sessionOver) return;
    stopListening();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [sessionOver, stopListening]);

  // Ask the new question out loud.
  useEffect(() => {
    if (sessionOver) return;
    const id = setTimeout(() => speak(question.prompt), 500);
    return () => clearTimeout(id);
  }, [question, sessionOver, speak]);

  useEffect(
    () => () => {
      stopListening();
      if (advanceRef.current) clearTimeout(advanceRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    },
    [stopListening],
  );

  const clock = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const listening = turn.state === "listening";

  // Alternate which side the answer is on. If it were always rendered first, a
  // child would learn to tap the left button rather than to listen. Keyed off
  // the question index so it stays put across re-renders and matches the server.
  const options =
    index % 2 === 0
      ? [question.answer, question.distractor]
      : [question.distractor, question.answer];

  /* ----- the session has finished ---------------------------------------- */

  if (sessionOver) {
    return (
      <main className="grid min-h-dvh place-items-center bg-clay px-5 py-12">
        <div className="w-full max-w-md text-center">
          <CompanionStage
            src={companion.img}
            alt={companion.name}
            size={200}
            className="mx-auto"
          />
          <h1 className="mt-8 font-display text-3xl font-extrabold text-ink">
            That is today&rsquo;s talk time.
          </h1>
          <p className="mt-3 text-lg text-ink-soft">
            {companion.name} will be here again tomorrow.
          </p>

          <dl className="mt-8 flex justify-center gap-10 border-y border-clay-edge py-6">
            <div>
              <dd className="font-display text-3xl font-extrabold text-ink">{words}</dd>
              <dt className="text-sm text-ink-soft">words practised</dt>
            </div>
            <div>
              <dd className="font-display text-3xl font-extrabold text-ink">{berries}</dd>
              <dt className="text-sm text-ink-soft">berries earned</dt>
            </div>
          </dl>

          <Link
            href="/dashboard"
            className="press press-coral mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-coral px-8 font-display text-lg font-bold text-ink"
          >
            Back to {companion.name}
          </Link>
        </div>
      </main>
    );
  }

  /* ----- the session ----------------------------------------------------- */

  return (
    <main className="flex min-h-dvh flex-col bg-clay px-5 pb-8 pt-5">
      <header className="mx-auto flex w-full max-w-lg items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-display font-semibold text-ink"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>
        <p className="font-display font-semibold text-ink-soft">
          <span className="sr-only">Talk time left: </span>
          {clock}
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-7 py-8">
        <CompanionStage
          src={companion.img}
          alt={companion.name}
          size={200}
          breathing={companionSpeaking}
          priority
        />

        <div className="flex w-full items-start gap-3">
          <button
            type="button"
            onClick={() => speak(question.prompt)}
            className="press press-sm press-shell grid size-12 shrink-0 place-items-center rounded-full border border-shell-edge bg-shell text-coral-ink"
            aria-label="Say the question again"
          >
            <Speaker className="size-6" />
          </button>
          <h1 className="font-display text-2xl font-bold leading-snug text-ink">
            {question.prompt}
          </h1>
        </div>

        {/* Levels, driven by a CSS variable rather than React state. */}
        <div
          ref={barsRef}
          aria-hidden="true"
          className="flex h-10 items-center justify-center gap-1.5"
          style={{ ["--level" as string]: "0" }}
        >
          {BAR_FACTORS.map((factor, i) => (
            <span
              key={i}
              className="w-2 rounded-full bg-coral/70 transition-[height] duration-75"
              style={{
                ["--k" as string]: factor,
                height: listening
                  ? "calc(6px + var(--level) * var(--k) * 34px)"
                  : "6px",
              }}
            />
          ))}
        </div>

        <p aria-live="polite" className="min-h-14 text-center">
          {turn.state === "listening" && (
            <span className="font-display text-lg font-semibold text-ink">
              Listening…
            </span>
          )}

          {turn.state === "correct" && (
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <Check className="size-6 text-leaf" />
              <span className="font-display text-lg font-bold text-leaf">
                {question.praise}
              </span>
              {question.arabic && (
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-display text-2xl font-bold text-ink"
                >
                  {question.arabic}
                </span>
              )}
            </span>
          )}

          {turn.state === "wrong" && (
            <span className="font-display text-lg font-semibold text-ink">
              You said &ldquo;{turn.said}&rdquo;. {attempts >= 2 ? question.praise : "Not quite — have another go."}
            </span>
          )}

          {turn.state === "asking" && note && (
            <span className="text-ink-soft">{note}</span>
          )}
        </p>

        {showHint && (
          <p className="w-full rounded-region bg-sun-wash px-4 py-3 text-center font-semibold text-ink">
            {question.hint}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                stopListening();
                grade(option);
              }}
              disabled={turn.state === "correct"}
              className="press press-sm press-shell min-h-12 rounded-full border border-shell-edge bg-shell px-6 font-display text-lg font-bold text-ink disabled:opacity-55"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-end justify-center gap-10">
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              aria-pressed={showHint}
              className="press press-sm press-sun grid size-14 place-items-center rounded-full bg-sun-wash text-ink"
            >
              <HintIcon className="size-7" />
            </button>
            <span className="font-display text-sm font-semibold text-ink-soft">
              Hint
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={() => (listening ? stopListening() : startListening())}
              className={`press grid size-20 place-items-center rounded-full font-display ${
                listening
                  ? "press-leaf bg-leaf text-shell"
                  : "press-coral bg-coral text-ink"
              }`}
            >
              <Mic className="size-10" />
              <span className="sr-only">
                {listening ? "Stop listening" : "Say your answer"}
              </span>
            </button>
            <span className="font-display font-bold text-ink">
              {listening ? "Stop" : "Say it"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Link
              href="/dashboard"
              className="press press-sm press-shell grid size-14 place-items-center rounded-full border border-shell-edge bg-shell text-ink"
            >
              <Door className="size-7" />
            </Link>
            <span className="font-display text-sm font-semibold text-ink-soft">
              Done
            </span>
          </div>
        </div>

        <dl className="mt-7 flex items-center justify-center gap-8 border-t border-clay-edge pt-5 text-sm">
          <div className="flex items-center gap-2">
            <Berry className="size-4 text-berry" />
            <dd className="font-display font-bold text-ink">{berries}</dd>
            <dt className="text-ink-soft">berries for {companion.name}</dt>
          </div>
          <div className="flex items-center gap-2">
            <Book className="size-4 text-coral-ink" />
            <dd className="font-display font-bold text-ink">{words}</dd>
            <dt className="text-ink-soft">words today</dt>
          </div>
        </dl>
      </div>
    </main>
  );
}
