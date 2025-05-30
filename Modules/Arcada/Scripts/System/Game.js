var canvas, ctx;
var iStart, iTimer;
var width, height;
var oBall=[], oPadd=[], oBricks=[];
var colors = ['#9d9d9d', '#f80207', '#feff01', '#0072ff', '#fc01fc', '#03f303'];
var keyLeft=false, keyRight=false;
var gamePoints = 0;
var gameTimer=0;
var ballSpeed = 7;
var difficultyName = 'Medium';

function drawCanvas() {
    clear();

    ctx.fillStyle = '#f66';
    ctx.beginPath();
    ctx.arc(oBall.x, oBall.y, oBall.r, 0,  Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();

    ctx.drawImage(oPadd.img, oPadd.x, oPadd.y, oPadd.w, oPadd.h);

    if(keyRight){
        if((oPadd.x+10)<=(width-oPadd.w)){
            oPadd.x+10;
        }else{
            oPadd.x=width-oPadd.w;
        }
    }
    if(keyLeft){
        if((oPadd.x-10)>=0){
            oPadd.x-10;
        }else{
            oPadd.x=0;
        }
    }

    var actions=true;
    $.each(oBricks,function(index,element){
        if(element.a){
            ctx.fillStyle=element.c;
            ctx.beginPath();
            ctx.rect(element.x, element.y, element.w, element.h);
            ctx.closePath();
            ctx.fill();
            if (oBall.y < element.y+element.h && oBall.y > element.y && oBall.x < element.x+element.w && oBall.x > element.x && actions) {
                element.a = false;
                oBall.dy = -oBall.dy;
                actions=false;
                gamePoints++;
            }
        }
    });

    if (oBall.x + oBall.dx + oBall.r > width || oBall.x + oBall.dx - oBall.r < 0) {
        oBall.dx = -oBall.dx;
    }

    if(oBall.y+oBall.dy-oBall.r < 0) {
        oBall.dy = -oBall.dy;
    }else if (oBall.y + oBall.dy + oBall.r > height - oPadd.h) {
        if (oBall.x > oPadd.x && oBall.x < oPadd.x + oPadd.w) {
            oBall.dx = 10 * ((oBall.x-(oPadd.x+oPadd.w/2))/oPadd.w);
            oBall.dy = -oBall.dy;
        }else if (oBall.y + oBall.dy + oBall.r > height) {
            clearInterval(iStart);
            clearInterval(iTimer);
            $('#final-score').text(gamePoints);
            $('#game-over').removeClass('hidden');
        }
    }

    oBall.x+=oBall.dx;
    oBall.y+=oBall.dy;

    ctx.font = '16px Verdana';
    ctx.fillStyle = '#fff';

    gameMin = Math.floor(gameTimer /  60);
    gameSec = gameTimer % 60;

    if (gameMin < 10) gameMin = "0" + gameMin;
    if (gameSec < 10) gameSec = "0" + gameSec;

    switch (difficultyName) {
        case 'Easy':
            ctx.fillStyle = '#28a745'; // зелений
            break;
        case 'Medium':
            ctx.fillStyle = '#ffc107'; // помаранчевий
            break;
        case 'Hard':
            ctx.fillStyle = '#dc3545'; // червоний
            break;
        default:
            ctx.fillStyle = '#fff';
    }

    ctx.fillText('Time: ' + gameMin + ':' + gameSec, 600, 470);
    ctx.fillText('Points: ' + gamePoints, 600, 500);
    ctx.fillText('Difficulty: ' + difficultyName, 600, 530);
}

function clear() {
    ctx.clearRect(0, 0, width, height);
} 

function startLoad(){
    padImage = new Image();
    padImage.src = 'Img/Games/Arcada/padd.png';
    padImage.onload = function() {};

    oPadd.x = width/2-60;
    oPadd.y = height-20;
    oPadd.w = 120;
    oPadd.h = 20;
    oPadd.img = padImage;

    oBall.x=width/8-2;
    oBall.y=height-oPadd.h-20;
    oBall.r=10;
    oBall.dx = 0.5;
    oBall.dy = -ballSpeed;

    brow=6;
    bcol=8;
    bw=width/bcol-2;
    bh=20;
    for (i=0; i<8; i++) {
        bx=i*(bw+2)+1;
        for (j=0; j<6; j++) {
            by=j*(bh+2)+1;
            bc=colors[j];
            ba=true;
            oBricks.push({x:bx, y:by, w:bw, h:bh, c:bc, a:ba});
        }
    }
}

function countTimer() {
    gameTimer++;
}

$(function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;

    $('.difficulty-btn').click(function() {
        var selectedSpeed = $(this).data('speed');
        ballSpeed = selectedSpeed;
    
        // Зберегти ім'я складності для виводу
        switch (selectedSpeed) {
            case 5:
                difficultyName = 'Easy';
                break;
            case 7:
                difficultyName = 'Medium';
                break;
            case 10:
                difficultyName = 'Hard';
                break;
        }
    
        // Скинути все
        clearInterval(iStart);
        clearInterval(iTimer);
        oBricks = [];
        gamePoints = 0;
        gameTimer = 0;
    
        $('#difficulty-selection').addClass('hidden');
          
        startLoad();

        iStart = setInterval(drawCanvas, 20);
        iTimer = setInterval(countTimer, 1000);

    });

    $('#canvas').mousemove(function(e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        if(mouseX>(oPadd.w/2)){
            if(mouseX<(width-oPadd.w/2)){
                oPadd.x = mouseX-oPadd.w/2;
            }else{
                oPadd.x = width-oPadd.w;
            }
        }else{
            oPadd.x = 0;
        }
    });

    $(window).keydown(function(event){
        switch (event.keyCode) {
            case 37:
                keyLeft=false;
            break;
            case 39:
                keyRight=false;
            break;
        }
    });

    $('#restart-btn').click(function() {
        $('#game-over').addClass('hidden');
        $('#difficulty-selection').removeClass('hidden');
    });

});
