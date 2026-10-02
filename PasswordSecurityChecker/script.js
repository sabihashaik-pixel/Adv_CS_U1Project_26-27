const passwordInput = document.querySelector("#password");
// this creates a variable where it finds an element with an ID called password
const analyzeButton = document.querySelector("#analyzeButton");
const result = document.querySelector("#result");
const scoreDisplay = document.querySelector("#scoreDisplay");
const strengthFill = document.querySelector("#strengthFill");
const togglePassword = document.querySelector("#togglePassword");
const recommendations = document.querySelector("#recommendations");

analyzeButton.addEventListener("click",  async function() {
    const password = passwordInput.value;

    const hashedPassword = await hashPassword(password);

    console.log("SHA-1 Hash:", hashedPassword);

    console.log(password);
    console.log(password.length);

    const isLongEnough=checkLength(password);
    const uppercase= hasUppercase(password);
    const lowercase = hasLowercase(password);
    const hasNumber = hasNumbers(password);
    const hasSpecial = hasSpecialCharacter(password);

    let feedback = [];

    if (isLongEnough) {
        feedback.push("✓ Password meets the 16-character requirement.");
    } else {
        feedback.push("✗ Try using at least 16 characters.");
    }

    if (uppercase) {
        feedback.push("✓ Uppercase letters included.");
    } else {
        feedback.push("✗ Add an uppercase letter.");
    }

    if (lowercase) {
        feedback.push("✓ Lowercase letters included.");
    } else {
        feedback.push("✗ Add a lowercase letter.");
    }

    if (hasNumber) {
        feedback.push("✓ Numbers included.");
    } else {
        feedback.push("✗ Include a number.");
    }

    if (hasSpecial) {
        feedback.push("✓ Recognized special character included.");
    } else {
        feedback.push("✗ Add a recognized special character.");
    }

    recommendations.innerHTML = feedback.map(item => {
        return `<li>${item}</li>`;
    }).join("");



    console.log(isLongEnough);
    console.log(uppercase);
    console.log(lowercase);
    console.log(hasNumber);
    console.log(hasSpecial);

    //
    let score = 0;

    if (isLongEnough) {
        score++;
        score++;
    }

    console.log(score);

    if (uppercase) {
        score++;
        score++;
    }

    if (lowercase) {
        score++;
        score++;
    }

    if (hasNumber) {
        score++;
        score++;
    }

    if (hasSpecial) {
        score++;
        score++;
    }

    console.log(score)


    let strength;

    if (score <= 4) {
        strength = ("Weak password");
    } else if (score <= 6) {
        strength = ("Medium password");
    } else {
        strength = ("Strong password");
    }

    result.textContent = strength;

    scoreDisplay.textContent = score + "/10";

    strengthFill.style.width = (score / 10 * 100) + "%";

    if (score <= 4) {
        strengthFill.style.background = "#ef4444";
    } else if (score <= 6) {
        strengthFill.style.background = "#f59e0b";
    } else {
        strengthFill.style.background = "#34d399";
    }
});

function checkLength(password) {
    return password.length >= 16;
}
 //checking if the inputted password has upper or lowercase//
function hasUppercase(password) {
    return /[A-Z]/.test(password);
}

function hasLowercase(password) {
    return /[a-z]/.test(password);
}
//checking if the password contains number//
function hasNumbers(password) {
    return /\d/.test(password);
}


function hasSpecialCharacter(password) {
    return /[!@#$%^&*]/.test(password);
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return hashHex.toUpperCase();

}

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});