let msgError = "";

const listNotice = document.querySelector(".list-notices");
let count = 1;

const btnSubmit = document.querySelector(".form-submit");
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector(".title-form").value;
  const date = document.querySelector(".date-form").value;
  const link = document.querySelector(".link-form").value;
  const description = document.querySelector(".description-form").value;

  if (!checkFields(title, date, link, description)) {
    alert(msgError);
    return;
  }

  const div = document.createElement("div");
  div.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center;">
      <p>Noticia ${count} - ${date} - ${title}</p>
      <a href="${link}">link</a>
      <button class="show-description" data-target="info-extra-${count}">
        + info
      </button>
    </div>
    <span id="info-extra-${count}" class="invisible">${description}</span>
  `;

  listNotice.insertAdjacentElement("beforeend", div);

  const newShowDescriptionBtn = div.querySelector(".show-description");

  newShowDescriptionBtn.addEventListener("click", (e) => {
    const targetId = e.currentTarget.dataset.target;
    const info = document.getElementById(targetId);
    info.classList.toggle("invisible");
  });
  count++;
});

const checkFields = (title, date, link, description) => {
  if (!title || !date || !link || !description) {
    msgError = "Hay campos vacios, rellena todos";
    return false;
  }

  if (title.length > 30) {
    msgError = "El titulo es muy largo";
    return false;
  }

  if (description.length > 60) {
    msgError = "La descripcion es muy larga";
    return false;
  }

  if (date > "2025-10-21") {
    msgError = "La fecha no puede ser en el futuro";
    return false;
  }

  return true;
};
