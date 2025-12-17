import { hidePageImmediately, injectLoader, setLoadingText, revealPage } from "./dom.js";
import { preloadAssets } from "./preload.js";

// Run ASAP
hidePageImmediately();

export async function startLoader({ assets = [], text = "Loading..." } = {}) {
  injectLoader();
  setLoadingText(text);
  await preloadAssets(assets);
  revealPage();
}
