const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailValidation");
const passwordInput = document.getElementById("passwordValidation");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

loginForm.addEventListener("submit", function (event) {
    let isValid = true;

    // Email validation
    if (!emailInput.value || !isValidGmail(emailInput.value)) {
        showErrorAndHide(emailError, "Invalid email format");
        isValid = false;
    } else {
        hideError(emailError);
    }

    // Password validation
    if (!passwordInput.value || passwordInput.value.length < 8) {
        showErrorAndHide(passwordError, "Password must be at least 8 characters");
        isValid = false;
    } else {
        hideError(passwordError);
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

function isValidGmail(email) {
    // Check if the email is of the form "@gmail.com"
    return /^.+@gmail\.com$/.test(email);
}

function showErrorAndHide(element, message) {
    element.textContent = message;
    element.style.display = "block";
    setTimeout(function () {
        element.style.display = "none";
    }, 3000);
}

function hideError(element) {
    element.style.display = "none";
}

setTimeout(() => {
    emailError.style.display = "none";
    passwordError.style.display = "none";
}, 2000);
