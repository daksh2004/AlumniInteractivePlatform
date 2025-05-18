document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim().toLowerCase(),
            password: form.password.value,
            role: form.role.value
        };

        if (!validateForm(formData)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(user => user.email === formData.email);

        if (emailExists) {
            alert("Email already exists. Please use a different email.");
            return;
        }

        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! 🎉");
        form.reset();
    });

    function validateForm(data) {
        return (
            data.name &&
            validateEmail(data.email) &&
            data.password &&
            data.role
        );
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
