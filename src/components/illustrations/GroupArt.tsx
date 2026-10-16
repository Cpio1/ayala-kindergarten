/** Hand-drawn style mascots for the three groups. */

type ArtProps = { className?: string };

/** «Балапан» — a little chick. */
export function ChickArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="80" cy="140" rx="46" ry="7" fill="#20324B" opacity="0.08" />
      <path d="M46 100c0-28 15-48 36-48s34 20 34 46c0 24-16 40-36 40S46 124 46 100z" fill="#FFD43B" />
      <circle cx="82" cy="50" r="28" fill="#FFD43B" />
      <path d="M78 22c-2-8 4-13 8-10 2-6 10-4 9 3" fill="none" stroke="#F2B705" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 96c-10 4-16 14-12 22 10-2 18-10 20-18z" fill="#F2B705" />
      <path d="M112 96c10 4 16 14 12 22-10-2-18-10-20-18z" fill="#F2B705" />
      <circle cx="72" cy="48" r="4.5" fill="#20324B" />
      <circle cx="94" cy="48" r="4.5" fill="#20324B" />
      <circle cx="73.5" cy="46.5" r="1.4" fill="#fff" />
      <circle cx="95.5" cy="46.5" r="1.4" fill="#fff" />
      <circle cx="66" cy="58" r="5" fill="#FF9E7A" opacity="0.55" />
      <circle cx="100" cy="58" r="5" fill="#FF9E7A" opacity="0.55" />
      <path d="M77 56l6 7 6-7z" fill="#FF8A3D" />
      <path d="M70 138l-4 8M70 138l2 8M94 138l-2 8M94 138l4 8" stroke="#FF8A3D" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M58 30h-6M56 22l-5-4" stroke="#2074ED" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** «Айгөлек» — a smiling crescent moon with a flower circle. */
export function MoonArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="80" cy="146" rx="40" ry="6" fill="#20324B" opacity="0.08" />
      <defs>
        <mask id="aigolek-crescent">
          <rect width="160" height="160" fill="#fff" />
          <circle cx="100" cy="56" r="40" fill="#000" />
        </mask>
      </defs>
      <circle cx="74" cy="78" r="52" fill="#FFD43B" mask="url(#aigolek-crescent)" />
      <circle cx="74" cy="78" r="52" fill="none" stroke="#F2B705" strokeWidth="3" opacity="0.35" mask="url(#aigolek-crescent)" />
      <circle cx="46" cy="88" r="4.5" fill="#20324B" />
      <path d="M42 104c6 6 14 6 20 0" fill="none" stroke="#20324B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="36" cy="98" r="5" fill="#FF9E7A" opacity="0.5" />
      <g transform="translate(118 108)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-11" rx="7" ry="10" fill="#fff" transform={`rotate(${r})`} />
        ))}
        <circle r="7" fill="#2074ED" />
      </g>
      <path d="M118 120v22" stroke="#5DB45A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M132 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff" />
      <path d="M30 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" />
    </svg>
  );
}

/** «Қарлығаш» — a swallow in flight. */
export function SwallowArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <path d="M22 118c18-6 30-4 44 4s28 8 44 0 26-8 32-4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" opacity="0.8" />
      <path d="M82 70C60 40 34 34 14 40c22 6 38 22 48 44z" fill="#1559C4" />
      <path d="M78 74c22-30 48-38 68-34-20 8-34 24-42 46z" fill="#0F3F8F" />
      <path d="M50 92c8-20 30-28 52-22 14 4 22 14 26 22-10-4-20-4-28 2-14 10-36 12-50-2z" fill="#2074ED" />
      <path d="M58 94c12 8 30 8 42 0-4 10-14 16-24 16-8 0-14-6-18-16z" fill="#fff" />
      <path d="M52 96L30 118l26-12zM56 100l-10 30 18-24z" fill="#1559C4" />
      <circle cx="112" cy="80" r="3.5" fill="#fff" />
      <circle cx="112.6" cy="80" r="1.8" fill="#20324B" />
      <path d="M126 86l10-2-9 6z" fill="#FFD43B" />
      <path d="M104 88c4 2 8 2 12 0" stroke="#FF9E7A" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <circle cx="132" cy="30" r="12" fill="#FFD43B" />
    </svg>
  );
}
