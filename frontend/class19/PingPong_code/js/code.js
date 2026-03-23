const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaños
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

// Paletas (inicialización)
const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2 };
const player2 = {
	x: canvas.width - 20,
	y: canvas.height / 2 - paddleHeight / 2,
};

// Pelota
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	vx: 4,
	vy: 4,
	size: ballSize,
};

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}

function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.vx = -ball.vx; // Cambia la dirección
	ball.vy = 4 * (Math.random() > 0.5 ? 1 : -1); // Random dirección
}

function updateBall() {
	ball.x += ball.vx;
	ball.y += ball.vy;

	// Rebota arriba y abajo
	if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
		ball.vy *= -1;
	}

	// Rebote con paleta jugador
	if (
		ball.x <= player.x + paddleWidth &&
		ball.y + ball.size >= player.y &&
		ball.y <= player.y + paddleHeight
	) {
		ball.vx *= -1;
		ball.x = player.x + paddleWidth; // Evita quedarse atrapado
	}

	// Rebote con paleta jugador2
	if (
		ball.x + ball.size >= player2.x &&
		ball.y + ball.size >= player2.y &&
		ball.y <= player2.y + paddleHeight
	) {
		ball.vx *= -1;
		ball.x = player2.x - ball.size; // Evita quedarse atrapado
	}

	// Punto jugador o jugador2
	if (ball.x < 0 || ball.x > canvas.width) {
		resetBall();
	}
}

function draw() {
	// Fondo
	drawRect(0, 0, canvas.width, canvas.height, "#222");

	// Paletas
	drawRect(player.x, player.y, paddleWidth, paddleHeight, "white");
	drawRect(player2.x, player2.y, paddleWidth, paddleHeight, "white");

	// Pelota
	drawCircle(ball.x, ball.y, ball.size, "white");
}

function gameLoop() {
	updateBall();
	draw();

	// Aquí programarías el movimiento de las paletas
	// Por ejemplo: player.y += 5 (abajo) o player.y -= 5 (arriba)
	// Te falta detectar el teclado y mover `player.y` y `player2.y` si quieres.
	requestAnimationFrame(gameLoop);
}


document.addEventListener("keydown", (e) => {
		if (e.code.toLocaleLowerCase() === "arrowdown") {
			console.log("Se ha pulsado la flecha hacia abajo.");
		}
	});

gameLoop();
