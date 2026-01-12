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

  if (!loader || !prompt || !video) return;

  window.setTimeout(() => {
    loader.classList.add("hidden");
    prompt.classList.add("visible");
  }, LOADER_DURATION_MS);

  prompt.addEventListener("click", () => {
    prompt.classList.remove("visible");
    video.classList.add("active");
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  video.addEventListener("ended", () => {
    redirectToOffer();
  });
}

window.addEventListener("load", setupFlow);
