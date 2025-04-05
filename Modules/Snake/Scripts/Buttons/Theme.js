let isDarkMode = true;
let currentTheme = 'light';

function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector(".theme-toggle-btn");

    // Перемикаємо клас для темного або світлого фону
    if (isDarkMode) {
        body.style.backgroundColor = "#c7c7c7"; // Світлий фон
        body.style.color = "#000"; // Чорний текст
        themeButton.textContent = "Dark theme"; // Змінюємо текст на кнопці
    } else {
        body.style.backgroundColor = "#2b2b2b"; // Темний фон
        body.style.color = "#fff"; // Білий текст
        themeButton.textContent = "Light theme"; // Змінюємо текст на кнопці
    }

    // Перемикаємо значення флагу темного/світлого режиму
    isDarkMode = !isDarkMode;
}

// Перемикання теми
document.getElementById("theme-toggle-btn").addEventListener("click", function() {
    currentTheme = (currentTheme === 'light') ? 'dark' : 'light'; // Перемикаємо між темами
    updateThemeText(); // Оновлюємо текст теми
});