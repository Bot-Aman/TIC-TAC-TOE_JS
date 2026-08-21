const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#new-btn');
const status = document.querySelector('.status');
const result = document.querySelector('#msg');

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetGame = () => {
  turnO = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = '';
  });
  status.textContent = 'Player O starts';
  result.textContent = '';
};

const finishGame = (message) => {
  gameOver = true;
  boxes.forEach((box) => {
    box.disabled = true;
  });
  status.textContent = message;
  result.textContent = message;
};

const checkWinner = () => {
  for (const [a, b, c] of winPatterns) {
    const value = boxes[a].textContent;
    if (value && value === boxes[b].textContent && value === boxes[c].textContent) {
      finishGame(`Congratulations! Player ${value} wins.`);
      return;
    }
  }

  if ([...boxes].every((box) => box.textContent !== '')) {
    finishGame("It's a draw.");
    return;
  }

  status.textContent = `Player ${turnO ? 'O' : 'X'}'s turn`;
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (gameOver || box.textContent) return;

    const player = turnO ? 'O' : 'X';
    box.textContent = player;
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
