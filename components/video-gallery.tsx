"use client";
import { useState, type SyntheticEvent } from "react";
import type { PortfolioVideo } from "@/lib/portfolio";
import metadata from "@/lib/media-metadata.json";
const durations = metadata as Record<string, { duration: number }>;
export function VideoGallery({
  videos,
  filterable = false,
}: {
  videos: readonly PortfolioVideo[];
  filterable?: boolean;
}) {
  const [filter, setFilter] = useState("All work");
  const filtered = videos.filter(
    (video) => filter === "All work" || video.type === filter,
  );
  function pauseOthers(event: SyntheticEvent) {
    const active = event.target;
    document.querySelectorAll("video").forEach((video) => {
      if (video !== active) video.pause();
    });
  }
  return (
    <div className="video-collection">
      {filterable && (
        <div className="filters" aria-label="Filter UGC videos">
          {["All work", "On-camera", "Product-focused"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
            >
              {type}
              <span>
                {type === "All work"
                  ? videos.length
                  : videos.filter((v) => v.type === type).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">
        Showing {filtered.length} videos
      </p>
      <div className="video-grid" onPlayCapture={pauseOthers}>
        {filtered.map((video) => (
          <article className="video-card" key={video.slug}>
            <div className="video-frame">
              <video
                controls
                playsInline
                preload="none"
                poster={`/media/${video.slug}.jpg`}
                aria-label={video.title}
              >
                <source src={`/media/${video.slug}.mp4`} type="video/mp4" />
                Your browser does not support embedded video.{" "}
                <a href={`/media/${video.slug}.mp4`}>Open this video</a>.
              </video>
            </div>
            <div className="video-label">
              <span>{video.label}</span>
              <span>{durations[video.slug]?.duration ?? "—"} SEC</span>
            </div>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
