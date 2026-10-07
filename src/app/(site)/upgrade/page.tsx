"use client";

import Link from "next/link";
import { useState } from "react";
import Pip from "@/components/Pip";

export default function UpgradeScreen() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");

  // Scattered confetti dots
  const confettiDots = [
    { top: "8%", left: "6%", color: "var(--coral)", size: 16 },
    { top: "15%", left: "22%", color: "var(--mint-green)", size: 12 },
    { top: "12%", right: "8%", color: "var(--sunny-yellow)", size: 18 },
    { top: "25%", right: "25%", color: "var(--lavender)", size: 14 },
    { top: "50%", left: "4%", color: "var(--lavender)", size: 14 },
    { top: "75%", left: "12%", color: "var(--sunny-yellow)", size: 20 },
    { top: "88%", left: "45%", color: "var(--coral)", size: 14 },
    { top: "70%", right: "6%", color: "var(--mint-green)", size: 16 },
    { top: "82%", right: "22%", color: "var(--lavender)", size: 12 },
    { top: "35%", right: "5%", color: "var(--coral)", size: 15 },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--cream)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Confetti Dots */}
      {confettiDots.map((dot, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: "50%",
            backgroundColor: dot.color,
            border: "2px solid #2B2B2B",
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />
      ))}

      {/* Close / Back button in top-left */}
      <Link
        href="/dashboard"
        style={{
          position: "absolute",
          top: "24px",
          left: "32px",
          backgroundColor: "#FFFFFF",
          border: "var(--border-medium)",
          borderRadius: "9999px",
          padding: "0.5rem 1.4rem",
          fontWeight: 900,
          color: "var(--dark-text)",
          fontSize: "1.1rem",
          boxShadow: "0 3px 0 rgba(43, 43, 43, 0.15)",
        }}
      >
        ← Back to My Pip
      </Link>

      <div style={{ maxWidth: "1160px", width: "100%", margin: "0 auto", position: "relative" }}>
        {/* Centered Title & Subtitle */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: "var(--dark-text)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Pip learned to talk! 🎉
          </h1>
          <p
            style={{
              fontSize: "1.45rem",
              fontWeight: 700,
              color: "var(--dark-text)",
              opacity: 0.85,
            }}
          >
            Rahal finished 20 lessons. Now Pip is ready for real conversations.
          </p>
        </div>

        {/* Main Content: Left Pip in Circle + Right Plan Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
        >
          {/* Left Side: Pip inside big yellow circle + speech bubble + mint pill badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Speech Bubble */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "var(--border-thick)",
                borderRadius: "28px",
                padding: "1rem 2rem",
                fontSize: "1.45rem",
                fontWeight: 900,
                color: "var(--dark-text)",
                boxShadow: "0 6px 0 rgba(43, 43, 43, 0.15)",
                marginBottom: "1.5rem",
                position: "relative",
                textAlign: "center",
              }}
            >
              Hi Rahal! I can talk now! ✨
              {/* Bubble tail */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "14px solid #2B2B2B",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "11px solid #FFFFFF",
                }}
              />
            </div>

            {/* Big Yellow Circle with Talking Pip */}
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                backgroundColor: "var(--sunny-yellow)",
                border: "var(--border-thick)",
                boxShadow: "0 10px 0 rgba(43, 43, 43, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Pip size={210} variant="talking" />
            </div>

            {/* Mint Pill Badge under Pip */}
            <div
              style={{
                backgroundColor: "var(--mint-green)",
                color: "#FFFFFF",
                border: "var(--border-thick)",
                borderRadius: "9999px",
                padding: "0.6rem 1.6rem",
                fontSize: "1.2rem",
                fontWeight: 900,
                boxShadow: "0 4px 0 #5EAE5E",
                letterSpacing: "0.01em",
              }}
            >
              🌟 New stage: Talking Pip
            </div>
          </div>

          {/* Right Side: Two Plan Cards + Unlock Button + Maybe Later + Parent Note */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Two Plan Cards Side by Side */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "1.75rem",
              }}
            >
              {/* Monthly Plan Card */}
              <div
                onClick={() => setSelectedPlan("monthly")}
                style={{
                  backgroundColor: "#FFFFFF",
                  border:
                    selectedPlan === "monthly"
                      ? "4.5px solid var(--coral)"
                      : "var(--border-thick)",
                  borderRadius: "32px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow:
                    selectedPlan === "monthly"
                      ? "0 8px 0 var(--coral)"
                      : "var(--shadow-playful)",
                  transform: selectedPlan === "monthly" ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "var(--dark-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Monthly
                </h3>
                <div
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: 900,
                    color: "var(--dark-text)",
                    lineHeight: 1.1,
                  }}
                >
                  $7.99
                </div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#64748B",
                    marginTop: "0.3rem",
                  }}
                >
                  per month
                </div>
              </div>

              {/* Yearly Plan Card (Selected with thick coral outline & Best value badge) */}
              <div
                onClick={() => setSelectedPlan("yearly")}
                style={{
                  backgroundColor: "#FFFFFF",
                  border:
                    selectedPlan === "yearly"
                      ? "4.5px solid var(--coral)"
                      : "var(--border-thick)",
                  borderRadius: "32px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow:
                    selectedPlan === "yearly"
                      ? "0 8px 0 var(--coral)"
                      : "var(--shadow-playful)",
                  transform: selectedPlan === "yearly" ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                {/* Mint Best Value Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--mint-green)",
                    color: "#FFFFFF",
                    border: "var(--border-medium)",
                    borderRadius: "9999px",
                    padding: "0.3rem 1.1rem",
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    boxShadow: "0 3px 0 #5EAE5E",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⭐ Best value
                </div>

                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "var(--dark-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Yearly
                </h3>
                <div
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: 900,
                    color: "var(--dark-text)",
                    lineHeight: 1.1,
                  }}
                >
                  $59
                </div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#64748B",
                    marginTop: "0.3rem",
                  }}
                >
                  about $4.92 a month
                </div>
              </div>
            </div>

            {/* Big Coral Pill Button */}
            <button
              onClick={() =>
                alert("🎉 Talking unlocked! Pip can now have real voice conversations with Rahal.")
              }
              className="btn-pill btn-coral"
              style={{
                width: "100%",
                padding: "1.1rem",
                fontSize: "1.4rem",
              }}
            >
              Unlock talking with Pip 🚀
            </button>

            {/* Small Gray Text Link: Maybe later */}
            <div style={{ textAlign: "center", marginTop: "1rem", marginBottom: "1.5rem" }}>
              <Link
                href="/dashboard"
                style={{
                  color: "#64748B",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                Maybe later
              </Link>
            </div>

            {/* Light Blue Rounded Box at Bottom Right */}
            <div
              style={{
                backgroundColor: "var(--sky-blue)",
                border: "var(--border-medium)",
                borderRadius: "24px",
                padding: "1.25rem 1.6rem",
                boxShadow: "0 4px 0 rgba(43, 43, 43, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "var(--dark-text)",
                  lineHeight: 1.5,
                }}
              >
                🔒 <strong>For parents:</strong> talk time is capped at 15 minutes a day,
                Pip only chats about learning topics, and you can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
