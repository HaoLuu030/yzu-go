import { getPerformanceImage, getOverlayText } from "./dolphinEmotion.js";

export function showOverlay({
    level,
    score,
    text // optional
}) {
    console.log(score);
    const overlay = document.getElementById("gameover-overlay");
    const textEl = document.getElementById("gameover-overlay-text");
    const dolphinEl = document.getElementById("overlay-dolphin");

    if (!overlay || !textEl || !dolphinEl) return;

    // 🎯 Performance-aware text
    textEl.textContent = getOverlayText(level, score, text);

    // 🐬 Performance-aware image
    dolphinEl.src = `/image/UI/${getPerformanceImage(level, score)}`;

    overlay.style.display = "flex";
}
