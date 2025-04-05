var gameInterval;
var gameSpeed = 3000 / 15; // Default speed for easy level
var isGameOver = false;
var score = 0;
var highscore = localStorage.getItem("highscore") || 0;

window.onload = function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    startGame();
    updateScoreboard();
}

function startGame() {
    clearInterval(gameInterval); // Stop any running game intervals
    isGameOver = false;
    hasStarted = false; // Reset the game start flag after restart
    document.getElementById("game-over").classList.remove("show"); // Hide game over screen
    document.getElementById("game-over").classList.add("hidden");
    gameInterval = setInterval(game, gameSpeed);
}

px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = [];
tail = 5;

let hasStarted = false; // Add a flag to track if the game has started

function game() {
    if (isGameOver) return; // Stop the game if it's over

    // Mark the game as started once the first movement happens
    if (!hasStarted && (xv !== 0 || yv !== 0)) {
        hasStarted = true;
    }

    px += xv; // Update the snake's position
    py += yv;

    // Check for collision with walls (Game Over)
    if (px < 0 || px >= tc || py < 0 || py >= tc) {
        gameOver();
        return;
    }

    // Only check for collision with itself if the game has started
    if (hasStarted) {
        for (var i = 0; i < trail.length; i++) {
            if (trail[i].x == px && trail[i].y == py) {
                gameOver();
                return;
            }
        }
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
    }

    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }

    if (ax == px && ay == py) {
        tail++;
        score++; // Збільшуємо рахунок при з'їденій їжі
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
        updateScoreboard();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(evt) {
    if (isGameOver) return; // Prevent movement after game over
    switch (evt.keyCode) {
        case 37:
            if (xv === 0) { xv = -1; yv = 0; } // Prevent reverse direction
            break;
        case 38:
            if (yv === 0) { xv = 0; yv = -1; } // Prevent reverse direction
            break;
        case 39:
            if (xv === 0) { xv = 1; yv = 0; } // Prevent reverse direction
            break;
        case 40:
            if (yv === 0) { xv = 0; yv = 1; } // Prevent reverse direction
            break;
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval); // Stop the game interval
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore); // Save new highscore to localStorage
    }
    updateScoreboard();
    const gameOverModal = document.getElementById("game-over");
    gameOverModal.classList.remove("hidden"); // Show Game Over message
    gameOverModal.classList.add("show"); // Add 'show' class to display it
}