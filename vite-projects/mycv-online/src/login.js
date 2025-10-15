const users = [
  { email: "admin@admin.com", password: "admin1234" },
  { email: "user1@gmail.com", password: "1234" },
];

const btnSubmit = document.querySelector(".btn-submit");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const msgError = document.querySelector(".msg-error-text");

let msgText = "";

btnSubmit?.addEventListener("click", (e) => {
  e.preventDefault();

  if (!checkCredentials(email.value, password.value)) {
    msgError.classList.add("text-red-600");
    msgError.innerHTML = msgText;
    return;
  }
  msgError.classList.add("text-green-600");
  msgError.innerHTML = "Todas la credenciales son correctas";
});

const checkCredentials = (email, password) => {
  if (!email) {
    msgText = "No se ha introducido el email";
    return false;
  }

  if (!password) {
    msgText = "No se ha introducido la contraseña";
    return false;
  }

  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    msgText = "El email y/o constraseña es incorrecta";
    return false;
  }

  return true;
};

// Primera logica de login
const checkEmail = (email) => {
  if (email === undefined || email === "") {
    msgText = "No se ha definido el email";
    return false;
  }

  const isEmailCorrect = (user) => user.email === email;

  if (!users.some(isEmailCorrect)) {
    msgText = "El email es incorrecto";
    return false;
  }

  return true;
};

const checkPassword = (password, email) => {
  if (password === undefined || password === "") {
    msgText = "No se ha definido la contraseña";
    return false;
  }

  const isPasswordCorrect = (user) =>
    user.email === email && user.password === password;

  if (!users.some(isPasswordCorrect)) {
    msgText = "La contraseña es incorrecta";
    return false;
  }

  return true;
};
