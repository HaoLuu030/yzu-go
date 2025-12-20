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




export { updateButtonState, lockAllLevels, unlockLevelsFromState }