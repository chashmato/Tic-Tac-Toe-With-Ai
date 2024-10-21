const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';  // User always starts as 'X'
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle user click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Handle cell click logic
function handleCellClick(index) {
  if (boardState[index] !== '' || !gameActive) return;

  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell !== '')) {
    endGame('Draw!');
  } else {
    currentPlayer = 'O'; // Switch to AI's turn
    statusDisplay.textContent = 'AI\'s turn...';
    setTimeout(aiMove, 500);  // AI makes a move after a short delay
  }
}

// AI's move logic
function aiMove() {
  let availableCells = boardState
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (availableCells.length === 0) return; // No moves left

  let aiChoice = availableCells[Math.floor(Math.random() * availableCells.length)];
  boardState[aiChoice] = 'O';
  cells[aiChoice].textContent = 'O';

  if (checkWin('O')) {
    endGame('AI wins!');
  } else if (boardState.every(cell => cell !== '')) {
    endGame('Draw!');
  } else {
    currentPlayer = 'X';
    statusDisplay.textContent = 'Your turn! (X)';
  }
}

// Check if a player has won
function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}

// End the game
function endGame(message) {
  gameActive = false;
  statusDisplay.textContent = message;
}

// Restart the game
restartButton.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = 'Your turn! (X)';
});
