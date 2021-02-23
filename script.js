"use strict";
const statusDisplay = document.querySelector('.gameStatus');
const scoreTableX = document.querySelector('.scoreTableX');
const scoreTableO = document.querySelector('.scoreTableO');
scoreTableX.innerHTML = "X : 0  vs"
scoreTableO.innerHTML = "O : 0"
let gameActive = true;
let currentPlayer = "X";

let xWinCount = 0;
let yWinCount = 0;
let gamePosition = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function init() {
    currentPlayer = "X"
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("game").style.height="600px"
    document.getElementById("startScreen").remove()
    statusDisplay.innerHTML = showCurrentPlayer();
}
function init2() {
    currentPlayer = "O"
    console.log(currentPlayer)
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("game").style.height="600px"
    document.getElementById("startScreen").remove()
    statusDisplay.innerHTML = showCurrentPlayer();
}

function winningMessage() {
   return "Player " + currentPlayer + " has won!";
}
function drawMessage() {
    return "Game ended in a draw!";
}
function showCurrentPlayer() {
    return "It's " + currentPlayer + "'s turn";
}

function victoriusMessage() {
    return "Player " + currentPlayer + " has victorius!"
}
statusDisplay.innerHTML = showCurrentPlayer();
function playedCell(clickedCell, clickedCellIndex) {
    gamePosition[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    statusDisplay.innerHTML = showCurrentPlayer();
}

function resultEvents() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const cells = winningConditions[i];
        let a = gamePosition[cells[0]];
        let b = gamePosition[cells[1]];
        let c = gamePosition[cells[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            if (currentPlayer == "X") {
                xWinCount++;
                scoreTableX.innerHTML = 'X : ' + xWinCount.toString() + '  vs';

            }
            if (currentPlayer == "O") {
                yWinCount++;
                scoreTableO.innerHTML = 'O : ' + yWinCount.toString();
            }


            if (xWinCount < 3 && yWinCount < 3) {
                console.log(xWinCount);
                setTimeout(function () {
                    document.getElementById('cell' + cells[0]).style.backgroundColor = "#ffd903"
                }, 200);

                setTimeout(function () {
                    document.getElementById('cell' + cells[1]).style.backgroundColor = "#ffd903"

                }, 500);
                setTimeout(function () {
                    document.getElementById('cell' + cells[2]).style.backgroundColor = "#ffd903"

                }, 800);
            }

            else if (xWinCount === 3 || yWinCount === 3) {
                document.querySelector('.restartGame').innerHTML = "Rematch"
                console.log(xWinCount);
                setTimeout(function () {
                    document.getElementById('cell' + cells[0]).style.backgroundColor = "#ffd903"
                }, 200);

                setTimeout(function () {
                    document.getElementById('cell' + cells[1]).style.backgroundColor = "#ffd903"

                }, 500);
                setTimeout(function () {
                    document.getElementById('cell' + cells[2]).style.backgroundColor = "#ffd903"

                }, 800);
                setTimeout(function () {
                    for (let index = 0; index < 9; index++) {
                        document.getElementById('cell' + index).style.backgroundColor = "#ffd903"

                    }
                }, 1200);
            }
            break
        }
    }
    if (roundWon) {
        if (xWinCount < 3 && yWinCount < 3) {
            statusDisplay.innerHTML = winningMessage();
        }
        if (xWinCount == 3 || yWinCount == 3) {
            statusDisplay.innerHTML = victoriusMessage();
        }

        gameActive = false;
        return;

    }
    let roundDraw = !gamePosition.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
}

function clicked_cell(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('cell-index')
    );
    if (gamePosition[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    playedCell(clickedCell, clickedCellIndex);
    resultEvents();
}

function rematch() {
    document.querySelector('.restartGame').innerHTML = "Restart Game"
    gameActive = true;
    if (xWinCount < 3 && yWinCount < 3) {
        if (currentPlayer === 'X') {
            currentPlayer = 'O'
        } else {
            currentPlayer = 'X'
        }
    }

    gamePosition = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = showCurrentPlayer();
    if (xWinCount == 3 || yWinCount == 3) {
        currentPlayer = 'X'
        xWinCount = 0;
        yWinCount = 0;
        scoreTableX.innerHTML = 'X : ' + xWinCount.toString() + '  vs';
        scoreTableO.innerHTML = 'O : ' + yWinCount.toString();


    }
    for (let index = 0; index < 9; index++) {
        document.getElementById('cell' + index).style.backgroundColor = "#14bdac"

    }
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}



document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clicked_cell));
document.querySelector('.restartGame').addEventListener('click', rematch);
