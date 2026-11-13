import React, { useId } from "react";

/**
 * Chatbot mark — Your Online MBA theme.
 * Rounded crimson-gradient robot head, antenna, glowing eyes.
 * Use at any size; crisp at 16px+.
 */
export default function ChatBotMark({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const body = `body-${id}`;
  const eye = `eye-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="AI Advisor bot"
      className={className}
    >
      <defs>
        <linearGradient id={body} x1="8" y1="12" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff4d6d" />
          <stop offset="0.5" stopColor="#e0244a" />
          <stop offset="1" stopColor="#C81E3D" />
        </linearGradient>
        <radialGradient id={eye} cx="0.5" cy="0.45" r="0.6">
          <stop stopColor="#fff7f0" />
          <stop offset="0.35" stopColor="#ffb4a2" />
          <stop offset="1" stopColor="#ff5a3c" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <rect x="29" y="1" width="6" height="6" rx="2" fill={`url(#${body})`} />
      <circle cx="32" cy="4" r="4.5" fill="#ffb4a2" stroke="#C81E3D" strokeWidth="1.6" />

      {/* Side ears */}
      <rect x="2" y="22" width="6" height="18" rx="3" fill={`url(#${body})`} stroke="#0b0d12" strokeWidth="1.4" />
      <rect x="56" y="22" width="6" height="18" rx="3" fill={`url(#${body})`} stroke="#0b0d12" strokeWidth="1.4" />

      {/* Head */}
      <rect x="8" y="9" width="48" height="46" rx="14" fill={`url(#${body})`} stroke="#0b0d12" strokeWidth="1.6" />
      {/* Inner face plate */}
      <rect x="14" y="15" width="36" height="34" rx="10" fill="#0b0d12" />

      {/* Eyes */}
      <circle cx="24.5" cy="32" r="6" fill={`url(#${eye})`} />
      <circle cx="39.5" cy="32" r="6" fill={`url(#${eye})`} />
      <circle cx="24.5" cy="32" r="1.7" fill="#0b0d12" />
      <circle cx="39.5" cy="32" r="1.7" fill="#0b0d12" />

      {/* Mouth — friendly smile bar */}
      <rect x="22" y="42" width="20" height="3.4" rx="1.7" fill="#ff8a3d" />
    </svg>
  );
}
