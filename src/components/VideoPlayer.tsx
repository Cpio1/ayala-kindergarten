"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  video: SiteVideo;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Muted, looping background-style video with sound and play/pause controls.
 * - Autoplays only when visible and when the user hasn't asked for reduced motion.
 * - If the browser blocks autoplay, a large play button lets the user start it.
 * - The file is not downloaded until the player is close to the viewport.
 */
export function VideoPlayer({ video, className, style }: Props) {
  const { t } = useLanguage();
  const v = t.about.video;
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ratio, setRatio] = useState(video.poster ? video.poster.width / video.poster.height : 9 / 16);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => setPlaying(false)); // autoplay blocked → manual play button stays visible
  }, []);

  // Load the file once the player approaches the viewport; play/pause with visibility.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const loader = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: "400px 0px",
    });
    const visibility = new IntersectionObserver(
      ([entry]) => {
        const el = videoRef.current;
        if (!el) return;
        if (entry.isIntersecting) {
          if (!userPaused.current && !reduceMotion) tryPlay();
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    loader.observe(node);
    visibility.observe(node);
    return () => {
      loader.disconnect();
      visibility.disconnect();
    };
  }, [reduceMotion, tryPlay]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      tryPlay();
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    // Turning sound on is a clear intent to watch.
    if (!el.muted && el.paused) {
      userPaused.current = false;
      tryPlay();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("group relative overflow-hidden bg-brand-deep shadow-lift ring-[6px] ring-white sm:ring-8", className)}
      style={{ aspectRatio: ratio, ...style }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={video.poster?.src}
        // autoPlay is the hint for browsers; actual start is driven by visibility above.
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload={near ? "auto" : "none"}
        aria-label={v.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.currentTarget;
          if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
        }}
        onClick={togglePlay}
      >
        {near && <source src={video.src} type={video.type} />}
        {v.unsupported}
      </video>

      {/* soft bottom gradient for the controls */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent"
      />

      {/* big play button while paused */}
      <AnimatePresence>
        {!playing && (
          <motion.button
            type="button"
            onClick={togglePlay}
            aria-label={v.play}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-sun transition-transform hover:scale-105"
          >
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* compact controls */}
      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? v.pause : v.play}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand shadow-soft backdrop-blur transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden="true" /> : <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? v.soundOn : v.soundOff}
          aria-pressed={!muted}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-extrabold text-brand shadow-soft backdrop-blur transition-transform hover:scale-105"
        >
          {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
          <span className="hidden sm:inline">{muted ? v.soundOn : v.soundOff}</span>
        </button>
      </div>
    </div>
  );
}
