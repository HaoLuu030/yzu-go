import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { db } from "./data/firebase.js";

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
  const top3Container = document.getElementById("leaderboard-top3");
  const ol = document.getElementById("leaderboard");

  top3Container.innerHTML = "";
  ol.innerHTML = "";

  // ===== TOP 3 (podium order) =====
  const podiumOrder = [1, 0, 2]; // silver, gold, bronze

  podiumOrder.forEach(rankIndex => {
    const player = players[rankIndex];
    if (!player) return;

    const card = document.createElement("div");
    card.className = `top-card rank-${rankIndex + 1}`;

    const medal =
      rankIndex === 0 ? "🥇" :
      rankIndex === 1 ? "🥈" : "🥉";

    const crown = rankIndex === 0
      ? `<div class="crown">👑</div>`
      : "";

    card.innerHTML = `
      <div class="top-medal">${medal}</div>

      <div class="avatar-wrapper">
        ${crown}
        <img
          class="top-avatar"
          src="../../avatar/image/${player.avatarId}.png"
          onerror="this.src='../../avatar/image/1.png'"
        />
      </div>

      <div class="top-name">${player.name}</div>
      <div class="top-score">${player.totalScore}</div>
    `;

    top3Container.appendChild(card);
  });

  // ===== REST =====
  players.slice(3).forEach((player, index) => {
    const li = document.createElement("li");
    li.className = "leaderboard-row";

    li.innerHTML = `
      <div class="rank-number">${index + 4}</div>

      <img
        class="avatar"
        src="../../avatar/image/${player.avatarId}.png"
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