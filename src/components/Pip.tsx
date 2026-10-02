interface PipProps {
  size?: number;
  variant?: "normal" | "talking" | "baby" | "grown" | "egg";
  className?: string;
}

export default function Pip({ size = 160, variant = "normal", className = "" }: PipProps) {
  if (variant === "egg") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Egg outline & body */}
        <ellipse cx="80" cy="88" rx="46" ry="58" fill="#FFF6DC" stroke="#2B2B2B" strokeWidth="6" />
        {/* Coral spot on egg */}
        <circle cx="70" cy="80" r="14" fill="#F28B6B" opacity="0.8" />
        <circle cx="95" cy="100" r="10" fill="#FFD95A" opacity="0.8" />
        {/* Cute sleeping eye marks */}
        <path d="M68 92 C72 96 76 96 80 92" stroke="#2B2B2B" strokeWidth="4" strokeLinecap="round" />
        <path d="M88 92 C92 96 96 96 100 92" stroke="#2B2B2B" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  const isGrown = variant === "grown";
  const isTalking = variant === "talking";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
    >
      {/* Left Ear */}
      <circle
        cx="58"
        cy="46"
        r={isGrown ? "24" : "20"}
        fill="#F28B6B"
        stroke="#2B2B2B"
        strokeWidth="6"
      />
      <circle cx="58" cy="46" r="11" fill="#FFB199" />

      {/* Right Ear */}
      <circle
        cx="142"
        cy="46"
        r={isGrown ? "24" : "20"}
        fill="#F28B6B"
        stroke="#2B2B2B"
        strokeWidth="6"
      />
      <circle cx="142" cy="46" r="11" fill="#FFB199" />

      {/* Chubby Coral Body */}
      <circle
        cx="100"
        cy="110"
        r={isGrown ? "76" : "68"}
        fill="#F28B6B"
        stroke="#2B2B2B"
        strokeWidth="6"
      />

      {/* Rosy Cheeks */}
      <ellipse cx="64" cy="122" rx="10" ry="7" fill="#FF7452" opacity="0.6" />
      <ellipse cx="136" cy="122" rx="10" ry="7" fill="#FF7452" opacity="0.6" />

      {/* Left Eye: Big white with dark pupil */}
      <circle cx="78" cy="98" r="16" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4.5" />
      <circle cx="81" cy="98" r="9" fill="#2B2B2B" />
      <circle cx="84" cy="94" r="3.5" fill="#FFFFFF" />

      {/* Right Eye: Big white with dark pupil */}
      <circle cx="122" cy="98" r="16" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4.5" />
      <circle cx="125" cy="98" r="9" fill="#2B2B2B" />
      <circle cx="128" cy="94" r="3.5" fill="#FFFFFF" />

      {/* Small Cute Mouth / Smile */}
      {isTalking ? (
        <path
          d="M90 120 C90 134 110 134 110 120 Z"
          fill="#B91C1C"
          stroke="#2B2B2B"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M92 118 Q100 128 108 118"
          stroke="#2B2B2B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Tiny Feet */}
      <ellipse cx="76" cy="174" rx="14" ry="9" fill="#F28B6B" stroke="#2B2B2B" strokeWidth="5" />
      <ellipse cx="124" cy="174" rx="14" ry="9" fill="#F28B6B" stroke="#2B2B2B" strokeWidth="5" />
    </svg>
  );
}
