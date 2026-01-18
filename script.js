// Get the selected level from sessionStorage or default to level 2
let level = Number(sessionStorage.getItem("level")) || 2;

// Define ranges for each level
let ranges = {
    1: 50,
    2: 100,
    3: 200
};

// Set maximum number based on level
let maxNumber = ranges[level] || 100;

// Generate a secret number between 1 and maxNumber
let secretNumber = Math.floor(Math.random() * maxNumber) + 1;

// Track guesses and attempts
let guesses = [];
let attempts = 0;

// Only run game logic if on game.html
if (document.getElementById("guessBtn")) {
    // Get DOM elements
    const guessInput = document.getElementById("guessInput");
    const guessBtn = document.getElementById("guessBtn");
    const resetBtn = document.getElementById("resetBtn");
    const feedback = document.getElementById("feedback");
    const guessList = document.getElementById("guessList");
    const attemptCount = document.getElementById("attemptCount");
    const levelText = document.getElementById("levelText");

    // Display level and range info
    levelText.innerText = `Level ${level} — Guess between 1 and ${maxNumber}`;

    // Event listeners
    guessBtn.onclick = () => processGuess();
    guessInput.onkeydown = (e) => {
        if (e.key === "Enter") processGuess();
    };
    resetBtn.onclick = () => resetGame();

    // Handle a user's guess
    function processGuess() {
        const guess = Number(guessInput.value);

        // Validate input
        if (guess < 1 || guess > maxNumber || isNaN(guess)) {
            feedback.innerHTML = `⚠️ Please enter a number between 1 and ${maxNumber}`;
            return;
        }

        // Track guess and increment attempts
        guesses.push(guess);
        attempts++;
        attemptCount.innerHTML = attempts;
        guessList.innerHTML = guesses.join(", ");

        // Check guess
        if (guess === secretNumber) {
            sessionStorage.setItem("nextLevel", level + 1);
            window.location.href = "win.html";
        } else if (guess < secretNumber) {
            feedback.innerHTML = "⬆️ Too low!";
        } else {
            feedback.innerHTML = "⬇️ Too high!";
        }

        // Clear input
        guessInput.value = "";
    }

    // Reset game for current level
    function resetGame() {
        secretNumber = Math.floor(Math.random() * maxNumber) + 1;
        guesses = [];
        attempts = 0;
        attemptCount.innerHTML = "0";
        guessList.innerHTML = "None";
        feedback.innerHTML = "🔄 Game reset! Start guessing again.";
        guessInput.value = "";
    }
}
