// GLOBAl VARIABLES
let tasks = [];

// UI
const ComponentTaskList = (index, name, description, user, date, status) => {
  return `
    <div id="task-${index + 1}"
      class="tasks-line grid grid-cols-6 gap-2 text-md font-normal"
    >
      <p>${name}</p>
      <p>${description}</p>
      <p class="capitalize">${user}</p>
      <p>${date}</p>
      <p>${!status ? "Pendiente" : "Completada"}</p>
      <div class="flex gap-2">
        <button
          id="btn-remove-task-${index + 1}"
          class="tasks-line__button h-max py-1.5 px-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all ease-in"
        >
          <i data-lucide="trash-2" class="w-5"></i>
        </button>
        <button
          id="btn-status-task-${index + 1}"
          class="tasks-line__button h-max py-1.5 px-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all ease-in"
        >
          <i data-lucide="refresh-cw" class="w-5"></i>
        </button>
      </div>
    </div>
  `;
};

const renderTasks = () => {
  const taskListDiv = document.querySelector(".tasks-list");
  taskListDiv.innerHTML = "";

  const tasksList = tasks.map((task, index) => {
    return ComponentTaskList(
      index,
      task.title,
      task.description,
      task.user,
      task.date,
      task.status,
    );
  });

  taskListDiv.innerHTML += tasksList.join("");

  // Esete codigo es para ue despues de cargar ls componentes
  // la libreria de lucide carge los iconos correctamente, ja
  // que esta coge la etoquetas <i> y los convierte en svg
  if (typeof lucide !== "undefined" && tasks.length > 0) {
    lucide.createIcons();
  }
};

// LOGIC APP
const saveData = (nameStorage, data) => {
  localStorage.setItem(nameStorage, JSON.stringify(data));
};

const isValidateDate = (userDate) => {
  const taskDateObj = new Date(userDate);
  taskDateObj.setHours(0, 0, 0, 0);

  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  return taskDateObj < todayObj;
};

// Agregar nueva tarea
const formSubmit = document.querySelector(".form-task__submit");
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const taskInputs = document.querySelectorAll(".form-task__input");

  const tasksInputsArray = [...taskInputs];
  const isValid = tasksInputsArray.every((task) => task.value !== "");

  if (!isValid) {
    alert("No dejes campos en blanco");
    return;
  }

  const taskTitle = taskInputs[0].value;
  const taskDescription = taskInputs[1].value;
  const taskUser = taskInputs[2].value;
  const taskDate = taskInputs[3].value;

  if (isValidateDate(taskDate)) {
    alert("Solo puedes añadir tareas para hoy o para fechas futuras.");
    return;
  }

  const newTask = {
    title: taskTitle,
    description: taskDescription,
    user: taskUser,
    date: taskDate,
    status: false,
  };

  tasks.push(newTask);

  saveData("tasks", tasks);
  renderTasks();
});

const isUserLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user !== null;
};

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = isUserLoggedIn();

  if (!isLoggedIn) {
    window.location.href = "/pages/login.html";
  }

  const spanUsername = document.querySelector(".span-username");
  spanUsername.innerText = JSON.parse(localStorage.getItem("user"));

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }

  const taskListDiv = document.querySelector(".tasks-list");
  taskListDiv.addEventListener("click", (e) => {
    const btnParent = e.target.parentElement;
    const taskIndex = parseInt(btnParent.id.split("-")[3]) - 1;

    if (e.target.classList.contains("lucide-trash-2")) {
      tasks.splice(taskIndex, 1);
      saveData("tasks", tasks);
      renderTasks();
    }

    if (e.target.classList.contains("lucide-refresh-cw")) {
      tasks[taskIndex].status = !tasks[taskIndex].status;
      saveData("tasks", tasks);
      renderTasks();
    }
  });
});
