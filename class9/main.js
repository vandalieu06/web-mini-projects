let movies = ["Matrix", "Deadpool", "Vaiana"];

const listMovies = document.querySelector(".movies-list");

const renderMovies = (text = "") => {
  listMovies.innerHTML = "";

  const filteredMovies = movies.filter((m) => {
    return m.toLowerCase().includes(text.toLowerCase());
  });

  filteredMovies.forEach((m) => {
    const liMovie = document.createElement("li");
    liMovie.textContent = m;
    listMovies.appendChild(liMovie);
  });
};

const renderSelect = () => {
  const selectMovies = document.querySelector(".select-movies");
  selectMovies.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Selecciona una opción";
  selectMovies.appendChild(defaultOption);

  movies.forEach((m) => {
    const option = document.createElement("option");
    option.value = m.toLowerCase();
    option.textContent = m;
    selectMovies.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
  renderSelect();
});

const searchMovies = document.querySelector(".movies-search");
searchMovies.addEventListener("input", (e) => {
  const textValue = e.target.value;
  renderMovies(textValue);
});

const btnForm = document.querySelector(".btnSubmit");
btnForm.addEventListener("click", () => {
  const newMovie = document.querySelector(".new-movie-title");
  movies.push(newMovie.value);
  newMovie.value = "";
  renderMovies();
  renderSelect();
});

const deleteMovies = () => {
  const actualOption = document.querySelector(".select-movies").value;
  const newMovies = movies.filter(
    (e) => !e.toLowerCase().includes(actualOption),
  );
  movies = newMovies;
  renderMovies();
  renderSelect();
};

const btnRemove = document.querySelector(".btn-delete");
btnRemove.addEventListener("click", () => {
  deleteMovies();
});
