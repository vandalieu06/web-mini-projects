const cuadrado = document.getElementById("cuadrado");

const BOXSIZE = cuadrado.offsetWidth;
const SALTOS = 10;

let posicionX = window.innerWidth / 2 - BOXSIZE / 2;
let posicionY = window.innerHeight / 2 - BOXSIZE / 2;

const moverCuadrado = () => {
	cuadrado.style.left = `${posicionX}px`;
	cuadrado.style.top = `${posicionY}px`;
};

document.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowUp":
			posicionY = Math.max(0, posicionY - SALTOS);
			break;
		case "ArrowDown":
			posicionY = Math.min(window.innerHeight - BOXSIZE, posicionY + SALTOS);
			break;
		case "ArrowLeft":
			posicionX = Math.max(0, posicionX - SALTOS);
			break;
		case "ArrowRight":
			posicionX = Math.min(window.innerWidth - BOXSIZE, posicionX + SALTOS);
			break;
	}
	console.log(`Width: ${posicionX}\nHeight: ${posicionY}`);
	moverCuadrado();
});

document.addEventListener("DOMContentLoaded", () => {
	moverCuadrado();
	console.log(`Width: ${posicionX}\nHeight: ${posicionY}`);
});
