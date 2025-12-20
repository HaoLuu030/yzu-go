// progressController.js
import { loadPlayerState, savePlayerState } from "./playerState.js";

export function completeLevel({ levelId, score }) {
  const state = loadPlayerState();

  // mark completed
  state.levels[levelId].completed = true;
  state.levels[levelId].score = score;

  // unlock next level
  const next = getNextLevel(levelId);
  if (next && state.levels[next]) {
    state.levels[next].unlocked = true;
  }

  // advance story node
  state.journey.currentNode = `post_${levelId}`;

  savePlayerState(state);
}

export function advanceStory(node) {
  const state = loadPlayerState();
  state.journey.currentNode = node;
  savePlayerState(state);
}

function getNextLevel(levelId) {
  const order = ["level1", "level2", "level3"];
  const index = order.indexOf(levelId);
  return order[index + 1] ?? null;
}
