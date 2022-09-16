import Gameboard from './gameboard.js';

const Player = (playerName, playerType) => {
  const name = playerName;
  const type = playerType;
  const board = Gameboard(name);
  const sentAttacks = [];

  function receiveAttack(xCoord, yCoord) {
    return board.receiveAttack(xCoord, yCoord);
  }

  function sendAttack(x, y) {
    for (let i = 0; i < sentAttacks.length; i += 1) {
      if (sentAttacks[i][0] === x && sentAttacks[i][1] === y) {
        console.log('You already chose this space.');
        return false;
      }
    }
    sentAttacks.push([x, y]);
    return true;
  }

  function sendRandomAttack() {
    let randomCoords = null;

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
    sendRandomAttack,
    sentAttacks,
    sendAttack,
  };
};

export default Player;
