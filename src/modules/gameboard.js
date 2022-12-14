import Ship from './ship.js';

const Gameboard = (boardOwner) => {
  const owner = boardOwner;
  const board = [];
  const ships = [];
  const missedShots = [];

  function createBoard() {
    for (let i = 9; i >= 0; i -= 1) {
      for (let j = 0; j < 10; j += 1) {
        board.push({
          x: j,
          y: i,
          empty: true,
          occupiedBy: null,
          hitStatus: null,
        });
      }
    }
  }

  createBoard();

  // Retrieves space on board
  const getSpace = (xCoord, yCoord) => {
    for (let i = 0; i < board.length; i += 1) {
      if (board[i].x === xCoord && board[i].y === yCoord) {
        return board[i];
      }
    }
    return false;
  };

  // Retrieves ship object from fleet
  const getShip = (shipName) => {
    for (let i = 0; i < ships.length; i += 1) {
      if (ships[i].name === shipName) {
        return ships[i];
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
    ships.push(ship);
  };

  // Receives an attack and adjusts board accordingly
  const receiveAttack = (xCoord, yCoord) => {
    if (getSpace(xCoord, yCoord).empty) {
      getSpace(xCoord, yCoord).occupiedBy = 'missed';
      getSpace(xCoord, yCoord).empty = false;
      missedShots.push([xCoord, yCoord]);
      return ['missed'];
    }

    if (
      !getSpace(xCoord, yCoord).empty &&
      getSpace(xCoord, yCoord).occupiedBy !== 'missed'
    ) {
      const hitShip = getSpace(xCoord, yCoord).occupiedBy;
      getShip(hitShip).hit([xCoord, yCoord]);
      getSpace(xCoord, yCoord).hitStatus = 'hit';
      const hitArr = ['hit', hitShip];

      if (getShip(hitShip).isSunk()) {
        getShip(hitShip).sunk = true;
        hitArr[0] = 'sunk';
      }

      return hitArr;
    }
  };

  // Checks if fleet has been sunk
  const allSunk = () => {
    if (
      ships[0].sunk &&
      ships[1].sunk &&
      ships[2].sunk &&
      ships[3].sunk &&
      ships[4].sunk
    ) {
      return true;
    }
    return false;
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

    // Run the function again if no coordinates work
    if (slicedArr) {
      slicedArr = slicedArr.slice(0, shipLength);
    } else {
      const errorCoords = randomStartingCoords();
      return randomTotalCoords(errorCoords, shipLength);
    }

    return slicedArr;
  }

  // Removes nonexistent spaces from a coordinate array
  const removeFalseSpaces = (coordArray) => {
    const newArray = [];

    for (let i = 0; i < coordArray.length; i += 1) {
      if (
        coordArray[i][0] >= 0 &&
        coordArray[i][0] <= 9 &&
        coordArray[i][1] >= 0 &&
        coordArray[i][1] <= 9
      ) {
        newArray.push([coordArray[i][0], coordArray[i][1]]);
      }
    }
    return newArray;
  };

  // Place ships manually based on space selection
  const manuallyPlaceShip = (shipName, coords, direction, hover = false) => {
    let length = null;
    const totalCoords = [coords];
    const name = shipName.charAt(0).toLowerCase() + shipName.slice(1);

    switch (name) {
      case 'carrier':
        length = 5;
        break;
      case 'battleship':
        length = 4;
        break;
      case 'destroyer':
        length = 3;
        break;
      case 'submarine':
        length = 3;
        break;
      case 'patrol':
        length = 2;
        break;
      default:
    }

    if (direction === 'vertical') {
      let startingY = coords[1];
      for (let i = 1; i < length; i += 1) {
        totalCoords.push([coords[0], startingY - 1]);
        startingY -= 1;
      }
    } else {
      let startingX = coords[0];
      for (let i = 1; i < length; i += 1) {
        totalCoords.push([startingX + 1, coords[1]]);
        startingX += 1;
      }
    }

    for (let i = 0; i < totalCoords.length; i += 1) {
      const x = totalCoords[i][0];
      const y = totalCoords[i][1];

      if (!getSpace(x, y).empty) {
        return [false, removeFalseSpaces(totalCoords)];
        // return false;
      }
    }

    for (let i = 0; i < ships.length; i += 1) {
      if (ships[i].name === name) {
        return false;
      }
    }

    if (!hover) {
      const ship = Ship(name, totalCoords, length);
      placeShip(ship);
      return true;
    }

    return [true, totalCoords];
  };

  // Randomly generates and places a fleet on board
  const generateFleet = () => {
    while (board.length) {
      board.pop();
    }
    while (ships.length) {
      ships.pop();
    }

    createBoard();

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

  return {
    owner,
    board,
    getSpace,
    generateFleet,
    receiveAttack,
    manuallyPlaceShip,
    ships,
    allSunk,
  };
};

export default Gameboard;
