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
let randomCats = [0, 1, 2, 2, 1, 0];
randomCats = randomCats.sort(() => Math.random() - 0.5);

let life = 2;
let countFlipCards = 0;
let selectedCats = [];

document.querySelector(".life").textContent = life;

const resetGame = () => {
	randomCats = randomCats.sort(() => Math.random() - 0.5);
	const allCatImages = document.querySelectorAll(".cats-card img");

	allCatImages.forEach((cat) => {
		cat.src = imgCatsChoose;
		if (cat.classList.contains("matched")) {
			cat.classList.remove("matched");
		}
	});
};

const resetImages = () => {
	const allCatImages = document.querySelectorAll(
		".cats-card img:not(.matched)",
	);
	allCatImages.forEach((c) => {
		c.src = imgCatsChoose;
	});
};

const catsBox = document.querySelector(".cats");
catsBox.addEventListener("click", (e) => {
	const img = e.target;
	if (
		!img.parentElement.classList.contains("cats-card") ||
		img.classList.contains("matched")
	) {
		return;
	}

	countFlipCards++;

	const articleImg = e.target.parentElement;
	const id = parseInt(articleImg.id.split("-")[1], 10);
	selectedCats.push(id);
	img.src = cats[randomCats[id - 1]].img;
	img.classList.add("matched");

	setTimeout(() => {
		if (countFlipCards === 2) {
			const isCorrect =
				randomCats[selectedCats[0] - 1] === randomCats[selectedCats[1] - 1];

			if (!isCorrect) {
				selectedCats.forEach((i) => {
					document.querySelector(`#cat-${i} img`).classList.remove("matched");
				});
				resetImages();
				life--;
			}

			if (life === 0) {
				life = 2;
				resetGame();
			}

			countFlipCards = 0;
			selectedCats = [];
		}

		document.querySelector(".life").textContent = life;
	}, 1000);
});

document.querySelector(".btn-reset").addEventListener("click", resetGame);
