const listValidUsers = ["admin@gmail.com", "jhonny@gmail.com"];
const listValidPasswords = ["admin1234", "hola_mundo1234"];

const form = document.querySelector(".form");
const email = document.querySelector(".btn-email");
const password = document.querySelector(".btn-password");
const submit = document.querySelector(".btn-submit");

const msg1 = document.querySelector(".msg-err-1");
const msg2 = document.querySelector(".msg-err-2");
const msg3 = document.querySelector(".msg-correct");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg3.style.display = "none";

  if (!email.value) {
    msg1.style.display = "block";
  } else {
    msg1.style.display = "none";
  }

  if (!password.value) {
    msg2.style.display = "block";
  } else {
    msg2.style.display = "none";
  }
  
  if (!email.value && !password.value) return;

  if (
    listValidUsers.includes(email.value) &&
    listValidPasswords.includes(password.value)
  ) {
    msg3.style.display = "block";
    msg3.innerHTML = "Datos correctos";
    msg3.style.color = "green";
  } else {
    msg3.style.display = "block";
    msg3.innerHTML = "Datos incorrectos";
    msg3.style.color = "red";
  }
});
