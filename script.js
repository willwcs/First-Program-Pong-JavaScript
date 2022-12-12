// Declaração variavéis
const background = document.querySelector("#background");
let ctx = background.getContext("2d");
let scoreText = document.querySelector("#scoreText");
let startBtn = document.querySelector("#startbtn");
let resetBtn = document.querySelector("#resetbtn");
let scoreP1 = 0;
let scoreP2 = 0;
let speedBallX = 4;
let speedBallY = 4;
let paddleSpeed = 25;
let paddle2Speed;
let ball = {
  ballX: background.width / 2,
  ballY: background.height / 2,
  radius: 15,
  angleI: 0,
  angleF: Math.PI * 2,
  collor: "white",
};
let paddle1 = {
  x: 4,
  y: 150,
  width: 10,
  height: 100,
  collor: "white",
};
let paddle2 = {
  x: 487,
  y: 150,
  width: 10,
  height: 100,
  collor: "white",
};

// Inicia o jogo
function startGame() {
  update();
  moveBall();
  collisionBall();
  unstuckBall();
  paddleCollision();
  movePaddle1();
  movePaddle2();
  addScore();
  resetGame();
}

// Atualiza o canvas
function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, innerWidth, innerHeight); // Limpa o canvas
  drawBall();
  drawPaddles();
}

// Cria raquetes
function drawPaddles() {
  ctx.beginPath();
  ctx.rect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.fillStyle = ball.collor;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.fillStyle = ball.collor;
  ctx.fill();
  ctx.stroke();
}

// Cria bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.ballX, ball.ballY, ball.radius, ball.angleI, ball.angleF);
  ctx.fillStyle = ball.collor;
  ctx.fill();
  ctx.stroke();
}

// Movimenta a bola
function moveBall() {
  requestAnimationFrame(moveBall);
  ball.ballX += speedBallX;
  ball.ballY += speedBallY;
}

// Checa colisão da bola com o canvas
function collisionBall() {
  requestAnimationFrame(collisionBall);
  if (ball.ballX - ball.radius <= 0) {
    scoreP2 += 1;
    speedBallX = -speedBallX;
  }
  if (ball.ballX + ball.radius >= 500) {
    scoreP1 += 1;
    speedBallX = -speedBallX;
  }
  if (
    ball.ballY + ball.radius > background.height ||
    ball.ballY - ball.radius < 0
  ) {
    speedBallY = -speedBallY;
  }
}

// Colisão da bola com as raquetes
function paddleCollision() {
  requestAnimationFrame(paddleCollision);
  if (
    ball.ballX - ball.radius < paddle1.x + paddle1.width &&
    ball.ballY - ball.radius < paddle1.y + paddle1.height &&
    ball.ballY + ball.radius > paddle1.y
  ) {
    speedBallX = -speedBallX;
  }

  if (
    ball.ballX + ball.radius > paddle2.x - paddle2.width + 10 &&
    ball.ballY + ball.radius < paddle2.y + paddle2.height + 10 &&
    ball.ballY + ball.radius > paddle2.y + 10
  ) {
    speedBallX = -speedBallX;
  }
}

//Caso a bolinha fique presa
function unstuckBall() {
  requestAnimationFrame(unstuckBall);
  if (ball.ballX - ball.radius < 0) {
    ball.ballX = 25;
  }
  if (ball.ballX + ball.radius > 500) {
    ball.ballX = 485;
  }
}

// Movimenta raquete 1 com = arrowUp e arrowDown
function movePaddle1() {
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38 && paddle1.y > 0) {
      paddle1.y -= paddleSpeed;
    }
    if (event.keyCode === 40 && paddle1.y < 400 - paddle1.height) {
      paddle1.y += paddleSpeed;
    }
  });
}

// Raquete 2 segue o eixo y da bola
function movePaddle2() {
  requestAnimationFrame(movePaddle2);
  paddle2Speed = ball.ballY - paddle2.y - paddle2.height / 2 - 30;
  paddle2.y += paddle2Speed;
}

// Adiciona pontuação
function addScore() {
  requestAnimationFrame(addScore);
  scoreText.textContent = `${scoreP1} - ${scoreP2}`;
}

//Reseta o jogo
function resetGame() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  scoreP1 = 0;
  scoreP2 = 0;
  paddle1 = {
    x: 4,
    y: 150,
    width: 10,
    height: 100,
    collor: "white",
  };
  paddle2 = {
    x: 487,
    y: 150,
    width: 10,
    height: 100,
    collor: "white",
  };
  ball = {
    ballX: 250,
    ballY: 200,
    radius: 15,
    angleI: 0,
    angleF: Math.PI * 2,
    collor: "white",
  };
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
//startGame();
