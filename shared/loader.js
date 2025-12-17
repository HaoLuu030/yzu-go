// Inject loader HTML automatically (so you don't duplicate HTML)
document.body.insertAdjacentHTML("afterbegin", `
  <div id="loader">
    <div class="spinner"></div>
    <p id="loadingText">Loading...</p>
  </div>
`);

export function setLoadingText(text) {
  const el = document.getElementById("loadingText");
  if (el) el.textContent = text;
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

// Load a list of assets; resolves when all are ready
export function preloadAssets(assets = []) {
  let loaded = 0;

  if (assets.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => {
      loaded++;
      if (loaded === assets.length) resolve();
    };

    assets.forEach((src) => {
      // Images
      if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(src)) {
        const img = new Image();
        img.onload = done;
        img.onerror = done; // still continue if one fails
        img.src = src;
        return;
      }

      // Audio
      if (/\.(mp3|wav|ogg)$/i.test(src)) {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("error", done, { once: true });
        audio.src = src;
        audio.load();
        return;
      }

      // Unknown file type: don't block forever
      done();
    });
  });
}
