/*
Realizar web con imagen central
  - click
  - MouseOver
  - MouseOut
  - Flechas
*/

let actualCat = 0;
const containerImg = document.querySelector(".img-container");
const img = document.querySelector(".img");
const description = document.querySelector(".img-desc");

containerImg.addEventListener("click", () => {
	img.src = `https://cataas.com/cat?time=${Date.now()}`;
});

const btnPrev = document.querySelector(".btn-pre");
const btnNext = document.querySelector(".btn-next");

btnPrev.addEventListener("click", () => {
	if (actualCat > 1) {
		actualCat--;
	}
	img.src = `https://cataas.com/cat?id=${actualCat}`;
});

btnNext.addEventListener("click", () => {
	if (actualCat <= 10) {
		actualCat++;
	}
	img.src = `https://cataas.com/cat?id=${actualCat}`;
});

containerImg.addEventListener("mouseover", () => {
	description.classList.toggle("hidden");
	img.classList.toggle("scale-120");
});

containerImg.addEventListener("mouseout", () => {
	description.classList.toggle("hidden");
	img.classList.toggle("scale-120");
});
