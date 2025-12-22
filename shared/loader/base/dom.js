// dom.js
// Loader DOM is owned by HTML. JS only controls state.

export function injectLoader(text = "Loading...") {
  const root = document.getElementById("loader-root");
  const textEl = document.getElementById("loader-text");

  if (!root) return;

  // Set text
  if (textEl) textEl.textContent = text;

  // Show loader
  root.style.display = "flex";
}

export function hideLoader() {
  const root = document.getElementById("loader-root");
  if (root) root.style.display = "none";
}

export function revealPage() {
  document.documentElement.classList.remove("loading");
  hideLoader();
}
