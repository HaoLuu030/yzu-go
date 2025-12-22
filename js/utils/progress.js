import { loadPlayerState, savePlayerState } from "../state/playerState.js";
import { showOverlay } from "./gameOverlay.js";


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

  if (!level?.completed) return false;

  requestAnimationFrame(() => {
    showOverlay({
      level: levelId,
      score: level.score
    });
  });

  return true;
}
