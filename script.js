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
