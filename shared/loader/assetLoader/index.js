import { injectLoader, setLoadingText } from "../base/dom.js";
import { preloadAssets } from "./preload.js";

export async function startLoader({ assets = [], text = "Loading..." }) {
  // 1. Create loader DOM immediately
  injectLoader();
  setLoadingText(text);

  try {
    // 2. Wait for assets + fonts
    await Promise.all([
      preloadAssets(assets),
      document.fonts.ready
    ]);
  } finally {
    // 3. CLEANUP (this is the missing part)
    document.documentElement.classList.remove("loading");

    const root = document.getElementById("loader-root");
    if (root) root.remove();
  }
}
