const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');

let turnO = true;

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
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = '';
  });
  msgContainer.classList.add('hide');
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const showWinner = (winner) => {
  msg.textContent = `Congratulations! ${winner} wins.`;
  msgContainer.classList.remove('hide');
  disableBoxes();
};

const showDraw = () => {
  msg.textContent = 'Game is a draw.';
  msgContainer.classList.remove('hide');
  disableBoxes();
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const first = boxes[a].textContent;
    const second = boxes[b].textContent;
    const third = boxes[c].textContent;

    if (first && first === second && second === third) {
      showWinner(first);
      return true;
    }
  }

  const isDraw = [...boxes].every((box) => box.textContent !== '');
  if (isDraw) {
    showDraw();
    return true;
  }

  return false;
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    box.textContent = turnO ? 'O' : 'X';
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
