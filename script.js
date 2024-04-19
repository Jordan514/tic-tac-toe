let GameBoard = {
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "",
};

//Factory Function
function createPlayer(playerName, playerPosition) {
  let score = 0;
  let name = playerName;
  let mark = "";
  if (playerPosition % 2 === 0) {
    mark = "X";
  } else {
    mark = "O";
  }
  return { name, score, mark };
}

//The module pattern - IIFEs
let gameFlow = (function () {
  let pickFirstTurn = () => {
    let player = "player" + Math.floor(Math.random() * 2 + 1);
    return player;
  };
  let createPlayers = () => {
    let playerPosition = 1;
    let player1 = createPlayer(
      prompt(`name of player ${playerPosition}?`),
      playerPosition
    );
    document.querySelector;
    playerPosition++;
    let player2 = createPlayer(
      prompt(`name of player ${playerPosition}?`),
      playerPosition
    );
    return { player1, player2 };
  };
  let playTurn = (player) => {
    let position = prompt("position?");
    let mark = player.mark;
    return { mark, position };
  };
  return { pickFirstTurn, createPlayers, playTurn };
})();

let domManipulation = (function () {
  let createGrid = (array) => {
    for (let i = 0; i < array.length; i++) {
      let gridCell = document.createElement("div");
      gridCell.textContent = array[i];
      let thing = document.querySelector("#gameboard");
      thing.appendChild(gridCell);
    }
  };
  return { createGrid };
})();

let players = gameFlow.createPlayers();
GameBoard.currentPlayer = [gameFlow.pickFirstTurn()];
domManipulation.createGrid(GameBoard.gameBoard);
// gameFlow.playTurn(GameBoard.currentPlayer);
