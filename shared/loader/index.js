import {injectLoader, setLoadingText, revealPage } from "./dom.js";
import { preloadAssets } from "./preload.js";

export async function startLoader({ assets = [], text = "Loading..." } = {}) {
  injectLoader();
  setLoadingText(text);

  const MIN_TIME = 300;
  const start = performance.now();

  await Promise.all([
    preloadAssets(assets),
    document.fonts.ready
  ]);

  const elapsed = performance.now() - start;
  const remaining = Math.max(0, MIN_TIME - elapsed);

  setTimeout(() => {
    revealPage();
  }, remaining);
}
