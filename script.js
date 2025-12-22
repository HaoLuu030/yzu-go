

import { startLoader } from "./shared/loader/assetLoader/index.js";



startLoader({
  assets: [
    "./image/background.png",
    "./image/bubble.png",
    "./image/coral1.png",
    "./image/coral2.png",
    "./image/jellyfish.gif",
    "./image/volume_off.png",
    "./image/volume_on.png",
    "./image/yzu_logo.png",
    "sfx/home_music.mp3",
    "sfx/result_high.mp3",
    "sfx/result_low.mp3",
    "sfx/select.mp3",
  ],
  text: "Walking down the Hero Slope...",
});


const startBtn = document.getElementById("start");


window.Float = function (e) {
  e.classList.add("float-once");
  e.addEventListener("animationend", () => {
    // Remove it to retrigger this function later
    // Because css does not work out if nothing changes
    e.classList.remove("float-once");
  })
}




let music_button;
let music_image;
let music;
let goSfx;
window.onload = () => {
  music_button = document.getElementById("music_button");
  music_image = document.getElementById("music_image");
  music = document.getElementById("music_file");
  goSfx = document.getElementById("go_sfx");
}

let isPlay = false;

window.playMusic = function () {
  if (!isPlay) {
    music.play();
    music_image.src = "../image/volume_on.png";
  }
  else {
    music.pause();
    music_image.src = "../image/volume_off.png";
  }
  isPlay = !isPlay;
}



startBtn.onclick = () => {
  goSfx.currentTime = 0;
  goSfx.play().catch(() => { });

  // set time out to hear the sound play 
  setTimeout(() => {
    if (localStorage.getItem("playerId")) {
      window.location.href = "./map/index.html";
    } else {
      window.location.href = "./avatar/index.html";
    }
  }, 400);
}


let leaderBoardIsVisible = false;

const leaderBoardBtn = document.getElementById("leaderBoard-btn");
const overlay = document.getElementById("leaderboard-overlay");

leaderBoardBtn.onclick = toggleScoreOverlay;

function showLeaderboard() {
  overlay.classList.remove("hidden");
  leaderBoardIsVisible = true;
}

function hideLeaderboard() {
  overlay.classList.add("hidden");
  leaderBoardIsVisible = false;
}

function toggleScoreOverlay() {
  leaderBoardIsVisible ? hideLeaderboard() : showLeaderboard();
}

// Click outside to close
overlay?.addEventListener("click", e => {
  if (e.target === overlay) {
    hideLeaderboard();
  }
});

document.querySelector(".score-close-btn")
  ?.addEventListener("click",  hideLeaderboard);
