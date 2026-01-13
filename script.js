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

  function scheduleRedirect() {
    if (redirectTimeoutId) {
      clearTimeout(redirectTimeoutId);
    }
    redirectTimeoutId = window.setTimeout(() => {
      redirectToOffer();
    }, 6000);
  }

  function startVideo() {
    prompt.classList.remove("visible");
    loader.classList.add("hidden");
    video.classList.add("active");
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(scheduleRedirect).catch(() => {
        prompt.classList.add("visible");
      });
    } else {
      scheduleRedirect();
    }
  }

  prompt.addEventListener("click", startVideo);
  playButton.addEventListener("click", startVideo);

  video.addEventListener("play", scheduleRedirect);
  video.addEventListener("ended", () => {
    redirectToOffer();
  });

  startVideo();
}

window.addEventListener("DOMContentLoaded", setupFlow);
