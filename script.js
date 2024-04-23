let GameBoard = {
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "",
};

//Factory Function
function createPlayer(playerName = "default name", playerPosition) {
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
    if (GameBoard.currentPlayer == players.player1) {
      GameBoard.currentPlayer = players.player2;
    } else {
      GameBoard.currentPlayer = players.player1;
    }
  };
  let checkIfEndGame = (array = []) => {
    console.log(array[0] + array[1] + array[2]);
    console.log(array[3] + array[4] + array[5]);
    console.log(array[6] + array[7] + array[8]);

    console.log(array[0] + array[3] + array[6]);
    console.log(array[1] + array[4] + array[7]);
    console.log(array[2] + array[5] + array[8]);

    console.log(array[0] + array[4] + array[8]);
    console.log(array[6] + array[4] + array[2]);
  };
  return { pickFirstTurn, createPlayers, changePlayer, checkIfEndGame };
})();

let domManipulation = (function () {
  let createGrid = (array) => {
    let gameBoard = document.querySelector("#game-board");
    for (let i = 0; i < array.length; i++) {
      let gridCell = document.createElement("div");
      gridCell.setAttribute("class", `spot${i + 1}`);
      gridCell.textContent = array[i];

      const onClickAddMarker = () => {
        domManipulation.addMarker(GameBoard.currentPlayer.mark, i + 1);
        gameFlow.changePlayer();
        gridCell.removeEventListener("click", onClickAddMarker);
        gameFlow.checkIfEndGame(GameBoard.gameBoard);
      };
      gridCell.addEventListener("click", onClickAddMarker);

      gameBoard.appendChild(gridCell);
    }
  };
  let changeNames = (player) => {
    let nameField = document.querySelector(`.name${player.position}`);
    nameField.textContent = player.name;
  };
  let addMarker = (mark, markerPosition) => {
    GameBoard.gameBoard[markerPosition - 1] = mark;
    let gameBoard = document.querySelector("#game-board");
    gameBoard.querySelector(`.spot${markerPosition}`).textContent = mark;
  };
  return { createGrid, changeNames, addMarker };
})();

let players = gameFlow.createPlayers();

//actually playing the game
GameBoard.currentPlayer = players[gameFlow.pickFirstTurn()];
domManipulation.createGrid(GameBoard.gameBoard);
