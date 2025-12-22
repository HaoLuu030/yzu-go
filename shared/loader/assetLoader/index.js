import { injectLoader } from "../base/dom.js";
import { preloadAssets } from "./preload.js";

export async function startLoader({ assets = [], text = "Loading..." }) {
  const root = document.getElementById("loader-root");

  // 1. Show loader immediately with correct text
  injectLoader(text);
  if (root) root.style.display = "flex";

  try {
    // 2. Wait for assets + fonts
    await Promise.all([
      preloadAssets(assets),
      document.fonts.ready
    ]);
  } finally {
    // 3. Reveal app + hide loader
    document.documentElement.classList.remove("loading");

    if (root) root.style.display = "none";
  }
}
