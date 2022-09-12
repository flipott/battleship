import Gameboard from './gameboard';
import Player from './player';
import Ship from './ship';
import DisplayBoard from './displayBoard';

let winner = null;

const cpu = Player('CPU', 'cpu');
cpu.board.generateFleet();
const player = Player('Player', 'human');
player.board.generateFleet();

DisplayBoard(cpu.board.board, cpu.type);
DisplayBoard(player.board.board, player.type);

const test = document.getElementsByClassName('space');

function playerMove(x, y) {
  console.log(`${x} ${y}`);
  cpu.receiveAttack(x, y);
}

if (!winner) {
  for (let i = 0; i < 100; i += 1) {
    test[i].addEventListener('click', (e) => {
      playerMove(e.target.getAttribute('x'), e.target.getAttribute('y'));
    });
  }
}
