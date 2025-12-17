// Hide page ASAP (must be imported early)
export function hidePageImmediately() {
  // document.documentElement.classList.add("loading");
}

// Inject loader HTML
export function injectLoader() {
  const root = document.getElementById("loader-root");

  root.insertAdjacentHTML("afterbegin", `
    <div id="loader">
      <div class="spinner"></div>
      <p id="loadingText">Loading...</p>
    </div>
  `);
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
