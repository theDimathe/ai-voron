const ANIMATION_DURATION_MS = 6700;

function redirectToOffer() {
  const params = new URLSearchParams(window.location.search);
  const r = params.get("r");
  const d = params.get("d") || "clickzitfast.com";

  if (!r) return;

  const path = r.startsWith("/") ? r : `/${r}`;
  const targetUrl = `https://${d}${path}`;

  window.location.href = targetUrl;
}

function playMobileAudio() {
  const audioFiles = [
    "source/audio-1.mp3",
    "source/audio-2.mp3",
    "source/audio-3.mp3",
  ];

  audioFiles.forEach((file) => {
    const audio = new Audio(file);
    audio.play().catch(() => {});
  });
}

function isMobileDevice() {
  return window.matchMedia("(max-width: 768px)").matches;
}

window.addEventListener("load", () => {
  if (isMobileDevice()) {
    playMobileAudio();
  }

  window.setTimeout(() => {
    redirectToOffer();
  }, ANIMATION_DURATION_MS);
});
