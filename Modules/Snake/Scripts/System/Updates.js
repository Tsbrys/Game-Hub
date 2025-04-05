function updateScoreboard() {
    const currentScore = (currentLanguage === "en") ? "Score: " : "Рахунок: ";
    const currentHighScore = (currentLanguage === "en") ? "Highscore: " : "Рекорд: ";
    document.getElementById("score").textContent = currentScore + score;
    document.getElementById("highscore").textContent = currentHighScore + highscore;
}

// Оновлення тексту складності
function updateDifficultyText() {
    const difficultyText = (currentLanguage === 'en') ? "Difficulty: " : "Складність: ";
    switch (currentDifficulty) {
        case 'easy':
            document.getElementById("difficulty").textContent = difficultyText + (currentLanguage === 'en' ? "Easy" : "Легкий");
            break;
        case 'medium':
            document.getElementById("difficulty").textContent = difficultyText + (currentLanguage === 'en' ? "Medium" : "Середній");
            break;
        case 'hard':
            document.getElementById("difficulty").textContent = difficultyText + (currentLanguage === 'en' ? "Hard" : "Важкий");
            break;
        default:
            document.getElementById("difficulty").textContent = difficultyText + (currentLanguage === 'en' ? "Easy" : "Легкий");
    }
}

// Оновлення тексту теми
function updateThemeText() {
    const themeText = currentLanguage === 'en' ? (currentTheme === 'light' ? "Light theme" : "Dark theme") : (currentTheme === 'light' ? "Світла тема" : "Темна тема");
    document.getElementById("theme-toggle-btn").textContent = themeText;
}

// Оновлення тексту для рахунку та рекорду
function updateScoreText() {
    document.getElementById("score").textContent = currentScore + score;
    document.getElementById("highscore").textContent = currentHighScore + highscore;
}