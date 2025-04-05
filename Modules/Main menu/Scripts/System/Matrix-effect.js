// === ТЕМИ ===
const themes = [
    { color: '#0F0', emojis: ['🪙', '⭐', '💎'], isNeon: true },
    { color: '#0FF', emojis: ['❄️', '🌙', '💧'], isNeon: false },
    { color: '#F00', emojis: ['🔥', '💣', '👺'], isNeon: true },
    { color: '#FFF', emojis: ['👾', '👻', '⚡'], isNeon: false }
  ];

  let currentTheme = 0;

  function switchTheme() {
    currentTheme = (currentTheme + 1) % themes.length;
    ctx.fillStyle = 'black'; // Очистити фон
    flashEffect(); // викликаємо ефект блиску
  }

  document.getElementById('theme-button').addEventListener('click', switchTheme);

  // === MATRIX EFFECT ===
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const letters = 'アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = 16;
  const columns = Math.floor(window.innerWidth / fontSize);
  const drops = new Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = themes[currentTheme].color;
    ctx.font = fontSize + 'px monospace';

    if (themes[currentTheme].isNeon) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.textShadow = '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00FF00'; // Неоновий ефект
    }

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);

  // === FALLING EMOJIS ===
  const fallingArea = document.getElementById('falling-area');

  function createEmoji() {
    const el = document.createElement('div');
    el.className = 'falling';
    const emojiSet = themes[currentTheme].emojis;
    el.innerText = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.fontSize = 20 + Math.random() * 20 + 'px';
    el.style.position = 'absolute';
    fallingArea.appendChild(el);

    // Змінюємо швидкість падіння в залежності від теми
    if (themes[currentTheme].isNeon) {
      el.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Для неонових тем швидше
    } else {
      el.style.animationDuration = (Math.random() * 6 + 4) + 's'; // Для інших тем повільніше
    }

    setTimeout(() => el.remove(), 6000);
  }

  setInterval(createEmoji, 350); // emoji кожні 0.35 сек

  // === FLASH EFFECT ===
  function flashEffect() {
    const flash = document.getElementById('flash');
    flash.style.opacity = 1;
    setTimeout(() => {
      flash.style.opacity = 0;
    }, 400); // тривалість ефекту
  }