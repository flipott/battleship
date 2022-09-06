import Ship from './ship';

const Gameboard = (boardOwner) => {
  const owner = boardOwner;
  const board = [];
  const missedShots = [];

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      board.push({ x: i, y: j, empty: true, occupiedBy: null });
    }
  }

  // Retrieves space on board
  const getSpace = (xCoord, yCoord) => {
    for (let i = 0; i < board.length; i += 1) {
      if (board[i].x === xCoord && board[i].y === yCoord) {
        return board[i];
      }
    }
    return false;
  };

  // Places ship on board
  const placeShip = (ship) => {
    for (let i = 0; i < ship.coords.length; i += 1) {
      const x = ship.coords[i][0];
      const y = ship.coords[i][1];
      getSpace(x, y).empty = false;
      getSpace(x, y).occupiedBy = ship.name;
    }
  };

  // Generates a random coordinate
  function randomStartingCoords() {
    let startingCoords = null;

    for (let i = 0; i < board.length; i += 1) {
      let startX = Math.floor(Math.random() * 10);
      let startY = Math.floor(Math.random() * 10);
      if (getSpace(startX, startY).empty) {
        startingCoords = [startX, startY];
        break;
      } else {
        startX = Math.floor(Math.random() * 10);
        startY = Math.floor(Math.random() * 10);
      }
    }

    return startingCoords;
  }

  // Generates a set of random coordinates
  function randomTotalCoords(startingCoords, shipLength) {
    const potentialArray = [];
    const x = startingCoords[0];
    const y = startingCoords[1];

    // x+
    if (
      getSpace(x, y).empty &&
      getSpace(x + 1, y).empty &&
      getSpace(x + 2, y).empty &&
      getSpace(x + 3, y).empty &&
      getSpace(x + 4, y).empty
    ) {
      const placeholderArray = [];
      placeholderArray.push([x, y]);
      placeholderArray.push([x + 1, y]);
      placeholderArray.push([x + 2, y]);
      placeholderArray.push([x + 3, y]);
      placeholderArray.push([x + 4, y]);
      potentialArray.push(placeholderArray);
    }

    // x-
    if (
      getSpace(x, y).empty &&
      getSpace(x - 1, y).empty &&
      getSpace(x - 2, y).empty &&
      getSpace(x - 3, y).empty &&
      getSpace(x - 4, y).empty
    ) {
      const placeholderArray = [];
      placeholderArray.push([x, y]);
      placeholderArray.push([x - 1, y]);
      placeholderArray.push([x - 2, y]);
      placeholderArray.push([x - 3, y]);
      placeholderArray.push([x - 4, y]);
      potentialArray.push(placeholderArray);
    }

    // y+
    if (
      getSpace(x, y).empty &&
      getSpace(x, y + 1).empty &&
      getSpace(x, y + 2).empty &&
      getSpace(x, y + 3).empty &&
      getSpace(x, y + 4).empty
    ) {
      const placeholderArray = [];
      placeholderArray.push([x, y]);
      placeholderArray.push([x, y + 1]);
      placeholderArray.push([x, y + 2]);
      placeholderArray.push([x, y + 3]);
      placeholderArray.push([x, y + 4]);
      potentialArray.push(placeholderArray);
    }

    // y-
    if (
      getSpace(x, y).empty &&
      getSpace(x, y - 1).empty &&
      getSpace(x, y - 2).empty &&
      getSpace(x, y - 3).empty &&
      getSpace(x, y - 4).empty
    ) {
      const placeholderArray = [];
      placeholderArray.push([x, y]);
      placeholderArray.push([x, y - 1]);
      placeholderArray.push([x, y - 2]);
      placeholderArray.push([x, y - 3]);
      placeholderArray.push([x, y - 4]);
      potentialArray.push(placeholderArray);
    }

    // Returns one random set of coords
    let slicedArr =
      potentialArray[Math.floor(Math.random() * potentialArray.length)];

    if (slicedArr) {
      slicedArr = slicedArr.slice(0, shipLength);
    } else {
      return generateFleet();
    }

    return slicedArr;
  }

  // Randomly generates and places a fleet on board
  const generateFleet = () => {
    const carrierStart = randomStartingCoords();
    const carrierCoords = randomTotalCoords(carrierStart, 5);
    const carrier = Ship('carrier', carrierCoords, 5);
    placeShip(carrier);

    const battleshipStart = randomStartingCoords();
    const battleshipCoords = randomTotalCoords(battleshipStart, 4);
    const battleship = Ship('battleship', battleshipCoords, 4);
    placeShip(battleship);

    const destroyerStart = randomStartingCoords();
    const destroyerCoords = randomTotalCoords(destroyerStart, 3);
    const destroyer = Ship('destroyer', destroyerCoords, 3);
    placeShip(destroyer);

    const submarineStart = randomStartingCoords();
    const submarineCoords = randomTotalCoords(submarineStart, 3);
    const submarine = Ship('submarine', submarineCoords, 3);
    placeShip(submarine);

    const patrolStart = randomStartingCoords();
    const patrolCoords = randomTotalCoords(patrolStart, 2);
    const patrol = Ship('patrol', patrolCoords, 2);
    placeShip(patrol);
  };

  return { owner, board, getSpace, generateFleet };
};

export default Gameboard;
