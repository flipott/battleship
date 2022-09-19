import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import Display from './displayBoard.js';

const startButton = document.getElementById('game-start');
let winner = null;
let cpu = Player('CPU', 'cpu');
cpu.board.generateFleet();
let player = Player('Player', 'human');
player.board.generateFleet();

let cpuMoves = [];
let playerMoves = [];

Display.displayBoard(player.board.board, player.type);
Display.displayBoard(cpu.board.board, cpu.type);

let spaces = document.getElementsByClassName('space');

function init() {
  winner = null;

  cpu = Player('CPU', 'cpu');
  cpu.board.generateFleet();
  player = Player('Player', 'human');
  player.board.generateFleet();

  cpuMoves = [];
  playerMoves = [];

  Display.displayBoard(player.board.board, player.type);
  Display.displayBoard(cpu.board.board, cpu.type);

  spaces = document.getElementsByClassName('space');
}

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

function checkWinner(player, opponent) {
  if (opponent.board.allSunk()) {
    winner = player;
    console.log('The winner is ' + player.name);
    return true;
  }
}

function opponentMove() {
  const coords = cpu.sendRandomAttack();
  cpuMoves.push(coords);
  const result = player.receiveAttack(coords[0], coords[1]);
  Display.displayResult(cpu.name, player.name, result);
  Display.displayBoard(player.board.board, player.type);
  checkWinner(cpu, player);
}

function playerMove(x, y) {
  if (!winner) {
    if (player.sendAttack(x, y)) {
      const result = cpu.receiveAttack(x, y);
      Display.displayResult(player.name, cpu.name, result);
      Display.displayBoard(cpu.board.board, cpu.type);
      if (!checkWinner(player, cpu)) {
        spaces = document.getElementsByClassName('space');
        setTimeout(function () {
          opponentMove();
        }, 250);

        domAttack();
      }
    }
  }
}

startButton.addEventListener('click', () => {
  if (startButton.innerHTML === 'New game') {
    init();
  }
  domAttack();
  startButton.innerHTML = 'New game';
});
