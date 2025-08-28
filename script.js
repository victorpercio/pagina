const mario = document.getElementById("mario");
const pipe = document.getElementById("pipe");
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const gameOverScreen = document.getElementById("gameOver");

// Áudios
const jumpSound = new Audio("jump.mp3");
const gameOverSound = new Audio("8d82b5_SMW_Game_Over_Sound_Effect.mp3");

// Variáveis de controle
let score = 0;
let level = 1;
let isGameOver = false;
let gameLoop;

// Função de pulo
function jump() {
  if (!mario.classList.contains("jump") && !isGameOver) {
    mario.classList.add("jump");
    jumpSound.play();
    setTimeout(() => mario.classList.remove("jump"), 500);
  }
}

// Loop principal
function startGame() {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioBottom = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    // Colisão
    if (pipePosition > 0 && pipePosition < 80 && marioBottom < 80) {
      isGameOver = true;
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioBottom}px`;

      gameOverSound.play();

      // Posição de Game Over: colocar onde o Mario colidiu com o pipe
      const marioPosition = mario.getBoundingClientRect();
      gameOverScreen.style.top = `${marioPosition.top}px`;  // Posição Y
      gameOverScreen.style.left = `${marioPosition.left}px`; // Posição X
      gameOverScreen.classList.remove("hidden");

      clearInterval(gameLoop);
    } else if (!isGameOver) {
      // Pontuação
      score++;
      scoreDisplay.textContent = "Score: " + score;

      // Mudança de fase a cada 200 pontos
      if (score % 200 === 0) {
        level++;
        levelDisplay.textContent = "Fase: " + level;
        changeWeather(level);
      }
    }
  }, 20);
}

// Mudança de clima
function changeWeather(lv) {
  gameBoard.className = "game-board";
  if (lv % 4 === 1) gameBoard.classList.add("day");
  if (lv % 4 === 2) gameBoard.classList.add("afternoon");
  if (lv % 4 === 3) gameBoard.classList.add("night");
  if (lv % 4 === 0) {
    gameBoard.classList.add("rain");
    startRain();
  }
}

// Criar chuva
function startRain() {
  for (let i = 0; i < 20; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    gameBoard.appendChild(drop);

    setTimeout(() => drop.remove(), 1000);
  }
  if (!isGameOver) setTimeout(startRain, 500);
}

// Eventos
document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

// Iniciar jogo
startGame();
