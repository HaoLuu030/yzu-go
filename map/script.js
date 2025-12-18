import { lockAllLevels, unlockLevelsByProgress, getLatestLevelFromStorage, moveDolphinToLevel } from "./js/helper.js";
import { startGuide, showLastStoryLineIfAny } from "./js/guideCharacter.js";
import { startLoader } from "../shared/loader/index.js";
import { setPlayerProgress } from "../js/utils/progress.js";


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
let storyStarted = false;

/* =========================
   LOAD FLAGS (first-visit)
========================= */
const flags = JSON.parse(localStorage.getItem("storyFlags")) || {
  mapVisited: false,
  welcomeDone: false
};





/* =========================
   1) RESUME ACTIVE STORY
========================= */
const saved = JSON.parse(localStorage.getItem("storyState"));

if (saved && !saved.completed) {
  lockAllLevels();
  startGuide(saved);
  storyStarted = true;
}

/* =========================
   2) FIRST VISIT → WELCOME
========================= */
if (!storyStarted && !flags.mapVisited) {
  lockAllLevels();
  startGuide({
    phase: "welcome",
    level: null,
    score: null,
    lineIndex: 0
  });

  flags.mapVisited = true;
  localStorage.setItem("storyFlags", JSON.stringify(flags));


  storyStarted = true;
}

/* =========================
   3) NORMAL FLOW
========================= */
if (!storyStarted) {
  unlockLevelsByProgress();
  showLastStoryLineIfAny();

}

/* =========================
   DOLPHIN LEVEL
========================= */

const dolphin = document.getElementById("dolphin-cute");

function restoreDolphinPosition() {
  const saved = JSON.parse(localStorage.getItem("dolphinPosition"));

  dolphin.style.transition = "none"; // prevent animation on restore

  if (saved) {
    // ✅ restore saved position
    dolphin.style.marginLeft = saved.left;
    dolphin.style.marginTop = saved.top;
  } else {
    // ✅ fallback to level 1 position
    dolphin.style.marginLeft = "63%";
    dolphin.style.marginTop = "9%";
  }

  dolphin.offsetWidth; // force layout

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
const currentLevel = getLatestLevelFromStorage();



document.addEventListener("guide:finished", () => {
  // mark welcome as done ONLY after completion
  const active = JSON.parse(localStorage.getItem("storyState"));
  if (active?.phase === "welcome") {
    flags.welcomeDone = true;
    localStorage.setItem("storyFlags", JSON.stringify(flags));


  }



  moveDolphinToLevel(currentLevel + 1);
  unlockLevelsByProgress();


});

  if (currentLevel == 7) {
    const overlay = document.getElementById("gameover-overlay");
    overlay.style.display = "flex";
  }


if (!localStorage.getItem("progress")) {
  localStorage.removeItem("dolphinPosition");
}





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






