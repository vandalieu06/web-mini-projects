const formCV = document.querySelector("#cvForm");
const viewCv = document.querySelector(".view_cv")[0];

const btnGenerate = document.querySelector(".btn-generar");

const nameAttr = document.querySelectorAll("input[type='text']");
const emailAttr = document.querySelectorAll("input[type='email']");
const telefonoAttr = document.querySelectorAll("input[type='tel']");
const urlAttr = document.querySelectorAll("input[type='url']");

// Mensaje de error por cada tipo de input
let msgNameError = "";

let totalErrors = 0;

const checkNameInput = (content) => {
  if (!content.value) {
    msgNameError = "El campo no puede estar vacio";
    return false;
  }
  return true;
};

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();

  nameAttr.forEach((text) => {
    if (!checkNameInput(text)) {
      text.insertAdjacentElement("afterend", msgNameError);
      totalErrors++;
    }
  });

  if (totalErrors === 0) {
    formCV.classList.toogle("hidden", true);
    viewCv.classList.toogle("hidden", false);
  }
});
