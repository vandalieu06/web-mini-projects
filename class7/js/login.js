import { users } from "../data/data.js";

const userFields = {
  email: document.querySelector(".login-email"),
  password: document.querySelector(".login-password"),
};

const checkUser = (email, password) => {
  if (!email) {
    alert("Introduce un email");
    return;
  }
  if (!password) {
    alert("Introduce una contraseña");
    return;
  }

  const userDB = users.find((user) => user.email === email);

  if (userDB == undefined) {
    alert("El usuario no existe");
  }

  if (userDB.password !== password) {
    alert("La constraseña es incorrecta");
  }

  localStorage.setItem("user", email);

  location.href = "/";
};

const btnLogin = document.querySelector(".login-submit");
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  checkUser(userFields.email.value, userFields.password.value);
});

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user) {
    location.href = "/";
  }
});
