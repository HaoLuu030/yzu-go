import { loadPlayerState } from "../js/state/playerState.js";


function getTotalScore(state) {
    return Object.values(state.levels)
        .reduce((sum, level) => sum + (level.score ?? 0), 0);
}

function getCertificateLevel(totalScore) {
    if (totalScore >= 3000) return "A";
    if (totalScore >= 1500) return "B";
    return "C";
}

function animateNumber(el, from, to, duration = 3000) {
    if (!el) return;

    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(from + (to - from) * progress);
        el.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


export function renderCertificate() {
    const state = loadPlayerState();
    if (!state) return;
    const score = document.getElementById("score");
    if (score) {
        const totalScore = getTotalScore(state);
        animateNumber(score, 0, totalScore, 3000);

    }

    const nameEl = document.querySelector(".content .name");
    if (nameEl) {
        nameEl.textContent = state.profile.name || "Anonymous Player";
    }

    const totalScore = getTotalScore(state);
    document.getElementById("gameover-overlay").style.display = "flex";

    const levelText = getCertificateLevel(totalScore);

    const levelEl = document.getElementById("levelCertificate");
    if (levelEl) {
        levelEl.textContent = levelText;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const receiveBtn = document.querySelector(".receive");

    if (!receiveBtn) {
        console.warn("Receive button not found");
        return;
    }

    receiveBtn.addEventListener("click", () => {
        setTimeout(() => {
            localStorage.clear();

            window.location.href = "../index.html";
        }, 300);
    });
});
