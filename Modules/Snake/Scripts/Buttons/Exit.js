document.getElementById('exit-btn').addEventListener('click', function() {
    // Перехід на файл (наприклад, PDF або інший файл)
    window.location.pathname = 'index.html';  // Вкажіть шлях до вашого файлу

    // Закриття поточної вкладки
    window.close();
});