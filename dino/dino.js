const canvas = document.getElementById('dinoCanvas');
const ctx = canvas.getContext('2d');

// Dino-Position, Geschwindigkeit und Beschleunigung
let dinoY = canvas.height - 50;
let dinoX = canvas.width / 2;
let dinoVX = 0;
let dinoVY = 0;
const gravity = 0.5;

// Berge
const mountains = [
    { x: 0, height: 100, width: 200 },
    { x: 250, height: 200, width: 250 },
    { x: 550, height: 150, width: 150 },
    { x: 750, height: 180, width: 200 },
    { x: 1000, height: 120, width: 180 },
];

// Dino zeichnen
function drawDino(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

// Berge zeichnen
function drawMountains() {
    mountains.forEach((mountain) => {
        ctx.beginPath();
        ctx.moveTo(mountain.x, canvas.height);
        ctx.lineTo(mountain.x + mountain.width / 2, canvas.height - mountain.height);
        ctx.lineTo(mountain.x + mountain.width, canvas.height);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// Canvas aktualisieren
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMountains();
    drawDino(dinoX, dinoY);
}

// Springen
function jump() {
    if (dinoY === canvas.height - 50) {
        dinoVY = -15;
    }
}

// Schwerkraft
function applyGravity() {
    dinoY += dinoVY;
    dinoVY += gravity;

    if (dinoY > canvas.height - 50) {
        dinoY = canvas.height - 50;
        dinoVY = 0;
    }
}

// Horizontale Bewegung
function moveHorizontally() {
    dinoX += dinoVX;

    // Bewege Berge in entgegengesetzter Richtung der Dino-Bewegung
    mountains.forEach((mountain) => {
        mountain.x -= dinoVX * 0.5;
    });
}

// Tastendruck-Event
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        jump();
    } else if (event.code === 'ArrowLeft') {
        dinoVX = -5;
    } else if (event.code === 'ArrowRight') {
        dinoVX = 5;
    }
});

// Tastenloslassen-Event
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        dinoVX = 0;
    }
});

// Animation
function animate() {
    updateCanvas();
    applyGravity();
    moveHorizontally();
    requestAnimationFrame(animate);
}

// Starte Animation
animate();
