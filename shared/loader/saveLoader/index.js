import { injectLoader, setLoadingText } from "../base/dom.js";

export async function startSaveLoader(
  task,
  { text = "Saving..." } = {}
) {
  // 1. Show loader immediately
  injectLoader(text);
  setLoadingText(text);

  try {
    // 2. Wait for the async save task
    await task();
  } finally {
    // 3. Remove loader
    const root = document.getElementById("loader-root");
    if (root) root.remove();
  }
}
