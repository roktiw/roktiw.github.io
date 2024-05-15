const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player, items, score, lives;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 10;
    }
    draw() {
        ctx.fillText('🚽', this.x, this.y);
    }
    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }
    moveRight() {
        this.x = Math.min(canvas.width - this.width, this.x + this.speed);
    }
}

class Item {
    constructor(type, emoji) {
        this.type = type;
        this.emoji = emoji;
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = 0;
        this.speed = 3 + Math.random() * 2;
    }
    draw() {
        ctx.fillText(this.emoji, this.x, this.y);
    }
    update() {
        this.y += this.speed;
    }
}

function init() {
    player = new Player();
    items = [];
    score = 0;
    lives = 3;
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    if (Math.random() < 0.02) {
        const type = Math.random() < 0.5 ? 'toilet' : 'cellphone';
        const emoji = type === 'toilet' ? '💩' : '📱';
        items.push(new Item(type, emoji));
    }
    items.forEach((item, index) => {
        item.update();
        item.draw();
        if (item.y > canvas.height) {
            items.splice(index, 1);
        }
        if (item.y + item.height > player.y && item.x < player.x + player.width && item.x + item.width > player.x) {
            items.splice(index, 1);
            if (item.type === 'toilet') {
                score += 1;
            } else {
                lives -= 1;
            }
        }
    });
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 70, 20);
    if (lives > 0) {
        window.requestAnimationFrame(gameLoop);
    } else {
        ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.key === 'ArrowRight') {
        player.moveRight();
    }
});

init();
