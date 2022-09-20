const playerDiv = document.querySelector('.player-board');
const cpuDiv = document.querySelector('.cpu-board');
const resultDiv = document.querySelector('.results');
const htmlShips = document.querySelector('.player .ships');

const Display = {
  // Generates HTML board
  displayBoard(playerBoard, playerType) {
    if (playerType === 'human') {
      playerDiv.innerHTML = '';

      for (let i = 0; i < playerBoard.length; i += 1) {
        const space = document.createElement('div');
        space.className = 'space';
        space.setAttribute('x', playerBoard[i].x);
        space.setAttribute('y', playerBoard[i].y);
        space.setAttribute('occupiedBy', playerBoard[i].occupiedBy);
        space.setAttribute('empty', playerBoard[i].empty);
        if (playerBoard[i].hitStatus === 'hit') {
          space.setAttribute('hitstatus', 'hit');
        }
        playerDiv.appendChild(space);
      }
    } else if (playerType === 'cpu') {
      cpuDiv.innerHTML = '';

      for (let i = 0; i < playerBoard.length; i += 1) {
        const space = document.createElement('div');
        space.className = 'space';
        space.setAttribute('x', playerBoard[i].x);
        space.setAttribute('y', playerBoard[i].y);

        if (playerBoard[i].occupiedBy === 'missed') {
          space.setAttribute('occupiedBy', 'missed');
        }

        if (playerBoard[i].hitStatus === 'hit') {
          space.setAttribute('hitStatus', 'hit');
        }

        space.setAttribute('empty', null);
        cpuDiv.appendChild(space);
      }
    }
  },
  // Displays HTML results
  displayResult(player, opponent, result) {
    switch (result[0]) {
      case 'missed':
        resultDiv.innerHTML += `${player} attacks ${opponent} and misses.<br>`;
        break;
      case 'hit':
        resultDiv.innerHTML += `${player} attacks and hits ${opponent}'s ${result[1]}.<br>`;
        break;
      case 'sunk':
        resultDiv.innerHTML += `${player} attacks and sinks ${opponent}'s ${result[1]}!<br>`;
        break;
      case 'winner':
        resultDiv.innerHTML += `${player} sinks ${opponent}'s fleet and wins!`;
        break;
      default:
        console.log('Invalid move.');
        break;
    }
  },
  // Clears HTML results
  clearResults() {
    resultDiv.innerHTML = '';
  },
  shipHighlight(shipName, highlight) {
    const selectedShip = document.querySelector('.player .' + shipName);

    if (highlight === 'select') {
      for (let i = 0; i < htmlShips.children.length; i += 1) {
        if (htmlShips.children[i].classList.contains('select')) {
          htmlShips.children[i].classList.remove('select');
        }
      }
      if (!selectedShip.classList.contains('deselect')) {
        selectedShip.classList.add('select');
      }
    } else if (highlight === 'deselect') {
      if (selectedShip.classList.contains('select')) {
        selectedShip.classList.remove('select');
      }
      selectedShip.classList.add('deselect');
    }
  },
};

export default Display;
