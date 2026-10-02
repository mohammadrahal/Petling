"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BackArrowIcon, VolumeUpIcon, LightbulbIcon, CallEndIcon, MicIcon, HeartIcon } from "@/components/Icons";

interface Question {
  id: number;
  question: string;
  expectedKeywords: string[];
  hint: string;
  successFeedback: string;
  options: { text: string; label: string; emoji: string }[];
}

export default function TalkScreen() {
  const router = useRouter();

  // Load chosen petling from localStorage or default to Pip
  const [pet, setPet] = useState({
    id: "pip",
    name: "Pip",
    img: "/characters/pip.png",
    themeColor: "#F28B6B",
    species: "Coral Bear",
  });

  const [seconds, setSeconds] = useState(192); // 03:12
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [foodCount, setFoodCount] = useState(3);
  const [wordsCount, setWordsCount] = useState(8);

  const [isPipSpeaking, setIsPipSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micVolume, setMicVolume] = useState(14);
  const [speechBubbleText, setSpeechBubbleText] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [kidSaidText, setKidSaidText] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<"idle" | "correct" | "tryAgain">("idle");
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "How do you say 'cat' in Arabic?",
      expectedKeywords: ["qittah", "qitta", "kitta", "kittah", "gitta", "قطة", "cat"],
      hint: "It sounds like 'Qit-tah'! Try saying Qittah!",
      successFeedback: "Yay! That's right! 'Qittah' (قطة) means cat! Great job Sara! 🍓",
      options: [
        { text: "Qittah", label: 'Say "Qittah!"', emoji: "🐱" },
        { text: "Kittah", label: 'Say "Kittah!"', emoji: "🐾" },
      ],
    },
    {
      id: 2,
      question: "Awesome! What is 3 plus 2?",
      expectedKeywords: ["5", "five", "خمسة", "khamsa"],
      hint: "Count on your fingers: 3... plus 2 more!",
      successFeedback: "High five! 3 + 2 = 5! You are so smart! 🍓",
      options: [
        { text: "Five", label: 'Say "Five!"', emoji: "🖐️" },
        { text: "5", label: 'Say "Khamsa!"', emoji: "⭐" },
      ],
    },
    {
      id: 3,
      question: "How do you say 'Thank you' in Arabic?",
      expectedKeywords: ["shukran", "shoukran", "shokran", "شكرا", "شكراً"],
      hint: "It starts with Sh... 'Shuk-ran'!",
      successFeedback: "Shukran! That's wonderful manners, Sara! 🍓",
      options: [
        { text: "Shukran", label: 'Say "Shukran!"', emoji: "🙏" },
        { text: "Shuk-ran", label: 'Say "Shuk-ran!"', emoji: "✨" },
      ],
    },
    {
      id: 4,
      question: "What sound does a friendly lion make?",
      expectedKeywords: ["roar", "rawr"],
      hint: "It's a big loud ROAAAR!",
      successFeedback: "ROAAAR! You're a brave little lion, Sara! 🍓",
      options: [
        { text: "Roar!", label: 'Say "Roar!"', emoji: "🦁" },
        { text: "Rawr!", label: 'Say "Rawr!"', emoji: "👑" },
      ],
    },
  ];

  const currentQ = questions[currentQIndex % questions.length];

  // Sound generator
  const playSound = (type: "happy" | "pop" | "ding") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "happy") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(type === "pop" ? 440 : 880, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // AudioContext blocked
    }
  };

  // Speak function for Pet
  const speakAsPet = (text: string, onDone?: () => void) => {
    setSpeechBubbleText(text);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.35;
        utterance.rate = 0.95;

        setIsPipSpeaking(true);
        utterance.onstart = () => setIsPipSpeaking(true);
        utterance.onend = () => {
          setIsPipSpeaking(false);
          if (onDone) onDone();
        };
        utterance.onerror = () => {
          setIsPipSpeaking(false);
          if (onDone) onDone();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPipSpeaking(true);
        setTimeout(() => {
          setIsPipSpeaking(false);
          if (onDone) onDone();
        }, 2000);
      }
    } else {
      setIsPipSpeaking(true);
      setTimeout(() => {
        setIsPipSpeaking(false);
        if (onDone) onDone();
      }, 2000);
    }
  };

  // Start real microphone recording with AudioContext volume listener
  const startRealMic = async () => {
    setMicError(null);
    try {
      if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateVolume = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setMicVolume(Math.max(12, Math.min(50, avg * 0.75)));

            // If voice detected for a moment, auto process first option
            if (avg > 38) {
              setTimeout(() => {
                stopRealMic();
                const answered = currentQ.options[0].text;
                setKidSaidText(answered);
                processAnswer(answered);
              }, 1200);
              return;
            }

            animFrameRef.current = requestAnimationFrame(updateVolume);
          };
          updateVolume();
        }

        // Speech recognition
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          try {
            const rec = new SpeechRecognition();
            rec.lang = "en-US";
            rec.onresult = (e: any) => {
              const text = e.results[0][0].transcript;
              setKidSaidText(text);
              stopRealMic();
              processAnswer(text);
            };
            rec.onerror = () => {};
            rec.start();
            recognitionRef.current = rec;
          } catch {}
        }

        setIsListening(true);
      } else {
        throw new Error("No mic support");
      }
    } catch {
      setMicError("Mic busy or restricted — tap an answer below!");
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const answered = currentQ.options[0].text;
        setKidSaidText(answered);
        processAnswer(answered);
      }, 1500);
    }
  };

  const stopRealMic = () => {
    setIsListening(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopRealMic();
    } else {
      startRealMic();
    }
  };

  const processAnswer = (ans: string) => {
    const clean = ans.toLowerCase().trim();
    const isCorrect = currentQ.expectedKeywords.some((kw) => clean.includes(kw.toLowerCase()));

    if (isCorrect) {
      setAnswerStatus("correct");
      playSound("happy");
      setFoodCount((prev) => prev + 1);
      setWordsCount((prev) => prev + 1);

      speakAsPet(currentQ.successFeedback, () => {
        setTimeout(() => {
          setAnswerStatus("idle");
          setKidSaidText(null);
          setShowHint(false);
          setCurrentQIndex((prev) => prev + 1);
        }, 1200);
      });
    } else {
      setAnswerStatus("tryAgain");
      playSound("pop");
      speakAsPet("Almost! Let's try again! You can do it!", () => {
        setTimeout(() => {
          setAnswerStatus("idle");
          setKidSaidText(null);
        }, 1500);
      });
    }
  };

  // Mount logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_petling");
      if (saved) {
        try {
          setPet(JSON.parse(saved));
        } catch {}
      }
    }

    // Timer countdown
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Initial greeting
    const greetTimeout = setTimeout(() => {
      speakAsPet(currentQ.question);
    }, 600);

    return () => {
      clearInterval(timer);
      clearTimeout(greetTimeout);
      stopRealMic();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQIndex]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-[560px] mx-auto">
        <div className="relative w-full rounded-[36px] bg-secondary-container p-6 sm:p-7 flex flex-col justify-between min-h-[720px] shadow-2xl overflow-hidden border-4 border-white select-none">
          {/* Subtle Ambient Background spots */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-secondary-fixed opacity-50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-tertiary-fixed opacity-50 blur-3xl pointer-events-none" />

          {/* TOP HEADER SECTION */}
          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Back Pill Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-surface-container-lowest text-secondary px-4 py-2 rounded-full shadow-sm font-headline font-extrabold text-sm active:scale-95 transition-transform cursor-pointer"
            >
              <BackArrowIcon className="w-4 h-4 text-secondary" />
              <span>Back</span>
            </Link>

            {/* Center Title */}
            <h1 className="font-headline font-extrabold text-xl sm:text-2xl text-white drop-shadow-sm tracking-tight">
              Talking with {pet.name}
            </h1>

            {/* Live Call Timer Pill */}
            <div className="inline-flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block animate-pulse" />
              <span className="font-headline font-extrabold text-sm text-on-surface">
                {formatTimer(seconds)}
              </span>
            </div>
          </div>

          {/* CENTER STAGE: Speech Bubble & Companion Avatar */}
          <div className="relative z-10 flex flex-col items-center my-auto w-full">
            {/* Kid-Friendly Speech Bubble */}
            <div className="relative w-full bg-surface-container-lowest rounded-3xl p-5 shadow-lg mb-8 transition-transform hover:scale-[1.01]">
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => speakAsPet(speechBubbleText || currentQ.question)}
                  title="Hear question again"
                  className="bg-secondary-fixed p-2.5 rounded-full flex items-center justify-center cursor-pointer text-secondary shrink-0 hover:scale-105 active:scale-95 transition-transform"
                >
                  <VolumeUpIcon className="w-6 h-6 text-secondary" />
                </button>
                <div className="flex-1">
                  <p className="font-body font-bold text-lg sm:text-xl text-on-surface leading-snug">
                    {speechBubbleText || currentQ.question}
                  </p>
                  {showHint && (
                    <div className="mt-2.5 p-2 px-3 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-headline font-bold text-sm">
                      💡 Hint: {currentQ.hint}
                    </div>
                  )}
                </div>
              </div>

              {/* Triangle Tail */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-surface-container-lowest" />
            </div>

            {/* Big Sunny Yellow Avatar Stage */}
            <div className="relative flex items-center justify-center">
              <div className="animate-halo absolute w-56 h-56 rounded-full bg-tertiary-fixed opacity-70 blur-md" />

              <div
                className={`relative w-48 h-48 rounded-full bg-tertiary-fixed flex items-center justify-center shadow-lg border-4 border-white overflow-hidden transition-transform duration-200 ${
                  isPipSpeaking ? "scale-105" : "scale-100"
                }`}
              >
                <Image
                  src={pet.img}
                  alt={pet.name}
                  width={170}
                  height={170}
                  className="object-contain rounded-full drop-shadow-md select-none"
                  priority
                />
              </div>

              {/* Floating Heart Emotion Badge */}
              <div className="absolute top-0 right-1 bg-surface-container-lowest p-2 rounded-full shadow-md flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-primary-container" />
              </div>
            </div>

            {/* Listening Status & Soundwave Bars */}
            <div className="flex flex-col items-center mt-5 w-full">
              <div className="mb-2">
                <span className="font-headline font-extrabold text-base text-white drop-shadow-sm">
                  {isListening ? "Listening to you! 🌟" : isPipSpeaking ? `${pet.name} is speaking...` : "Tap mic or say the answer!"}
                </span>
              </div>

              {/* Visualizer Wave (9 bars) */}
              <div className="flex items-center justify-center gap-1.5 h-9">
                {[0.8, 1.2, 0.6, 1.5, 0.9, 1.3, 0.7, 1.1, 0.5].map((scale, i) => {
                  const barHeight = isListening ? Math.max(10, Math.min(36, micVolume * scale)) : isPipSpeaking ? 18 : 6;
                  return (
                    <span
                      key={i}
                      className="w-1.5 rounded-full bg-white transition-all duration-100"
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>

              {/* Quick Answer Tap Chips for Toddlers/Kids */}
              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => {
                      setKidSaidText(opt.text);
                      processAnswer(opt.text);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-on-surface font-headline font-extrabold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all border-2 border-white cursor-pointer"
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM CONTROLS & STATS SECTION */}
          <div className="relative z-10 flex flex-col gap-4 w-full">
            {/* Primary Voice Control Buttons */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 w-full">
              {/* Hint Button */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => setShowHint(!showHint)}
                  aria-label="Get a hint"
                  className="w-14 h-14 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-md flex items-center justify-center active:scale-90 hover:brightness-105 transition-all cursor-pointer"
                >
                  <LightbulbIcon className="w-7 h-7 text-on-tertiary-fixed" />
                </button>
                <span className="font-headline font-bold text-xs text-white">
                  Hint
                </span>
              </div>

              {/* Center Mic Button */}
              <div className="flex flex-col items-center gap-1 -translate-y-2">
                <div className="relative flex items-center justify-center">
                  {isListening && (
                    <div className="animate-ping absolute -inset-2 rounded-full bg-tertiary-fixed opacity-50" />
                  )}
                  <button
                    onClick={toggleMic}
                    aria-label="Talk with Petling"
                    className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full text-white shadow-xl border-4 border-white flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                      isListening ? "bg-mint" : "bg-primary-container"
                    }`}
                  >
                    <MicIcon className="w-10 h-10 sm:w-11 sm:h-11 text-white" />
                  </button>
                </div>
                <span className="font-headline font-extrabold text-base text-white drop-shadow-sm">
                  {isListening ? "Listening" : "Talk"}
                </span>
              </div>

              {/* End Call Button */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => router.push("/dashboard")}
                  aria-label="End session"
                  className="w-14 h-14 rounded-full bg-error text-white shadow-md flex items-center justify-center active:scale-90 hover:brightness-105 transition-all cursor-pointer"
                >
                  <CallEndIcon className="w-7 h-7 text-white" />
                </button>
                <span className="font-headline font-bold text-xs text-white">
                  End
                </span>
              </div>
            </div>

            {/* Gamified Bottom Counter Pills */}
            <div className="flex items-center justify-between w-full pt-1">
              <div className="inline-flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-headline font-bold text-on-surface">
                <span>🍪</span>
                <span>+{foodCount} snacks for {pet.name}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-headline font-bold text-on-surface">
                <span>✨</span>
                <span>Words today: {wordsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
