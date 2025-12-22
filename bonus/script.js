import { loadPlayerState, savePlayerState } from "../js/state/playerState.js";
loadPlayerState();



const s = loadPlayerState();
s.levels.level1.completed = true;
savePlayerState(s);
