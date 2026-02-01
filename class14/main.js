const cats = [
	{
		name: "Cat 1",
		img: "./img/img1.png",
	},
	{
		name: "Cat 2",
		img: "./img/img2.png",
	},
	{
		name: "Cat 3",
		img: "./img/img3.png",
	},
];
const imgCatsChoose = "./img/you_choose.png";
let countFlipCards = 0;
const randomCats = [0, 1, 2, 2, 1, 0];
let selectedCats = [];

const catsBox = document.querySelector(".cats");
const allCatImages = document.querySelectorAll(".cats-card img");

const resetImages = () => {
	allCatImages.forEach((c) => {
		c.src = imgCatsChoose;
	});
};

catsBox.addEventListener("click", (e) => {
	if (e.target.parentElement.classList.contains("cats-card")) {
		if (countFlipCards > 1) {
			resetImages();
			countFlipCards = 0;
			selectedCats = [];
			return;
		}

		const img = e.target;
		const articleImg = e.target.parentElement;
		const id = parseInt(articleImg.id.split("-")[1]);
		selectedCats.push(id);

		img.src = cats[randomCats[id - 1]].img;
		countFlipCards++;
	}
});
