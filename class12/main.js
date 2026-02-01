// Clases de los animales
class Mascota {
	constructor(nom, edat, foto, tipus) {
		this.nom = nom;
		this.edat = edat;
		this.foto = foto;
		this.tipus = tipus;
	}

	descriure() {
		return `${this.nom} es un ${this.tipus}.`;
	}

	ferSo() {
		return "Sonido genérico";
	}
}

class Gos extends Mascota {
	constructor(nom, edat, foto, raça) {
		super(nom, edat, foto, "Gos");
		this.raça = raça;
	}

	getInformacionExtra() {
		return this.raça;
	}

	ferSo() {
		return "¡Guau guau!";
	}
}

class Gat extends Mascota {
	constructor(nom, edat, foto) {
		super(nom, edat, foto, "Gat");
	}

	ferSo() {
		return "¡Miau miau!";
	}
}

class Ocell extends Mascota {
	constructor(nom, edat, foto) {
		super(nom, edat, foto, "Ocell");
	}

	ferSo() {
		return "¡Piu piu!";
	}
}

// Logica de la aplicación
let animals = [];
const DB_NAME = "animals_data";

const animalForm = document.querySelector(".animal-form");
const tipoSelect = document.querySelector(".animal-tipo");
const razaInput = document.querySelector(".animal-raza");
const searchInput = document.querySelector('input[type="search"]');
const boxAnimals = document.querySelector(".boxs-animals");

const saveData = () => localStorage.setItem(DB_NAME, JSON.stringify(animals));

const loadData = () => {
	const data = localStorage.getItem(DB_NAME);
	if (!data) return [];

	// He utilizado IA para entender la aplicacion del uso de las classes en está app,
	// porque no habia tenido en cuneta el uso de clases para los datos al inicio.
	const rawArray = JSON.parse(data);
	return rawArray.map((item) => {
		if (item.tipus === "Gos")
			return new Gos(item.nom, item.edat, item.foto, item.raça);
		if (item.tipus === "Gat") return new Gat(item.nom, item.edat, item.foto);
		if (item.tipus === "Ocell")
			return new Ocell(item.nom, item.edat, item.foto);
		return new Mascota(item.nom, item.edat, item.foto, item.tipus);
	});
};

const ComponentAnimal = (animal, index) => {
	const infoExtra = animal instanceof Gos ? animal.raça : animal.ferSo();
	const badgeColor =
		animal instanceof Gos
			? "bg-orange-100 text-orange-700"
			: animal instanceof Gat
				? "bg-purple-100 text-purple-700"
				: "bg-blue-100 text-blue-700";

	return `
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 flex flex-col">
        <img src="${animal.foto}" alt="${animal.nom}" class="w-full h-48 object-cover bg-gray-200" onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Foto'">
        <div class="p-4 grow">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-800">${animal.nom}</h3>
                <span class="text-xs font-bold uppercase px-2 py-1 rounded ${badgeColor}">${animal.tipus}</span>
            </div>
            <p class="text-gray-600 text-sm">Edad: ${animal.edat} años</p>
            <p class="text-gray-500 text-sm italic mt-1">${infoExtra}</p>
        </div>
        <div class="p-4 pt-0">
            <button class="w-full bg-red-50 text-red-600 py-2 rounded font-medium hover:bg-red-600 hover:text-white transition delete-btn" data-index="${index}">
                Eliminar
            </button>
        </div>
    </article>
  `;
};

boxAnimals.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete-btn")) {
		const idx = e.target.dataset.index;
		animals.splice(idx, 1);
		saveData();
		renderTemplate();
	}
});

const renderTemplate = (data = animals) => {
	boxAnimals.innerHTML = data
		.map((animal, index) => ComponentAnimal(animal, index))
		.join("");
};

tipoSelect.addEventListener("change", (e) => {
	const isDog = e.target.value === "dog";
	razaInput.disabled = !isDog;
	razaInput.classList.toggle("bg-gray-100", !isDog);
	if (!isDog) razaInput.value = "";
});

animalForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const fd = new FormData(animalForm);
	const name = fd.get("name");
	const edat = fd.get("edat");
	const imagen = fd.get("imagen");
	const tipo = fd.get("tipo");
	const raza = fd.get("raza");

	let nuevaMascota;
	if (tipo === "dog") nuevaMascota = new Gos(name, edat, imagen, raza);
	else if (tipo === "cat") nuevaMascota = new Gat(name, edat, imagen);
	else if (tipo === "bird") nuevaMascota = new Ocell(name, edat, imagen);
	else nuevaMascota = new Mascota(name, edat, imagen, "Desconocido");

	animals.push(nuevaMascota);
	saveData();
	renderTemplate();
	animalForm.reset();
	razaInput.disabled = true;
	razaInput.classList.add("bg-gray-100");
});

searchInput.addEventListener("input", (e) => {
	const term = e.target.value.toLowerCase();
	const filtered = animals.filter(
		(a) =>
			a.nom.toLowerCase().includes(term) ||
			a.tipus.toLowerCase().includes(term) ||
			a.raça?.toLowerCase().includes(term),
	);
	renderTemplate(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
	animals = loadData();
	renderTemplate();
});
