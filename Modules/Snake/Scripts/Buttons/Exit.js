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

    window.location.href = targetUrl;

    // Закриття вкладки (може не спрацювати в більшості браузерів через безпеку)
    window.close();
});
