import { lockAllLevels, unlockLevelsFromState, getLatestLevelFromStorage, moveDolphinToLevel, getAvatarImagePath, levelPositions, hasFinishedGame } from "./js/helper.js";
import { startGuide, showLastStoryLineIfAny } from "./js/guideCharacter.js";
import { startLoader } from "../shared/loader/assetLoader/index.js";
import { loadPlayerState, savePlayerState } from "../js/state/playerState.js";
import { toggleScoreOverlay } from "../scorelog/script.js";
import { renderCertificate } from "../certificate/script.js";



startLoader(
  {
    text: "Wandering around YZU...",
    assets: [
      "./image/cloud.png",
      "./image/dolphin.png",
      "./image/island.png",
      "./image/sea.png",
      "./image/waterfall/1.png",
      "./image/waterfall/2.png",
      "./image/waterfall/3.png",
      "./image/waterfall/4.png",
      "./image/waterfall/5.png",
      "./image/waterfall/6.png",
      "./image/waterfall/7.png",
      "./image/waterfall/8.png",
      "./image/waterfall/9.png",
      "./image/waterfall/10.png",
      "./image/waterfall/11.png",

    ]
  }
)





/* =========================
   STATE
========================= */
const state = loadPlayerState();


const mode = getMapMode(state);
const scorePopUpSound = document.getElementById("score-popup-sound");


if (mode !== "normal") {
  lockAllLevels();
}



switch (mode) {
  case "story": {
    startGuide({
      phase: state.story.phase,
      level: state.story.level,
      score: state.story.score ?? null,
      lineIndex: state.story.lineIndex ?? 0
    });

    break;
  }

  case "welcome": {
    startGuide({
      phase: "welcome",
      level: null,
      lineIndex: 0
    });

    state.story = {
      active: true,
      phase: "welcome",
      level: null,
      lineIndex: 0,
      lastLine: null
    };

    savePlayerState(state);
    break;
  }

  case "normal": {
    unlockLevelsFromState(state);
    showLastStoryLineIfAny();
    break;
  }
}






/*-----------------------Avatar moves--------------------------- */

const dolphin = document.getElementById("your_avatar");
dolphin.src = getAvatarImagePath();
console.log(dolphin);


const currentLevel = getLatestLevelFromStorage();


function placeDolphinAtCurrentLevel() {
  const dolphin = document.getElementById("your_avatar");
  if (!dolphin) return;

  const raw = localStorage.getItem("playerState");
  if (!raw) return;

  const i = currentLevel;

  const to = levelPositions.find(p => p.id === i);
  if (!to) return;

  // Disable animation
  dolphin.style.transition = "none";
  dolphin.style.marginLeft = to.left;
  dolphin.style.marginTop = `calc(${to.top} - 5%)`;

  // Re-enable transitions
  requestAnimationFrame(() => {
    dolphin.style.transition = "";
  });
}
   
document.addEventListener("DOMContentLoaded", placeDolphinAtCurrentLevel);

/* =========================
   UNLOCK AFTER STORY
========================= */
document.addEventListener("guide:progress", (e) => {
  const state = loadPlayerState();

  state.story.lineIndex = e.detail.lineIndex;
  state.story.lastLine = e.detail.text;

  savePlayerState(state);
});

document.addEventListener("guide:finished", (e) => {
  const state = loadPlayerState();

  if (state.story.phase === "welcome") {
    if (!state.journey.completedNodes.includes("welcome")) {
      state.journey.completedNodes.push("welcome");
    }
    state.levels.level1.unlocked = true;
  }

  // persist last line
  state.story.lastLine = e.detail.lastLine;

  // clear story
  state.story.active = false;
  state.story.phase = null;
  state.story.level = null;
  state.story.lineIndex = null;

  if (hasFinishedGame(state, 6)) {
    renderCertificate();
  }

  savePlayerState(state);
  unlockLevelsFromState(state);
  moveDolphinToLevel(currentLevel + 1);


});


/* =========================
   WATERFALL ANIMATION
========================= */
const frames = [
  "image/waterfall/1.png",
  "image/waterfall/2.png",
  "image/waterfall/3.png",
  "image/waterfall/4.png",
  "image/waterfall/5.png",
  "image/waterfall/6.png",
  "image/waterfall/7.png",
  "image/waterfall/8.png",
  "image/waterfall/9.png",
  "image/waterfall/10.png",
  "image/waterfall/11.png"
];

let current = 0;
const img = document.getElementById("waterfall");

setInterval(() => {
  current = (current + 1) % frames.length;
  img.src = frames[current];
}, 100);


function getMapMode(state) {
  if (state.story.active) return "story";
  if (!state.journey.completedNodes.includes("welcome")) return "welcome";
  return "normal";
}

function enterLevel(levelKey) {
  const state = loadPlayerState();
  const level = state.levels[levelKey];

  // hard safety guard
  if (!level || !level.unlocked || level.completed) return;

  state.journey.currentNode = levelKey;
  savePlayerState(state);

  // central routing
  window.location.href = `../${level.gameId}/index.html`;
}

function bindLevelButtons() {
  Object.keys(loadPlayerState().levels).forEach(levelKey => {
    const btn = document.getElementById(levelKey);
    if (!btn) return;

    btn.addEventListener("click", () => enterLevel(levelKey));
  });
}

bindLevelButtons();





document.getElementById("your_avatar")
  .addEventListener("click", () => {
    scorePopUpSound.play().catch(() => { });
    toggleScoreOverlay();

  });
