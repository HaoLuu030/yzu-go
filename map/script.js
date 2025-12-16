import { lockAllLevels, unlockLevelsByProgress } from "./js/helper.js";
import { startGuide, showLastStoryLineIfAny} from "./js/guideCharacter.js";

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
   UNLOCK AFTER STORY
========================= */
document.addEventListener("guide:finished", () => {
  // mark welcome as done ONLY after completion
  const active = JSON.parse(localStorage.getItem("storyState"));
  if (active?.phase === "welcome") {
    flags.welcomeDone = true;
    localStorage.setItem("storyFlags", JSON.stringify(flags));
  }

  unlockLevelsByProgress();
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
