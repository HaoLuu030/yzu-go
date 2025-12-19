import { injectLoader } from "../base/dom.js";

export async function startSaveLoader(
  task,
  { text = "Saving..." } = {}
) {
  const root = document.getElementById("loader-root");

  // 1. Show loader
  injectLoader(text);
  if (root) root.classList.add("save-loader");

  try {
    await task();
  } finally {
    // 2. Hide loader (do NOT remove)
    if (root) {
      root.classList.remove("save-loader");
      root.style.display = "none";
    }
  }
}
