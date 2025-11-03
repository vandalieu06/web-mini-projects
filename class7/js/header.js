export const isLogin = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const headerLogin = document.querySelector(".header-login");
    headerLogin.classList.add("hidden");

    const headerLogout = document.querySelector(".header-logout");
    headerLogout.classList.remove("hidden");

    const header = document.querySelector(".header-info");
    const spanUsername = document.createElement("span");
    spanUsername.innerText = user;
    header.insertAdjacentElement("afterbegin", spanUsername);
  }
};
