const passwordInput = document.querySelector("#password");
// this creates a variable where it finds an element with an ID called password
const analyzeButton = document.querySelector("#analyzeButton");
const result = document.querySelector("#result");

analyzeButton.addEventListener("click", function() {
    const password = passwordInput.value;

    console.log(password);
    console.log(password.length);

    const isLongEnough=checkLength(password);
    const uppercase= hasUppercase(password);
    const lowercase = hasLowercase(password);
    const hasNumber = hasNumbers(password);
    const hasSpecial = hasSpecialCharacter(password);



    console.log(isLongEnough);
    console.log(uppercase);
    console.log(lowercase);
    console.log(hasNumber);
    console.log(hasSpecial);

    let score = 0;

    if (isLongEnough) {
        score++;
    }

    console.log(score);

    if (uppercase) {
        score++;
    }

    if (lowercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }

    console.log(score)


    let strength;

    if (score <= 2) {
        strength = ("Weak password");
    } else if (score <= 4) {
        strength = ("Medium password");
    } else {
        strength = ("Strong password");
    }

    result.textContent = strength + " — Score: " + score + "/5";
});

function checkLength(password) {
    return password.length >= 8;
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

