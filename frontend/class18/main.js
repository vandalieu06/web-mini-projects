const STORAGE_KEY = "tasks";
const USER_KEY = "currentUser";

const columns = {
  pendents: "pendent",
  "en-curs": "en-curs",
  finalitzades: "finalitzada",
};

let draggedTaskId = null;
let currentUser = null;

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  return JSON.parse(user);
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  if (!tasks) {
    const defaultTasks = [
      {
        id: "task-1",
        titulo: "Revisar código",
        descripcion: "Revisar el código del proyecto",
        asignadoA: "Admin",
        estado: "pendent",
      },
      {
        id: "task-2",
        titulo: "Reunión con equipo",
        descripcion: "Reunión semanal de seguimiento",
        asignadoA: "Jhonny",
        estado: "en-curs",
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  }
  return JSON.parse(tasks);
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const setUserInfo = () => {
  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");
  const addTaskBtn = document.getElementById("add-task-btn");

  if (currentUser) {
    const roleText = currentUser.isAdmin ? "ADMIN" : "USUARIO";
    userInfo.textContent = `${currentUser.name} | ${roleText}`;
    userInfo.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");

    if (currentUser.isAdmin) {
      addTaskBtn.classList.remove("hidden");
    } else {
      addTaskBtn.classList.add("hidden");
    }
  }
};

const getTasksForUser = (tasks) => {
  if (!currentUser) return [];
  if (currentUser.isAdmin) return tasks;
  return tasks.filter((task) => task.asignadoA === currentUser.name);
};

const renderTasks = () => {
  const allTasks = getTasksFromLocalStorage();
  const userTasks = getTasksForUser(allTasks);

  Object.keys(columns).forEach((columnId) => {
    const col = document.getElementById(columnId);
    col.innerHTML = "";

    const tasksInColumn = userTasks.filter(
      (task) => task.estado === columns[columnId],
    );

    tasksInColumn.forEach((task) => {
      const taskEl = createTaskElement(task);
      col.appendChild(taskEl);
    });
  });
};

const createTaskElement = (task) => {
  const li = document.createElement("li");
  li.id = task.id;
  li.className = "task-card bg-white p-4 rounded cursor-move";
  li.draggable = true;

  li.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-sm md:text-base">${task.titulo}</h3>
            ${
              currentUser.isAdmin
                ? `
                <div class="flex gap-1">
                    <button onclick="editTask('${task.id}')" class="text-xs px-2 py-1 border border-black hover:bg-black hover:text-white transition">Edit</button>
                    <button onclick="deleteTask('${task.id}')" class="text-xs px-2 py-1 border border-black hover:bg-black hover:text-white transition">X</button>
                </div>
            `
                : ""
            }
        </div>
        <p class="text-xs md:text-sm text-gray-600 mb-2">${task.descripcion}</p>
        <span class="text-xs font-bold bg-black text-white px-2 py-1 uppercase tracking-wider">
            ${task.asignadoA}
        </span>
    `;

  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragend", handleDragEnd);

  return li;
};

const handleDragStart = (e) => {
  draggedTaskId = e.target.id;
  e.target.classList.add("task-ghost");
  e.dataTransfer.effectAllowed = "move";
};

const handleDragEnd = (e) => {
  e.target.classList.remove("task-ghost");
  draggedTaskId = null;
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const handleDrop = (e) => {
  e.preventDefault();
  const columnId = e.target.closest("ul").id;

  if (draggedTaskId && columns[columnId]) {
    const newStatus = columns[columnId];
    const allTasks = getTasksFromLocalStorage();
    const taskIndex = allTasks.findIndex((t) => t.id === draggedTaskId);

    if (taskIndex !== -1) {
      allTasks[taskIndex].estado = newStatus;
      saveTasksToLocalStorage(allTasks);
      renderTasks();
    }
  }
};

const addTask = (titulo, descripcion, asignadoA) => {
  const allTasks = getTasksFromLocalStorage();
  const newTask = {
    id: "task-" + Date.now(),
    titulo,
    descripcion,
    asignadoA,
    estado: "pendent",
  };

  allTasks.push(newTask);
  saveTasksToLocalStorage(allTasks);
  renderTasks();
};

const updateTask = (id, titulo, descripcion) => {
  const allTasks = getTasksFromLocalStorage();
  const taskIndex = allTasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    allTasks[taskIndex].titulo = titulo;
    allTasks[taskIndex].descripcion = descripcion;
    saveTasksToLocalStorage(allTasks);
    renderTasks();
  }
};

const deleteTask = (id) => {
  if (confirm("¿Estás seguro de eliminar esta tarea?")) {
    const allTasks = getTasksFromLocalStorage();
    const filteredTasks = allTasks.filter((t) => t.id !== id);
    saveTasksToLocalStorage(filteredTasks);
    renderTasks();
  }
};

window.openAddTaskModal = () => {
  const modal = document.getElementById("task-modal");
  modal.showModal();
};

window.closeAddTaskModal = () => {
  const modal = document.getElementById("task-modal");
  modal.close();
  document.getElementById("task-form").reset();
};

const openEditModal = (taskId) => {
  const allTasks = getTasksFromLocalStorage();
  const task = allTasks.find((t) => t.id === taskId);

  if (task) {
    document.getElementById("edit-task-id").value = taskId;
    document.getElementById("edit-title").value = task.titulo;
    document.getElementById("edit-description").value = task.descripcion;
    const modal = document.getElementById("edit-modal");
    modal.showModal();
  }
};

window.closeEditModal = () => {
  const modal = document.getElementById("edit-modal");
  modal.close();
  document.getElementById("edit-form").reset();
};

window.editTask = openEditModal;
window.deleteTask = deleteTask;

window.logout = () => {
  localStorage.removeItem(USER_KEY);
  window.location.href = "login.html";
};

document.addEventListener("DOMContentLoaded", () => {
  currentUser = getUserFromLocalStorage();

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  setUserInfo();
  renderTasks();

  Object.keys(columns).forEach((columnId) => {
    const columnEl = document.getElementById(columnId);
    columnEl.addEventListener("dragover", handleDragOver);
    columnEl.addEventListener("drop", handleDrop);
  });

  const taskForm = document.getElementById("task-form");
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("task-title").value.trim();
    const descripcion = document
      .getElementById("task-description")
      .value.trim();
    const asignadoA = document.getElementById("task-assignee").value;

    if (titulo) {
      addTask(titulo, descripcion, asignadoA);
      closeAddTaskModal();
    }
  });

  const editForm = document.getElementById("edit-form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-task-id").value;
    const titulo = document.getElementById("edit-title").value.trim();
    const descripcion = document
      .getElementById("edit-description")
      .value.trim();

    if (id && titulo) {
      updateTask(id, titulo, descripcion);
      closeEditModal();
    }
  });

  const taskModal = document.getElementById("task-modal");
  taskModal.addEventListener("click", (e) => {
    if (e.target === taskModal) {
      closeAddTaskModal();
    }
  });

  const editModal = document.getElementById("edit-modal");
  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
      closeEditModal();
    }
  });
});
