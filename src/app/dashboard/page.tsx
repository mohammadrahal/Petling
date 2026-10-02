"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircleIcon, ArrowRightIcon, MicIcon } from "@/components/Icons";

export default function DashboardScreen() {
  const [pet, setPet] = useState({
    id: "pip",
    name: "Pip",
    species: "Coral Bear",
    img: "/characters/pip.png",
    themeColor: "text-primary-container",
    btnColor: "bg-primary-container text-on-primary",
  });

  const [tummyPercent, setTummyPercent] = useState(75);
  const [berriesCount, setBerriesCount] = useState(5);
  const [feedMessage, setFeedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_petling");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPet(parsed);
        } catch {}
      }
    }
  }, []);

  const handleFeed = () => {
    if (berriesCount <= 0) {
      setFeedMessage("No more berries today! Complete a quest to earn more 🍓");
      setTimeout(() => setFeedMessage(null), 2500);
      return;
    }
    setBerriesCount((prev) => prev - 1);
    setTummyPercent((prev) => Math.min(100, prev + 10));
    setFeedMessage(`Nom nom! ${pet.name} loved that strawberry! ✨`);
    setTimeout(() => setFeedMessage(null), 2500);
  };

  const quests = [
    {
      id: 1,
      title: "Words: Arabic Animals & Fruits",
      category: "Bilingual Phonics",
      icon: "🍎",
      status: "Done",
      statusBg: "bg-mint-fixed text-mint-dark border border-mint-dark/20",
      stars: "+3 ⭐",
    },
    {
      id: 2,
      title: "Numbers: Addition Safari (1 to 10)",
      category: "Early Math",
      icon: "🔢",
      status: "Done",
      statusBg: "bg-mint-fixed text-mint-dark border border-mint-dark/20",
      stars: "+5 ⭐",
    },
    {
      id: 3,
      title: "Story: The Lost Kite & The Lion",
      category: "Interactive Story",
      icon: "🪁",
      status: "Start",
      statusBg: "bg-primary-container text-white",
      stars: "+10 ⭐",
      isAction: true,
    },
  ];

  return (
    <div className="w-full bg-[#F0EAFF] py-6 sm:py-10 px-4 sm:px-10 pb-20">
      <div className="max-w-[1160px] mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-fixed flex items-center justify-center text-2xl sm:text-3xl shadow-sm shrink-0">
              👋
            </div>
            <div>
              <h1 className="font-headline font-extrabold text-2xl sm:text-4xl text-on-surface tracking-tight">
                Hi Rahal! <span className="text-primary-container">{pet.name} missed you.</span>
              </h1>
              <p className="font-body text-on-surface-variant text-sm sm:text-lg font-medium">
                Ready for today's magical learning adventures?
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-container-lowest shadow-sm font-headline font-bold text-xs sm:text-sm text-secondary">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-secondary animate-ping" />
            <span>{pet.name} is ready to play!</span>
          </div>
        </div>

        {/* 2-Column Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: Companion Stage & Vitals */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_12px_32px_rgba(85,67,61,0.06)] border-2 border-surface-container-high flex flex-col items-center text-center relative overflow-hidden">

            {/* Ambient Background Aura */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-secondary-fixed opacity-40 blur-2xl pointer-events-none" />

            {/* Level Tag */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE2FD] text-on-surface font-headline font-bold text-sm shadow-sm">
                <span>🐣</span>
                <span>Baby {pet.name} • Level 2</span>
              </span>
            </div>

            {/* 3D Mascot Character with Sun Aura */}
            <div className="relative my-2">
              <div className="w-56 h-56 sm:w-60 sm:h-60 rounded-full bg-gradient-to-b from-[#FFF2B2] to-[#FFE081] flex items-center justify-center p-3 shadow-[0_16px_36px_-6px_rgba(197,163,39,0.35)]">
                <div className="w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src={pet.img}
                    alt={pet.name}
                    width={200}
                    height={200}
                    className="object-contain rounded-full drop-shadow-md select-none"
                    priority
                  />
                </div>
              </div>

              {/* Floating Emote Badge */}
              <div className="absolute -bottom-2 right-4 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-primary-container">
                <span className="text-sm">💖</span>
                <span className="font-headline font-bold text-xs text-primary-container">
                  Happy
                </span>
              </div>
            </div>

            {/* Speech Snippet */}
            <div className="w-full bg-secondary-fixed/40 rounded-2xl p-4 text-left flex items-start gap-2.5 my-5">
              <span className="text-xl shrink-0 mt-0.5">
                💬
              </span>
              <p className="font-body font-bold text-sm sm:text-base text-on-secondary-fixed leading-snug">
                "I'm full of yummy berries! Let's practice words together!"
              </p>
            </div>

            {/* Vitals Progress Bars */}
            <div className="w-full space-y-3 mb-6 text-left">
              {/* Tummy Bar */}
              <div className="bg-surface-container-low rounded-xl p-3.5">
                <div className="flex justify-between items-center mb-1.5 font-headline">
                  <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 text-on-surface">
                    <span>🍓</span>
                    {pet.name}'s Tummy
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-primary-container">
                    {tummyPercent}% full
                  </span>
                </div>
                <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-500"
                    style={{ width: `${tummyPercent}%` }}
                  />
                </div>
              </div>

              {/* Learning Level Progress */}
              <div className="bg-surface-container-low rounded-xl p-3.5">
                <div className="flex justify-between items-center mb-1.5 font-headline">
                  <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 text-on-surface">
                    <span>⭐</span>
                    Growth to Level 3
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-secondary">
                    18/25 Stars
                  </span>
                </div>
                <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full bg-secondary-container rounded-full"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>
            </div>

            {/* Feed Mini-Action */}
            <div className="w-full mb-4">
              <button
                onClick={handleFeed}
                className="w-full py-3 rounded-full bg-tertiary-fixed border-2 border-tertiary-fixed-dim flex items-center justify-center gap-2 font-headline font-bold text-sm text-on-tertiary-fixed shadow-[0_3px_0_#e8c346] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                <span>🍓 Feed Strawberry ({berriesCount} left)</span>
              </button>
              {feedMessage && (
                <p className="mt-2 text-xs font-headline font-bold text-primary-container">
                  {feedMessage}
                </p>
              )}
            </div>

            {/* Primary Action Button */}
            <Link
              href="/talk"
              className="inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-primary-container text-white font-headline font-extrabold text-lg shadow-[0_6px_0_#99462b] hover:translate-y-0.5 hover:shadow-[0_3px_0_#99462b] active:translate-y-1.5 active:shadow-none transition-all"
            >
              <span>Talk to {pet.name} (03:12 left)</span>
              <MicIcon className="w-6 h-6 text-white" />
            </Link>
          </div>

          {/* RIGHT: Stats, Daily Quests & Learning Path */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 font-headline">
              <div className="bg-surface-container-lowest rounded-2xl p-4 text-center shadow-sm border border-surface-container-high">
                <span className="text-2xl sm:text-3xl">🔥</span>
                <div className="font-extrabold text-xl sm:text-2xl text-primary-container mt-1">
                  7 Days
                </div>
                <div className="text-xs font-bold text-on-surface-variant font-body">
                  Streak
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-4 text-center shadow-sm border border-surface-container-high">
                <span className="text-2xl sm:text-3xl">📚</span>
                <div className="font-extrabold text-xl sm:text-2xl text-secondary mt-1">
                  142
                </div>
                <div className="text-xs font-bold text-on-surface-variant font-body">
                  Words
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-4 text-center shadow-sm border border-surface-container-high">
                <span className="text-2xl sm:text-3xl">⭐</span>
                <div className="font-extrabold text-xl sm:text-2xl text-tertiary mt-1">
                  28
                </div>
                <div className="text-xs font-bold text-on-surface-variant font-body">
                  Stars
                </div>
              </div>
            </div>

            {/* Today's Learning Quests */}
            <div className="bg-surface-container-lowest rounded-[32px] p-6 sm:p-8 shadow-[0_12px_32px_rgba(43,43,43,0.05)] border-2 border-surface-container-high">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-on-surface">
                    Today’s Quests
                  </h2>
                  <p className="font-body text-on-surface-variant text-sm font-medium">
                    Speak with your petling to complete your daily journey.
                  </p>
                </div>
                <span className="bg-surface-container-low px-3 py-1 rounded-full font-headline font-bold text-xs text-on-surface">
                  2 / 3 Complete
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {quests.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-surface-container-low rounded-2xl p-4 flex items-center justify-between gap-4 border-2 transition-all ${
                      q.isAction ? "border-primary-container shadow-sm" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                        {q.icon}
                      </div>
                      <div>
                        <div className="font-headline font-bold text-sm sm:text-base text-on-surface">
                          {q.title}
                        </div>
                        <div className="font-body text-xs text-on-surface-variant font-medium">
                          {q.category} • <span className="text-tertiary font-bold">{q.stars}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {q.isAction ? (
                        <Link
                          href="/talk"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-white font-headline font-extrabold text-sm sm:text-base shadow-[0_4px_0_#99462b] hover:translate-y-0.5 hover:shadow-[0_2px_0_#99462b] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                        >
                          <span>Start</span>
                          <ArrowRightIcon className="w-4 h-4 text-white" />
                        </Link>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-headline font-bold text-xs sm:text-sm ${q.statusBg}`}>
                          <CheckCircleIcon className="w-4 h-4 text-mint-dark" />
                          <span>{q.status}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Switch Companion Link */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 flex items-center justify-between shadow-sm border border-surface-container-high">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">🐾</span>
                <div>
                  <div className="font-headline font-bold text-sm sm:text-base text-on-surface">
                    Want to play with another friend?
                  </div>
                  <div className="font-body text-xs text-on-surface-variant font-medium">
                    Momo, Zuzu, Lulu, Bumble, and Toby are waiting!
                  </div>
                </div>
              </div>

              <Link
                href="/choose"
                className="px-4 py-2 rounded-full bg-surface-container-low text-on-surface font-headline font-bold text-xs sm:text-sm hover:bg-surface-container transition-colors border border-surface-container-high"
              >
                Switch Pet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
