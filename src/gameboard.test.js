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

test('generate fleet', () => {
  const playerBoard = Gameboard('player');
  playerBoard.generateFleet();
  const cpuBoard = Gameboard('cpu');
  cpuBoard.generateFleet();
});

test('verify ship collection', () => {
  const playerBoard = Gameboard('player');
  playerBoard.generateFleet();
  expect(playerBoard.ships.length).toBe(5);
});

test('receive shot', () => {
  const playerBoard = Gameboard('playerBoard');
  playerBoard.generateFleet();
  playerBoard.receiveAttack(9, 3);
  expect(playerBoard.getSpace(9, 3).empty).toBeFalsy();
});

test('sink all ships', () => {
  const playerBoard = Gameboard('player');
  playerBoard.generateFleet();

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      playerBoard.receiveAttack(i, j);
    }
  }
  expect(playerBoard.allSunk()).toBeTruthy();
});
