// button click handler
const boxes = document.querySelectorAll(".container-fluid .box");
let movesLeft = document.getElementById("moves-left");
const currentPlayer = document.getElementById("current-player");
const winner = document.getElementById("winner-display-board");
//apply event to generate new game state
currentPlayer.innerText = "_";
let playerXState = [];
let playerOState = [];
let gameState = [];
let isGameOver = false;

// initial state of game
const init = {
  moves: movesLeft.innerText,
  gameState: gameState,
  isGameOver: isGameOver,
};

// game state renderer renders the generated game state
function handleClick(e) {
  // target the current position of player
  let playerPosition = e.target;
  let X = "X";
  let O = "O";

  // save overall game state
  gameState.push(playerPosition);

  // Be 'X' a first player
  if (playerXState.length == 0) {
    // display the player position on boxes
    playerPosition.innerText = X;
    // disable button
    disableButton(e);
    playerXState.push(playerPosition);

    // update turn played
    currentPlayer.innerText = X;
  }
  // check the previous player
  else if (playerXState.length > playerOState.length) {
    playerPosition.innerText = O;
    // disable button
    disableButton(e);
    playerOState.push(playerPosition);

    // update turn played
    currentPlayer.innerText = O;
  } else {
    playerPosition.innerText = X;
    // disable button
    disableButton(e);
    playerXState.push(playerPosition);

    // update turn played
    currentPlayer.innerText = X;
  }

  // let's update the moves
  updateMoves();

  // check winner
  checkWinner();
}

// renders text on button clicked with X or O

// disable the button clicked
function disableButton(e) {
  e.target.disabled = true;
}

// update panel values such as Turn Played By and Moves Left
function updateMoves() {
  let moves = Number(movesLeft.innerText) - 1;
  movesLeft.innerText = moves;
}
// reset panel values to default values
function startNewGame() {
  currentPlayer.innerText = "_";
  movesLeft.innerText = init.moves;
  playerXState = [];
  playerOState = [];
  gameState = init.gameState;
  isGameOver = init.isGameOver;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  winner.style.display = "none";
  winner.innerText = "";
}
// implement logic to get the winner
function checkWinner() {
  // horizontal
  if (
    boxes[0].innerText != "" &&
    boxes[0].innerText == boxes[1].innerText &&
    boxes[1].innerText == boxes[2].innerText
  ) {
    showWinner(boxes[0].innerText);
    return;
  } else if (
    boxes[0].innerText != "" &&
    boxes[0].innerText == boxes[1].innerText &&
    boxes[1].innerText == boxes[2].innerText
  ) {
    showWinner(boxes[0].innerText);
    return;
  } else if (
    boxes[3].innerText != "" &&
    boxes[3].innerText == boxes[4].innerText &&
    boxes[4].innerText == boxes[5].innerText
  ) {
    showWinner(boxes[3].innerText);
    return;
  }
  //   vertical
  else if (
    boxes[6].innerText != "" &&
    boxes[6].innerText == boxes[7].innerText &&
    boxes[7].innerText == boxes[8].innerText
  ) {
    showWinner(boxes[6].innerText);
    return;
  } else if (
    boxes[0].innerText != "" &&
    boxes[0].innerText == boxes[3].innerText &&
    boxes[3].innerText == boxes[6].innerText
  ) {
    showWinner(boxes[0].innerText);
    return;
  } else if (
    boxes[1].innerText != "" &&
    boxes[1].innerText == boxes[4].innerText &&
    boxes[4].innerText == boxes[7].innerText
  ) {
    showWinner(boxes[1].innerText);
    return;
  }
  // diagonal
  else if (
    boxes[0].innerText != "" &&
    boxes[0].innerText == boxes[4].innerText &&
    boxes[4].innerText == boxes[8].innerText
  ) {
    showWinner(boxes[0].innerText);
    return;
  } else if (
    boxes[2].innerText != "" &&
    boxes[2].innerText == boxes[4].innerText &&
    boxes[4].innerText == boxes[6].innerText
  ) {
    showWinner(boxes[2].innerText);
    return;
  } else if (movesLeft.innerText == 0 && winner.innerText.length == 0) {
    console.log("draw");
    winner.style.display = "block";
    winner.innerText = "Game is Draw";
    return;
  }
}

// announce winner
function showWinner(player) {
  // update game finish state
  isGameOver = true;
  console.log(gameState);
  winner.style.display = "block";
  winner.innerText = `Player ${player} is Winner`;
}
// REPLAY-MODE :: replay-game-button-clicked->fetches events recorded->apply event->generates new game state->render game state
// Repay Only when game is finish
const replay = document.getElementById("replay");
replay.addEventListener("click", () => {
  if (isGameOver) {
    gameState.slice(-1)[0].innerText = "";
    gameState.pop();
  }
});
// reset game to start a new
const reset = document.getElementById("reset");
reset.addEventListener("click", startNewGame);

// bind events to clickable buttons
boxes.forEach((box) => {
  box.addEventListener("click", handleClick);
});
