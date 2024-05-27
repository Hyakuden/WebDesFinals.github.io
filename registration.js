document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.querySelector("input[name='username']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");

    form.addEventListener("submit", function(event) {
        let valid = true;

        // Clear previous error messages
        const errorMessages = document.querySelectorAll(".error");
        errorMessages.forEach(function(message) {
            message.remove();
        });

        // Check username
        if (usernameInput.value.trim() === "") {
            showError(usernameInput, "Username is required");
            valid = false;
        }

        // Check email
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Invalid email address");
            valid = false;
        }

        // Check password
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password is required");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error";
        error.textContent = message;
        input.parentElement.insertBefore(error, input.nextSibling);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
