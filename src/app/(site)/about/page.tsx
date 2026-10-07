"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/Icons";

export default function AboutPage() {
  const characters = [
    {
      name: "Pip",
      species: "Coral Bear",
      focus: "Storytelling & Early Vocabulary",
      color: "text-primary-container",
      bg: "bg-primary-fixed",
      img: "/characters/pip.png",
    },
    {
      name: "Momo",
      species: "Baby Dinosaur",
      focus: "Math Safari & Logic Puzzles",
      color: "text-mint-dark",
      bg: "bg-mint-fixed",
      img: "/characters/momo.png",
    },
    {
      name: "Zuzu",
      species: "Star Alien",
      focus: "Bilingual Phonics & Science",
      color: "text-teal-700",
      bg: "bg-[#e0fbfb]",
      img: "/characters/zuzu.png",
    },
    {
      name: "Lulu",
      species: "Sunny Owl",
      focus: "Rhymes, Poetry & Reading",
      color: "text-tertiary",
      bg: "bg-tertiary-fixed",
      img: "/characters/lulu.png",
    },
    {
      name: "Bumble",
      species: "Cloud Bee",
      focus: "Music & Alphabet Rhythm",
      color: "text-secondary",
      bg: "bg-secondary-fixed",
      img: "/characters/bumble.png",
    },
    {
      name: "Toby",
      species: "Gentle Otter",
      focus: "Calm Mind & Patient Listening",
      color: "text-purple-700",
      bg: "bg-lavender-fixed",
      img: "/characters/toby.png",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO / HOW IT WORKS */}
      <section className="bg-[#FFF6DC] py-12 sm:py-16 px-4 sm:px-gutter">
        <div className="max-w-[1160px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-4 font-headline font-bold text-sm text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span>Simple & Safe</span>
          </div>

          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight mb-3">
            How Petling works
          </h1>

          <p className="font-body text-lg sm:text-xl text-on-surface-variant max-w-xl mx-auto mb-14 font-medium">
            Three simple steps. Learning feels like playing.
          </p>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1: Hatch */}
            <div className="bg-surface-container-lowest rounded-[36px] p-8 pt-10 shadow-[0_12px_28px_rgba(43,43,43,0.06),0_6px_0_#eae7e7] flex flex-col items-center relative">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-primary-container text-on-primary font-headline font-extrabold text-2xl flex items-center justify-center shadow-[0_4px_0_#99462b]">
                1
              </div>

              {/* Egg Illustration */}
              <div className="w-40 h-40 rounded-full bg-[#FFF9EA] flex items-center justify-center my-4 shadow-inner">
                <Image
                  src="/characters/egg.png"
                  alt="Petling Egg"
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>

              <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-headline font-bold text-xs mb-2">
                Step 1
              </span>

              <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">
                Hatch your Petling
              </h2>

              <p className="font-body text-base text-on-surface-variant font-medium leading-relaxed">
                Choose your favorite petling. Your companion starts as a cozy magical egg!
              </p>
            </div>

            {/* Step 2: Talk */}
            <div className="bg-surface-container-lowest rounded-[36px] p-8 pt-10 shadow-[0_12px_28px_rgba(43,43,43,0.06),0_6px_0_#eae7e7] flex flex-col items-center relative">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-mint text-white font-headline font-extrabold text-2xl flex items-center justify-center shadow-[0_4px_0_#2e7d32]">
                2
              </div>

              {/* Talk Illustration */}
              <div className="w-40 h-40 rounded-full bg-[#EEF9EE] flex items-center justify-center my-4 text-6xl shadow-inner">
                💬
              </div>

              <span className="px-3 py-1 rounded-full bg-mint-fixed text-mint-dark font-headline font-bold text-xs mb-2">
                Step 2
              </span>

              <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">
                Talk every day
              </h2>

              <p className="font-body text-base text-on-surface-variant font-medium leading-relaxed">
                Your pet asks friendly questions in English and Arabic about words, numbers, and stories.
              </p>
            </div>

            {/* Step 3: Grow */}
            <div className="bg-surface-container-lowest rounded-[36px] p-8 pt-10 shadow-[0_12px_28px_rgba(43,43,43,0.06),0_6px_0_#eae7e7] flex flex-col items-center relative">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-lavender text-white font-headline font-extrabold text-2xl flex items-center justify-center shadow-[0_4px_0_#5e35b1]">
                3
              </div>

              {/* Mascot Illustration */}
              <div className="w-40 h-40 rounded-full bg-lavender-fixed flex items-center justify-center my-4 shadow-inner">
                <Image
                  src="/characters/pip.png"
                  alt="Pip Mascot"
                  width={130}
                  height={130}
                  className="object-contain rounded-full"
                />
              </div>

              <span className="px-3 py-1 rounded-full bg-lavender-fixed text-purple-900 font-headline font-bold text-xs mb-2">
                Step 3
              </span>

              <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">
                Watch them grow!
              </h2>

              <p className="font-body text-base text-on-surface-variant font-medium leading-relaxed">
                Level up, unlock custom hats, celebrate with strawberry feasts, and learn new skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE CHARACTERS */}
      <section className="max-w-[1160px] mx-auto my-14 sm:my-20 px-4 sm:px-gutter">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface">
            Meet the Petlings
          </h2>
          <p className="font-body text-on-surface-variant text-base sm:text-lg mt-2 font-medium">
            Designed with child psychologists and speech educators to build lifelong confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((c) => (
            <div
              key={c.name}
              className="bg-surface-container-lowest rounded-[28px] p-6 shadow-sm border-2 border-surface-container-high flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-20 h-20 rounded-full ${c.bg} flex items-center justify-center shrink-0 overflow-hidden`}
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={75}
                  height={75}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-headline font-extrabold text-xl text-on-surface">
                  {c.name}
                </h3>
                <div className={`text-xs font-bold font-headline ${c.color}`}>
                  {c.species}
                </div>
                <div className="text-xs text-on-surface-variant font-medium mt-1">
                  {c.focus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARENT COMMITMENT & SAFETY */}
      <section className="bg-surface-container-low py-12 sm:py-16 px-4 sm:px-gutter border-t-2 border-surface-container-high">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center mx-auto mb-5 shadow-sm text-3xl">
            🛡️
          </div>

          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface mb-4">
            Built for peace of mind
          </h2>

          <p className="font-body text-on-surface-variant text-lg font-medium leading-relaxed mb-8">
            Petling is completely ad-free and COPPA compliant. We never store personal voice recordings on public servers, and parents receive weekly learning highlights to celebrate their child's milestones.
          </p>

          <Link
            href="/choose"
            className="inline-flex items-center justify-center gap-2.5 min-h-[58px] px-8 rounded-full bg-primary-container text-white font-headline font-extrabold text-lg shadow-[0_6px_0_#99462b] hover:translate-y-0.5 hover:shadow-[0_3px_0_#99462b] active:translate-y-1.5 active:shadow-none transition-all cursor-pointer"
          >
            <span>Get Started for Free</span>
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
