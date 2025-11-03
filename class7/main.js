import { CartItem, ProductCard } from "./js/components.js";
import { productos } from "./data/data.js";
import { isLogin } from "./js/header.js";

isLogin();

//Logout
const headerLogout = document.querySelector(".header-logout");
headerLogout.addEventListener("click", (e) => {
  localStorage.removeItem("user");
  location.reload();
});

let listProductId = [];

// Cargar Productos
for (let i = 0; i < 8; i++) {
  const productoProps = productos[i];
  const productoHTML = ProductCard(productoProps);
  const contenedor = document.querySelector(".productos-list");
  contenedor.innerHTML += productoHTML;
}

//Calculamos el precio de los productos
const obtainTotalPrice = () => {
  let totalPrice = 0.0;
  if (listProductId.length > 0) {
    for (const productId of listProductId) {
      const { price } = productos[productId - 1];
      totalPrice += price;
    }
  }
  return totalPrice;
};

// Añadir Producto al carrito
const addNewCartItem = (e) => {
  if (e.target.classList.contains("producto-add")) {
    const productoId = e.target.parentNode.id;
    listProductId.push(productoId);
    const newCartItem = CartItem(productos[productoId - 1]);
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML += newCartItem;

    const priceTotal = document.querySelector(".cart-item-total");
    priceTotal.textContent = obtainTotalPrice();
  }
};
const productsList = document.querySelector(".productos-list");
productsList.addEventListener("click", addNewCartItem);

// Comprar
const createHistoryShops = () => {
  const historyString = localStorage.getItem("history");
  const historyArray = historyString ? JSON.parse(historyString) : [];
  historyArray.push(listProductId);
  localStorage.setItem("history", JSON.stringify(historyArray));
};

const btnPay = document.querySelector(".cart-btn-pay");
btnPay.addEventListener("click", () => {
  const actualUser = localStorage.getItem("user");

  if (!actualUser) {
    alert("Debes iniciar sesion");
  }

  createHistoryShops();
});
