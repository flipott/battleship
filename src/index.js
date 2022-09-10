import Gameboard from './gameboard';
import Player from './player';
import Ship from './ship';
import DisplayBoard from './displayBoard';

const user = Player('Player', 'human');
DisplayBoard(user.board.board, user.type);
user.board.generateFleet();
DisplayBoard(user.board.board, user.type);
