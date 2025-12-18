const STORY_STATE_KEY_WORD = "storyState";
const PROGRESS_KEY = "progress";

export function triggerPostLevelStory(level, score) {
  localStorage.setItem(STORY_STATE_KEY_WORD, JSON.stringify({
    phase: "postLevel",
    level,
    score,
    lineIndex: 0,
    completed: false
  }));
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
    return {currentLevel: "level1", levels: {}};
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
  p.levels[levelKey] = {...(p.levels[levelKey] || {}), unlocked: true};

  saveProgress(p);
}

export function completeLevel(levelKey, nextLevelKey) {
  const p = loadProgress();

  p.levels[levelKey] = { ...(p.levels[levelKey] || {}), unlocked: true, completed: true};

  if (nextLevelKey) {
    p.levels[nextLevelKey] = { ...(p.levels[nextLevelKey] || {}), unlocked: true };
    p.currentLevel = nextLevelKey;
  }

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

