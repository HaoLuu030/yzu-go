export function preloadAssets(assets = []) {
  if (assets.length === 0) return Promise.resolve();

  let loaded = 0;

  return new Promise((resolve) => {
    const done = () => {
      loaded++;
      if (loaded === assets.length) resolve();
    };

    assets.forEach((src) => {
      const url = new URL(src, document.baseURI).href;

      // Images
      if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(src)) {
        const img = new Image();
        img.onload = done;
        img.onerror = () => {
          console.warn("Failed to load image:", url);
          done();
        };
        img.src = url;
        return;
      }

      // Audio
      if (/\.(mp3|wav|ogg)$/i.test(src)) {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("error", () => {
          console.warn("Failed to load audio:", url);
          done();
        }, { once: true });
        audio.src = url;
        audio.load();
        return;
      }

      done();
    });
  });
}
