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
  const playButton = document.querySelector(".play-button");
  let redirectTimeoutId;

  if (
    !loader ||
    !prompt ||
    !video ||
    !playButton
  ) {
    return;
  }

  function startVideo() {
    prompt.classList.remove("visible");
    loader.classList.add("hidden");
    video.classList.add("active");
    video.currentTime = 0;
    video.play().catch(() => {});
    if (redirectTimeoutId) {
      clearTimeout(redirectTimeoutId);
    }
    redirectTimeoutId = window.setTimeout(() => {
      redirectToOffer();
    }, 6000);
  }

  prompt.addEventListener("click", startVideo);
  playButton.addEventListener("click", startVideo);

  video.addEventListener("ended", () => {
    redirectToOffer();
  });

  startVideo();
}

window.addEventListener("load", setupFlow);
