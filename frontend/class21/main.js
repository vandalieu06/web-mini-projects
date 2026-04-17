// FORMUALRIO de registro de actividades
//
const actividades = ["jugar", "bailar", "caminar", "..."];
const selectActividades = document.querySelector("#actividades");
const btnNewActivity = document.querySelector("#btn-submit-actividad");
const formAdd = document.querySelector("#form-add");

const renderOptions = (acts) => {
  const options = acts
    .map((a) => `<option values ${a}}>${a.toUpperCase()}</option>`)
    .join("");
  selectActividades.innerHTML = options;
};

renderOptions(actividades);

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formAdd);

  fetch(
    `validardatos.php?name=${form.get("name")}&edad=${form.get("edad")}&actividad=${form.get("actividades")}`,
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
