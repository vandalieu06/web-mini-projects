class Mascota {
	nom;
	edat;
	foto;
	tipus;

	constructor(nom, edat, foto, tipus) {
		this.nom = nom;
		this.edat = edat;
		this.foto = foto;
		this.tipus = tipus;
	}

	get getName() {
		return this.nom;
	}
	get getEdat() {
		return this.edat;
	}
	get getFoto() {
		return this.foto;
	}
	get getTipus() {
		return this.tipus;
	}

	descriure() {
		return `${this.nom} és un ${this.tipus} de ${this.edat} anys.`;
	}
}

class Gos extends Mascota {
	constructor(nom, edat, foto, raça) {
		super(nom, edat, foto, "Gos");
		this.raça = raça;
	}
	getTipus() {
		return this.raça;
	}
}

class Gat extends Mascota {
	constructor(nom, edat, foto) {
		super(nom, edat, foto, "Gat");
	}

	ferSo() {
		return "Miau miau";
	}
}

class Ocell extends Mascota {
	constructor(nom, edat, foto) {
		super(nom, edat, foto, "Ocell");
	}

	ferSo() {
		return "Piu piu";
	}
}

const ComponentBox = (name, edat, imageURL, raza = "ninguna") => {
	const pRaza =
		raza === "ninguna" ? "" : `<p class="text-sm text-gray-500">${raza}</p>`;
	return `
	<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100">
    <img
      src="${imageURL}"
      alt="Imagen del animal"
      class="w-full h-40 object-cover"
    />

    <div class="p-4">
      <div class="flex justify-between items-center mb-1">
        <p class="text-lg font-bold text-gray-700 truncate">${name}</p>
        <span class="text-sm font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
          ${edat}
        </span>
      </div>
      ${pRaza}
    </div>
  </article>
  `;
};

let animals = [];

const saveData = (db, data) => {
	localStorage.setItem(db, JSON.stringify(data));
};

const loadData = (db) => {
	return JSON.parse(localStorage.getItem(db));
};

const renderTemplate = (data) => {
	const boxAnimals = document.querySelector(".boxs-animals");
	boxAnimals.innerHTML = "";
	data.forEach((d) => {
		boxAnimals.innerHTML += ComponentBox(d.name, d.edat, d.imagen);
	});
};

const animalForm = document.querySelector(".animal-form");
const tipoSelect = animalForm.querySelector(".animal-tipo");
const razaInput = animalForm.querySelector(".animal-raza");

tipoSelect.addEventListener("change", (e) => {
	if (e.target.value === "dog") {
		razaInput.disabled = false;
	} else {
		razaInput.disabled = true;
		razaInput.value = "";
	}
});

animalForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const animal = new FormData(animalForm);
	const data = Object.fromEntries(animal.entries());

	for (const a in data) {
		if (data[a] === "") {
			alert("Datos vacios");
			return;
		}
	}

	animals.push(data);
	saveData("animals", animals);
	renderTemplate(animals);
});

document.addEventListener("DOMContentLoaded", () => {
	if (loadData("animals")) {
		animals = loadData("animals");
		renderTemplate(animals);
	}
});
