// Source - https://stackoverflow.com/a/49201210
let seats = Array.from({ length: 20 }, () => new Array(9).fill(0));

const saveData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

const ComponentSeats = (content) => {
	return `
	<div class="grid grid-cols-9 seats-file">
    ${content}
  </div>
  `;
};

const ComponentSeatsRow = (x, y, status) => {
	const STATUS_COLORS = {
		0: "bg-green-600",
		1: "bg-yellow-600",
		2: "bg-red-600",
	};

	const bg_color = STATUS_COLORS[status] || STATUS_COLORS[0];

	return `
    <div id="${x}-${y}" class="w-8 h-8 ${bg_color} seats-box seats-free cursor-pointer"></div>
  `;
};

const renderUI = (data) => {
	const seatsDiv = document.querySelector(".seats");
	seatsDiv.innerHTML = "";
	for (let x = 0; x < data.length; x++) {
		const rowContent = [];

		for (let y = 0; y < data[x].length; y++) {
			rowContent.push(ComponentSeatsRow(x, y, data[x][y]));
		}
		const seatsFile = ComponentSeats(rowContent.join(""));
		const seatsDiv = document.querySelector(".seats");
		seatsDiv.innerHTML += seatsFile;
	}
};

const containerSeats = document.querySelector(".seats");
containerSeats.addEventListener("click", (e) => {
	if (e.target.classList.contains("seats-box")) {
		const id = e.target.id;
		const ids = id.split("-");
		console.log(ids);
		const x = parseInt(ids[0]);
		const y = parseInt(ids[1]);

		seats[x][y] = seats[x][y] < 2 ? seats[x][y] + 1 : 0;
		saveData("seats", seats);
		renderUI(seats);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const seatsDB = localStorage.getItem("seats");
	if (seatsDB) {
		seats = JSON.parse(seatsDB);
	}
	renderUI(seats);
});
