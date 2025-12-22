import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { db } from "./firebase.js";

/* Ensure player exists */
export async function ensurePlayer(playerId, name, avatarId) {
  const ref = doc(db, "players", playerId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      name,
      avatarId,
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
      scores: {}
    });
  } else {
    await updateDoc(ref, {
      lastSeen: serverTimestamp()
    });
  }
}

/* Save score for a game */
export async function saveGameResult(playerId, gameKey, gameSave) {
  const ref = doc(db, "players", playerId);

  await updateDoc(ref, {
    [`games.${gameKey}`]: gameSave,
    lastSeen: gameSave.finishedAt
  });
}
/* Get player data */
export async function getPlayer(playerId) {
  const ref = doc(db, "players", playerId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
