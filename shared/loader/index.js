import { hidePageImmediately, injectLoader, setLoadingText, revealPage } from "./dom.js";
import { preloadAssets } from "./preload.js";

export async function startLoader({ assets = [], text = "Loading..." } = {}) {
  injectLoader();
  setLoadingText(text);
  await preloadAssets(assets);
  revealPage();
}
