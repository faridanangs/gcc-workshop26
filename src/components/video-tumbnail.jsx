"use client";

import { useEffect, useRef, useState } from "react";

export function VideoThumbnail({ src, alt, className }) {
  const [thumb, setThumb] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "metadata";
    videoRef.current = video;

    const handleLoadedData = () => {
      video.currentTime = 1; // ambil frame di detik ke-1
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumb(canvas.toDataURL("image/jpeg", 0.85));
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [src]);

  if (!thumb) {
    return <div className={`${className} bg-ink-900/10 animate-pulse`} />;
  }

  return <img src={thumb} alt={alt} className={className} />;
}