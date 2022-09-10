const Ship = (shipName, shipCoords, shipLength) => {
  const name = shipName;
  const coords = shipCoords;
  const length = shipLength;
  const hitArray = [];
  const sunk = false;

  const hit = (hitCoords) => {
    hitArray.push(hitCoords);
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
