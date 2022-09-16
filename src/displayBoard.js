const playerDiv = document.querySelector('.player-board');
const cpuDiv = document.querySelector('.cpu-board');

const Display = {
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
  displayResult(player, result) {
    console.log('WHAT');
    // switch (result) {
    //   case 'missed':
    //     console.log(`${player.name}'s shot missed.`);
    //     break;
    //   case 'hit':
    //     console.log('hit');
    //     break;
    //   default:
    //     console.log('WHAT');
    //     break;
    // }
  },
};

export default Display;
