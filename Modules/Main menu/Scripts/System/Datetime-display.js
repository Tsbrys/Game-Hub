function updateDateTime() {
    const now = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime-display').textContent =
        now.toLocaleString('uk-UA', options);
}

// Оновлювати щосекунди
setInterval(updateDateTime, 1000);
updateDateTime();