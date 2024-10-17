const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best-time');  // Best time display element
const messageDisplay = document.getElementById('message');      // New message element

let cards = [];
let flippedCards = [];
let matchesFound = 0;
let score = 0;
let timerInterval;
let timer = 0;
let bestTime = null;  // Store the best time

// Initialize game
function startGame() {
  generateCards();
  showMessage('Wait for 10 seconds and then guess the matching cards.');
  showCardsTemporarily();
  startTimer();
}

// Generate the cards for the game (16 cards, 8 pairs)
function generateCards() {
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  cardValues.sort(() => Math.random() - 0.5);  // Shuffle the card values

  board.innerHTML = '';  // Clear the board
  cardValues.forEach((value, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = value;
    cardElement.dataset.index = index;
    cardElement.innerText = value;  // Show value temporarily
    cardElement.addEventListener('click', () => handleCardClick(cardElement));
    board.appendChild(cardElement);
  });

  cards = cardValues;
}

// Temporarily show the cards for 10 seconds
function showCardsTemporarily() {
  setTimeout(() => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
      card.classList.remove('flipped');
      card.innerText = '';  // Hide the numbers after 10 seconds
    });
    showMessage('Now, start guessing the matching cards!');
  }, 10000);
}

// Handle card click logic (flip and check for matches)
function handleCardClick(cardElement) {
  if (!cardElement.classList.contains('flipped') && flippedCards.length < 2) {
    cardElement.classList.add('flipped');
    cardElement.innerText = cardElement.dataset.value;
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if the two flipped cards match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    score += 10;  // Increase score for a correct match
    updateScore();
    matchesFound++;
    flippedCards = [];

    if (matchesFound === 8) {  // All pairs found
      endGame();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.innerText = '';
      secondCard.innerText = '';
      flippedCards = [];
    }, 1000);  // Wait 1 second before flipping back
  }
}

// Timer logic to track game time
function startTimer() {
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${minutes}:${seconds}`;
  }, 1000);
}

// Stop the timer when the game ends
function stopTimer() {
  clearInterval(timerInterval);
}

// End the game and show the final score and time
function endGame() {
  stopTimer();
  showMessage('All cards have been matched!');

  // Check for a new best time
  if (bestTime === null || timer < bestTime) {
    bestTime = timer;
    bestTimeDisplay.innerText = `Best Time: ${timer} seconds`;  // Update best time display
  }

  setTimeout(() => {
    resetGame();  // Restart the game after a short delay
  }, 5000);
}

// Reset the game
function resetGame() {
  matchesFound = 0;
  score = 0;
  flippedCards = [];
  startGame();
}

// Update the score display
function updateScore() {
  scoreDisplay.innerText = `Score: ${score}`;
}

// Show a message to the player
function showMessage(message) {
  messageDisplay.innerText = message;
}

// Initialize the game
startGame();
