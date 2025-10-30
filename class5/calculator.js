const numUser = document.querySelector(".user-operation");
const btnNew = document.querySelector(".generate-operation");

const generateRandomNumbers = () => {
  const spanOperation = document.querySelector(".operation");
  const numRandom1 = Math.floor(Math.random(1, 10) * 10 + 1);
  const numRandom2 = Math.floor(Math.random(1, 10) * 10 + 1);
  spanOperation.innerHTML = `${numRandom1} x ${numRandom2} = `;
  return numRandom1 * numRandom2;
};

let actualResult = generateRandomNumbers();

numUser.addEventListener("change", (e) => {
  if (actualResult == numUser.value) {
    numUser.classList.toggle("bg-green-100", true);
    numUser.classList.toggle("bg-red-100", false);
  } else {
    numUser.classList.toggle("bg-green-100", false);
    numUser.classList.toggle("bg-red-100", true);
  }
});

btnNew.addEventListener("click", () => {
  actualResult = generateRandomNumbers();
});
