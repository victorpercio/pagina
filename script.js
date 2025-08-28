const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const resetGame = () => {
    // Reinicia as variáveis e animações
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    mario.src = './imgs/mario.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    cloud.style.left = '0';
    cloud.style.animation = 'cloud 20s infinite linear';
    
    // Coloca o jogo de volta ao estado inicial
    gameOver.style.visibility = 'hidden';
    mario.style.animation = 'none';
    pipe.style.animation = 'none';
    
    // Reinicia o intervalo
    loop = setInterval(gameLoop, 10);
};

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Colisão detectada
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imgs/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        cloud.style.animation = 'cloud 20s infinite linear';
        cloud.style.left = `${cloudPosition}px`;

        gameOver.style.visibility = 'visible';
        clearInterval(loop);
        
        // Reinicia o jogo após 2 segundos
        setTimeout(resetGame, 2000);
    }
};

let loop = setInterval(gameLoop, 10);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
