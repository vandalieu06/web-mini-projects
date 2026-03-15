console.info("Se ha entrado en index.js");

const getUserFromLocalStorage = () => {
	const user = localStorage.getItem("user");
	if (!user) return false;
	return JSON.parse(user);
};

const setBasicInfoUser = (user) => {
	const text = document.querySelector(".text");
	const textWelcome = user.isAdmin
		? "Bienvenido (Admin)"
		: "Bienvenido (Usuario)";
	text.textContent = `${textWelcome} - ${user.name} `;
};

document.addEventListener("DOMContentLoaded", () => {
	const user = getUserFromLocalStorage();
	if (!user) {
		location.href = "/login.html";
	}
	setBasicInfoUser(user);
});
