function resetHighscore() {
    highscore = 0; // Скидаємо найкращий результат
    localStorage.setItem("highscore", highscore); // Оновлюємо в localStorage
    updateScoreboard(); // Оновлюємо інформацію на екрані
}

// Обробка скидання рекорду
document.getElementById("reset-highscore-btn").addEventListener("click", function() {
    highscore = 0; // Скидаємо рекорд
    score = 0; // Скидаємо поточний рахунок
    updateScoreText(); // Оновлюємо текст рекорду та рахунку
});