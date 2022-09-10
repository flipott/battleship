/* eslint-disable no-undef */
import Player from './player';

test('get player properties', () => {
  const player = Player('Joe', 'human');
  const playerBoard = player.board.board;
  expect(player.name).toBe('Joe');
  expect(player.type).toBe('human');
  expect(playerBoard.length).toBe(100);
});

test('receive attack', () => {
  const player = Player('Joe', 'human');
  player.board.generateFleet();
  player.receiveAttack(4, 2);
  expect(player.board.getSpace(4, 2).empty).toBeFalsy();
});

test('get random attack coordinates', () => {
  const cpu = Player('CPU', 'cpu');
  cpu.sendRandomAttack();
  cpu.sendRandomAttack();
  cpu.sendRandomAttack();
  expect(cpu.sentAttacks.length).toBe(3);
});
