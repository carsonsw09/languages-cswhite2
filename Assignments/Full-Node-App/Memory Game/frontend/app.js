const playerSelect = document.getElementById('player-select');
const gameBoard = document.getElementById('game-board');
const messageDisplay = document.getElementById('message');

// Fetch and display players
async function fetchPlayers() {
  const response = await fetch('/players');
  const players = await response.json();
  
  playerSelect.innerHTML = '';  // Clear previous player buttons

  players.forEach(player => {
    const playerButton = document.createElement('button');
    playerButton.innerText = player.username;
    playerButton.addEventListener('click', () => startGame(player.id));
    playerSelect.appendChild(playerButton);
  });

  // Add the "Add New User" button
  const newPlayerButton = document.createElement('button');
  newPlayerButton.innerText = 'Add New User';
  newPlayerButton.addEventListener('click', addNewPlayer);
  playerSelect.appendChild(newPlayerButton);
}

// Add a new user (Player4, Player5, etc.)
async function addNewPlayer() {
  const response = await fetch('/new-player', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const newPlayer = await response.json();
  showMessage(`New player created: ${newPlayer.username}`);
  fetchPlayers();  // Refresh the player list
}

// Start the game for the selected player
function startGame(playerId) {
  showMessage(`Starting game for player ${playerId}`);
  // Call your existing game logic here, passing the playerId to save the game session later
}

function showMessage(message) {
  messageDisplay.innerText = message;
}

// Initialize player selection
fetchPlayers();
