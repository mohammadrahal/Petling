"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VolumeUpIcon } from "@/components/Icons";

interface Buddy {
  id: string;
  name: string;
  species: string;
  quote: string;
  voicePitch: number;
  voiceRate: number;
  img: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  stageBg: string;
  btnBg: string;
  btnShadow: string;
  stats: {
    specialty: string;
    favoriteTreat: string;
    personality: string;
  };
}

const BUDDIES: Buddy[] = [
  {
    id: "pip",
    name: "Pip",
    species: "Coral Bear",
    quote: "“Hi best friend! Let’s read a story and practice words together today! 🍓”",
    voicePitch: 1.4,
    voiceRate: 0.95,
    img: "/characters/pip-full.png",
    themeColor: "text-primary-container",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
    stageBg: "bg-primary-fixed/40",
    btnBg: "bg-primary-container text-white",
    btnShadow: "shadow-[0_6px_0_#99462b]",
    stats: {
      specialty: "Storytelling & Early Vocabulary",
      favoriteTreat: "Sweet Strawberries",
      personality: "Warm, Encouraging, Curious",
    },
  },
  {
    id: "momo",
    name: "Momo",
    species: "Baby Dinosaur",
    quote: "“Roaaar! Let’s count the stars, add numbers, and explore math! 🦕”",
    voicePitch: 1.15,
    voiceRate: 0.9,
    img: "/characters/momo.png",
    themeColor: "text-mint-dark",
    badgeBg: "bg-mint-fixed",
    badgeText: "text-mint-dark",
    stageBg: "bg-mint-fixed/50",
    btnBg: "bg-mint text-white",
    btnShadow: "shadow-[0_6px_0_#2e7d32]",
    stats: {
      specialty: "Math Safari & Logic Puzzles",
      favoriteTreat: "Juicy Watermelons",
      personality: "Adventurous, Brave, Energetic",
    },
  },
  {
    id: "zuzu",
    name: "Zuzu",
    species: "Star Alien",
    quote: "“Greetings Earth friend! Let’s decode cosmic words and Arabic letters! 🚀”",
    voicePitch: 1.5,
    voiceRate: 1.0,
    img: "/characters/zuzu.png",
    themeColor: "text-teal-700",
    badgeBg: "bg-[#d9fbfb]",
    badgeText: "text-teal-900",
    stageBg: "bg-[#d9fbfb]/50",
    btnBg: "bg-teal-500 text-white",
    btnShadow: "shadow-[0_6px_0_#0f766e]",
    stats: {
      specialty: "Bilingual Phonics & Science",
      favoriteTreat: "Glowing Star Apples",
      personality: "Inventive, Playful, Quick-witted",
    },
  },
  {
    id: "lulu",
    name: "Lulu",
    species: "Sunny Owl",
    quote: "“Hoot hoot! Ready to solve magical rhymes and spell new words? 🦉”",
    voicePitch: 1.35,
    voiceRate: 0.92,
    img: "/characters/lulu.png",
    themeColor: "text-tertiary",
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-on-tertiary-fixed",
    stageBg: "bg-tertiary-fixed/40",
    btnBg: "bg-tertiary-container text-on-tertiary-fixed",
    btnShadow: "shadow-[0_6px_0_#725c00]",
    stats: {
      specialty: "Rhymes, Poetry & Reading",
      favoriteTreat: "Golden Honey Puffs",
      personality: "Wise, Cheerful, Bubbly",
    },
  },
  {
    id: "bumble",
    name: "Bumble",
    species: "Cloud Bee",
    quote: "“Bzz-bzz! Let’s sing the alphabet and collect sunshine points! 🐝”",
    voicePitch: 1.6,
    voiceRate: 1.05,
    img: "/characters/bumble.png",
    themeColor: "text-secondary",
    badgeBg: "bg-secondary-fixed",
    badgeText: "text-on-secondary-fixed",
    stageBg: "bg-secondary-fixed/40",
    btnBg: "bg-secondary text-white",
    btnShadow: "shadow-[0_6px_0_#004c6d]",
    stats: {
      specialty: "Music, Alphabet & Rhythm",
      favoriteTreat: "Sweet Clover Dew",
      personality: "Bouncy, Joyful, Musical",
    },
  },
  {
    id: "toby",
    name: "Toby",
    species: "Gentle Otter",
    quote: "“Hello peaceful learner! Let’s take our time and discover calm stories! 🌊”",
    voicePitch: 1.1,
    voiceRate: 0.88,
    img: "/characters/toby.png",
    themeColor: "text-purple-700",
    badgeBg: "bg-lavender-fixed",
    badgeText: "text-purple-900",
    stageBg: "bg-lavender-fixed/50",
    btnBg: "bg-lavender text-white",
    btnShadow: "shadow-[0_6px_0_#5e35b1]",
    stats: {
      specialty: "Calm Mind, Listening & Focus",
      favoriteTreat: "River Berries",
      personality: "Gentle, Soulful, Patient",
    },
  },
];

export default function ChoosePetlingPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("pip");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentBuddy = BUDDIES.find((b) => b.id === selectedId) || BUDDIES[0];

  const playVoicePreview = (buddy: Buddy) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = buddy.quote.replace(/[“”—]/g, "");
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.pitch = buddy.voicePitch;
      utterance.rate = buddy.voiceRate;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAdopt = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_petling", JSON.stringify(currentBuddy));
    }
    router.push("/dashboard");
  };

  return (
    <div className="w-full py-8 sm:py-10 px-4 sm:px-10 pb-20">
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm mb-3">
            <span>✨ Companion Onboarding</span>
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight">
            Choose Your Petling
          </h1>
          <p className="font-body text-on-surface-variant text-base sm:text-xl max-w-xl mx-auto mt-2 font-medium">
            Meet your daily learning buddy! Pick who you would like to talk and grow with.
          </p>
        </div>

        {/* Character Selection Avatars Strip */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-6 mb-8 sm:mb-12">
          {BUDDIES.map((b) => {
            const isSelected = b.id === selectedId;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedId(b.id);
                  playVoicePreview(b);
                }}
                className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-2xl sm:rounded-3xl transition-all cursor-pointer ${
                  isSelected
                    ? "bg-surface-container-lowest scale-105 shadow-lg border-2 border-primary-container"
                    : "bg-transparent border-2 border-transparent hover:scale-102"
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full ${b.badgeBg} flex items-center justify-center overflow-hidden border-2 ${
                    isSelected ? "border-primary-container" : "border-surface-container-high"
                  }`}
                >
                  <Image
                    src={b.img}
                    alt={b.name}
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`font-headline font-bold text-xs sm:text-base ${
                    isSelected ? b.themeColor : "text-on-surface-variant"
                  }`}
                >
                  {b.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* FEATURED STAGE FOR SELECTED PETLING */}
        <div className="bg-surface-container-lowest rounded-[28px] sm:rounded-[36px] p-5 sm:p-12 shadow-[0_20px_48px_rgba(43,43,43,0.08)] border-2 border-surface-container-high grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center relative overflow-hidden mb-16">
          {/* Background Aura */}
          <div
            className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${currentBuddy.stageBg} blur-3xl pointer-events-none`}
          />

          {/* Left: 3D Character Display */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <div
              className={`relative w-[230px] xs:w-[260px] sm:w-[320px] h-[230px] xs:h-[260px] sm:h-[320px] rounded-full ${currentBuddy.stageBg} flex items-center justify-center shadow-lg border-4 border-white`}
            >
              <Image
                src={currentBuddy.img}
                alt={currentBuddy.name}
                width={270}
                height={270}
                className="object-contain rounded-full drop-shadow-xl"
                priority
              />


              {/* Speaker Preview floating button */}
              <button
                onClick={() => playVoicePreview(currentBuddy)}
                title="Hear voice greeting"
                className={`absolute bottom-2 right-2 w-14 h-14 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform ${
                  isPlayingAudio ? "scale-110" : ""
                }`}
              >
                <VolumeUpIcon className="w-6 h-6 text-primary-container" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <span
                className={`inline-block px-4 py-1 rounded-full ${currentBuddy.badgeBg} ${currentBuddy.badgeText} font-headline font-bold text-xs`}
              >
                Level 1 Egg / Sprout
              </span>
            </div>
          </div>

          {/* Right: Companion Bio & Adoption Button */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <span className={`font-headline font-bold text-lg ${currentBuddy.themeColor}`}>
                {currentBuddy.species}
              </span>
              <h2 className="font-headline font-extrabold text-4xl sm:text-5xl text-on-surface my-1">
                {currentBuddy.name}
              </h2>

              {/* Speech bubble quote */}
              <div
                className={`rounded-2xl p-5 text-lg font-body font-semibold text-on-surface leading-relaxed border-l-4 border-primary-container ${currentBuddy.stageBg} mt-3`}
              >
                {currentBuddy.quote}
              </div>
            </div>

            {/* Trait Chips */}
            <div className="flex flex-col gap-2.5 text-sm sm:text-base font-semibold text-on-surface">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎓</span>
                <span>
                  Focus: <strong className="font-headline font-bold">{currentBuddy.stats.specialty}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🍓</span>
                <span>
                  Treat: <strong className="font-headline font-bold">{currentBuddy.stats.favoriteTreat}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl">😊</span>
                <span>
                  Personality:{" "}
                  <strong className="font-headline font-bold">{currentBuddy.stats.personality}</strong>
                </span>
              </div>
            </div>

            {/* Adopt Button */}
            <div className="pt-3">
              <button
                onClick={handleAdopt}
                className={`inline-flex items-center justify-center gap-3 min-h-[62px] w-full sm:w-auto px-10 rounded-full font-headline font-extrabold text-lg sm:text-xl transition-all cursor-pointer ${currentBuddy.btnBg} ${currentBuddy.btnShadow} hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none`}
              >
                <span>Adopt {currentBuddy.name} & Begin!</span>
                <span className="text-xl">🐾</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-4 shadow-sm border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-3xl flex items-center justify-center shrink-0">
              👂
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface">
                Listens & Answers
              </h4>
              <p className="font-body text-on-surface-variant text-sm font-medium">
                Speaks in friendly, real-time voice adapted to your child’s pace.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-4 shadow-sm border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-3xl flex items-center justify-center shrink-0">
              🥚
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface">
                Grows With Practice
              </h4>
              <p className="font-body text-on-surface-variant text-sm font-medium">
                Collect stars in phonics and numbers to help your buddy evolve!
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-4 shadow-sm border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed text-3xl flex items-center justify-center shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface">
                100% Kid Safe Space
              </h4>
              <p className="font-body text-on-surface-variant text-sm font-medium">
                Ad-free, strict COPPA safety filters, and positive parent controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
