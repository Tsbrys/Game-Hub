let currentDifficulty = 'easy'; // За замовчуванням легка складність

function setDifficulty(level) {
    if (level === 'easy') {
        gameSpeed = 3000 / 10; // Slow speed
    } else if (level === 'medium') {
        gameSpeed = 3000 / 15; // Medium speed
    } else if (level === 'hard') {
        gameSpeed = 3000 / 20; // Fast speed
    }
    startGame(); // Restart the game with new difficulty
    document.getElementById("difficulty").textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
}

// Обробка натискання кнопок складності
document.getElementById("easy-btn").addEventListener("click", function() {
    currentDifficulty = 'easy';
    updateDifficultyText(); // Оновлюємо текст складності
});

document.getElementById("medium-btn").addEventListener("click", function() {
    currentDifficulty = 'medium';
    updateDifficultyText(); // Оновлюємо текст складності
});

document.getElementById("hard-btn").addEventListener("click", function() {
    currentDifficulty = 'hard';
    updateDifficultyText(); // Оновлюємо текст складності
});