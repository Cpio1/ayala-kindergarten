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

export function RoboticsIcon({ className }: P) {
  return (
    <Svg className={className}>
      <path d="M32 6v7" stroke={I} strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="3.5" fill={Y} />
      <rect x="14" y="13" width="36" height="25" rx="9" fill={B} />
      <rect x="9" y="21" width="5" height="10" rx="2.5" fill={I} />
      <rect x="50" y="21" width="5" height="10" rx="2.5" fill={I} />
      <rect x="19" y="18" width="26" height="15" rx="6" fill="#fff" />
      <circle cx="26" cy="25.5" r="3.2" fill={B} />
      <circle cx="38" cy="25.5" r="3.2" fill={B} />
      <path d="M29 30.5c2 1.4 4 1.4 6 0" stroke={B} strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="41" width="28" height="17" rx="6" fill={Y} />
      <circle cx="26" cy="49.5" r="3" fill={B} />
      <rect x="32" y="46" width="9" height="3" rx="1.5" fill={I} />
      <rect x="32" y="51" width="6" height="3" rx="1.5" fill={I} />
      <path d="M18 46h-5a3 3 0 0 0-3 3v4M46 46h5a3 3 0 0 1 3 3v4" stroke={B} strokeWidth="4" strokeLinecap="round" />
      <path d="M54 6l1.6 3.2 3.4 1.6-3.4 1.6L54 15.6l-1.6-3.2L49 10.8l3.4-1.6z" fill={Y} />
    </Svg>
  );
}

export function ChessIcon({ className }: P) {
  return (
    <Svg className={className}>
      {/* small board in the back */}
      <clipPath id="chess-board-clip">
        <rect x="30" y="30" width="28" height="28" rx="6" />
      </clipPath>
      <g clipPath="url(#chess-board-clip)">
        <rect x="30" y="30" width="28" height="28" fill={Y} />
        <path d="M37 30h7v7h-7zM51 30h7v7h-7zM30 37h7v7h-7zM44 37h7v7h-7zM37 44h7v7h-7zM51 44h7v7h-7zM30 51h7v7h-7zM44 51h7v7h-7z" fill="#fff" opacity="0.8" />
      </g>
      {/* knight */}
      <path
        d="M14 54h22l-2-6H16zM17 48h15c0-8-2-13-4-17 3-1 5-4 4-8l-7-6c-2-2-5-2-7 0l-1 3-3 2c-2 2-2 4 0 6l4 1c2 0 3-1 4-2 0 7-5 11-5 21z"
        fill={B}
      />
      <circle cx="20.5" cy="22" r="1.8" fill="#fff" />
      <rect x="12" y="53" width="26" height="5" rx="2.5" fill={I} />
      <path d="M50 8l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={B} />
    </Svg>
  );
}
