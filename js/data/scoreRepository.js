import { buildGameSave } from "./gameSaveContract.js";
import { saveGameResult, getPlayer } from "./playerRepository.js";

const USE_DB = true; // flip anytime

function getPlayerId() {
  return JSON.parse(localStorage.getItem("playerProfile"))?.playerId;
}

/* SAVE */
export async function saveGame({ gameKey, score, completed, extra = {} }) {
  const save = buildGameSave({ score, completed, extra });

  if (USE_DB) {
    const playerId = getPlayerId();
    if (!playerId) throw new Error("No playerId");
    await saveGameResult(playerId, gameKey, save);
  } else {
    const profile = JSON.parse(localStorage.getItem("playerProfile")) || {};
    profile.games = profile.games || {};
    profile.games[gameKey] = {
      ...save,
      finishedAt: Date.now()
    };
    localStorage.setItem("playerProfile", JSON.stringify(profile));
  }
}

/* LOAD */
export async function getGame(gameKey) {
  if (USE_DB) {
    const playerId = getPlayerId();
    const player = await getPlayer(playerId);
    return player?.games?.[gameKey] || null;
  } else {
    const profile = JSON.parse(localStorage.getItem("playerProfile"));
    return profile?.games?.[gameKey] || null;
  }
}

/* CLEAR */
export async function clearGame(gameKey) {
  if (USE_DB) {
    // optional: implement later
    console.warn("DB clear not implemented");
  } else {
    const profile = JSON.parse(localStorage.getItem("playerProfile"));
    if (profile?.games) {
      delete profile.games[gameKey];
      localStorage.setItem("playerProfile", JSON.stringify(profile));
    }
  }
}
