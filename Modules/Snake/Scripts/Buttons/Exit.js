document.getElementById('exit-btn').addEventListener('click', function() {
    let currentPath = window.location.pathname;
    let targetUrl;

    if (currentPath.includes('/Game-Hub/')) {
        // Якщо на GitHub Pages
        targetUrl = 'https://tsbrys.github.io/Game-Hub/';
    } else {
        // Якщо локально
        targetUrl = 'index.html';
    }

    // Перевіряємо, чи було відкрите нове вікно скриптом
    if (window.opener) {
        // Якщо вкладка відкрита через window.open() — можемо закривати
        window.close();
    } else {
        // Якщо вкладка відкрита вручну або через лінк — просто переходимо
        window.location.href = targetUrl;
    }
});
