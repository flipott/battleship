/* eslint-disable no-undef */
import Gameboard from './gameboard';

test('verify board length', () => {
  const playerBoard = Gameboard('player');
  expect(playerBoard.board.length).toBe(100);
});

test('verify space occupation status', () => {
  const playerBoard = Gameboard('player');
  expect(playerBoard.getSpace(3, 2).empty).toBeTruthy();
  expect(playerBoard.getSpace(3, 1).occupiedBy).toBeNull();

  playerBoard.getSpace(3, 2).empty = false;
  playerBoard.getSpace(3, 1).occupiedBy = 'Player';
  expect(playerBoard.getSpace(3, 2).empty).toBeFalsy();
  expect(playerBoard.getSpace(3, 1).occupiedBy).toBe('Player');
});
