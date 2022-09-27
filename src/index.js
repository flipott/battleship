import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import Display from './displayBoard.js';

const startButton = document.getElementById('new-game');
const htmlShips = document.querySelector('.player .ships').children;
const directionChange = document.getElementById('direction-btn');
const directionSpan = document.getElementById('direction');
const randomBtn = document.getElementById('random-board');

let winner = null;
let cpu = Player('CPU', 'cpu');
cpu.board.generateFleet();
let player = Player('Player', 'human');

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
    return;
  }

  let randomFlag = false;

  randomBtn.addEventListener('click', () => {
    randomFlag = true;
    player.board.generateFleet();
    Display.displayBoard(player.board.board, player.type);
    Display.shipHighlight('all', 'select');
    manualPlacement();
  });

  if (status === false) {
    for (let i = 0; i < htmlShips.length; i += 1) {
      htmlShips[i].addEventListener('click', () => {
        if (randomFlag === false) {
          htmlSelection = htmlShips[i].innerText;
          htmlSelection =
            htmlSelection.charAt(0).toLowerCase() + htmlSelection.slice(1);
          Display.shipHighlight(htmlSelection, 'select');
          // Display.displayBoard(player.board.board, player.type);
          manualPlacement(true);
        }
      });
    }

    for (let i = 100; i < 200; i += 1) {
      spaces[i].addEventListener('click', (e) => {
        if (randomFlag === false) {
          const coords = [
            parseInt(e.target.getAttribute('x'), 10),
            parseInt(e.target.getAttribute('y'), 10),
          ];
          if (htmlSelection) {
            if (
              player.board.manuallyPlaceShip(htmlSelection, coords, direction)
            ) {
              Display.shipHighlight(htmlSelection, 'deselect');
              Display.displayBoard(player.board.board, player.type);
              spaces = document.getElementsByClassName('space');
              htmlSelection = null;
              manualPlacement();
            }
          }
        }
      });

      spaces[i].addEventListener('mouseover', (e) => {
        const hoverCoords = [
          parseInt(e.target.getAttribute('x'), 10),
          parseInt(e.target.getAttribute('y'), 10),
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
          console.log(tempHover);
          Display.showHover(tempHover[0], tempHover[1]);
        }
      });

      spaces[i].addEventListener('mouseout', () => {
        Display.hideHover();
      });
    }
  }

  // const playerSelect = player.board.manuallyPlaceShip(
  //   htmlSelection,
  //   coords,
  //   direction
  // );
  // if (playerSelect[0]) {
  //   Display.shipHighlight(htmlSelection, 'deselect');
  //   Display.displayBoard(player.board.board, player.type);
  //   htmlSelection = null;
  //   manualPlacement();
  // }
  // }
  //     }
  // });
  // }
}

// let cpuMoves = [];
function init() {
  cpu = Player('CPU', 'cpu');
  cpu.board.generateFleet();
  player = Player('Player', 'human');

  Display.newGameMessage();
  Display.shipHighlight('reset');
  Display.clearResults();
  Display.displayBoard(player.board.board, player.type);
  Display.displayBoard(cpu.board.board, cpu.type);
  spaces = document.getElementsByClassName('space');

  manualPlacement();
  startButton.innerText = 'Begin!';
  startButton.disabled = true;
  winner = null;
}

// Adds event listeners to spaces on current board
function domAttack() {
  for (let i = 0; i < 100; i += 1) {
    spaces[i].addEventListener('click', (e) => {
      playerMove(
        parseInt(e.target.getAttribute('x')),
        parseInt(e.target.getAttribute('y'))
      );
    });
  }
}

// Checks for a winner
function checkWinner(player, opponent) {
  if (opponent.board.allSunk()) {
    winner = player;
    Display.displayResult(player.name, opponent.name, ['winner']);
    return true;
  }
}

// Executes a CPU move
function cpuMove() {
  const coords = cpu.getRandomCoords();
  // cpuMoves.push(coords);
  const result = player.receiveAttack(coords[0], coords[1]);
  Display.displayResult(cpu.name, player.name, result);
  Display.displayBoard(player.board.board, player.type);
  checkWinner(cpu, player);
}

// Executes a player move
function playerMove(x, y) {
  if (!winner) {
    if (player.sendAttack(x, y)) {
      const result = cpu.receiveAttack(x, y);
      Display.displayResult(player.name, cpu.name, result);
      Display.displayBoard(cpu.board.board, cpu.type);
      if (!checkWinner(player, cpu)) {
        spaces = document.getElementsByClassName('space');
        setTimeout(function () {
          cpuMove();
        }, 250);

        domAttack();
      }
    }
  }
}

startButton.addEventListener('click', () => {
  if (startButton.innerText === 'New Game') {
    init();
  }

  if (startButton.innerText === 'Begin!' && player.board.ships.length === 5) {
    domAttack();
    startButton.innerText = 'New Game';
    startButton.disabled = false;
    randomBtn.style.display = 'none';
    document.querySelector('.player-instruction').innerText = 'Make your move!';
  }
});
