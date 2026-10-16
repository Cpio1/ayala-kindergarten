/** Friendly illustration shown in a photo frame while the real photo is not uploaded yet. */
export function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8DDF8" />
          <stop offset="1" stopColor="#E4F4FD" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ph-sky)" />
      <circle cx="300" cy="96" r="38" fill="#FFD43B" />
      <path d="M58 120c-12 0-22-8-22-19s9-19 20-19c3-12 13-20 26-20 11 0 20 6 24 16 3-1 6-2 9-2 12 0 22 9 22 21 6 2 9 7 9 11 0 7-6 12-13 12H58z" fill="#fff" />
      <path d="M0 300c70-30 130-34 200-20s130 14 200-8v128H0z" fill="#7BC96F" opacity="0.85" />
      <path d="M0 330c80-24 150-20 220-6s120 10 180-4v80H0z" fill="#5DB45A" />
      <rect x="128" y="196" width="144" height="116" rx="10" fill="#FFF9E8" />
      <path d="M112 204 200 136l88 68z" fill="#2074ED" />
      <rect x="182" y="250" width="36" height="62" rx="18" fill="#FFD43B" />
      <rect x="144" y="222" width="28" height="28" rx="8" fill="#A8DDF8" />
      <rect x="228" y="222" width="28" height="28" rx="8" fill="#A8DDF8" />
      <circle cx="200" cy="182" r="11" fill="#FFD43B" />
    </svg>
  );
}
