let users = [{ username: "admin", password: "password" }];

document.addEventListener("DOMContentLoaded", checkAuth);

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("habitContainer").style.display = "block";
        showSuccessMessage();
        loadHabits();
    } else {
        showAuthMessage("Invalid credentials");
    }
}

function showAuthMessage(message) {
    document.getElementById("authText").innerText = message;
    document.getElementById("authMessage").style.display = "block";
}

function closeAuthMessage() {
    document.getElementById("authMessage").style.display = "none";
}

function showSuccessMessage() {
    document.getElementById("successMessage").style.display = "block";
}

function closeSuccessMessage() {
    document.getElementById("successMessage").style.display = "none";
}

function checkAuth() {
    if (localStorage.getItem("loggedIn") === "true") {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("habitContainer").style.display = "block";
        loadHabits();
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("authContainer").style.display = "block";
    document.getElementById("habitContainer").style.display = "none";
}

function addHabit() {
    let habitInput = document.getElementById("habitInput");
    let habitText = habitInput.value.trim();
    if (habitText === "") return;
    
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({ text: habitText, completed: false });
    localStorage.setItem("habits", JSON.stringify(habits));
    habitInput.value = "";
    loadHabits();
}

function deleteHabit(index) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    loadHabits();
}

function loadHabits() {
    let habitList = document.getElementById("habitList");
    habitList.innerHTML = "";
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.forEach((habit, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type='checkbox' onclick='toggleHabit(${index})' ${habit.completed ? "checked" : ""}>
            <span class="${habit.completed ? "completed" : ""}">${habit.text}</span>
            <button onclick='deleteHabit(${index})'>❌</button>
        `;
        habitList.appendChild(li);
    });
}