export function preloadAssets(assets = []) {
  if (assets.length === 0) return Promise.resolve();

  let loaded = 0;

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
        img.onerror = () => {
          console.warn("Failed to load image:", src);
          done();
        };
        img.src = src;
        return;
      }

      // Audio
      if (/\.(mp3|wav|ogg)$/i.test(src)) {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", done, { once: true });
        audio.addEventListener("error", () => {
          console.warn("Failed to load audio:", src);
          done();
        }, { once: true });
        audio.src = src;
        audio.load();
        return;
      }

      // Unknown → don’t block
      done();
    });
  });
}
