document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = form.email.value.trim().toLowerCase();
        const password = form.password.value.trim();

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email);

        if (!user) {
            alert("Email not registered. Please register first.");
            return;
        }

        if (user.password !== password) {
            alert("Incorrect password. Please try again.");
            return;
        }

        if (user.role === "student") {
            window.location.href = "Student.html";
        } else if (user.role === "alumni") {
            window.location.href = "Student.html";
        } else {
            alert("Unknown user role. Please contact support.");
        }
    });
});
