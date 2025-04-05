function restartGame() {
    px = py = 10;
    xv = yv = 0;
    trail = [];
    tail = 5;
    score = 0;
    ax = ay = Math.floor(Math.random() * tc);
    hasStarted = false; // Reset the flag to prevent false collision detection at restart
    startGame(); // Restart the game
    updateScoreboard();

    currentTheme = 'light'; // За замовчуванням світла тема
    currentDifficulty = 'easy'; // За замовчуванням легка складність
    updateDifficultyText();
    updateThemeText();
}

document.getElementById("restart-btn").addEventListener("click", restartGame);