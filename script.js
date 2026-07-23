const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = {
  x: 80,
  y: 200,
  width: 30,
  height: 30,
  gravity: 0.5,
  velocity: 0,
  jump: -8
};

let pipes = [];
let score = 0;

function createPipe() {
  let gap = 180;
  let topHeight = Math.random() * (canvas.height - gap - 100) + 50;

  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: topHeight + gap,
    width: 60
  });
}

setInterval(createPipe, 1800);

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  ctx.fillStyle = "green";

  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];

    p.x -= 3;

    ctx.fillRect(p.x, 0, p.width, p.top);
    ctx.fillRect(p.x, p.bottom, p.width, canvas.height);

    if (
      bird.x < p.x + p.width &&
      bird.x + bird.width > p.x &&
      (bird.y < p.top || bird.y + bird.height > p.bottom)
    ) {
      alert("Game Over! Score: " + score);
      location.reload();
    }

    if (p.x + p.width < bird.x && !p.scored) {
      score++;
      p.scored = true;
    }
  }

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  if (bird.y > canvas.height) {
    alert("Game Over! Score: " + score);
    location.reload();
  }

  requestAnimationFrame(update);
}

document.addEventListener("click", () => {
  bird.velocity = bird.jump;
});

update();
