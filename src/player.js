import Gameboard from './gameboard.js';

const Player = (playerName, playerType) => {
  const name = playerName;
  const type = playerType;
  const board = Gameboard(name);
  const sentAttacks = [];

  // Receives attack coordinates to send to board
  function receiveAttack(xCoord, yCoord) {
    return board.receiveAttack(xCoord, yCoord);
  }

  // Adds requested attack to array if valid
  function sendAttack(x, y) {
    // If space has already been selected, return false
    for (let i = 0; i < sentAttacks.length; i += 1) {
      if (sentAttacks[i][0] === x && sentAttacks[i][1] === y) {
        return false;
      }
    }

    sentAttacks.push([x, y]);
    return true;
  }

  // Returns random coordinates to attack
  function getRandomCoords() {
    let randomCoords = null;

    // Makes sure random coordinates are valid
    function verifyNotAttacked(x, y) {
      let verify = true;

      for (let i = 0; i < sentAttacks.length; i += 1) {
        if (sentAttacks[i][0] === x && sentAttacks[i][1] === y) {
          verify = false;
        }
      }

      return verify;
    }

    for (let i = 0; i < 100; i += 1) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      if (verifyNotAttacked(x, y)) {
        randomCoords = [x, y];
        sentAttacks.push(randomCoords);
        break;
      } else {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }

    return randomCoords;
  }

  return {
    name,
    type,
    board,
    receiveAttack,
    getRandomCoords,
    sentAttacks,
    sendAttack,
  };
};

export default Player;
