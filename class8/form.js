let count = 0;
let data = [];

// Componente
const NotesItem = (id, name, note) => {
  return `
    <div class="notes-item" id="${id}">
      <p> ${name} - ${note} </p>
      <button class="red btn-delete">DELETE</button>
    </div>
    `;
};

// Logica
const calcNotesAVG = () => {
  let result = 0;
  data.forEach((d) => (result += d.note));
  return Math.round(result / data.length);
};

// Actualizar UI
const updateNotes = () => {
  const formBody = document.querySelector(".notes-body");
  formBody.innerHTML = "";

  data.forEach((i) => {
    formBody.innerHTML += NotesItem(i.id, i.name, i.note);
  });

  const notesAvg = document.querySelector(".notes-avg");
  notesAvg.textContent = calcNotesAVG();
};

// Guardado y Carga
const loadData = () => {
  const saveData = localStorage.getItem("courses");
  if (saveData !== null) {
    data = JSON.parse(saveData);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  if (data.length > 0) {
    count = data[data.length - 1].id;
    updateNotes();
  }
});

const saveData = (data) => {
  localStorage.setItem("courses", JSON.stringify(data));
};

// Form
const formBtn = document.querySelector(".form-btn");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  count++;

  let itemData = {
    id: count,
    name: document.querySelector(".form-text").value,
    note: parseInt(document.querySelector(".form-num").value),
  };

  data.push(itemData);
  
  saveData(data);
  updateNotes();
});

const notesBody = document.querySelector(".notes-body");
notesBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const parent = e.target.parentNode;
    const newData = data.filter((e) => e.id != parseInt(parent.id));
    data = newData;
    
    saveData(data);
    updateNotes();
  }
});
