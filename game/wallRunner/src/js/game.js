const runner = document.querySelector('.runner');
const frame = document.querySelector('.frame');
let isJumping = false;
let gravity = 0.9;
let gameSpeed = 10;
let score = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    runner.classList.add('jump');
    setTimeout(() => {
        runner.classList.remove('jump');
        isJumping = false;
    }, 600);
}

function createObstacles() {
    const obstacle = document.createElement('div')
    obstacle.classList.add('obstacle');
    frame.appendChild(obstacle);
    let obstaclePosition = 800;

    function moveObstacle() {
        // 이전: obstaclePosition -= obstaclePosition;
        // 수정: obstaclePosition에서 gameSpeed를 빼줍니다
        obstaclePosition -= gameSpeed;
        obstacle.style.left = obstaclePosition + 'px';

        // 충돌 감지
        const runnerRect = runner.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            runnerRect.left < obstacleRect.right &&
            runnerRect.right > obstacleRect.left &&
            runnerRect.top < obstacleRect.bottom &&
            runnerRect.bottom > obstacleRect.top &&
            !isJumping
        ) {
            alert(`Game Over! Score: ${score}`);
            obstacle.remove();
            return;
        }

        if (obstaclePosition < -20) {
            obstacle.remove();
            score++;
        } else {
            requestAnimationFrame(moveObstacle);
        }
    }

    requestAnimationFrame(moveObstacle);
    setTimeout(createObstacles, Math.random() * 2000 + 1000);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

createObstacles();