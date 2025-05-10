var $canvas, $ctx;
var $width, $height;
var $bdImage;
var $bdMoveX = 1045;
var $dragon = [];
var $sheepImage;
var $sheep = [];
var $mouseMoveX = 0;
var $mouseMoveY = 0;
var gameInterval;
var sheepInterval;
var startTime = 0;
var gameOver = false;
var finalTime = 0;
var $dragonSpeed = 5;  // Початкова швидкість дракона


function drawCanvas() {
    clear();

    $bdMoveX -= 4;
    if ($bdMoveX <= 0) {
        $bdMoveX = 1045;
    }
    $ctx.drawImage($bdImage, 0 + $bdMoveX, 0, 1000, 940, 0, 0, $width, $height);

    $dragon.col++;
    if ($dragon.col >= 9) {
        $dragon.col = 0;
    }
    $ctx.drawImage($dragon.image, ($dragon.col * $dragon.w), ($dragon.row * $dragon.h), $dragon.w, $dragon.h, ($dragon.x - $dragon.w / 2), ($dragon.y - $dragon.h / 2), $dragon.w, $dragon.h);

    // Оновлення овечок
    for (let i = $sheep.length - 1; i >= 0; i--) {
        let s = $sheep[i];
        s.x += s.speed;
        $ctx.drawImage($sheepImage, s.x, s.y, s.w, s.h);

        // Перевірка на зіткнення з драконом
        let dist = Math.hypot($dragon.x - (s.x + s.w / 2), $dragon.y - (s.y + s.h / 2));
        if (dist < 40) {
            $sheep.splice(i, 1); // видаляємо овечку
            $dragon.eaten = ($dragon.eaten || 0) + 1; // додаємо +1 до лічильника
            continue;
        }

        // Якщо овечка вийшла за межі праворуч, видаляємо
        if (s.x > $width) {
            $sheep.splice(i, 1);
        }
    }
    
    if ($mouseMoveX > $dragon.x) {
        $dragon.x += $dragonSpeed;  // Використовуємо швидкість
    }
    if ($mouseMoveY > $dragon.y) {
        $dragon.y += $dragonSpeed;  // Використовуємо швидкість
    }
    if ($mouseMoveX < $dragon.x) {
        $dragon.x -= $dragonSpeed;  // Використовуємо швидкість
    }
    if ($mouseMoveY < $dragon.y) {
        $dragon.y -= $dragonSpeed;  // Використовуємо швидкість
    }

    let distance = Math.hypot($dragon.x - $mouseMoveX, $dragon.y - $mouseMoveY);
    if (distance < 10) {
        endGame();
        return;
    }

    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    $ctx.fillStyle = 'black';
    $ctx.font = '20px Arial';
    $ctx.fillText('Time: ' + elapsedTime + 's', 20, 30);
    $ctx.fillText('Sheep eaten: ' + ($dragon.eaten || 0), 20, 60);
    $ctx.fillText('Dragon Speed: ' + $dragonSpeed.toFixed(1), 20, 90); // Виводимо швидкість на екран
}

function clear() {
    $ctx.clearRect(0, 0, $width, $height);
}

function startLoad() {
    $bdImage = new Image();
    $bdImage.src = 'Img/Games/Flying-Dragon/hell.jpg';

    var $dragonImage = new Image();
    $dragonImage.src = 'Img/Games/Flying-Dragon/dragon.gif';

    $sheepImage = new Image();
    $sheepImage.src = 'Img/Games/Flying-Dragon/Sheep.png'; // твоя текстура овечки

    $dragon.image = $dragonImage;
    $dragon.x = 500;
    $dragon.y = 300;
    $dragon.w = 75;
    $dragon.h = 70;
    $dragon.row = 4;
    $dragon.col = 0;
    $dragon.eaten = 0;

    $mouseMoveX = 500;
    $mouseMoveY = 500;
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(sheepInterval);
    gameOver = true;
    finalTime = Math.floor((Date.now() - startTime) / 1000);

    // Зберігаємо поточну швидкість дракона на момент смерті
    let finalSpeed = $dragonSpeed.toFixed(1);

    // Виводимо час і швидкість на екран після гри
    $('#final-time').html('Ти тримався: ' + finalTime + ' секунд<br>Швидкість: ' + finalSpeed + ' <br>З’їв овечок: ' + $dragon.eaten);
    $('#game-over-screen').show();
}

function restartGame() {
    $dragon.x = 500;
    $dragon.y = 300;
    $mouseMoveX = 500;
    $mouseMoveY = 500;
    $bdMoveX = 1045;
    $sheep = [];
    $dragon.eaten = 0;
    $dragonSpeed = 5;  // Скидаємо швидкість до початкової
    startTime = Date.now();
    gameOver = false;
    $('#game-over-screen').hide();
    gameInterval = setInterval(drawCanvas, 30);
    sheepInterval = setInterval(spawnSheep, 2000); // кожні 2 секунди
}

function spawnSheep() {
    let s = {
        x: -50,
        y: Math.random() * ($height - 50),
        w: 50,
        h: 50,
        speed: 2 + Math.random() * 3 // 2–5 px/frame
    };
    $sheep.push(s);
}

$(function () {
    $canvas = document.getElementById('canvas');
    $ctx = $canvas.getContext('2d');

    $width = $canvas.width;
    $height = $canvas.height;

    startLoad();

    $('#start-btn').on('click', function () {
        $('#start-screen').hide();
        startTime = Date.now();
        gameInterval = setInterval(drawCanvas, 30);
        sheepInterval = setInterval(spawnSheep, 2000);
    });

    $('#restart-btn').on('click', function () {
        restartGame();
    });    

    $('#canvas').mousemove(function ($e) {
        var $mouseX = $e.offsetX || 0;
        var $mouseY = $e.offsetY || 0;

        $mouseMoveX = $mouseX;
        $mouseMoveY = $mouseY;

        if ($mouseX > $dragon.x && Math.abs($mouseY - $dragon.y) < $dragon.w / 2) {
            $dragon.row = 0;
        } else if ($mouseX < $dragon.x && Math.abs($mouseY - $dragon.y) < $dragon.w / 2) {
            $dragon.row = 4;
        } else if ($mouseY > $dragon.y && Math.abs($mouseX - $dragon.x) < $dragon.h / 2) {
            $dragon.row = 2;
        } else if ($mouseY < $dragon.y && Math.abs($mouseX - $dragon.x) < $dragon.h / 2) {
            $dragon.row = 6;
        } else if ($mouseY < $dragon.y && $mouseX < $dragon.x) {
            $dragon.row = 5;
        } else if ($mouseY < $dragon.y && $mouseX > $dragon.x) {
            $dragon.row = 7;
        } else if ($mouseY > $dragon.y && $mouseX < $dragon.x) {
            $dragon.row = 3;
        } else if ($mouseY > $dragon.y && $mouseX > $dragon.x) {
            $dragon.row = 1;
        }
    });
});

function increaseDragonSpeed() {
    $dragonSpeed += 0.5;  // Збільшуємо швидкість на 0.5 кожну секунду
}

setInterval(increaseDragonSpeed, 10000);  // Викликаємо кожну секунду
