import { getPerformanceImage, getOverlayText, getPerformanceSound } from "./dolphinEmotion.js";


// persist audio between overlay calls
let overlayAudio = null;

export function showOverlay({
    level,
    score,
    text // optional
}) {
    const overlay = document.getElementById("gameover-overlay");
    const textEl = document.getElementById("gameover-overlay-text");
    const dolphinEl = document.getElementById("overlay-dolphin");

    if (!overlay || !textEl || !dolphinEl) return;

    // Performance-aware text
    textEl.textContent = getOverlayText(level, score, text);

    // Performance-aware image
    dolphinEl.src = `/image/UI/${getPerformanceImage(level, score)}`;

    const soundFile = getPerformanceSound(level, score);

    if (soundFile) {
        // Stop previous sound if any
        if (overlayAudio) {
            overlayAudio.pause();
            overlayAudio.currentTime = 0;
        }

        overlayAudio = new Audio(`/sfx/${soundFile}`);
        overlayAudio.volume = 0.8;
        overlayAudio.play().catch(() => {
            // silent fail (autoplay policies, etc.)
        });
    }


    overlay.style.display = "flex";
}
