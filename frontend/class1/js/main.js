let mostrarNota = (num) => {
  if (num < 0 || num > 10){
    alert("INCORRECTO - Introduce un valor del 0 al 10")
  }
  if (num > 0 && num <=4){
    alert(`Has supendido con ${num} [INSUFICIENTE]`);
  } else if (num > 4 && num <=6){
    alert(`Has Aprobado con ${num} [SUFICIENTE];`)
  } else if (num > 6 && num <= 8){
    alert(`Has Aprobado con ${num} [NOTABLE]`);
  } else if (num > 8 && num <=10){
    alert(`Has Aprobado con ${num} [EXCELENTE]`);
  }
}

let num = prompt("Introduce un valor del 0 al 10")
mostrarNota(parseInt(num));