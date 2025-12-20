import { loadPlayerState, savePlayerState } from "../state/playerState.js";


export function triggerPostLevelStory(level, score) {
  const state = loadPlayerState();

  state.story = {
    active: true,
    phase: "postLevel",
    level: level,
    score,
    lineIndex: 0,
    lastLine: null
  };

  savePlayerState(state);
}



export function restoreIfGameCompleted(levelId) {
  const state = loadPlayerState();
  const level = state.levels[levelId];

  if (!level || !level.completed) return false;

  // show game over overlay
  const gameOverOverlay = document.getElementById("gameover-overlay");
  if (gameOverOverlay) {
    gameOverOverlay.style.display = "flex";
  }

  return true;
}