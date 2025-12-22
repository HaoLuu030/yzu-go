console.log("leaderBoard.js loaded");

console.log("db value:", db);

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { db } from "../../js/data/firebase.js";

function calculateTotalScore(games = {}) {
  let total = 0;

  for (const game of Object.values(games)) {
    if (game?.completed && typeof game.score === "number") {
      total += game.score;
    }
  }

  return total;
}

async function fetchPlayers() {
  const snapshot = await getDocs(collection(db, "players"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      avatarId: data.avatarId,
      totalScore: calculateTotalScore(data.games),
      lastSeen: data.lastSeen
    };
  });
}
function sortLeaderboard(players) {
  return players.sort(
    (a, b) =>
      b.totalScore - a.totalScore ||
      a.lastSeen - b.lastSeen
  );
}
function renderLeaderboard(players) {
  const ol = document.getElementById("leaderboard");
  ol.innerHTML = "";

  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.className = "leaderboard-row";

    // rank / medal
    let rankHTML;
    if (index === 0) rankHTML = `<div class="rank-medal gold">🥇</div>`;
    else if (index === 1) rankHTML = `<div class="rank-medal silver">🥈</div>`;
    else if (index === 2) rankHTML = `<div class="rank-medal bronze">🥉</div>`;
    else rankHTML = `<div class="rank-number">${index + 1}</div>`;

   
    li.innerHTML = `
      ${rankHTML}

      <img
        class="avatar"
        src="../../avatar/image/${player.avatarId}.png"
        alt="Avatar ${player.avatarId}"
        onerror="this.src='../../avatar/image/1.png'"
      />

      <div class="player-info">
        <div class="name">${player.name}</div>
      </div>

      <div class="score">${player.totalScore}</div>
    `;

    ol.appendChild(li);
  });
}


async function initLeaderboard() {
  const players = await fetchPlayers();
  const leaderboard = sortLeaderboard(players);
  renderLeaderboard(leaderboard);
}

initLeaderboard();
