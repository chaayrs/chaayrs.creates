"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/lib/motion-preference";
import { readyToReveal, typographyParallax } from "@/lib/motion-geometry";

const TARGETS = "[data-reveal], [data-motion-group]";

/** Progressive enhancement: content is visible unless an observer is ready. */
export function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Set<HTMLElement>();
    const queued = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();
    const observed = new Map<Element, HTMLElement>();
    const frames = new Set<number>();
    let observer: IntersectionObserver | undefined;
    let scrollFrame = 0;
    let reduced = prefersReducedMotion();
    let parallax: HTMLElement[] = [];
    let headerHeight = 88;
    const triggerFor = (target: HTMLElement) =>
      target.querySelector<HTMLElement>("[data-motion-heading]") ?? target;

    const reveal = (target: HTMLElement, instant = false) => {
      if (instant) target.dataset.motionInstant = "true";
      target.dataset.motionState = "visible";
      const trigger = triggerFor(target);
      observer?.unobserve(trigger);
      observed.delete(trigger);
      pending.delete(target);
      queued.delete(target);
    };
    const nextFrame = (callback: () => void) => {
      const id = requestAnimationFrame(() => {
        frames.delete(id);
        callback();
      });
      frames.add(id);
    };
    const scheduleReveal = (target: HTMLElement) => {
      if (queued.has(target)) return;
      queued.add(target);
      // Give the initial transform a rendered frame before starting transitions.
      nextFrame(() =>
        nextFrame(() => {
          if (target.isConnected) reveal(target, reduced);
        }),
      );
    };
    const isVisible = (target: HTMLElement) => {
      const trigger = triggerFor(target);
      return readyToReveal(
        trigger.getBoundingClientRect(),
        window.innerHeight,
        headerHeight,
        trigger.hasAttribute("data-motion-heading"),
      );
    };
    const checkPending = () => {
      for (const target of pending) {
        if (target.isConnected && isVisible(target)) scheduleReveal(target);
      }
    };
    const register = (target: HTMLElement) => {
      if (targets.has(target)) return;
      targets.add(target);
      if (reduced || !observer || target.dataset.motionState === "visible") {
        reveal(target, reduced);
        return;
      }
      // History restoration must not re-hide content already passed on the page.
      if (triggerFor(target).getBoundingClientRect().bottom <= headerHeight) {
        reveal(target, true);
        return;
      }
      target.dataset.motionState = "pending";
      pending.add(target);
      const trigger = triggerFor(target);
      observed.set(trigger, target);
      observer.observe(trigger);
      if (isVisible(target)) scheduleReveal(target);
    };
    const updateParallax = () => {
      scrollFrame = 0;
      for (const element of parallax) {
        const rect = element.getBoundingClientRect();
        const previousOffset =
          parseFloat(element.style.getPropertyValue("--parallax-y")) || 0;
        // Remove our current transform from the measurement to avoid feedback drift.
        const offset =
          reduced || window.innerWidth <= 760
            ? 0
            : typographyParallax(
                rect.top - previousOffset,
                rect.height,
                window.innerHeight,
                headerHeight,
              );
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      }
      if (!reduced) checkPending();
    };
    const onScroll = () => {
      if (!scrollFrame && !reduced)
        scrollFrame = requestAnimationFrame(updateParallax);
    };
    const configure = () => {
      reduced = prefersReducedMotion();
      headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 88;
      pending.clear();
      observed.clear();
      document.documentElement.dataset.motionPreference = reduced
        ? "reduced"
        : "full";
      observer?.disconnect();
      observer = undefined;
      if (!reduced && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const target = observed.get(entry.target);
              if (target && entry.isIntersecting && isVisible(target))
                scheduleReveal(target);
            }
          },
          {
            threshold: [0, 0.1, 0.18, 0.25, 0.5, 0.75, 0.9, 1],
            rootMargin: `-${headerHeight}px 0px -24px 0px`,
          },
        );
      }
      const current = [...document.querySelectorAll<HTMLElement>(TARGETS)];
      targets.clear();
      current.forEach(register);
      parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
      updateParallax();
    };
    const onFocus = (event: FocusEvent) => {
      const element = event.target as HTMLElement;
      const target = element.closest<HTMLElement>(TARGETS);
      if (target && target.dataset.motionState === "pending")
        reveal(target, true);
    };
    configure();
    // Handles streamed content and client-side route changes without a refresh.
    const mutations = new MutationObserver((records) => {
      let contentChanged = false;
      for (const record of records)
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          contentChanged = true;
          if (node.matches(TARGETS)) register(node);
          node.querySelectorAll<HTMLElement>(TARGETS).forEach(register);
        }
      if (contentChanged) {
        parallax = [
          ...document.querySelectorAll<HTMLElement>("[data-parallax]"),
        ];
        onScroll();
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", configure);
    window.addEventListener("pageshow", configure);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(scrollFrame);
      frames.forEach(cancelAnimationFrame);
      targets.forEach((target) => {
        delete target.dataset.motionState;
        delete target.dataset.motionInstant;
      });
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", configure);
      window.removeEventListener("pageshow", configure);
    };
  }, [pathname]);
  return null;
}
