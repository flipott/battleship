const playerDiv = document.querySelector('.player-board');
const cpuDiv = document.querySelector('.cpu-board');

const DisplayBoard = (playerBoard, playerType) => {
  if (playerType === 'human') {
    playerDiv.innerHTML = '';

    for (let i = 0; i < playerBoard.length; i += 1) {
      const space = document.createElement('div');
      space.className = 'space';
      space.setAttribute('x', playerBoard[i].x);
      space.setAttribute('y', playerBoard[i].y);
      space.setAttribute('occupiedBy', playerBoard[i].occupiedBy);
      space.setAttribute('empty', playerBoard[i].empty);
      space.innerText = `${playerBoard[i].x}, ${playerBoard[i].y}`;
      playerDiv.appendChild(space);
    }
  }
};

export default DisplayBoard;
