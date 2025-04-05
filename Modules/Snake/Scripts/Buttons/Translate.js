let currentLanguage = 'en'; // За замовчуванням англійська мова

function changeLanguage(language) {
    currentLanguage = language;
    translateText();
}

// Функція для перекладу тексту
function translateText() {
    
    const translations = {
        en: {
            title: "Snake",
            gameTitle: "Snake",
            score: "Score: ",
            difficulty: "Difficulty: ",
            highscore: "Highscore: ",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            resetHighscore: "Reset Highscore",
            lightTheme: "Light theme",
            darkTheme: "Dark theme",
            translate: "Translate",
            gameOverTitle: "Game Over!",
            gameOverText: "Unfortunately, you lost. Would you like to play again?",
            restart: "Restart",
            english: "English",
            ukrainian: "Ukrainian"
        },
        ua: {
            title: "Змійка",
            gameTitle: "Змійка",
            score: "Рахунок: ",
            difficulty: "Складність: ",
            highscore: "Рекорд: ",
            easy: "Легкий",
            medium: "Середній",
            hard: "Важкий",
            resetHighscore: "Скинути рекорд",
            lightTheme: "Світла тема",
            darkTheme: "Темна тема",
            translate: "Переклад",
            gameOverTitle: "Гра завершена!",
            gameOverText: "На жаль, ви програли. Бажаєте зіграти ще раз?",
            restart: "Перезапустити",
            english: "English",
            ukrainian: "Українська"
        }
    };

    // Зміна тексту елементів на сторінці
    document.getElementById("title").textContent = translations[currentLanguage].title;
    document.getElementById("game-title").textContent = translations[currentLanguage].gameTitle;
    document.getElementById("score").textContent = translations[currentLanguage].score + score;
    document.getElementById("highscore").textContent = translations[currentLanguage].highscore + highscore;
    document.getElementById("easy-btn").textContent = translations[currentLanguage].easy;
    document.getElementById("medium-btn").textContent = translations[currentLanguage].medium;
    document.getElementById("hard-btn").textContent = translations[currentLanguage].hard;
    document.getElementById("reset-highscore-btn").textContent = translations[currentLanguage].resetHighscore;
    document.getElementById("theme-toggle-btn").textContent = currentLanguage === 'en' ? translations[currentLanguage].lightTheme : translations[currentLanguage].darkTheme;
    document.getElementById("translate-btn-text").textContent = translations[currentLanguage].translate;
    document.getElementById("game-over-title").textContent = translations[currentLanguage].gameOverTitle;
    document.getElementById("game-over-text").textContent = translations[currentLanguage].gameOverText;
    document.getElementById("restart-btn").textContent = translations[currentLanguage].restart;
    document.getElementById("english-btn").textContent = translations[currentLanguage].english;
    document.getElementById("ukrainian-btn").textContent = translations[currentLanguage].ukrainian;

    updateDifficultyText(); // Оновлюємо текст складності після зміни мови
    updateThemeText(); // Оновлюємо текст теми після зміни мови
}

//  Функція для перемикання між мовами

function updateScoreText() {
    document.getElementById("score").textContent = (currentLanguage === 'en' ? "Score: " : "Рахунок: ") + score;
    document.getElementById("highscore").textContent = (currentLanguage === 'en' ? "Highscore: " : "Рекорд: ") + highscore;
}



 function toggleLanguage() {
     const languageList = document.getElementById("language-list");
     languageList.classList.toggle("show");
   languageList.classList.toggle("hidden");
}


