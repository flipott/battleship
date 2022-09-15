const Ship = (shipName, shipCoords, shipLength) => {
  const name = shipName;
  const coords = shipCoords;
  const length = shipLength;
  const hitArray = [];
  const sunk = false;

  const hit = (hitCoords) => {
    for (let i = 0; i < hitArray.length; i += 1) {
      if (hitArray[i][0] === hitCoords[0] && hitArray[i][1] === hitCoords[1]) {
        return false;
      }
    }
    return hitArray.push(hitCoords);
  };

  const isSunk = () => {
    if (hitArray.length === length) {
      return true;
    }
    return false;
  };

  return { name, coords, length, hitArray, sunk, hit, isSunk };
};

export default Ship;
