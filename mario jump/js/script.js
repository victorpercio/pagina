const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameBoard = document.getElementById('gameBoard');

const jumpSound = document.getElementById('jump-sound');
const gameOverSound = document.getElementById('gameover-sound');

const jump = () => {
    mario.classList.add('jump');
    jumpSound.currentTime = 0;
    jumpSound.play();
    setTimeout(() => mario.classList.remove('jump'), 500);
};

// Pontos de 1 em 1 e fases suaves
let pontos = 0;
let fase = 1;
const pontosDisplay = document.getElementById('pontos');
const faseDisplay = document.getElementById('fase');

// Tabela refinada de velocidades por fase
const faseVelocidade = [
    {pipe: 3.0, clouds: 30},  // fase 1 - bem lenta
    {pipe: 2.8, clouds: 28},  // fase 2
    {pipe: 2.6, clouds: 26},  // fase 3
    {pipe: 2.4, clouds: 24},  // fase 4
    {pipe: 2.2, clouds: 22},  // fase 5
    {pipe: 2.0, clouds: 20},  // fase 6
    {pipe: 1.8, clouds: 18},  // fase 7
    {pipe: 1.6, clouds: 16},  // fase 8
    {pipe: 1.4, clouds: 14},  // fase 9
    {pipe: 1.2, clouds: 12},  // fase 10
    {pipe: 1.0, clouds: 10},  // fase 11+
];

let pipeSpeed = faseVelocidade[0].pipe;
let cloudsSpeed = faseVelocidade[0].clouds;

pipe.style.animation = `pipe-animation ${pipeSpeed}s linear infinite`;
clouds.style.animation = `clouds-animation ${cloudsSpeed}s linear infinite`;

const pontosInterval = setInterval(() => {
    pontos += 1;
    pontosDisplay.textContent = pontos;

    // Mudança de fase a cada 1000 pontos
    if (pontos % 1000 === 0) {
        fase += 1;
        faseDisplay.textContent = fase;

        // Alterna clima
        if (fase % 3 === 1) {
            gameBoard.classList.remove('night','rain'); gameBoard.classList.add('day');
        } else if (fase % 3 === 2) {
            gameBoard.classList.remove('day','rain'); gameBoard.classList.add('night');
        } else {
            gameBoard.classList.remove('day','night'); gameBoard.classList.add('rain');
        }

        // Velocidade ajustada por fase da tabela
        const index = Math.min(fase - 1, faseVelocidade.length - 1);
        pipeSpeed = faseVelocidade[index].pipe;
        cloudsSpeed = faseVelocidade[index].clouds;

        pipe.style.animation = `pipe-animation ${pipeSpeed}s linear infinite`;
        clouds.style.animation = `clouds-animation ${cloudsSpeed}s linear infinite`;
    }
}, 50);

// Loop do jogo
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px'; 

        clearInterval(loop);
        clearInterval(pontosInterval);

        gameOverSound.play();
    }
}, 10);

document.addEventListener('keydown', jump);

function restartGame() {
    location.reload();
}
