import { lockAllLevels, unlockLevelsFromState, getLatestLevelFromStorage, moveDolphinToLevel, getAvatarImagePath } from "./js/helper.js";
import { startGuide, showLastStoryLineIfAny } from "./js/guideCharacter.js";
import { startLoader } from "../shared/loader/assetLoader/index.js";
import { loadPlayerState, savePlayerState } from "../js/state/playerState.js";



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


if (mode !== "normal") {
  lockAllLevels();
}



switch (mode) {
  case "story": {
    startGuide({
      phase: state.story.phase,
      level: state.story.level,
      score: null,
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

function restoreDolphinPosition() {
  const saved = JSON.parse(localStorage.getItem("dolphinPosition"));

  dolphin.style.transition = "none"; // prevent animation on restore

  if (saved) {

    dolphin.style.marginLeft = saved.left;
    dolphin.style.marginTop = saved.top;
  } else {

    dolphin.style.marginLeft = "63%";
    dolphin.style.marginTop = "9%";
  }

  dolphin.offsetWidth; 

  // re-enable smooth movement
  dolphin.style.transition =
    "margin-left 5s linear, margin-top 5s linear";
}

// save on exit
function saveDolphinPosition() {
  const style = getComputedStyle(dolphin);
  localStorage.setItem("dolphinPosition", JSON.stringify({
    left: style.marginLeft,
    top: style.marginTop
  }));
}

document.addEventListener("DOMContentLoaded", restoreDolphinPosition);
window.addEventListener("beforeunload", saveDolphinPosition);




/* =========================
   LOAD FLAGS (first-visit)
========================= */

/* =========================
   1) RESUME ACTIVE STORY
========================= */

/* =========================
   2) FIRST VISIT → WELCOME
========================= */


/* =========================
   3) NORMAL FLOW
========================= */

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

  savePlayerState(state);
  unlockLevelsFromState(state);

  const currentLevel = getLatestLevelFromStorage();
  console.log(currentLevel);
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

