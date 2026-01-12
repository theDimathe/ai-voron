const ANIMATION_DURATION_MS = 6000;

function i() {
  var p = new URLSearchParams(location.search),
    r = p.get("r"),
    d = p.get("d");

  if (!r) return;

  if (typeof uc === "function") {
    uc("coo_load_c324", "1", { secure: !0, "max-age": 3600 });
  }
  if (typeof fbq === "function") {
    fbq("trackCustom", "ClickOffer");
  }

  try {
    location.href = new URL(r).href;
    return;
  } catch (e) {}

  if (r.charAt(0) === "/") {
    location.href = "https://" + (d || "clickzitfast.com") + r;
  }
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
    i();
  }, ANIMATION_DURATION_MS);
});
