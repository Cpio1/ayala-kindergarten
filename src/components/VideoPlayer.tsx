"use client";

import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  video: SiteVideo;
  className?: string;
  style?: React.CSSProperties;
  /** First-screen player: load the poster eagerly. */
  priority?: boolean;
};

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mql = window.matchMedia(REDUCED);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/** Only one player on the page plays at a time. */
let activeVideo: HTMLVideoElement | null = null;

/** Resolves once the page has finished loading, so the video never competes with first-screen assets. */
function afterPageLoad(cb: () => void) {
  if (document.readyState === "complete") {
    cb();
    return () => {};
  }
  window.addEventListener("load", cb, { once: true });
  return () => window.removeEventListener("load", cb);
}

/**
 * Muted, looping background-style video with sound and play/pause controls.
 * - Nothing but the poster is downloaded until the player is near the viewport
 *   and the page itself has finished loading (`preload="none"` → `"metadata"`).
 * - Autoplays (muted, inline) only while at least a third of it is visible and the
 *   user hasn't asked for reduced motion; pauses when scrolled away or the tab is hidden.
 * - If the browser blocks autoplay, a large play button lets the user start it.
 */
export function VideoPlayer({ video, className, style, priority }: Props) {
  const { t } = useLanguage();
  const v = t.about.video;
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const inView = useRef(false);
  const playRequested = useRef(false);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ratio, setRatio] = useState(video.poster ? video.poster.width / video.poster.height : 9 / 16);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.getAttribute("src")) return;
    el.play().catch(() => setPlaying(false)); // autoplay blocked → manual play button stays visible
  }, []);

  const autoPlayIfVisible = useCallback(() => {
    if (inView.current && !userPaused.current && !reduceMotion) tryPlay();
  }, [reduceMotion, tryPlay]);

  // Attach the source once the player approaches the viewport (after page load).
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || near) return;
    let cancelLoad = () => {};
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loader.disconnect();
        cancelLoad = afterPageLoad(() => setNear(true));
      },
      { rootMargin: "300px 0px" },
    );
    loader.observe(node);
    return () => {
      loader.disconnect();
      cancelLoad();
    };
  }, [near]);

  // Play/pause with visibility.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        const el = videoRef.current;
        if (entry.isIntersecting) autoPlayIfVisible();
        else if (el && !el.paused) el.pause();
      },
      { threshold: 0.35 },
    );
    visibility.observe(node);
    const onVisibility = () => {
      const el = videoRef.current;
      if (document.hidden) el?.pause();
      else autoPlayIfVisible();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoPlayIfVisible]);

  // The source has just been attached — honour an early tap on play, or autoplay if on screen.
  useEffect(() => {
    if (!near) return;
    if (playRequested.current) {
      playRequested.current = false;
      tryPlay();
    } else {
      autoPlayIfVisible();
    }
  }, [near, tryPlay, autoPlayIfVisible]);

  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (activeVideo === el) activeVideo = null;
    };
  }, []);

  /** Manual play: attaches the source right away if it isn't there yet. */
  const requestPlay = () => {
    userPaused.current = false;
    if (near) {
      tryPlay();
    } else {
      playRequested.current = true;
      setNear(true);
    }
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      requestPlay();
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
    if (!el.muted && el.paused) requestPlay();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("group relative overflow-hidden bg-brand-deep shadow-lift ring-[6px] ring-white sm:ring-8", className)}
      style={{ aspectRatio: ratio, ...style }}
    >
      {/* Poster through next/image (resized, AVIF/WebP, lazy below the fold) instead of the
          `poster` attribute, which browsers fetch at full size as soon as the page loads. */}
      {video.poster && (
        <Image
          src={video.poster.src}
          alt=""
          fill
          sizes="18rem"
          priority={priority}
          className="object-cover"
        />
      )}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={near ? video.src : undefined}
        muted
        loop
        playsInline
        preload={near ? "metadata" : "none"}
        aria-label={v.label}
        onPlay={(e) => {
          const el = e.currentTarget;
          if (activeVideo && activeVideo !== el) activeVideo.pause();
          activeVideo = el;
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.currentTarget;
          if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
        }}
        onClick={togglePlay}
      >
        {v.unsupported}
      </video>

      {/* soft bottom gradient for the controls */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent"
      />

      {/* big play button while paused */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={v.play}
        aria-hidden={playing}
        tabIndex={playing ? -1 : undefined}
        className={cn(
          "absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-sun transition-[opacity,scale] duration-250 hover:scale-105",
          playing ? "pointer-events-none scale-85 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
      </button>

      {/* compact controls */}
      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? v.pause : v.play}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand shadow-soft transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden="true" /> : <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? v.soundOn : v.soundOff}
          aria-pressed={!muted}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-extrabold text-brand shadow-soft transition-transform hover:scale-105"
        >
          {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
          <span className="hidden sm:inline">{muted ? v.soundOn : v.soundOff}</span>
        </button>
      </div>
    </div>
  );
}
