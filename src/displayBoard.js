const playerDiv = document.querySelector('.player-board');
const cpuDiv = document.querySelector('.cpu-board');
const resultDiv = document.querySelector('.results');
const playerShips = document.querySelector('.player .ships');
const allShips = document.querySelectorAll('.ships');
const instructions = document.querySelector('.player-instruction');
const randomBtn = document.getElementById('random-board');

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
        if (player === 'Player') {
          document.querySelector('.player-instruction').innerText = 'You win!';
        } else {
          document.querySelector('.player-instruction').innerText = 'You lose!';
        }
        break;
      default:
        break;
    }
  },
  // Clears HTML results
  clearResults() {
    resultDiv.innerHTML = '';

    for (let i = 0; i < allShips.length; i += 1) {
      for (let j = 0; j < allShips[i].children.length; j += 1) {
        if (allShips[i].children[j].classList.contains('select')) {
          allShips[i].children[j].classList.remove('select');
        }
        if (allShips[i].children[j].classList.contains('placed')) {
          allShips[i].children[j].classList.remove('placed');
        }
        if (allShips[i].children[j].classList.contains('sunk')) {
          allShips[i].children[j].classList.remove('sunk');
        }
      }
    }

    const sheet = document.styleSheets[0];

    for (let i = 0; i < sheet.cssRules.length; i += 1) {
      if (sheet.cssRules[i].selectorText === '.cpu .space') {
        sheet.deleteRule(i--);
      }
    }
  },
  // Highlights selected ship
  shipHighlight(shipName, highlight) {
    if (shipName === 'all') {
      for (let i = 0; i < playerShips.children.length; i += 1) {
        playerShips.children[i].classList.add('placed');
      }
      return;
    }

    const selectedShip = document.querySelector('.player .' + shipName);

    if (highlight === 'select') {
      for (let i = 0; i < playerShips.children.length; i += 1) {
        if (playerShips.children[i].classList.contains('select')) {
          playerShips.children[i].classList.remove('select');
        }
      }
      if (!selectedShip.classList.contains('placed') && shipName !== 'all') {
        selectedShip.classList.add('select');
      }
    } else if (highlight === 'placed') {
      if (selectedShip.classList.contains('select')) {
        selectedShip.classList.remove('select');
      }
      selectedShip.classList.add('placed');
    }
  },
  // Displays message when a new game is started
  newGameMessage() {
    instructions.innerText = 'Please position your fleet on your board.';
    document.querySelector('.message').style.visibility = 'visible';
    randomBtn.style.visibility = 'visible';
  },
  // Highlights spaces that are hovered over
  showHover(validity, coords) {
    for (let i = 0; i < coords.length; i += 1) {
      for (let j = 0; j < playerDiv.children.length; j += 1) {
        const divX = parseInt(playerDiv.children[j].getAttribute('x'), 10);
        const divY = parseInt(playerDiv.children[j].getAttribute('y'), 10);
        if (coords[i][0] === divX && coords[i][1] === divY) {
          if (validity) {
            playerDiv.children[j].classList.add('hoverValid');
          } else {
            playerDiv.children[j].classList.add('hoverInvalid');
          }
        }
      }
    }
  },
  // Removes highlight from hovered over spaces
  hideHover() {
    for (let i = 0; i < playerDiv.children.length; i += 1) {
      if (playerDiv.children[i].classList.contains('hoverValid')) {
        playerDiv.children[i].classList.remove('hoverValid');
      }
      if (playerDiv.children[i].classList.contains('hoverInvalid')) {
        playerDiv.children[i].classList.remove('hoverInvalid');
      }
    }
  },
};

export default Display;
