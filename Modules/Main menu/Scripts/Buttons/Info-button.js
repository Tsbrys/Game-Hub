document.getElementById('info-button').addEventListener('click', () => {
    const infoBox = document.getElementById('site-info');
    infoBox.style.display = infoBox.style.display === 'none' || infoBox.style.display === '' ? 'block' : 'none';
});