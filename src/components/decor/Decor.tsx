/** Decorative SVG shapes. All are purely visual (aria-hidden). */

type ShapeProps = { className?: string; style?: React.CSSProperties };

export function Sun({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="57"
            y="4"
            width="6"
            height="18"
            rx="3"
            fill="#FFD43B"
            transform={`rotate(${i * 30} 60 60)`}
            opacity={i % 2 ? 0.7 : 1}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="30" fill="#FFD43B" />
      <circle cx="52" cy="51" r="13" fill="#FFF1B8" opacity="0.55" />
    </svg>
  );
}

export function Cloud({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 160 90" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M36 82c-17 0-30-11-30-26 0-14 11-25 26-26 4-16 18-27 35-27 15 0 28 9 33 22 4-2 8-3 13-3 17 0 30 12 30 28v2c7 3 11 9 11 15 0 9-8 15-18 15H36z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M20 2c1.6 9.4 8.6 16.4 18 18-9.4 1.6-16.4 8.6-18 18-1.6-9.4-8.6-16.4-18-18 9.4-1.6 16.4-8.6 18-18z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 24" className={className} style={style} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M3 14c10-10 20-10 30 0s20 10 30 0 20-10 30 0 14 6 24 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Swoosh({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 220 24" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M4 17C60 5 150 3 216 12c-62-2-130 0-212 5z" fill="currentColor" />
    </svg>
  );
}

/** Soft wavy edge between sections. `flip` turns it upside down. */
export function WaveEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 48c120-26 240-38 360-30s240 40 360 40 240-34 360-42 240 6 360 22v42H0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Dots({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={10 + (i % 4) * 20} cy={10 + Math.floor(i / 4) * 20} r="3.2" fill="currentColor" />
      ))}
    </svg>
  );
}
