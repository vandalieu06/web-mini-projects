const users = [
  {
    username: "jhonny",
    email: "jhonny@gmail.com",
    password: "123456",
  },
  {
    username: "john",
    email: "john@gmail.com",
    password: "123456",
  },
];

const checkCredentials = (users, username, password) => {
  const userByUsername = users.find((user) => user.username === username);
  const userByEmail = users.find((user) => user.email === username);

  if (userByUsername && userByUsername.password === password) {
    return userByUsername;
  }

  if (userByEmail && userByEmail.password === password) {
    return userByEmail;
  }

  return false;
};

const loginFormSubmit = document.querySelector(".login-form__submit");

loginFormSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.removeItem("user");

  const credetials = document.querySelectorAll(".login-form__input");
  const username = credetials[0].value;
  const password = credetials[1].value;

  const isValidUser = checkCredentials(users, username, password);

  if (!isValidUser) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  window.localStorage.setItem("user", JSON.stringify(isValidUser.username));

  window.location.href = "../index.html";
});
