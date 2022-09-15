import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import DisplayBoard from './displayBoard.js';

let winner = null;
console.log('HERE WE ARE');

const cpu = Player('CPU', 'cpu');
cpu.board.generateFleet();
const player = Player('Player', 'human');
player.board.generateFleet();

DisplayBoard(player.board.board, player.type);
DisplayBoard(cpu.board.board, cpu.type);

let spaces = document.getElementsByClassName('space');

function playerMove(x, y) {
  console.log(`${x} ${y}`);
  cpu.receiveAttack(x, y);
  DisplayBoard(cpu.board.board, cpu.type);
  spaces = document.getElementsByClassName('space');
  for (let i = 0; i < 100; i += 1) {
    spaces[i].addEventListener('click', (e) => {
      playerMove(
        parseInt(e.target.getAttribute('x'), 10),
        parseInt(e.target.getAttribute('y'), 10)
      );
    });
  }
}

for (let i = 0; i < 100; i += 1) {
  spaces[i].addEventListener('click', (e) => {
    playerMove(
      parseInt(e.target.getAttribute('x')),
      parseInt(e.target.getAttribute('y'))
    );
  });
}
