// VARIABELS GLOBALES
let seats = Array.from({ length: 20 }, () => new Array(9).fill(0));
let currentUser = "jhonny";
const assignments = JSON.parse(localStorage.getItem("assignments")) || {};
const xxlReservations =
	JSON.parse(localStorage.getItem("xxlReservations")) || {};

// METODO GUARDADO DE DATOS
const saveData = () => {
	localStorage.setItem("seats", JSON.stringify(seats));
	localStorage.setItem("assignments", JSON.stringify(assignments));
	localStorage.setItem("xxlReservations", JSON.stringify(xxlReservations));
};

// FUNCION QUE RENDERIZA LOS ASIENTOS
const renderUI = (data) => {
	const seatsDiv = document.querySelector(".seats");
	seatsDiv.innerHTML = "";
	document.querySelector(".username").textContent = currentUser;

	for (let x = 0; x < data.length; x++) {
		const rowContent = data[x]
			.map((value, y) => {
				const colors = {
					0: "bg-green-600",
					1: "bg-yellow-600",
					2: "bg-red-600",
				};
				return `
				  <div id="${x}-${y}" class="w-8 h-8 ${colors[value]} seats-box cursor-pointer flex items-center justify-center text-[8px] text-white font-bold">
            ${value === 2 ? "X" : x < 2 ? "XXL" : ""}
          </div>`;
			})
			.join("");
		seatsDiv.innerHTML += `<div class="grid grid-cols-9 gap-2 mx-auto">${rowContent}</div>`;
	}
	renderUserTable();
};

// RENDERIZA TABLA DE USUARIOS CON ASIENTOS OCUPADOS POR CADA UNO
const renderUserTable = () => {
	const tableBody = document.querySelector(".user-table-body");
	tableBody.innerHTML = "";

	const summary = {}; // {"user": [c1, c2, c3, ...], ...}
	Object.entries(assignments).forEach(([coord, user]) => {
		if (!summary[user]) summary[user] = [];
		summary[user].push(coord);
	});

	Object.entries(summary).forEach(([user, seats]) => {
		tableBody.innerHTML += `
            <tr class="border-b text-center">
                <td class="p-2 capitalize font-bold">${user}</td>
                <td class="p-2">${seats.length}</td>
                <td class="p-2 text-xs">${seats.join(", ")}</td>
            </tr>`;
	});
};

// --- LÓGICA DE CLICKS (SOLO VERDE <-> AMARILLO) ---
const seatsDiv = document.querySelector(".seats");
seatsDiv.addEventListener("click", (e) => {
	if (!e.target.classList.contains("seats-box")) return;

	const [x, y] = e.target.id.split("-").map((n) => Number(n));
	const actpos = `${x}-${y}`;
	const currentStatus = seats[x][y];

	if (currentStatus === 2) return;
	if (currentStatus === 0) {
		if (x < 2) {
			const count = xxlReservations[currentUser] || 0;
			if (count >= 2) return alert("Máximo 2 XXL por usuario");
			xxlReservations[currentUser] = count + 1;
		}
		seats[x][y] = 1;
		assignments[actpos] = currentUser;
	} else if (currentStatus === 1 && assignments[actpos] === currentUser) {
		if (x < 2) xxlReservations[currentUser]--;
		seats[x][y] = 0;
		delete assignments[actpos];
	}

	saveData();
	renderUI(seats);
});

// RESERVAR ASIENTO
const btnReserva = document.querySelector(".btn-reserva");
btnReserva.addEventListener("click", () => {
	let hasChanges = false;

	for (let x = 0; x < seats.length; x++) {
		for (let y = 0; y < seats[x].length; y++) {
			const pos = `${x}-${y}`;
			if (seats[x][y] === 1 && assignments[pos] === currentUser) {
				seats[x][y] = 2;
				hasChanges = true;
			}
		}
	}

	if (hasChanges) {
		saveData();
		renderUI(seats);
		alert("¡Reserva confirmada!");
	} else {
		alert("No tienes asientos seleccionados (amarillos) para reservar.");
	}
});
const userList = document.querySelector(".users-list");
userList.addEventListener("change", (e) => {
	currentUser = e.target.value;
	renderUI(seats);
});

document.addEventListener("DOMContentLoaded", () => {
	const db = localStorage.getItem("seats");
	if (db) seats = JSON.parse(db);
	renderUI(seats);
});
