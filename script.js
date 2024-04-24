let GameBoard = {
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "",
};

//Player 2 is always X
//Factory Function
function createPlayer(playerName, playerPosition) {
  let score = 0;
  let mark = "";
  let name = otherTools.capitalizeFirstLetter(playerName);
  let position = playerPosition;
  if (playerPosition === 2) {
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
    alert(`${players[player]["name"]} goes first!`);
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
    let x = "XXX";
    let o = "OOO";
    //row
    let winr1 = array[0] + array[1] + array[2];
    let winr2 = array[3] + array[4] + array[5];
    let winr3 = array[6] + array[7] + array[8];
    //coloum
    let winc1 = array[0] + array[3] + array[6];
    let winc2 = array[1] + array[4] + array[7];
    let winc3 = array[2] + array[5] + array[8];
    //diagnal
    let wind1 = array[0] + array[4] + array[8];
    let wind2 = array[6] + array[4] + array[2];
    let winConditionArray = [
      winr1,
      winr2,
      winr3,
      winc1,
      winc2,
      winc3,
      wind1,
      wind2,
    ];
    for (item of winConditionArray) {
      if (item == x) {
        alert(`${players.player2.name} Wins!`);
        players.player2.score += 1;
        gameFlow.resetGameboard();
      } else if (item == o) {
        alert(`${players.player1.name} Wins!`);
        players.player1.score += 1;
        gameFlow.resetGameboard();
      }
    }
    domManipulation.updateScores();
  };
  let resetGameboard = () => {
    GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];
    // not needed anymore?
    // for (let i = 0; i < GameBoard.gameBoard.length; i++) {
    //   document.querySelector("#game-board").removeChild(`.spot${i + 1}`);
    // }
    document.querySelector("#game-board").innerHTML = "";
    domManipulation.createGrid(GameBoard.gameBoard);
  };
  return {
    pickFirstTurn,
    createPlayers,
    changePlayer,
    checkIfEndGame,
    resetGameboard,
  };
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
  let updateScores = () => {
    document.querySelector(".score1").textContent = players.player1.score;
    document.querySelector(".score2").textContent = players.player2.score;
  };
  return { createGrid, changeNames, addMarker, updateScores };
})();

let otherTools = (function () {
  let capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.substring(1, str.length);
  };
  return { capitalizeFirstLetter };
})();

//Setup
let players = gameFlow.createPlayers();
//actually playing the game
GameBoard.currentPlayer = players[gameFlow.pickFirstTurn()];
domManipulation.createGrid(GameBoard.gameBoard);
