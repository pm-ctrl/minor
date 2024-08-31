const userCredentials = {
    username: "user123",
    password: "password123",
    name: "John Doe"
};

// Function to update the UI based on login state
function updateUI() {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const loginNav = document.getElementById("loginNav");
    const logoutNav = document.getElementById("logoutNav");

    if (sessionStorage.getItem("loggedIn") === "true") {
        welcomeMessage.textContent = `Welcome, ${sessionStorage.getItem("name")}`;
        loginNav.style.display = "none";
        logoutNav.style.display = "block";
    } else {
        welcomeMessage.textContent = '';
        loginNav.style.display = "block";
        logoutNav.style.display = "none";
    }
}

// Handle logout
function handleLogout() {
    sessionStorage.clear();
    updateUI();
    window.location.href = "index.html";
}

// Check login status on page load
document.addEventListener("DOMContentLoaded", updateUI);

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (username === userCredentials.username && password === userCredentials.password) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("name", userCredentials.name);
        window.location.href = "index.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    updateUI();

    // Handle booking form submission
    document.getElementById("bookingForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Check if the user is logged in
        if (sessionStorage.getItem("loggedIn") !== "true") {
            alert("Please log in to book a session.");
            window.location.href = "login.html";
            return;
        }

        const selectedCourse = document.getElementById("course").value;
        const selectedDate = document.getElementById("date").value;
        const selectedTime = document.getElementById("time").value;

        if (!selectedCourse) {
            alert("Please select a course.");
            return;
        }

        // Display confirmation message
        document.getElementById("confirmationMessage").textContent = `Booking confirmed for ${selectedCourse} on ${selectedDate} at ${selectedTime}.`;
    });
});