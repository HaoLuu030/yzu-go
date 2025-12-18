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

let selectedAvatar = null;
bigAvatar.src = "image/1.png";
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

finishBtn.onclick = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        name: nameInput.value.trim(),
        avatar: selectedAvatar.src
    }));
    window.location.href = MAP_URL;
};

// TODO: 
// loading page for this page
// create an ID
// make a key that stores ID, name and avatar ID
// save to localStorage
// make an API call to save to firebaseDB

// update the script and the map accordingly.