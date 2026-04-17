document.addEventListener("DOMContentLoaded", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto", true);

  const mostrar = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Todo OK!");
        const res = JSON.parse(xhr.response);
        console.log(res);
        const keys = Object.keys(res);
        console.log(keys);
      }
    }
  };

  xhr.onreadystatechange = mostrar;
  xhr.send();
});
