import { loadPlayerState, savePlayerState } from "../state/playerState.js";

const PROGRESS_KEY = "progress";

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


export function loadProgress() {

  // fall back
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return { currentLevel: "level1", levels: {} };

  // error handling
  try {
    const p = JSON.parse(raw);
    return {
      currentLevel: p.currentLevel || "level1",
      levels: p.levels || {}
    }
  } catch {
    return { currentLevel: "level1", levels: {} };
  }
}


export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}


export function setCurrentLevel(levelKey) {
  // load progress
  const p = loadProgress();
  p.currentLevel = levelKey;

  // update local storage
  p.levels[levelKey] = { ...(p.levels[levelKey] || {}), unlocked: true };

  saveProgress(p);
}


export function isUnlocked(levelKey) {
  const p = loadProgress();
  return levelKey === "level1" || !!p.levels[levelKey]?.unlocked;
}

export function isCompleted(levelKey) {
  const p = loadProgress();
  return !!p.levels[levelKey]?.completed;
}

export function getCurrentLevel() {
  return loadProgress().currentLevel;
}

export function isGameCompleted(level) {
  const progress = JSON.parse(localStorage.getItem("progress"));
  return Boolean(progress?.levels?.[level]?.completed);
}
