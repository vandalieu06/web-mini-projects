const URI_API = "https://pokeapi.co/api/v2/";
const link_poke = "pokemon/";

const btn = document.querySelector(".btn-submit") as HTMLButtonElement;
const num = document.querySelector(".input_number") as HTMLInputElement;
const span_result = document.querySelector(".text-result");

btn?.addEventListener("click", async (e) => {
  e.preventDefault();
  if (span_result !== null) {
    try {
      const response = await fetch(URI_API + link_poke + num?.value);
      const data = await response.json();
      span_result.innerHTML = data.name;
    } catch (error) {
      console.error(error);
    }
  }
});
