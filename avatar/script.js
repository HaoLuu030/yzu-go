import { startLoader } from "../shared/loader/assetLoader/index.js";
import { ensurePlayer } from "../js/data/playerRepository.js";

startLoader({
    text: "Swiping student ID...",
    assets: [
        "image/1.png",
        "image/10.png",
        "image/11.png",
        "image/12.png",
        "image/13.png",
        "image/14.png",
        "image/15.png",
        "image/16.png",
        "image/17.png",
        "image/18.png",
        "image/19.png",
        "image/2.png",
        "image/20.png",
        "image/3.png",
        "image/4.png",
        "image/5.png",
        "image/6.png",
        "image/7.png",
        "image/8.png",
        "image/9.png",
        "../image/bubble.png",
        "../image/background.png"
    ]
})
/* CONFIG */
const avatars = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `image/${i + 1}.png`
}));



const MAP_URL = "../map/index.html";
const STORAGE_KEY = "playerProfile";



/* DOM */
const avatarGrid = document.getElementById("avatarGrid");
const bigAvatar = document.getElementById("bigAvatar");
const nameInput = document.getElementById("playerName");
const finishBtn = document.getElementById("finishBtn");

let selectedAvatar = avatars[0];;
bigAvatar.src = selectedAvatar.src;
/* HELPERS */
function updateFinish() {
    finishBtn.disabled = !(nameInput.value.trim());
}

function selectAvatar(avatar, el) {
    selectedAvatar = avatar;
    document.querySelectorAll(".avatar").forEach(a => a.classList.remove("selected"));
    el.classList.add("selected");
    bigAvatar.src = avatar.src;
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
avatars.forEach(a => {
    const div = document.createElement("div");
    div.className = "avatar";
    div.innerHTML = `<img src="${a.src}" alt="">`;
    div.onclick = () => selectAvatar(a, div);
    avatarGrid.appendChild(div);
});

/* EVENTS */
nameInput.addEventListener("input", updateFinish);

finishBtn.onclick = async () => {
    const playerId = getPlayerId();
    const name = nameInput.value.trim();
    const avatarId = selectedAvatar.id;;

    // local cache (fast UI)
    localStorage.setItem("playerProfile", JSON.stringify({
        playerId,
        name,
        avatarId
    }));

    // Firestore
    await ensurePlayer(playerId, name, avatarId);

    window.location.href = "../map/index.html";
};




// TODO:
// loading page for this page done
// create an ID done
// make a key that stores ID, name and avatar ID
// save to localStorage
// make an API call to save to firebaseDB

// update the script and the map accordingly.


