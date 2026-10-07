"use client";

import Link from "next/link";
import { useState } from "react";
import Pip from "@/components/Pip";

export default function UserProfileScreen() {
  const [talkLimit, setTalkLimit] = useState(15);
  const [emailReport, setEmailReport] = useState(true);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [petName, setPetName] = useState("Pip");

  const badges = [
    { name: "First word", icon: "💬", bg: "var(--pastel-pink)", locked: false },
    { name: "5 day streak", icon: "🔥", bg: "var(--sunny-yellow)", locked: false },
    { name: "Counted to 20", icon: "🔢", bg: "var(--pastel-mint)", locked: false },
    { name: "10 lessons", icon: "⭐", bg: "var(--pastel-lavender)", locked: false },
    { name: "Pip talks", icon: "🔒", bg: "#E2E8F0", locked: true },
  ];

  // Daily lesson bar chart data (Mon to Sun)
  const weekData = [
    { day: "Mon", lessons: 3, height: "60%" },
    { day: "Tue", lessons: 4, height: "80%" },
    { day: "Wed", lessons: 2, height: "40%" },
    { day: "Thu", lessons: 5, height: "100%" },
    { day: "Fri", lessons: 3, height: "60%" },
    { day: "Sat", lessons: 4, height: "80%" },
    { day: "Sun", lessons: 1, height: "25%" },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--mint-light)",
        flex: 1,
        padding: "3rem 2.5rem",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Top Section: Kid Profile Card + This Week Card in a Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
        >
          {/* Kid Profile Card (White, Rounded) */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "var(--border-thick)",
              borderRadius: "36px",
              padding: "2.25rem",
              boxShadow: "var(--shadow-playful)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {/* Left Kid Info */}
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              {/* Big Round Avatar with "S" */}
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: "var(--lavender)",
                  border: "var(--border-thick)",
                  color: "#FFFFFF",
                  fontSize: "3rem",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 0 rgba(43, 43, 43, 0.15)",
                }}
              >
                S
              </div>

              <div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "var(--dark-text)",
                    lineHeight: 1.15,
                  }}
                >
                  Rahal
                </h1>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#64748B",
                    marginBottom: "0.75rem",
                  }}
                >
                  7 years old
                </div>

                {/* Learning Languages Pills */}
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <span
                    style={{
                      backgroundColor: "var(--sky-blue)",
                      border: "var(--border-soft)",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "var(--dark-text)",
                    }}
                  >
                    🇬🇧 English
                  </span>
                  <span
                    style={{
                      backgroundColor: "var(--sunny-yellow)",
                      border: "var(--border-soft)",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.9rem",
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "var(--dark-text)",
                    }}
                  >
                    🌙 Arabic
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: "2px", height: "100px", backgroundColor: "#E2E8F0" }} />

            {/* Right Kid Info: Small Pip + Customize Pip */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Pip size={90} variant="normal" />
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 900,
                  color: "var(--dark-text)",
                  margin: "0.5rem 0",
                }}
              >
                {petName}, Baby stage, level 2
              </div>
              <button
                onClick={() => setShowCustomizeModal(true)}
                style={{
                  backgroundColor: "var(--cream)",
                  border: "var(--border-medium)",
                  borderRadius: "9999px",
                  padding: "0.45rem 1.15rem",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "var(--dark-text)",
                  boxShadow: "0 3px 0 rgba(43, 43, 43, 0.12)",
                }}
              >
                🎨 Customize Pip
              </button>
            </div>
          </div>

          {/* Right Side: "This week" Card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "var(--border-thick)",
              borderRadius: "36px",
              padding: "2rem",
              boxShadow: "var(--shadow-playful)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "var(--dark-text)",
                }}
              >
                This week 📊
              </h2>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#64748B" }}>
                22 lessons done
              </span>
            </div>

            {/* Small Bar Chart of Lessons Mon to Sun */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "90px",
                padding: "0 0.5rem 0.5rem",
                borderBottom: "2px solid #E2E8F0",
              }}
            >
              {weekData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    width: "32px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: d.height,
                      backgroundColor: "var(--coral)",
                      border: "2px solid #2B2B2B",
                      borderRadius: "6px 6px 0 0",
                    }}
                    title={`${d.lessons} lessons`}
                  />
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#64748B" }}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Two Stats: 42 new words & 2 hours learning */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1.2rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--sky-blue)",
                  border: "var(--border-soft)",
                  borderRadius: "20px",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--dark-text)" }}>
                  42
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--dark-text)" }}>
                  new words
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--sunny-yellow)",
                  border: "var(--border-soft)",
                  borderRadius: "20px",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--dark-text)" }}>
                  2 hrs
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--dark-text)" }}>
                  learning
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: "My badges" */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "var(--border-thick)",
            borderRadius: "36px",
            padding: "2rem 2.25rem",
            boxShadow: "var(--shadow-playful)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "var(--dark-text)",
              }}
            >
              My badges 🏆
            </h2>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--coral)" }}>
              4 of 5 unlocked
            </span>
          </div>

          {/* Row of 5 round colorful badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {badges.map((b, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: b.locked ? 0.6 : 1,
                }}
              >
                <div
                  style={{
                    width: "82px",
                    height: "82px",
                    borderRadius: "50%",
                    backgroundColor: b.bg,
                    border: b.locked ? "3px dashed #64748B" : "var(--border-thick)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.2rem",
                    boxShadow: b.locked ? "none" : "0 6px 0 rgba(43, 43, 43, 0.15)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {b.icon}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: b.locked ? "#64748B" : "var(--dark-text)",
                  }}
                >
                  {b.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: "Parent area" Card (Calmer, cleaner, with lock icon) */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "var(--border-thick)",
            borderRadius: "36px",
            padding: "2.25rem",
            boxShadow: "var(--shadow-playful)",
          }}
        >
          {/* Header with lock icon and "Parents only" note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              paddingBottom: "1.25rem",
              borderBottom: "2px solid #F1F5F9",
              marginBottom: "1.75rem",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: "#F1F5F9",
                border: "2px solid #2B2B2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              🔒
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "var(--dark-text)",
                  lineHeight: 1.15,
                }}
              >
                Parent area
              </h2>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748B" }}>
                Settings & Safety Controls • Parents only
              </span>
            </div>
          </div>

          {/* Controls Inside Parent Area */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            {/* Left Controls: Daily talk limit slider + Weekly email toggle */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Daily talk limit setting with slider */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 800,
                    marginBottom: "0.5rem",
                    fontSize: "1.05rem",
                  }}
                >
                  <label htmlFor="talk-limit-slider" style={{ color: "var(--dark-text)" }}>
                    Daily talk limit
                  </label>
                  <span
                    style={{
                      backgroundColor: "var(--sky-blue)",
                      border: "var(--border-soft)",
                      padding: "0.2rem 0.8rem",
                      borderRadius: "9999px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {talkLimit} min
                  </span>
                </div>
                <input
                  id="talk-limit-slider"
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={talkLimit}
                  onChange={(e) => setTalkLimit(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--coral)", height: "8px", cursor: "pointer" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#94A3B8",
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  <span>5 min</span>
                  <span>15 min (Recommended)</span>
                  <span>30 min</span>
                </div>
              </div>

              {/* Weekly report by email toggle switched on */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--dark-text)" }}>
                    Weekly report by email
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 600 }}>
                    Receive Rahal&apos;s vocabulary & math summary every Sunday
                  </div>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => setEmailReport(!emailReport)}
                  style={{
                    width: "56px",
                    height: "32px",
                    borderRadius: "9999px",
                    backgroundColor: emailReport ? "var(--mint-green)" : "#CBD5E1",
                    border: "var(--border-medium)",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      border: "2px solid #2B2B2B",
                      position: "absolute",
                      top: "2px",
                      left: emailReport ? "27px" : "3px",
                      transition: "all 0.2s ease",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Right Controls: Current plan + Upgrade button + Add another child */}
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "var(--border-medium)",
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748B" }}>
                    CURRENT PLAN
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--dark-text)" }}>
                    Free, baby stage
                  </div>
                </div>

                {/* Coral Upgrade Button */}
                <Link
                  href="/upgrade"
                  className="btn-pill btn-coral"
                  style={{
                    padding: "0.6rem 1.4rem",
                    fontSize: "1rem",
                  }}
                >
                  Upgrade 🚀
                </Link>
              </div>

              {/* Text link: Add another child */}
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.85rem", textAlign: "right" }}>
                <button
                  onClick={() => alert("👨‍👩‍👧‍👦 Add child feature: Add sibling profile coming soon!")}
                  style={{
                    color: "var(--coral)",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textDecoration: "underline",
                  }}
                >
                  + Add another child
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Pip Modal (Optional Interactive Feature) */}
      {showCustomizeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "var(--border-thick)",
              borderRadius: "32px",
              padding: "2rem",
              maxWidth: "420px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 10px 0 rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              Customize Your Pip
            </h3>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#64748B", marginBottom: "1.5rem" }}>
              Change your pet&apos;s name and style!
            </p>

            <div style={{ marginBottom: "1.5rem" }}>
              <Pip size={120} variant="normal" />
            </div>

            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: 800, marginBottom: "0.4rem" }}>
                Pet Name:
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "16px",
                  border: "var(--border-medium)",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  outline: "none",
                }}
              />
            </div>

            <button
              onClick={() => setShowCustomizeModal(false)}
              className="btn-pill btn-coral"
              style={{ width: "100%", padding: "0.8rem" }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
