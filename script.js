let GameBoard = {
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "",
};

//Factory Function
function createPlayer(playerName, playerPosition) {
  let score = 0;
  let mark = "";
  let name = playerName;
  let position = playerPosition;
  if (playerPosition % 2 === 0) {
    mark = "X";
  } else {
    mark = "O";
  }
  return { score, mark, name, position };
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
    domManipulation.changeNames(player1);
    playerPosition++;
    let player2 = createPlayer(
      prompt(`name of player ${playerPosition}?`),
      playerPosition
    );
    domManipulation.changeNames(player2);

    return { player1, player2 };
  };

  let changePlayer = () => {
    if (GameBoard.currentPlayer.name == players.player1.name) {
      GameBoard.currentPlayer = players.player2;
    } else {
      GameBoard.currentPlayer = players.player1;
    }
  };
  let checkIfEndGame = (array = []) => {
    let string = "";
    for (let i = 0; i < 3; i++) {
      string += array[i];
    }
  };
  return { pickFirstTurn, createPlayers, changePlayer, checkIfEndGame };
})();

let domManipulation = (function () {
  let createGrid = (array) => {
    for (let i = 0; i < array.length; i++) {
      let gridCell = document.createElement("div");
      gridCell.setAttribute("class", `spot${i + 1}`);
      gridCell.textContent = array[i];
      gridCell.addEventListener("click", function clicky() {
        domManipulation.addMarker(GameBoard.currentPlayer.mark, i + 1);
        gameFlow.changePlayer();
      });
      let gameBoard = document.querySelector("#game-board");
      gameBoard.appendChild(gridCell);
    }
  };
  let changeNames = (player) => {
    let nameField = document.querySelector(`.name${player.position}`);
    nameField.textContent = player.name;
  };
  let addMarker = (mark, markerPosition) => {
    let gameBoard = document.querySelector("#game-board");
    gameBoard.querySelector(`.spot${markerPosition}`).textContent = mark;
  };
  return { createGrid, changeNames, addMarker };
})();

let players = gameFlow.createPlayers();
GameBoard.currentPlayer = players[gameFlow.pickFirstTurn()];
domManipulation.createGrid(GameBoard.gameBoard);
// gameFlow.playTurn(GameBoard.currentPlayer);
// this function is not currently necassary

gameFlow.checkIfEndGame(GameBoard.gameBoard);
