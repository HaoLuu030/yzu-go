

import { startLoader } from "./shared/loader/index.js";


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
    "./image/home_music.mp3"
  ],
  text: "loading",
});


function Float(e) {
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
window.onload = () => {
  music_button = document.getElementById("music_button");
  music_image = document.getElementById("music_image");
  music = document.getElementById("music_file");
}

let isPlay = false;

function playMusic() {
  if (!isPlay) {
    music.play();
    music_image.src = "../image/volume_off.png";
  }
  else {
    music.pause();
    music_image.src = "../image/volume_on.png";
  }
  isPlay = !isPlay;
}



