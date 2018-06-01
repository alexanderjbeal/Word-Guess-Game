// Grab reference to DOM Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// Create variables for game (wordBank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['Ethereum', 'Bitcoin', 'POA Network', 'Blockchain', 'Interoperability', 'Governance'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// newGame function to reset all stats, pick new word and create placeholders
function newGame() {
  // Reset all game info
  gameRunning = true;
  guessesLeft = 8;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArr = [];

  // Pick a new word
  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  // Create placeholders for new picked word
  for (var i = 0; i < pickedWord.length; i++ ) {
    if (pickedWord[i] === ' ') {
      pickedWordPlaceholderArr.push(' ');
    } else {
      pickedWordPlaceholderArr.push('_');
    }
  }

  // Write new game info to DOM
  $guessesLeft.textContent = guessesLeft;
  $placeholders.textContent = pickedWordPlaceholderArr.join(' ');
  $guessedLetters.textContent = incorrectLetterBank;
}

// letterGuess function takes in the letter you pressed and sees if it's in the selected word
function letterGuess(letter) {

  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    // Run Game Logic
    guessedLetterBank.push(letter);

    // Check if guessed letter is in my picked word
    for (var i = 0; i < pickedWord.length; i++) {
      // Convert both keys to lower case to compare correctly
      if (pickedWord[i].toLowerCase() === letter.toLowerCase() ) {
        // If it's a match, swap out letter from placeholder with letter from wordBank
        pickedWordPlaceholderArr[i] = pickedWord[i];
      }
    }

    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    // Passed letter into the checkIncorrect function
    checkIncorrect(letter);

  } else {
    if(!gameRunning) {
      alert('Click on the New Game Button to Start Over');
    } else {
      alert("You've already guessed this letter. Try again");
    }
  }
}

// Check incorrect letter
function checkIncorrect(letter) {
    // Check to see if user guess is an incorrect guess
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        // Decrement guesses
        guessesLeft--;
        // Add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        // Write new bank of incorrect letters guessed to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // Write new amount of guesses left to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// Check lose
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

// Check win
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}

// Add event listener for new game button
$newGameButton.addEventListener('click', newGame);

// on onkeyup event to trigger letterGuess
document.onkeyup = function(event) {
  if(event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
}

