import { productos } from "../data/data.js";

const historyData = localStorage.getItem("history");
const comprasLista = JSON.parse(historyData);
const historyList = document.querySelector(".historial-lista");

function renderizarHistorialAgrupado() {
  historyList.innerHTML = "";

  comprasLista.forEach((productosIds, index) => {
    const numeroCompra = index + 1;

    const compraTitulo = document.createElement("h3");
    compraTitulo.textContent = `Compra ${numeroCompra}:`;
    historyList.appendChild(compraTitulo);

    const ulProductos = document.createElement("ul");
    let precioTotal = 0;

    productosIds.forEach((idString) => {
      const productId = parseInt(idString);
      const info = productos.find((p) => p.id === productId);

      const liProducto = document.createElement("li");
      liProducto.innerHTML = `Titulo: ${info.title} - Precio: ${info.price}€`;
      ulProductos.appendChild(liProducto);
      precioTotal += info.price;
    });
    const liPrice = document.createElement("li");
    liPrice.textContent = `El precio total és de: ${precioTotal}€`;
    ulProductos.appendChild(liPrice);

    historyList.appendChild(ulProductos);
  });
}

renderizarHistorialAgrupado();
