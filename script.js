// 🎯 Number Guessing Game Logic

// Generate a random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;

// Track guesses in an array
let guesses = [];

// Count attempts
let attempts = 0;

// DOM Elements
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const feedback = document.getElementById("feedback");
const guessList = document.getElementById("guessList");
const attemptCount = document.getElementById("attemptCount");

// --- Event: Click Guess Button ---
guessBtn.onclick = function () {
    processGuess();
};

// --- Event: Enter key press in input ---
guessInput.onkeydown = function (event) {
    if (event.key === "Enter") {
        processGuess();
    }
};

// --- Event: Change event for input validation ---
guessInput.onchange = function () {
    if (guessInput.value < 1 || guessInput.value > 100) {
        feedback.innerHTML = "❗ Please enter a number between 1 and 100!";
    }
};

// --- Event: Reset Button ---
resetBtn.onclick = function () {
    resetGame();
};

// Function to handle a guess
function processGuess() {
    const userGuess = Number(guessInput.value);

    // Validate input
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        feedback.innerHTML = "🙅‍♂️ Invalid guess. Enter 1–100.";
        return;
    }

    // Add guess to list and update counts
    guesses.push(userGuess);
    attempts++;
    attemptCount.innerHTML = attempts;
    guessList.innerHTML = guesses.join(", ");

    // Conditional logic
    if (userGuess === secretNumber) {
        feedback.innerHTML = "🎉 Correct! You guessed the number!";
        guessBtn.disabled = true; // disables further guessing
    } else if (userGuess < secretNumber) {
        feedback.innerHTML = "⬆️ Too low! Try higher.";
    } else {
        feedback.innerHTML = "⬇️ Too high! Try lower.";
    }

    // Clear input
    guessInput.value = "";
}

// Reset game to start fresh
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    attempts = 0;
    attemptCount.innerHTML = attempts;
    guessList.innerHTML = "";
    feedback.innerHTML = "Game reset! Enter a new guess 👇";
    guessBtn.disabled = false;
    guessInput.value = "";
}

// Only bind events if we're on game.html
if (document.getElementById("guessBtn")) {
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const resetBtn = document.getElementById("resetBtn");
  const feedback = document.getElementById("feedback");
  const guessList = document.getElementById("guessList");
  const attemptCount = document.getElementById("attemptCount");

  guessBtn.onclick = () => processGuess();
  guessInput.onkeydown = (e) => { if (e.key === "Enter") processGuess(); };
  guessInput.onchange = () => {
    if (guessInput.value < 1 || guessInput.value > 100) {
      feedback.innerHTML = "❗ Enter a number between 1 and 100!";
    }
  };
  resetBtn.onclick = () => resetGame();

  function processGuess() {
    const guess = Number(guessInput.value);
    if (guess < 1 || guess > 100 || isNaN(guess)) {
      feedback.innerHTML = "❌ Invalid input.";
      return;
    }

    guesses.push(guess);
    attempts++;
    attemptCount.innerHTML = attempts;
    guessList.innerHTML = guesses.join(", ");

    if (guess === secretNumber) {
      window.location.href = "win.html"; // Navigate to win screen
    } else if (guess < secretNumber) {
      feedback.innerHTML = "⬆️ Too low!";
    } else {
      feedback.innerHTML = "⬇️ Too high!";
    }

    guessInput.value = "";
  }

  function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    attempts = 0;
    guessList.innerHTML = "None";
    attemptCount.innerHTML = "0";
    feedback.innerHTML = "Game reset. Try again!";
    guessInput.value = "";
  }
}

let level = Number(sessionStorage.getItem("level")) || 2;
let ranges = {1: 50, 2: 100, 3: 200};
let maxNumber = ranges[level] || 100;


if (document.getElementById("guessBtn")) {
    const guessInput = document.getElementById("guessInput");
    const guessBtn = document.getElementById("guessBtn");
    const resetBtn = document.getElementById("resetBtn");
    const feedback = document.getElementById("feedback");
    const guessList = document.getElementById("guessList");
    const attemptCount = document.getElementById("attemptCount");
    const levelText = document.getElementById("levelText");

    levelText.innerText = `Level ${level} — Guess between 1 and ${maxNumber}`;

    guessBtn.onclick = () => processGuess();
    guessInput.onkeydown = (e) => { if (e.key === "Enter") processGuess(); };
    resetBtn.onclick = () => resetGame();

    function processGuess() {
        const guess = Number(guessInput.value);
        if (guess < 1 || guess > maxNumber || isNaN(guess)) {
            feedback.innerHTML = `⚠️ Enter between 1 and ${maxNumber}`;
            return;
        }

        guesses.push(guess);
        attempts++;
        attemptCount.innerHTML = attempts;
        guessList.innerHTML = guesses.join(", ");

        if (guess === secretNumber) {
            sessionStorage.setItem("nextLevel", level + 1);
            window.location.href = "win.html";
        } else if (guess < secretNumber) {
            feedback.innerHTML = "⬆️ Too low!";
        } else {
            feedback.innerHTML = "⬇️ Too high!";
        }

        guessInput.value = "";
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * maxNumber) + 1;
        guesses = [];
        attempts = 0;
        attemptCount.innerHTML = "0";
        guessList.innerHTML = "None";
        feedback.innerHTML = "🔄 Game reset. Start guessing!";
        guessInput.value = "";
    }
}
