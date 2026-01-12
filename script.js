const LOADER_DURATION_MS = 1300;

function redirectToOffer() {
  const params = new URLSearchParams(window.location.search);
  const r = params.get("r");
  const d = params.get("d") || "clickzitfast.com";

  if (!r) return;

  const path = r.startsWith("/") ? r : `/${r}`;
  window.location.href = `https://${d}${path}`;
}

function setupFlow() {
  const loader = document.querySelector(".loader");
  const prompt = document.querySelector(".prompt");
  const video = document.querySelector(".media");
  const progressBar = document.querySelector(".progress-bar");
  const progressValue = document.querySelector(".progress-value");
  const playButton = document.querySelector(".play-button");

  if (
    !loader ||
    !prompt ||
    !video ||
    !progressBar ||
    !progressValue ||
    !playButton
  ) {
    return;
  }

  const circumference = 2 * Math.PI * 56;
  progressBar.style.strokeDasharray = `${circumference}`;
  progressBar.style.strokeDashoffset = `${circumference}`;

  const startTime = performance.now();

  function updateProgress(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / LOADER_DURATION_MS, 1);
    const percentage = Math.round(progress * 100);
    const offset = circumference * (1 - progress);

    progressBar.style.strokeDashoffset = `${offset}`;
    progressValue.textContent = `${percentage}%`;

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      loader.classList.add("loaded");
      prompt.classList.add("visible");
    }
  }

  requestAnimationFrame(updateProgress);

  function startVideo() {
    prompt.classList.remove("visible");
    loader.classList.add("hidden");
    video.classList.add("active");
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  prompt.addEventListener("click", startVideo);
  playButton.addEventListener("click", startVideo);

  video.addEventListener("ended", () => {
    redirectToOffer();
  });
}

window.addEventListener("load", setupFlow);
