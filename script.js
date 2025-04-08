const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");

// Images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "https://i.ibb.co/0F1sHVv/flappybird-transparent.png"; // Gambar transparan
bg.src = "https://i.ibb.co/LNrpFgb/bg.png";
fg.src = "https://i.ibb.co/jDRq9kT/fg.png";
pipeNorth.src = "https://i.ibb.co/yRzVHdZ/pipeNorth.png";
pipeSouth.src = "https://i.ibb.co/6y6tzZg/pipeSouth.png";

// Variables
let gap = 85;
let constant;
let bX = 50;
let bY = 150;
const gravity = 1.5;
let score = 0;
let gameStarted = false;

// Pipes
const pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

// Control
document.addEventListener("keydown", function () {
  if (gameStarted) {
    bY -= 25;
  }
});

function draw() {
  if (!gameStarted) return;

  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // Collision
    if (
      bX + bird.width >= pipe[i].x &&
      bX <= pipe[i].x + pipeNorth.width &&
      (bY <= pipe[i].y + pipeNorth.height ||
        bY + bird.height >= pipe[i].y + constant) ||
      bY + bird.height >= canvas.height - fg.height
    ) {
      location.reload(); // restart
    }

    if (pipe[i].x === 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

// Start button event
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  draw();
});
