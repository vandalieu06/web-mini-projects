let tablero = [null, null, null, null, null, null, null, null, null];
let jugadorActual = 1;
let turno = 0;
let sePuedeJugar = true;

const user1 = window.prompt("Introduce un jugador 1", "user1");
const user2 = window.prompt("Introduce un jugador 2", "user2");
const usernameDiv = document.querySelector(".username");
usernameDiv.textContent = jugadorActual === 1 ? user1 : user2;

const guardarPartida = (resultado) => {
	const historial = JSON.parse(localStorage.getItem("historialPartidas")) || [];
	const nuevaPartida = {
		fecha: new Date().toLocaleString(),
		jugador1: user1,
		jugador2: user2,
		resultado: resultado,
	};

	historial.push(nuevaPartida);
	localStorage.setItem("historialPartidas", JSON.stringify(historial));
	console.info("Historial actualizado:", historial);
};

const btnRestart = document.querySelector(".btn-restart");
btnRestart.addEventListener("click", () => {
	document.querySelectorAll(".boxs div").forEach((d) => {
		d.textContent = "";
	});
	tablero = tablero.map((t) => (t = null));
	sePuedeJugar = true;
	btnRestart.classList.add("hidden");
	turno = 0;
	jugadorActual = 1;
	usernameDiv.textContent = user1;
});

const comprovacionGanador = () => {
	const combinacionesGanadoras = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	let hayGandor = false;
	combinacionesGanadoras.forEach((cg) => {
		if (
			tablero[cg[0]] !== null &&
			tablero[cg[0]] === tablero[cg[1]] &&
			tablero[cg[1]] === tablero[cg[2]]
		) {
			hayGandor = true;
		}
	});
	return hayGandor;
};

const boxs = document.querySelector(".boxs");
boxs.addEventListener("click", (e) => {
	const divActual = e.target;
	if (
		!divActual.classList.contains("box") ||
		divActual.textContent !== "" ||
		!sePuedeJugar
	) {
		return;
	}

	turno++;
	divActual.textContent = jugadorActual === 1 ? "X" : "O";
	const id = divActual.id.split("-")[1] - 1;
	tablero[id] = jugadorActual;

	if (turno >= 5) {
		const playerIsWin = comprovacionGanador();
		if (playerIsWin) {
			const ganador = jugadorActual === 1 ? user1 : user2;
			alert("Ganador: " + ganador);
			guardarPartida(`Ganó ${ganador}`);

			btnRestart.classList.remove("hidden");
			sePuedeJugar = false;
			return;
		}

		if (turno === 9 && !playerIsWin) {
			alert("¡Empate!");
			guardarPartida("Empate");
			btnRestart.classList.remove("hidden");
			sePuedeJugar = false;
			return;
		}
	}

	jugadorActual = jugadorActual === 1 ? 2 : 1;
	usernameDiv.textContent = jugadorActual === 1 ? user1 : user2;
});
