let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

let movingLeft = false;
let movingRight = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
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
    ctx.font = `${canvas.height * 0.1}px Arial`;
    ctx.fillText("🚽", this.x, this.y);
  }
  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }
}

let player = new Player();

class Item {
  constructor(type, emoji, points, effect) {
    this.type = type;
    this.emoji = emoji;
    this.points = points;
    this.effect = effect;
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

let items = [];

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
    const itemType = Math.random() < 0.5 ? "cellPhone" : Math.random() < 0.7 ? "pool" : Math.random() < 0.9 ? "toiletPaper" : "plunger";
    const itemEmoji = itemType === "toiletPaper" ? "🧻" : itemType === "plunger" ? "🪠" : itemType === "pool" ? "💩" : "📱";
    let itemPoints = 0;
    let itemEffect = "";

    switch (itemType) {
      case "toiletPaper":
        itemPoints = 3;
        itemEffect = "score";
        break;
      case "plunger":
        if (lives < 3) {
          itemPoints = 1;
          itemEffect = "life";
        }
        break;
      case "pool":
        itemPoints = 1;
        itemEffect = "score";
        break;
      case "cellPhone":
        itemPoints = -1;
        itemEffect = "life";
        break;
    }

    items.push(new Item(itemType, itemEmoji, itemPoints, itemEffect));
  }

  items.forEach((item, index) => {
    item.update();
    item.draw();
    if (item.y > canvas.height) {
      items.splice(index, 1);
    }
    if (
      item.y + item.height > player.y &&
      item.x < player.x + player.width &&
      item.x + item.width > player.x
    ) {
      items.splice(index, 1);
      if (item.effect === "score") {
        score += item.points;
      } else if (item.effect === "life" && lives < 3) {
        lives += item.points;
      } else if (item.type === "cellPhone" && lives > 0) {
        lives -= 1;
      }
    }
  });

  if (movingLeft) {
    player.moveLeft();
  }
  if (movingRight) {
    player.moveRight();
  }
  function drawScoreAndLives() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 40);
    ctx.fillText(`Lives: ${lives}`, canvas.width - 120, 40);
  }
  drawScoreAndLives();
  if (lives > 0) {
    window.requestAnimationFrame(gameLoop);
  } else {
    ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
  }
}

canvas.addEventListener('touchstart', (e) => {
  if (e.touches[0].clientX < canvas.width / 2) {
    movingLeft = true;
  } else {
    movingRight = true;
  }
});

canvas.addEventListener('touchend', () => {
  movingLeft = false;
  movingRight = false;
});

canvas.addEventListener('mousedown', (e) => {
  if (e.clientX < canvas.width / 2) {
    movingLeft = true;
  } else {
    movingRight = true;
  }
});

canvas.addEventListener('mouseup', () => {
  movingLeft = false;
  movingRight = false;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.moveLeft();
  } else if (e.key === "ArrowRight") {
    player.moveRight();
  }
});

init();