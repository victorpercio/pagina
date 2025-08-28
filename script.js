const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreBoard = document.querySelector('.score-board');
const scoreSpan = document.getElementById('pontos');
const faseSpan = document.getElementById('fase');
const jumpSound = document.getElementById('jump-sound');
const gameoverSound = document.getElementById('gameover-sound');
const restartBtn = document.getElementById('restart-btn');

let pontos = 0;
let fase = 1;
let isGameOver = false;
let gameInterval;

function jump() {
  if (isGameOver) return;
  mario.classList.add('jump');
  jumpSound.currentTime = 0;
  jumpSound.play();
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

function updateScore() {
  pontos += 1;
  scoreSpan.textContent = pontos;
  if (pontos % 10 === 0) {
    fase += 1;
    faseSpan.textContent = fase;
  }
}

function gameOver() {
  isGameOver = true;
  mario.src = './img/gameover.png';
  gameoverSound.play();
  clearInterval(gameInterval);
  restartBtn.style.display = 'block';
  restartBtn.focus();
}

function resetGame() {
  pontos = 0;
  fase = 1;
  isGameOver = false;
  scoreSpan.textContent = pontos;
  faseSpan.textContent = fase;
  mario.src = './img/mario.gif';
  restartBtn.style.display = 'none';
  // Reset pipe and other elements as desired
  startGame();
}

function startGame() {
  // Example of increasing difficulty: speed up pipe over time
  let pipeSpeed = 2000 - (fase * 100);
  if (pipeSpeed < 800) pipeSpeed = 800;
  
  pipe.style.left = '100vw';
  gameInterval = setInterval(() => {
    if (!isGameOver) {
      updateScore();
      // Move pipe logic etc. (placeholder, replace as per your game logic)
      // Detect collision etc.
    }
  }, 1000);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
    jump();
  }
});

restartBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    resetGame();
  }
});

// Start the game on page load
window.onload = () => {
  startGame();
};