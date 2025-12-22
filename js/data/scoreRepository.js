import { saveGameResult } from "./playerRepository.js";
import { loadPlayerState, savePlayerState } from "../state/playerState.js";

const USE_DB = true; // flip anytime

function getPlayerId() {
  return loadPlayerState().profile.id;
}

/* =========================
   SAVE (AUTHORITATIVE)
========================= */
export async function saveGame({ gameKey, levelId, score, completed, extra = {} }) {
  const state = loadPlayerState();
  const level = state.levels[levelId];

  if (!level) throw new Error(`Unknown level: ${levelId}`);

  // ---- LOCAL STATE (SOURCE OF TRUTH)
  level.completed = completed;
  level.score = score;
  level.finishedAt = Date.now();

  // unlock next level (linear)
  const keys = Object.keys(state.levels);
  const idx = keys.indexOf(levelId);
  if (completed && idx >= 0 && keys[idx + 1]) {
    state.levels[keys[idx + 1]].unlocked = true;
  }

  savePlayerState(state);

  // ---- OPTIONAL DB SYNC
  if (USE_DB) {
    const playerId = getPlayerId();
    if (!playerId) throw new Error("No playerId in playerState");

    await saveGameResult(playerId, gameKey, {
      score,
      completed,
      finishedAt: level.finishedAt,
      extra
    });
  }
}

/* =========================
   LOAD (READ LOCAL ONLY)
========================= */
export function getGame(levelId) {
  const state = loadPlayerState();
  return state.levels[levelId] || null;
}

/* =========================
   CLEAR (RESET LOCAL STATE)
========================= */
export async function clearGame(levelId) {
  const state = loadPlayerState();
  const level = state.levels[levelId];
  if (!level) return;

  level.completed = false;
  level.score = null;
  level.finishedAt = null;
  level.unlocked = false;

  savePlayerState(state);

  if (USE_DB) {
    console.warn("DB clear not implemented yet (optional)");
  }
}
