// import Ship from './ship.js';
// import Gameboard from './gameboard.js';
import Player from './modules/player.js';
import Display from './modules/displayBoard.js';

const startButton = document.getElementById('new-game');
const htmlShips = document.querySelector('.player .ships').children;
const directionChange = document.getElementById('direction-btn');
const directionSpan = document.getElementById('direction');
const directionDiv = document.querySelector('.direction-change');
const randomBtn = document.getElementById('random-board');

let winner = null;
let cpu = Player('CPU', 'cpu');
let player = Player('Player', 'human');
cpu.board.generateFleet();

Display.displayBoard(player.board.board, player.type);
Display.displayBoard(cpu.board.board, cpu.type);

let spaces = document.getElementsByClassName('space');

let htmlSelection = null;
let direction = 'vertical';

// Change direction of ship placement
directionChange.addEventListener('click', () => {
  if (direction === 'vertical') {
    direction = 'horizontal';
    directionSpan.innerHTML = 'Horizontal';
  } else {
    direction = 'vertical';
    directionSpan.innerHTML = 'Vertical';
  }
});

// Allow player to manually place ships
function manualPlacement(status = false) {
  if (player.board.ships.length === 5) {
    startButton.disabled = false;
    directionDiv.style.visibility = 'hidden';
    htmlSelection = null;
    return;
  }

  let randomFlag = false;

  if (!randomFlag) {
    randomBtn.addEventListener('click', () => {
      randomFlag = true;
      directionDiv.style.visibility = 'hidden';
      player.board.generateFleet();
      Display.displayBoard(player.board.board, player.type);
      Display.shipHighlight('all', 'select');
      manualPlacement();
    });
  }

  // Adds listeners to ship names
  function shipSelectionListener(ship) {
    if (randomFlag === false && !ship.classList.contains('placed')) {
      htmlSelection = ship.innerText;
      htmlSelection =
        htmlSelection.charAt(0).toLowerCase() + htmlSelection.slice(1);
      Display.shipHighlight(htmlSelection, 'select');
      manualPlacement(true);
    }
  }

  // Adds listeners to clicked spaces
  function spaceSelectionListener(space) {
    if (randomFlag === false) {
      const coords = [
        parseInt(space.getAttribute('x'), 10),
        parseInt(space.getAttribute('y'), 10),
      ];
      if (htmlSelection) {
        const playerSelection = player.board.manuallyPlaceShip(
          htmlSelection,
          coords,
          direction
        );
        if (playerSelection === true) {
          Display.shipHighlight(htmlSelection, 'placed');
          Display.displayBoard(player.board.board, player.type);
          spaces = document.getElementsByClassName('space');
          htmlSelection = null;
          manualPlacement();
        }
      }
    }
  }

  // Adds listeners to hovered spaces
  function spaceHoverListener(space) {
    if (htmlSelection) {
      const hoverCoords = [
        parseInt(space.getAttribute('x'), 10),
        parseInt(space.getAttribute('y'), 10),
      ];
      const tempHover = player.board.manuallyPlaceShip(
        htmlSelection,
        hoverCoords,
        direction,
        true
      );
      if (tempHover[0]) {
        Display.showHover(tempHover[0], tempHover[1]);
      } else {
        Display.showHover(tempHover[0], tempHover[1]);
      }
    }
  }

  if (status === false) {
    for (let i = 0; i < htmlShips.length; i += 1) {
      htmlShips[i].addEventListener('click', (e) =>
        shipSelectionListener(e.target)
      );
    }

    for (let i = 0; i < 100; i += 1) {
      spaces[i].addEventListener('click', (e) => {
        spaceSelectionListener(e.target);
      });

      spaces[i].addEventListener('mouseover', (e) => {
        spaceHoverListener(e.target);
      });

      spaces[i].addEventListener('mouseout', Display.hideHover);
    }
  }
}

// let cpuMoves = [];
function init() {
  cpu = Player('CPU', 'cpu');
  cpu.board.generateFleet();
  player = Player('Player', 'human');

  Display.newGameMessage();
  Display.clearResults();
  Display.displayBoard(player.board.board, player.type);
  Display.displayBoard(cpu.board.board, cpu.type);
  directionDiv.style.visibility = 'visible';
  spaces = document.getElementsByClassName('space');

  manualPlacement();
  startButton.innerText = 'Begin!';
  startButton.disabled = true;
  winner = null;
}

// Adds event listeners to spaces on current board
function domAttack() {
  for (let i = 100; i < 200; i += 1) {
    spaces[i].addEventListener('click', (e) => {
      playerMove(
        parseInt(e.target.getAttribute('x'), 10),
        parseInt(e.target.getAttribute('y'), 10)
      );
    });
  }
}

// Checks for a winner
function checkWinner(currentPlayer, currentOpponent) {
  if (currentOpponent.board.allSunk()) {
    winner = currentPlayer;
    Display.displayResult(currentPlayer.name, currentOpponent.name, ['winner']);
    return true;
  }
  return false;
}

// Executes a CPU move
function cpuMove() {
  const coords = cpu.getRandomCoords();
  const result = player.receiveAttack(coords[0], coords[1]);
  if (result[0] === 'sunk') {
    const shipDiv = document.querySelector(`.player .${result[1]}`);
    shipDiv.classList.add('sunk');
  }
  Display.displayResult(cpu.name, player.name, result);
  Display.displayBoard(player.board.board, player.type);
  checkWinner(cpu, player);
  document.querySelector('.player-instruction').innerText = 'Make your move!';
}

// Executes a player move
function playerMove(x, y) {
  if (!winner) {
    if (player.sendAttack(x, y)) {
      const result = cpu.receiveAttack(x, y);
      if (result[0] === 'sunk') {
        const shipDiv = document.querySelector(`.cpu .${result[1]}`);
        shipDiv.classList.remove('placed');
        shipDiv.classList.add('sunk');
      }
      Display.displayResult(player.name, cpu.name, result);
      Display.displayBoard(cpu.board.board, cpu.type);
      if (!checkWinner(player, cpu)) {
        spaces = document.getElementsByClassName('space');
        document.querySelector('.player-instruction').innerText =
          'CPU is making move...';
        setTimeout(function () {
          cpuMove();
        }, 350);

        domAttack();
      }
    }
  }
}

// Controls what happens when New Game button is selected
startButton.addEventListener('click', () => {
  if (startButton.innerText === 'New Game') {
    init();
  }

  if (startButton.innerText === 'Begin!' && player.board.ships.length === 5) {
    directionDiv.style.visibility = 'hidden';
    domAttack();
    startButton.innerText = 'New Game';
    startButton.disabled = false;
    randomBtn.style.visibility = 'hidden';
    document.styleSheets[0].insertRule('.cpu .space { cursor: pointer;}');
    document.querySelector('.player-instruction').innerText = 'Make your move!';
  }
});
