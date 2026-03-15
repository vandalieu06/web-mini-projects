console.info("Se ha cargado la pagina de Login.html");

const users = [
	{
		name: "Admin",
		email: "admin@admin.com",
		password: "admin1234",
		isAdmin: true,
	},
	{
		name: "Jhonny",
		email: "jhonny@test.com",
		password: "1111",
		isAdmin: false,
	},
];

const saveUserInLocalStorage = (user) => {
	delete user.password;
	const pareUser = JSON.stringify(user);
	localStorage.setItem("user", [pareUser]);
	console.log(JSON.parse(localStorage.getItem("user")));
};

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = document.querySelector('input[name="email"]');
	const password = document.querySelector('input[name="password"]');

	const data = {
		email: email.value.trim().toLowerCase(),
		password: password.value,
	};

	console.log(`Datos ingresados: ${data.email} - ${data.password}`);

	for (const user of users) {
		if (user.email !== data.email) {
			continue;
		}

		if (user.password === data.password) {
			console.log(`Se ha logueado con el usuario ${user.name}`);
			console.log(user.isAdmin ? "Es admin" : "No es admin");
			saveUserInLocalStorage(user);

			location.href = "/";
			break;
		} else {
			console.log("Credeciales incorrectas");
		}
	}
});
