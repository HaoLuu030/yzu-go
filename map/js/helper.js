import { loadPlayerState } from "../../js/state/playerState.js";


function updateButtonState(levelKey) {
  const state = loadPlayerState();
  const level = state.levels[levelKey];
  const button = document.getElementById(levelKey);

  if (!button || !level) return;

  // reset visual state
  button.classList.remove(
    "button-unlocked",
    "button-locked",
    "button-completed",
    "story-locked"
  );
  button.style.pointerEvents = "";

  // 1️⃣ Completed
  if (level.completed) {
    button.classList.add("button-completed");
    button.style.pointerEvents = "none";
    return;
  }

  // 2️⃣ Unlocked
  if (level.unlocked) {
    button.classList.add("button-unlocked");
    return;
  }

  // 3️⃣ Locked
  button.classList.add("button-locked");
  button.style.pointerEvents = "none";
}





function lockAllLevels() {
  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`level${i}`);
    if (!btn) continue;

    btn.classList.remove(
      "button-unlocked",
      "button-completed"
    );

    btn.classList.add("button-locked", "story-locked");
    btn.style.pointerEvents = "none";

  }
}

function unlockLevelsFromState(state) {
  Object.entries(state.levels).forEach(([levelKey, level]) => {
    const btn = document.getElementById(levelKey);
    if (!btn) return;

    btn.classList.remove("button-locked", "button-unlocked", "button-completed", "story-locked");

    if (level.completed) {
      btn.classList.add("button-completed");
      btn.style.pointerEvents = "none";
      return;
    }

    if (level.unlocked) {
      btn.classList.add("button-unlocked");
      btn.style.pointerEvents = "auto";
      return;
    }

    btn.classList.add("button-locked");
    btn.style.pointerEvents = "none";
  });
}




// Move the dophin according to levels
const levelPositions = [
  { id: 1, top: "13%", left: "62%" },
  { id: 2, top: "10%", left: "53%" },
  { id: 3, top: "21%", left: "45%" },
  { id: 4, top: "11%", left: "38%" },
  { id: 5, top: "12%", left: "31%" },
  { id: 6, top: "20%", left: "28%" },
];

function saveMovementState(from, to, duration) {
  localStorage.setItem("dolphinMove", JSON.stringify({
    from,
    to,
    startTime: Date.now(),
    duration
  }));
}

function moveDolphinToLevel(level, duration = 2000) {
  const dolphin = document.getElementById("your_avatar");
  const to = levelPositions.find(p => p.id === level);
  if (!dolphin || !to) return;

  const from = {
    left: getComputedStyle(dolphin).marginLeft,
    top: getComputedStyle(dolphin).marginTop
  };

  saveMovementState(from, to, duration);

  dolphin.style.transition = `margin-left ${duration}ms linear, margin-top ${duration}ms linear`;

  requestAnimationFrame(() => {
    dolphin.style.marginLeft = to.left;
    dolphin.style.marginTop = `calc(${to.top} - 5%)`;
  });
}


function getLatestLevelFromStorage() {
  const raw = localStorage.getItem("playerState");
  if (!raw) return 0;

  const playerState = JSON.parse(raw);
  const node = playerState?.journey?.currentNode;

  if (node === "welcome") return 0;

  const match = /^level(\d+)$/.exec(node);
  return match ? Number(match[1]) : 0;
}

function getAvatarImagePath() {
  const raw = localStorage.getItem("playerState");
  if (!raw) return "image/default.png";

  const playerState = JSON.parse(raw);
  const avatarId = playerState?.profile?.avatarId;

  return Number.isInteger(avatarId)
    ? `../avatar/image/${avatarId}.png`
    : "image/image/1.png";
}


export { updateButtonState, lockAllLevels, unlockLevelsFromState, getLatestLevelFromStorage, moveDolphinToLevel, getAvatarImagePath, levelPositions}