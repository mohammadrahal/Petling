"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, PlayCircleIcon, MicIcon } from "@/components/Icons";

export default function HomePage() {
  const characters = [
    {
      name: "Pip",
      tagline: "The Kind Storyteller",
      color: "text-primary-container",
      bg: "bg-primary-fixed",
      img: "/characters/pip.png",
      badge: "Coral Bear",
      shadow: "shadow-[0_8px_20px_rgba(242,139,107,0.25)]",
    },
    {
      name: "Momo",
      tagline: "The Math Explorer",
      color: "text-mint-dark",
      bg: "bg-mint-fixed",
      img: "/characters/momo.png",
      badge: "Baby Dino",
      shadow: "shadow-[0_8px_20px_rgba(123,198,123,0.25)]",
    },
    {
      name: "Zuzu",
      tagline: "The Word Wizard",
      color: "text-teal-700",
      bg: "bg-[#e0fbfb]",
      img: "/characters/zuzu.png",
      badge: "Star Alien",
      shadow: "shadow-[0_8px_20px_rgba(100,223,223,0.25)]",
    },
    {
      name: "Lulu",
      tagline: "The Curious Poet",
      color: "text-tertiary",
      bg: "bg-tertiary-fixed",
      img: "/characters/lulu.png",
      badge: "Sunny Owl",
      shadow: "shadow-[0_8px_20px_rgba(255,217,90,0.25)]",
    },
    {
      name: "Bumble",
      tagline: "The Melody Maker",
      color: "text-secondary",
      bg: "bg-secondary-fixed",
      img: "/characters/bumble.png",
      badge: "Cloud Bee",
      shadow: "shadow-[0_8px_20px_rgba(127,200,248,0.25)]",
    },
    {
      name: "Toby",
      tagline: "The Gentle Listener",
      color: "text-purple-700",
      bg: "bg-lavender-fixed",
      img: "/characters/toby.png",
      badge: "Peaceful Otter",
      shadow: "shadow-[0_8px_20px_rgba(183,156,255,0.25)]",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="w-full relative bg-secondary-fixed/50 py-16 px-gutter sm:px-12 overflow-hidden">
        {/* Soft Background Auras */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-8 w-96 h-96 rounded-full bg-tertiary-fixed/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1160px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-surface-container-lowest text-primary-container shadow-sm font-headline font-bold text-sm">
              <span>⭐</span>
              <span>Meet your playful learning buddy!</span>
            </div>

            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight">
              Learn with a pet that grows with you!
            </h1>

            <p className="font-body text-lg sm:text-xl text-on-surface-variant max-w-xl font-medium leading-relaxed">
              Talk to Pip every day. Learn words, numbers, and fun stories in Arabic and English, and watch Pip hatch and grow!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/choose"
                className="inline-flex items-center justify-center gap-2.5 min-h-[58px] px-8 rounded-full bg-primary-container text-white font-headline font-extrabold text-lg shadow-[0_6px_0_#99462b] hover:translate-y-0.5 hover:shadow-[0_3px_0_#99462b] active:translate-y-1.5 active:shadow-none transition-all cursor-pointer"
              >
                <span>Adopt Your Petling</span>
                <ArrowRightIcon className="w-5 h-5 text-white" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2.5 min-h-[58px] px-8 rounded-full bg-surface-container-lowest text-on-surface font-headline font-bold text-lg shadow-[0_6px_0_#dbc1ba] hover:translate-y-0.5 hover:shadow-[0_3px_0_#dbc1ba] active:translate-y-1.5 active:shadow-none transition-all cursor-pointer border border-surface-container-high"
              >
                <span>👨‍👩‍👧</span>
                <span>For Parents</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-3 text-on-surface-variant text-sm font-semibold">
              <div className="flex -space-x-1.5">
                <span className="text-xl">⭐</span>
                <span className="text-xl">💖</span>
                <span className="text-xl">🎉</span>
              </div>
              <span className="font-body">Loved by 40,000+ early readers and curious math adventurers!</span>
            </div>
          </div>

          {/* Right Column: 3D Mascot with Animated Aura */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] flex items-center justify-center">
              {/* Golden Sun Halo */}
              <div className="animate-halo absolute inset-0 rounded-full bg-tertiary-fixed shadow-[0_16px_40px_rgba(114,92,0,0.22)]" />

              {/* Speech bubble badge top right */}
              <div className="animate-bounce-soft absolute -top-3 -right-2 bg-surface-container-lowest px-4 py-2 rounded-full shadow-md flex items-center gap-2 z-20 border-2 border-primary-fixed">
                <MicIcon className="w-5 h-5 text-primary-container" />
                <span className="font-headline font-bold text-sm text-primary-container">
                  "Hi, let's explore!"
                </span>
              </div>

              {/* 3D Pip Image */}
              <div className="relative z-10 w-[270px] sm:w-[310px] h-[270px] sm:h-[310px] flex items-center justify-center">
                <Image
                  src="/characters/pip-full.png"
                  alt="Pip the 3D petling mascot"
                  width={310}
                  height={310}
                  className="w-full h-full object-contain drop-shadow-[0_16px_24px_rgba(58,10,0,0.16)] select-none"
                  priority
                />
              </div>

              {/* Level Pill bottom left */}
              <div className="absolute -bottom-3 -left-2 bg-surface-container-lowest px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 z-20 border border-surface-container-high">
                <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                <span className="font-headline font-bold text-xs text-on-surface">
                  Level 4 Sprout
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 TACTILE FEATURE CARDS */}
      <section className="max-w-[1160px] -mt-8 mx-auto mb-16 px-gutter relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-primary-fixed rounded-[28px] p-8 shadow-[0_6px_0_#ffb59e] flex flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center text-3xl shadow-sm">
              🗣️
            </div>
            <h2 className="font-headline font-extrabold text-2xl text-on-primary-fixed">
              Talk and learn
            </h2>
            <p className="font-body text-base text-on-primary-fixed-variant leading-relaxed font-semibold">
              Practice new words, numbers, and stories every day just by talking naturally.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-secondary-fixed rounded-[28px] p-8 shadow-[0_6px_0_#86cfff] flex flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center text-3xl shadow-sm">
              🌱
            </div>
            <h2 className="font-headline font-extrabold text-2xl text-on-secondary-fixed">
              Watch Pip grow
            </h2>
            <p className="font-body text-base text-on-secondary-fixed-variant leading-relaxed font-semibold">
              Pip hatches from an egg, levels up, and unlocks cool surprises as your child learns.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-tertiary-fixed rounded-[28px] p-8 shadow-[0_6px_0_#e8c346] flex flex-col gap-3 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center text-3xl shadow-sm">
              🛡️
            </div>
            <h2 className="font-headline font-extrabold text-2xl text-on-tertiary-fixed">
              100% Kid Safe
            </h2>
            <p className="font-body text-base text-on-tertiary-fixed-variant leading-relaxed font-semibold">
              Ad-free, COPPA compliant, child-safe voice AI built hand-in-hand with educators.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK LAUNCH BANNER */}
      <section className="max-w-[1160px] mx-auto mb-20 px-gutter">
        <div className="bg-surface-container-lowest rounded-[32px] p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6 shadow-[0_12px_32px_rgba(43,43,43,0.05)] border-2 border-surface-container-high">
          <div className="flex items-center gap-5 max-w-xl">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-3xl shrink-0">
              👂
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-on-surface">
                Try speaking with Pip right now
              </h3>
              <p className="font-body text-on-surface-variant text-base font-medium">
                Tap below to practice friendly questions in English and Arabic!
              </p>
            </div>
          </div>

          <Link
            href="/talk"
            className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-8 rounded-full bg-secondary text-white font-headline font-extrabold text-base shadow-[0_5px_0_#004c6d] hover:translate-y-0.5 hover:shadow-[0_2px_0_#004c6d] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            <PlayCircleIcon className="w-5 h-5 text-white" />
            <span>Launch Quick Chat</span>
          </Link>
        </div>
      </section>

      {/* MEET THE PETLING FAMILY */}
      <section className="max-w-[1160px] mx-auto mb-24 px-gutter">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-headline font-bold text-sm mb-3">
            <span>✨ Complete 3D Petling Universe</span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
            Choose your learning companion
          </h2>
          <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto mt-2">
            Every Petling has their own personality, subject specialty, and evolutionary growth path.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((c) => (
            <Link
              key={c.name}
              href="/choose"
              className={`bg-surface-container-lowest rounded-[28px] p-6 flex flex-col items-center text-center border-2 border-surface-container shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all ${c.shadow}`}
            >
              {/* Mascot 3D Thumbnail */}
              <div
                className={`w-36 h-36 rounded-full ${c.bg} flex items-center justify-center mb-4 p-2`}
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={140}
                  height={140}
                  className="object-contain rounded-full drop-shadow-md"
                />
              </div>

              <span className={`text-xs font-headline font-bold px-3 py-1 rounded-full ${c.bg} ${c.color} mb-2`}>
                {c.badge}
              </span>

              <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-1">
                {c.name}
              </h3>

              <p className="font-body text-on-surface-variant text-sm font-semibold">
                {c.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
