import { loadPlayerState, savePlayerState } from "../js/state/playerState.js";
loadPlayerState();

console.log("fixing")


const s = loadPlayerState();
s.levels.level1.completed = true;
savePlayerState(s);
