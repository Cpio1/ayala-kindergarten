"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article";
};

// One observer for every Reveal on the page instead of one per element.
let observer: IntersectionObserver | null = null;

function observe(node: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  observer.observe(node);
  return () => observer?.unobserve(node);
}

/**
 * Fades its content in when it scrolls into view. Pure CSS transition (`.reveal` in globals.css);
 * the observer only flips a data attribute, so revealing never re-renders React.
 */
export function Reveal({ children, className, delay = 0, y, as: Component = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    return node ? observe(node) : undefined;
  }, []);

  const style = {
    ...(delay && { "--delay": `${delay}s` }),
    ...(y !== undefined && { "--rise": `${y}px` }),
  } as React.CSSProperties;

  return (
    <Component ref={ref as React.Ref<never>} className={className ? `reveal ${className}` : "reveal"} style={style}>
      {children}
    </Component>
  );
}
