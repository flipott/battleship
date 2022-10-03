import Ship from './ship.js';

test('get ship properties', () => {
  const destroyer = Ship('destroyer', [3, 2], 3);
  expect(destroyer.name).toBe('destroyer');
  expect(destroyer.coords).toStrictEqual([3, 2]);
  expect(destroyer.length).toBe(3);
  expect(destroyer.hitArray.length).toBe(0);
  expect(destroyer.sunk).toBeFalsy();

  const otherShip = Ship('other', [1, 2], 1);
  expect(otherShip.length).toBe(1);
});

test('hit ship', () => {
  const destroyer = Ship('destroyer', [3, 2], 3);
  destroyer.hit([1, 2]);
  expect(destroyer.hitArray).toStrictEqual([[1, 2]]);
});

test('check sunk status', () => {
  const destroyer = Ship('destroyer', [3, 2], 3);
  destroyer.hit([1, 2]);
  expect(destroyer.isSunk()).toBeFalsy();
  destroyer.hit([1, 3]);
  destroyer.hit([1, 4]);
  expect(destroyer.isSunk()).toBeTruthy();
});
