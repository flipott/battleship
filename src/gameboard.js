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

  const getSpace = (xCoord, yCoord) => {
    for (let i = 0; i < board.length; i += 1) {
      if (board[i].x === xCoord && board[i].y === yCoord) {
        return board[i];
      }
    }
    return false;
  };

  const generateFleet = () => {
    for (let i = 0; i < board.length; i += 1) {
      let startX = Math.floor(Math.random() * 10);
      let startY = Math.floor(Math.random() * 10);
      if (getSpace(startX, startY).empty) {
        let startingCoords = [startX, startY];
        break;
      } else {
        startX = Math.floor(Math.random() * 10);
        startY = Math.floor(Math.random() * 10);
      }
    }

    let carrier = Ship('carrier', coords, 5);
  };

  // 5 4 3 3 2

  return { owner, board, getSpace };
};

export default Gameboard;
