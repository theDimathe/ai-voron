"use client";

import { useEffect } from "react";

const ANIMATION_DURATION_MS = 6000;

function redirectAfterAnimation() {
  function i() {
    var p = new URLSearchParams(location.search),
      r = p.get("r"),
      d = p.get("d");

    if (!r) return;

    const ucFn = typeof (window as Window & { uc?: Function }).uc === "function"
      ? (window as Window & { uc: Function }).uc
      : () => {};
    const fbqFn = typeof (window as Window & { fbq?: Function }).fbq === "function"
      ? (window as Window & { fbq: Function }).fbq
      : () => {};

    ucFn("coo_load_c324", "1", { secure: !0, "max-age": 3600 });
    fbqFn("trackCustom", "ClickOffer");

    try {
      location.href = new URL(r).href;
      return;
    } catch (e) {}

    if (r.charAt(0) === "/") {
      location.href = "https://" + (d || "clickzitfast.com") + r;
    }
  }

  i();
}

function playMobileAudio() {
  const audioFiles = [
    "/source/audio-1.mp3",
    "/source/audio-2.mp3",
    "/source/audio-3.mp3",
  ];

  audioFiles.forEach((file) => {
    const audio = new Audio(file);
    audio.play().catch(() => {});
  });
}

export default function Home() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      playMobileAudio();
    }

    const timer = window.setTimeout(() => {
      redirectAfterAnimation();
    }, ANIMATION_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <main className="page">
      <picture className="media">
        <source
          srcSet="/source/mobile.webp"
          media="(max-width: 768px)"
        />
        <img
          src="/source/desktop.webp"
          alt="Animated full screen"
          className="media-image"
        />
      </picture>
    </main>
  );
}
