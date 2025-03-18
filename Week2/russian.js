const readline = require('readline');
const { setTimeout } = require('timers/promises');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask a question and get an answer
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// Game state
let players = ['Player 1', 'Player 2'];
let playerScores = [0, 0];
let currentPlayer = 0;
let bulletPosition = 0;
let chamberPosition = 0;

// ASCII art for revolver
const revolverArt = `
    ,---.
    |   |
    |   |
    |   |
    |   |.--.
    |   |__.'
    |   |
    |   |
    |   |
    '---'
`;

// Function to display title
function displayTitle() {
  console.clear();
  console.log('='.repeat(50));
  console.log('             RUSSIAN ROULETTE');
  console.log('='.repeat(50));
  console.log('\n');
}

// Function to display game state
function displayGameState() {
  console.clear();
  displayTitle();
  
  console.log('='.repeat(50));
  console.log(`${players[0]}: ${playerScores[0]} points`);
  console.log(`${players[1]}: ${playerScores[1]} points`);
  console.log('='.repeat(50));
  
  console.log(revolverArt);
  console.log(`Current player: ${players[currentPlayer]}`);
  console.log('='.repeat(50));
}

// Function to simulate pulling the trigger
async function pullTrigger() {
  displayGameState();
  
  console.log('\nSpinning the cylinder...');
  await setTimeout(1000);
  
  for (let i = 0; i < 3; i++) {
    process.stdout.write('.');
    await setTimeout(500);
  }
  
  console.log('\n');
  
  await setTimeout(1000);
  
  if (chamberPosition === bulletPosition) {
    console.log('BANG! 💥');
    console.log(`${players[currentPlayer]} was shot!`);
    
    // Other player gets a point
    const otherPlayer = currentPlayer === 0 ? 1 : 0;
    playerScores[otherPlayer]++;
    
    await setTimeout(2000);
    return true; // Player was shot
  } else {
    console.log('*click* 😅');
    console.log(`${players[currentPlayer]} survived this round!`);
    
    // Move to next chamber
    chamberPosition = (chamberPosition + 1) % 6;
    
    await setTimeout(2000);
    return false; // Player survived
  }
}

// Function to switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

// Function to check if game is over
function isGameOver() {
  return playerScores[0] >= 3 || playerScores[1] >= 3;
}

// Function to display game over
function displayGameOver() {
  console.clear();
  
  const winner = playerScores[0] > playerScores[1] ? players[0] : players[1];
  
  console.log('='.repeat(50));
  console.log('             GAME OVER');
  console.log('='.repeat(50));
  
  console.log('\n');
  console.log('='.repeat(50));
  console.log(`${winner} wins the game!`);
  console.log('='.repeat(50));
  console.log('\n');
  console.log(`${players[0]}: ${playerScores[0]} points`);
  console.log(`${players[1]}: ${playerScores[1]} points`);
}

// Main game function
async function startGame() {
  displayTitle();
  
  // Get player names
  players[0] = await question('Enter name for Player 1: ') || 'Player 1';
  players[1] = await question('Enter name for Player 2: ') || 'Player 2';
  
  // Initialize game
  bulletPosition = Math.floor(Math.random() * 6);
  chamberPosition = 0;
  
  let quit = false;
  
  while (!quit && !isGameOver()) {
    displayGameState();
    
    const answer = await question(`${players[currentPlayer]}, press Enter to pull the trigger or type 'quit' to exit: `);
    
    if (answer.toLowerCase() === 'quit') {
      quit = true;
      continue;
    }
    
    const wasShot = await pullTrigger();
    
    if (!wasShot) {
      switchPlayer();
    } else {
      // Reset chamber position and move bullet
      chamberPosition = 0;
      bulletPosition = Math.floor(Math.random() * 6);
    }
  }
  
  if (!quit) {
    displayGameOver();
  }
  
  await question('\nPress Enter to exit...');
  rl.close();
}

// Start the game
startGame();