var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var currtile;
var nextile;

window.onload = function () {
    startGame();
    window.setInterval(function () {
        crushCandy();
        setTimeout(() => {
            slideCandy();
        }, 100);
        generateCandy();
    }, 100);
}
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; //0 - 5.99
}


// Create a table
function startGame() {
    // 9 array rows
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            // for each element document.createElement("img");
            let tile = document.createElement("img");
            // create id for each element -> for drag - drop
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // click on a candy, initialize drag process
            tile.addEventListener("dragstart", dragStart);
            // clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            // leave candy over another candy
            tile.addEventListener("dragleave", dragLeave);
            //dropping a candy over another candy
            tile.addEventListener("drop", dragDrop);
            //after drag process completed, we swap candies
            tile.addEventListener("dragend", dragEnd);
            // append(tile) inside the board div
            document.getElementById("board").append(tile);
            // add tile to row
            row.push(tile);
        }
        // push row at the end of the board
        board.push(row);
    }
    console.log(board);
}



function crushCandy() {
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

// If there are 4 candies with the same color, crushes and generates a new special candy
function crushFive() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 4; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            let candy4 = board[i][j + 3];
            let candy5 = board[i][j + 4];
            if (candy1.src == candy2.src && candy2.src == candy3.src &&
                candy3.src == candy4.src && candy4.src == candy5.src
                && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/blank.gif";
                candy3.src = "./images/luggage.png";
                candy4.src = "./images/blank.gif";
                candy5.src = "./images/blank.gif";
                score += 20;
                const sound = new Audio("../sound effects/shining.mp3");
                sound.play();
            }
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows - 4; j++) {
            let candy1 = board[j][i];
            let candy2 = board[j + 1][i];
            let candy3 = board[j + 2][i];
            let candy4 = board[j + 3][i];
            let candy5 = board[j + 4][i];
            if (candy1.src == candy2.src && candy2.src == candy3.src &&
                candy3.src == candy4.src && candy4.src == candy5.src
                && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/luggage.png";
                candy3.src = "./images/blank.gif";
                candy4.src = "./images/blank.gif";
                candy5.src = "./images/blank.gif";
                score += 20;
                const sound = new Audio("../sound effects/shining.mp3");
                sound.play();
            }
        }
    }
}


// If there are 4 candies with the same color, crushes and generates a new special candy
function crushFour() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            let candy4 = board[i][j + 3];
            if (candy1.src == candy2.src && candy2.src == candy3.src &&
                candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/blank.gif";
                candy3.src = "./images/blank.gif";
                candy4.src = "./images/luggage.png";
                score += 20;
                const sound = new Audio("../sound effects/shining.mp3");
                sound.play();
            }
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows - 3; j++) {
            let candy1 = board[j][i];
            let candy2 = board[j + 1][i];
            let candy3 = board[j + 2][i];
            let candy4 = board[j + 3][i];
            if (candy1.src == candy2.src && candy2.src == candy3.src
                && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/blank.gif";
                candy3.src = "./images/blank.gif";
                candy4.src = "./images/luggage.png";
                score += 20;
                const sound = new Audio("../sound effects/shining.mp3");
                sound.play();
            }
        }
    }
}




// If there are 3 candies with the same color, crushes
function crushThree() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 2; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/blank.gif";
                candy3.src = "./images/blank.gif";
                score += 10;
                const sound = new Audio("../sound effects/blink.mp3");
                sound.play();
            }
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows - 2; j++) {
            let candy1 = board[j][i];
            let candy2 = board[j + 1][i];
            let candy3 = board[j + 2][i];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.gif";
                candy2.src = "./images/blank.gif";
                candy3.src = "./images/blank.gif";
                score += 10;
                const sound = new Audio("../sound effects/blink.mp3");
                sound.play();
            }
        }
    }
}


function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}


function dragEnd() {
    // 1. Check if 2 tiles are empty
    if (currTile.src.includes("blank") || otherTile.src.includes("blank"))
        return;


    // 2. Store id => hint (tile.id.split("-")), parseInt
    let currTileId = currTile.id.split("-");
    let r1 = parseInt(currTileId[0]);
    let c1 = parseInt(currTileId[1]);

    let otherTileId = otherTile.id.split("-");
    let r2 = parseInt(otherTileId[0]);
    let c2 = parseInt(otherTileId[1]);

    // 3. Can move or cannot (true/ false)
    let moveUp = r2 == r1 - 1 && c2 == c1;
    let moveDown = r2 == r1 + 1 && c2 == c1;
    let moveRight = r2 == r1 && c2 == c1 + 1;
    let moveLeft = r2 == r1 && c2 == c1 - 1;

    // 4. Check 2 items are adjacent or not
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    // 5. Satisfying, swap
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;
        // If one of them is a luggage, after swapping, destroy all of the items are the same with
        // the item which the luggage swapped with
        if (currTile.src.includes("luggage") && otherTile.src.includes("luggage")) {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    board[r][c].src = "./images/blank.gif";
                    score += 5;
                }
            }
            const sound = new Audio("../sound effects/blink.mp3");
            sound.play();
            return;
        }

        if (currTile.src.includes("luggage")) {
            const targetName = otherTile.src.split("/").pop();
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const tileName = board[r][c].src.split("/").pop();
                    if (tileName === targetName) {
                        board[r][c].src = "./images/blank.gif";
                    }
                }
            }
            const sound = new Audio("../sound effects/blink.mp3");
            sound.play();
            currTile.src = "./images/blank.gif";
            otherTile.src = "./images/blank.gif";
            return;
        }

        if (otherTile.src.includes("luggage")) {
            const targetName = currTile.src.split("/").pop();
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const tileName = board[r][c].src.split("/").pop();
                    if (tileName === targetName) {
                        board[r][c].src = "./images/blank.gif";
                    }
                }
            }
            const sound = new Audio("../sound effects/blink.mp3");
            sound.play();
            currTile.src = "./images/blank.gif";
            otherTile.src = "./images/blank.gif";
            return;
        }
        let isValid = checkValid();
        if (!isValid) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
    // 6. If checkValid() = false, swap

}

// 1. CheckValid() -> whether three adjacent tiles are the same
function checkValid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 2; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows - 2; j++) {
            let candy1 = board[j][i];
            let candy2 = board[j + 1][i];
            let candy3 = board[j + 2][i];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}



// 2. SlideCandy()
function slideCandy() {

    for (let c = 0; c < columns; c++) {
        // a. Loop to move candies downward
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                --ind;
            }
        }
        // b. fill all top candies with blank images
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.gif";
        }
    }


}

// 3. Fill all the top candy with a random candy
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
