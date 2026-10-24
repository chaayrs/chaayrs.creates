"use client";

import { useEffect, useState } from "react";
import { editorialTimes } from "@/lib/editorial-clock";

type Clock = ReturnType<typeof editorialTimes> & { instant: string };

function visitorTimeZone() {
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Local browser QA only; production always uses the browser's own timezone.
  if (process.env.NODE_ENV === "development") {
    const simulated = new URLSearchParams(window.location.search).get(
      "clockZone",
    );
    if (simulated) {
      try {
        return new Intl.DateTimeFormat("en-US", {
          timeZone: simulated,
        }).resolvedOptions().timeZone;
      } catch {
        // Ignore invalid test zones and retain automatic browser detection.
      }
    }
  }
  return detected;
}

export function EditorialClock() {
  const [clock, setClock] = useState<Clock | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const now = new Date();
      setClock({
        ...editorialTimes(now, visitorTimeZone()),
        instant: now.toISOString(),
      });
      // Stay aligned to real minute boundaries, rather than time since mounting.
      timer = setTimeout(refresh, 60_000 - (Date.now() % 60_000));
    };
    const onVisibility = () => {
      if (!document.hidden) refresh();
    };
    refresh();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className="opening-location editorial-clock"
      role="group"
      aria-label="Manila and visitor local times"
      aria-live="off"
    >
      <div className="clock-location-row">
        <span>MNL, PH</span>
        <span className="clock-live">
          <i aria-hidden="true" /> LIVE
        </span>
      </div>
      <time
        className="clock-primary"
        dateTime={clock?.instant}
        aria-label={
          clock ? `Manila time: ${clock.manila.text}` : "Manila time loading"
        }
      >
        <span className="clock-digits">{clock?.manila.digits ?? "--:--"}</span>{" "}
        <span className="clock-period">{clock?.manila.period ?? "--"}</span>
      </time>
      <span className="clock-timezone">PHILIPPINE STANDARD TIME</span>
      <div className="clock-secondary">
        <span className="clock-global">WORKING GLOBALLY</span>
        <span className="clock-visitor">
          YOUR TIME:{" "}
          <time dateTime={clock?.instant}>
            {clock?.visitor.text ?? "--:-- --"}
          </time>
        </span>
      </div>
    </div>
  );
}
