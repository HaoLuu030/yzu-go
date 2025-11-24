//board
let board;
const rowCount = 21;
const columnCount = 19;
const tileSize = 35;
const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;
let queuedDirection = null;
let context;
let gameWin = false;

let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;
let foodImage;
let specialFoodImage;
let frightenedImage1;
let frightenedImage2;
let frightenedImage3;

let frightened = false;
let frightenedTimer = 0;
let gameStarted = true;
const FRIGHTENED_DURATION = 8000;

//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink
const tileMap = [
    "OOOOOXXXXXXXXXOOOOO",
    "OOOOX         XOOOO",
    "OOOXX XXXXXXX XXOOO",
    "OOX             XOO",
    "OXX XXSXXXXX XX XXO",
    "X               S X",
    "X X XX XXXXX XX X X",
    "X X             X X",
    "X X XX XXSXX XX X X",
    "X    X  bpo       X",
    "XX X   XXXXX XX X X",
    "XX XXX            X",
    "OX   X XXXXX XX XXO",
    "OOXX            XOO",
    "OOOXX XXXXXXX XXOOO",
    "OOOOX    P    XOOOO",
    "OOOOOXXXXXXXXXOOOOO",
    "OOOOOOOOOOOOOOOOOOO",
    "OOOOOOOOOOOOOOOOOOO",
    "OOOOOOOOOOOOOOOOOOO",
    "OOOOOOOOOOOOOOOOOOO"

];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

const directions = ['U', 'D', 'L', 'R']; //up down left right
let score = 0;
let lives = 3;
let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    loadImages();
    loadMap();
    // console.log(walls.size)
    // console.log(foods.size)
    // console.log(ghosts.size)
    for (let ghost of ghosts.values()) {
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
    update();
    document.addEventListener("keyup", movePacman);
}

function loadImages() {
    wallImage = new Image();
    wallImage.src = "./images/wall.png";
    blueGhostImage = new Image();
    blueGhostImage.src = "./images/blueGhost.png";
    orangeGhostImage = new Image();
    orangeGhostImage.src = "./images/orangeGhost.png"
    pinkGhostImage = new Image()
    pinkGhostImage.src = "./images/pinkGhost.png";
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./images/pacmanUp.png";
    pacmanDownImage = new Image();
    pacmanDownImage.src = "./images/pacmanDown.png";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./images/pacmanLeft.png";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "./images/pacmanRight.png";
    foodImage = new Image();
    foodImage.src = "./images/food.png";
    specialFoodImage = new Image();
    specialFoodImage.src = "./images/specialFood.png";
    frightenedImage1 = new Image();
    frightenedImage1.src = "./images/frightened1.png";
    frightenedImage2 = new Image();
    frightenedImage2.src = "./images/frightened2.png";
    frightenedImage3 = new Image();
    frightenedImage3.src = "./images/frightened3.png";
}

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar == 'X') { //block wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if (tileMapChar == 'b') {
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghost.type = "blue";
                ghosts.add(ghost);
            }

            else if (tileMapChar == 'o') {
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghost.type = "orange";
                ghosts.add(ghost);
            }

            else if (tileMapChar == 'p') {
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghost.type = "pink";
                ghosts.add(ghost);
            }

            else if (tileMapChar == 'P') { //pacman
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == ' ') { //empty is food
                const food = new Block(foodImage, x, y, tileSize, tileSize);
                foods.add(food);
            }
            else if (tileMapChar == 'S') {
                const special = new Block(specialFoodImage, x + 5, y + 5, tileSize - 10, tileSize - 10);
                special.isSpecial = true;
                foods.add(special);
            }
        }
    }
}

function update() {
    if (gameOver || gameWin) {
        draw();
        return;
    }

    move();
    draw();
    setTimeout(update, 80);

}

function draw() {
    context.clearRect(0, 0, board.width, board.height);
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = "x" + lives;

    // 1. Walls
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    // 2. Food (normal + special)
    for (let food of foods.values()) {
        context.drawImage(food.image, food.x, food.y, food.width, food.height);
    }

    // 3. Ghosts
    for (let ghost of ghosts.values()) {

        if (frightened) {
            let img;
            if (ghost.type === "blue") img = frightenedImage1;
            else if (ghost.type === "orange") img = frightenedImage2;
            else if (ghost.type === "pink") img = frightenedImage3;

            context.drawImage(img, ghost.x, ghost.y, ghost.width, ghost.height);
        }
        else {
            context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
        }
    }

    // 4. Pac-Man
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);

}


function move() {
    // Try to turn if queued direction exists
    if (queuedDirection) {
        if (canTurn(pacman, queuedDirection)) {
            pacman.updateDirection(queuedDirection);
            queuedDirection = null;
        }
    }

    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    //check wall collisions
    for (let wall of walls.values()) {
        if (collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }

    //check ghosts collision
    for (let ghost of ghosts.values()) {
        if (collision(ghost, pacman)) {
            if (frightened) {
                // Pac-Man eats ghost
                score += 200;
            } else {
                // Ghost kills Pac-Man
                lives -= 1;
                if (lives == 0) {
                    gameOver = true;
                    triggerGameOver();
                }

                resetPositions();
                return;
            }
        }


        if (ghost.y == tileSize * 9 && ghost.direction != 'U' && ghost.direction != 'D') {
            ghost.updateDirection('U');
        }

        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;
        for (let wall of walls.values()) {
            if (collision(ghost, wall) || ghost.x <= 0 || ghost.x + ghost.width >= boardWidth) {
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
            }
        }
    }

    //check food collision
    // check food collision
    let foodEaten = null;

    for (let food of foods.values()) {
        if (collision(pacman, food)) {

            if (food.isSpecial) {
                activateFrightenedMode();
                score += 50;
            } else {
                score += 10;
            }

            foodEaten = food;
            break; // eat only one per frame
        }
    }

    if (foodEaten) {
        foods.delete(foodEaten);
    }

    // Disable frightened mode after time expires
    if (frightened && Date.now() - frightenedTimer > FRIGHTENED_DURATION) {
        frightened = false;
    }


    // WIN condition
    if (foods.size === 0 && !gameWin) {
        gameWin = true;
        triggerGameOver();
    }
}


function activateFrightenedMode() {
    frightened = true;
    frightenedTimer = Date.now();
}


function movePacman(e) {
    if (gameStarted == false)
    {
        return;
    }
    if (gameOver || gameWin) {
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        gameWin = false;
        update();
        return;
    }


    if (e.code == "ArrowUp" || e.code == "KeyW") queuedDirection = 'U';
    else if (e.code == "ArrowDown" || e.code == "KeyS") queuedDirection = 'D';
    else if (e.code == "ArrowLeft" || e.code == "KeyA") queuedDirection = 'L';
    else if (e.code == "ArrowRight" || e.code == "KeyD") queuedDirection = 'R';
}


function canTurn(entity, direction) {
    let testX = entity.x;
    let testY = entity.y;

    if (direction == 'U') testY -= tileSize / 4;
    if (direction == 'D') testY += tileSize / 4;
    if (direction == 'L') testX -= tileSize / 4;
    if (direction == 'R') testX += tileSize / 4;

    // temporary hitbox
    const box = { x: testX, y: testY, width: entity.width, height: entity.height };

    // check walls
    for (let wall of walls) {
        if (collision(box, wall)) return false;
    }

    return true;
}

function updatePacmanImage() {
    if (pacman.direction == 'U') pacman.image = pacmanUpImage;
    else if (pacman.direction == 'D') pacman.image = pacmanDownImage;
    else if (pacman.direction == 'L') pacman.image = pacmanLeftImage;
    else if (pacman.direction == 'R') pacman.image = pacmanRightImage;
}


function collision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function resetPositions() {
    pacman.reset();
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    for (let ghost of ghosts.values()) {
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();

        updatePacmanImage();

        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize / 4;
        }
        else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize / 4;
        }
        else if (this.direction == 'L') {
            this.velocityX = -tileSize / 4;
            this.velocityY = 0;
        }
        else if (this.direction == 'R') {
            this.velocityX = tileSize / 4;
            this.velocityY = 0;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
};



function triggerGameOver() {
    document.getElementById("gameover-overlay").style.display = "flex";
    gameStarted = false;
    saveLevelProgress("level_5", score)
}

// Universal save function for all levels
function saveLevelProgress(levelName, score) {
    const data = {
        score: score,
        unlocked: true
    };

    localStorage.setItem(levelName, JSON.stringify(data));
}
