"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion-preference";
export function AmbientVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(true);
  const [failed, setFailed] = useState(false);
  const requested = useRef(false);
  const inView = useRef(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const reduced = prefersReducedMotion();
      requested.current = !reduced;
      setEnabled(!reduced);
      if (reduced) {
        video.pause();
        setPaused(true);
      }
    };
    sync();
    preference.addEventListener("change", sync);
    const headerHeight = document.querySelector("header")?.clientHeight ?? 88;
    const observer = new IntersectionObserver(
      (entries) => {
        inView.current = entries[0].isIntersecting;
        if (!inView.current || document.hidden) video.pause();
        else if (requested.current) video.play().catch(() => {});
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) video.pause();
      else if (requested.current && inView.current)
        video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preference.removeEventListener("change", sync);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (enabled && requested.current)
      ref.current?.play().catch(() => setPaused(true));
  }, [enabled]);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (paused) {
      requested.current = true;
      setEnabled(true);
      video.play().catch(() => {});
    } else {
      requested.current = false;
      video.pause();
    }
  };
  return (
    <>
      <div
        className="opening-monogram"
        aria-hidden="true"
        data-video-failed={failed}
      >
        <img src="/media/tokyo-budget.jpg" alt="" width="720" height="1280" />
        <video
          ref={ref}
          src={enabled ? "/media/opening-loop.mp4" : undefined}
          poster="/media/tokyo-budget.jpg"
          muted
          loop
          playsInline
          preload="none"
          onError={() => {
            setFailed(true);
            setPaused(true);
          }}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          tabIndex={-1}
        />
      </div>
      {!failed && (
        <button
          className="motion-toggle"
          onClick={toggle}
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Play motion" : "Pause motion"}
        </button>
      )}
    </>
  );
}
