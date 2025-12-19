// Hide page ASAP (must be imported early)

// Inject loader HTML
export function injectLoader(defaultText = "Loading...") {
  let root = document.getElementById("loader-root");

  // Create if missing
  if (!root) {
    root = document.createElement("div");
    root.id = "loader-root";

    root.innerHTML = `
      <div id="loader">
        <div class="spinner"></div>
        <div id="loader-text"></div>
      </div>
    `;

    document.body.appendChild(root);
  }

  // ALWAYS reset text
  const textEl = root.querySelector("#loader-text");
  if (textEl) textEl.textContent = defaultText;
}


// Update text
export function setLoadingText(text) {
  const el = document.getElementById("loadingText");
  if (el) el.textContent = text;
}

// Reveal page + remove loader
export function revealPage() {
  document.documentElement.classList.remove("loading");
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}
