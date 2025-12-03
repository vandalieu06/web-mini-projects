/*
- Array 10x10
- Busicaminas en posiciones x (5 minas)
- !5 intentos
*/

let mines = Array(100).fill(0); // https://stackoverflow.com/questions/2044760/default-array-values
let locationMines = [];

let responses = [];
let attemps = 20;
let correctrResponses = 0;

const bodyGame = document.querySelector(".game");
const spanAttemps = document.querySelector(".intents");
spanAttemps.innerText = attemps;

// Cargamos las minas
const renderUI = () => {
  for (let i = 1; i <= mines.length; i++) {
    const newBtn = document.createElement("button");
    newBtn.innerText = i;
    newBtn.setAttribute("id", i);
    newBtn.classList.add(
      "py-2",
      "px-3",
      "rounded",
      "cursor-pointer",
      "bg-pink-200",
      "btn",
    );
    bodyGame.appendChild(newBtn);
  }
};

// Generar Minas
const renderMines = () => {
  do {
    const n = Math.floor(Math.random() * 100); // 0 a 99
    if (!locationMines.includes(n)) {
      locationMines.push(n);
      mines[n] = 1;
    }
  } while (locationMines.length != 10);
};

renderUI();
renderMines();

console.log(mines);
console.log(locationMines.map((e) => e + 1)); // Datos adapatado al tablero

// Logica del juego
const logicGame = (e) => {
  const btn = e.target;
  let btnId = parseInt(btn.id) - 1; // Escoger datos array 1 a 100 => a 0 / 99

  if (!responses.includes(btnId)) {
    responses.push(btnId);
    --attemps;
    spanAttemps.innerText = attemps;
  }

  if (mines[btnId] === 1) {
    ++correctrResponses;
    btn.classList.remove("bg-pink-200");
    btn.classList.add("bg-green-700");
  } else {
    btn.classList.remove("bg-pink-200");
    btn.classList.add("bg-red-700");
  }

  if (correctrResponses >= 5) {
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.classList.add("bg-yellow-900");
    });
  }
};

// Evento
bodyGame.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    if (responses.length >= 15) {
      alert("Has ejecutado todos los movimientos posible");
      return;
    }

    logicGame(e);
  }
});
