/** Two-tone themed illustrations for the classes. 64×64 grid, blue + yellow. */

type P = { className?: string };
const B = "#2074ED";
const Y = "#FFD43B";
const I = "#20324B";

function Svg({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" fill="none">
      {children}
    </svg>
  );
}

export function EnglishIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M8 14a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H24l-9 7v-7h-1a6 6 0 0 1-6-6z" fill={B} />
      <text x="28" y="27" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#fff">ABC</text>
      <path d="M30 40h20a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6h-1v5l-7-5H30a6 6 0 0 1-6-6v-4a6 6 0 0 1 6-6z" fill={Y} />
      <circle cx="34" cy="48" r="2" fill={I} />
      <circle cx="40" cy="48" r="2" fill={I} />
      <circle cx="46" cy="48" r="2" fill={I} />
    </Svg>
  );
}

export function SpeechIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M14 30c0-10 7-18 17-18s16 7 16 15c0 5-2 8-4 10v9c0 3-2 5-5 5h-4v5H20V44c-4-3-6-8-6-14z" fill={B} />
      <circle cx="35" cy="26" r="2.6" fill="#fff" />
      <path d="M43 34h4" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M51 24c3 3 3 9 0 12M56 20c5 5 5 15 0 20" stroke={Y} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M8 16l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={Y} />
    </Svg>
  );
}

export function MusicIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M24 46V14l28-6v32" stroke={B} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 22l28-6" stroke={B} strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="17" cy="47" rx="8" ry="6.5" fill={B} />
      <ellipse cx="45" cy="41" rx="8" ry="6.5" fill={Y} />
      <path d="M8 22l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={Y} />
      <circle cx="56" cy="54" r="3" fill={Y} />
    </Svg>
  );
}

export function DanceIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M10 42c10-22 34-28 46-14-8-6-22-4-30 6s-6 22 6 24c-12 4-26-2-22-16z" fill={Y} />
      <circle cx="34" cy="13" r="5.5" fill={B} />
      <path d="M34 20v14l-8 12M34 34l9 10M34 24l-11-6M34 24l12-8" stroke={B} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 32h12l4 8H24z" fill={B} />
      <path d="M52 8l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={B} />
    </Svg>
  );
}

export function TaekwondoIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M6 28c8-3 18-4 26-4s18 1 26 4v8c-8-3-18-4-26-4S14 33 6 36z" fill={I} />
      <rect x="24" y="22" width="16" height="16" rx="5" fill={B} />
      <path d="M27 36l-9 20 7-1 3 5 6-22zM37 36l9 20-7-1-3 5-6-22z" fill={B} />
      <rect x="28" y="26" width="8" height="8" rx="2.5" fill={Y} />
      <path d="M50 8l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={Y} />
    </Svg>
  );
}

export function GymnasticsIcon({ className }: P) {
  return (
    <Svg className={className}>
      <circle cx="26" cy="34" r="19" stroke={B} strokeWidth="5" />
      <path d="M40 18c8-8 18-6 18 2s-14 6-12 14 12 6 14 14" stroke={Y} strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="52" r="8" fill={Y} />
      <path d="M45 49c3-1 6 0 8 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={B} />
    </Svg>
  );
}
