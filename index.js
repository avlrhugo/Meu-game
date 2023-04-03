//variáveis
var score = 0

// configurar o canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 400;
const height = canvas.height = 400;


// configurar a cobra
let snake = [];
snake[0] = {
  x: 9 * 20,
  y: 10 * 20
};

// configurar a comida
let food = {
  x: Math.floor(Math.random() * 20) * 20,
  y: Math.floor(Math.random() * 20) * 20
};

// configurar a direção inicial
let dx = 20;
let dy = 0;

// desenhar a cobra e a comida
function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
  }
  ctx.fillRect(food.x, food.y, 20, 20);
}

// atualizar a posição da cobra
function update() {
  // atualizar a posição da cabeça
  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  snake.unshift(head);
  // verificar se a cobra colidiu com a parede
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    clearInterval(intervalId);
    alert("Game Over \nScore: " + score);
    score = 0
    window.location.reload(true);
  }
  // verificar se a cobra colidiu com o próprio corpo
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalId);
      alert("Game Over \nScore: " + score);
      score = 0
      window.location.reload(true);
    }
  }
  // verificar se a cobra comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++;
document.querySelector("#score").innerText = "Score: " + score;

    food = {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20
    };
  } else {
    snake.pop();
  }
}

// configurar as teclas de direção
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37: // left
      if (dx !== 20) {
        dx = -20;
        dy = 0;
      }
      break;
    case 38: // up
      if (dy !== 20) {
        dx = 0;
        dy = -20;
      }
      break;
    case 39: // right
      if (dx !== -20) {
        dx = 20;
        dy = 0;
      }
      break;
    case 40: // down
      if (dy !== -20) {
        dx = 0;
        dy = 20;
  }
  break;
}
});

// loop principal
let intervalId = setInterval(function() {
update();
draw();
}, 100);
