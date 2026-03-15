/*
  Realizar un programa que piense un numero aleatorio entre 1 y 50.
  El usuario tiene que adivinarlo (5 opurtunidades).
  EL numero es mas grande o mas pequeño.
*/
function adiviniarNumero() {
    let randomNumber = Math.random() * 50 + 1;
    let numUser = parseInt(prompt("Itroduce un valor del 1 al 50") ?? "");
    for (let i = 1; i <= 5; i++) {
        if (randomNumber === numUser) {
            console.log("Numero correcto");
            break;
        }
        else {
            console.log("Nunero incorrecto");
            numUser < 25
                ? console.log("Es menor a 25")
                : console.log("Es mayor a 25");
        }
    }
}
/*
  Realizar un programma que pida al usuario y muetre de 0 a 100 saltos segun el numeor
  Ejemplo:
    Numero Introducido es el 5
    - 5 - 10 - 15 - 20 - ... - 100
*/
function imprimirSerie() {
    const userNum = parseInt(document.querySelector(".number").value);
    if (userNum <= 0)
        return console.error("Introduce un valor mas garnde que 0.");
    let resultado = document.querySelector(".resultado");
    for (let i = 0; i <= 100; i += userNum) {
        console.log(i);
        if (resultado) {
            resultado.innerHTML += `${i} `;
        }
    }
}
let form = document.querySelector(".submit");
form?.addEventListener('click', (e) => {
    e.preventDefault();
    imprimirSerie();
});
export {};
//# sourceMappingURL=main.js.map