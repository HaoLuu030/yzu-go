const STORAGE_KEY = "playerState";

export function createInitialPlayerState() {
  return {
    profile: {
      id: null,
      name: null,
      avatar: null
    },

    journey: {
      currentNode: "welcome",
      completedNodes: []
    },

    levels: {
      level1: {
        gameId: "packup",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
      level2: {
        gameId: "fieldtrack",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
      level3: {
        gameId: "cardmatching",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
      level4: {
        gameId: "pacman",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
      level5: {
        gameId: "hangman",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
      level6: {
        gameId: "towerofhanoi",
        unlocked: false,
        completed: false,
        score: null,
        finishedAt: null
      },
    },

    story: {
      active: false,
      phase: null,
      level: null,
      lineIndex: null,
      lastLine: null
    },

    meta: {
      version: 1,
      updatedAt: Date.now()
    }
  };
}

export function loadPlayerState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = createInitialPlayerState();
    savePlayerState(fresh);
    return fresh;
  }
  return JSON.parse(raw);
}

export function savePlayerState(state) {
  state.meta.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetPlayerState() {
  localStorage.removeItem(STORAGE_KEY);
}
