import { startLoader } from "../shared/loader/assetLoader/index.js";
import { ensurePlayer } from "../js/data/playerRepository.js";
import { loadPlayerState, savePlayerState } from "../js/state/playerState.js";
import { startSaveLoader } from "../shared/loader/saveLoader/index.js";

startLoader({
    text: "Identifying your identity...",
    assets: [
        "./image/1.png",
        "./image/10.png",
        "./image/11.png",
        "./image/12.png",
        "./image/13.png",
        "./image/14.png",
        "./image/15.png",
        "./image/16.png",
        "./image/17.png",
        "./image/18.png",
        "./image/19.png",
        "./image/2.png",
        "./image/20.png",
        "./image/3.png",
        "./image/4.png",
        "./image/5.png",
        "./image/6.png",
        "./image/7.png",
        "./image/8.png",
        "./image/9.png",
        "../image/bubble.png",
        "../image/background.png",
        "./sfx/background-sfx.mp3",
        "./sfx/type.mp3"
    ]
})
/* CONFIG */
const avatars = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `image/${i + 1}.png`
}));



/* ===========================
   AUDIO
=========================== */

const bgm = new Audio("./sfx/background-sfx.mp3");
bgm.loop = true;
bgm.volume = 1;

const selectSfx = new Audio("../sfx/select.mp3");
selectSfx.volume = 0.8;

const goSfx = new Audio("../sfx/go.mp3");
goSfx.volume = 1.0;

// Browsers require user interaction before audio
let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;

    bgm.play().catch(() => { });
    audioUnlocked = true;

    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
}

document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);




/* DOM */
const avatarGrid = document.getElementById("avatarGrid");
const bigAvatar = document.getElementById("bigAvatar");
const nameInput = document.getElementById("playerName");
const finishBtn = document.getElementById("finishBtn");
const typeSfx = document.getElementById("type_sfx");

let lastTypeTime = 0;
const TYPE_COOLDOWN = 40; // ms

let selectedAvatar = avatars[0];;
bigAvatar.src = selectedAvatar.src;
/* HELPERS */
function updateFinish() {
    finishBtn.disabled = !(nameInput.value.trim());
}

function selectAvatar(avatar, el, { silent = false } = {}) {
    selectedAvatar = avatar;
    document.querySelectorAll(".avatar").forEach(a =>
        a.classList.remove("selected")
    );
    el.classList.add("selected");
    bigAvatar.src = avatar.src;

    if (!silent) {
        selectSfx.currentTime = 0;
        selectSfx.play().catch(() => { });
    }

    updateFinish();
}



function getPlayerId() {
    let id = localStorage.getItem("playerId");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("playerId", id);
    }
    return id;
}


/* RENDER */
avatars.forEach((a, index) => {
    const div = document.createElement("div");
    div.className = "avatar";
    div.innerHTML = `<img src="${a.src}" alt="">`;
    div.onclick = () => selectAvatar(a, div);
    avatarGrid.appendChild(div);

    if (index === 0) {
        selectAvatar(a, div, { silent: true });
    }
});

/* EVENTS */
nameInput.addEventListener("input", () => {
    updateFinish();

    const now = performance.now();

    // prevent sound spam (hold key / paste)
    if (now - lastTypeTime > TYPE_COOLDOWN) {
        typeSfx.currentTime = 0;
        typeSfx.play().catch(() => { });
        lastTypeTime = now;
    }
});

finishBtn.onclick = async () => {
    const playerId = getPlayerId();
    const name = nameInput.value.trim();
    const avatarId = selectedAvatar.id;

    const state = loadPlayerState();
    state.profile.id = playerId;
    state.profile.name = name;
    state.profile.avatarId = avatarId;
    savePlayerState(state);

    // 🔊 go sound
    goSfx.play().catch(() => { });

    await startSaveLoader(
        async () => {
            await ensurePlayer(playerId, name, avatarId);
        },
        { text: "Swiping your studentId..." }
    );

    // stop bgm cleanly before leaving
    bgm.pause();
    bgm.currentTime = 0;

    window.location.href = "../map/index.html";
};





// TODO:
// loading page for this page done
// create an ID done
// make a key that stores ID, name and avatar ID
// save to localStorage
// make an API call to save to firebaseDB

// update the script and the map accordingly.


