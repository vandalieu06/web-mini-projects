const USERS_KEY = "users";
const USER_KEY = "currentUser";

const defaultUsers = [
    {
        name: "Admin",
        email: "admin@admin.com",
        password: "admin123",
        isAdmin: true
    },
    {
        name: "Jhonny",
        email: "jhonny@test.com",
        password: "1111",
        isAdmin: false
    },
    {
        name: "Maria",
        email: "maria@test.com",
        password: "2222",
        isAdmin: false
    }
];

const getUsersFromLocalStorage = () => {
    let users = localStorage.getItem(USERS_KEY);
    if (!users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(users);
};

const saveUserToLocalStorage = (user) => {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
};

document.addEventListener("DOMContentLoaded", () => {
    getUsersFromLocalStorage();
    
    const existingUser = localStorage.getItem(USER_KEY);
    if (existingUser) {
        window.location.href = "index.html";
        return;
    }

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Por favor ingresa email y password");
            return;
        }

        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            saveUserToLocalStorage(user);
            window.location.href = "index.html";
        } else {
            alert("Email o password incorrectos");
        }
    });
});
