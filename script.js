const passwordInput = document.querySelector("#password");
// this creates a variable where it finds an element with an ID called password
const analyzeButton = document.querySelector("#analyzeButton");
const result = document.querySelector("#result");
const scoreDisplay = document.querySelector("#scoreDisplay");
const strengthFill = document.querySelector("#strengthFill");
const togglePassword = document.querySelector("#togglePassword");
const recommendations = document.querySelector("#recommendations");
const breachStatus = document.querySelector("#breachStatus");
const breachCount = document.querySelector("#breachCount");

analyzeButton.addEventListener("click",  async function() {
    const password = passwordInput.value;

    const hashedPassword = await hashPassword(password);

// Check the hash against the breach database
    const breachResult = await checkPasswordBreach(hashedPassword);

    if (breachResult.breached === true) {
        breachStatus.textContent =
            "⚠ This password was found in known breach records.";

        breachCount.textContent =
            `FOUND ${breachResult.count} TIMES`;

    } else if (breachResult.breached === false) {
        breachStatus.textContent =
            "✓ No match was found in the known breach database.";

        breachCount.textContent =
            "NO MATCH FOUND";

    } else {
        breachStatus.textContent =
            "Breach status could not be checked.";

        breachCount.textContent =
            "CHECK UNAVAILABLE";
    }



    const isLongEnough=checkLength(password);
    const uppercase= hasUppercase(password);
    const lowercase = hasLowercase(password);
    const hasNumber = hasNumbers(password);
    const hasSpecial = hasSpecialCharacter(password);

    let feedback = [];
    if (breachResult.breached === true) {
        feedback.push(
            `⚠ Password found in known breaches (${breachResult.count} occurrences). Choose a different password.`
        );
    } else if (breachResult.breached === false) {
        feedback.push("✓ No match found in the known breach database.");
    } else {
        feedback.push("⚠ Breach status could not be checked. Try again later.");
    }

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
    return /[^A-Za-z0-9\s]/.test(password);
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
    async function checkPasswordBreach(hashedPassword) {
        try {
            // Separate the hash into a 5-character prefix and remaining suffix
            const prefix = hashedPassword.slice(0, 5);
            const suffix = hashedPassword.slice(5);

            // Request matching hash records from the API
            const response = await fetch(
                `https://api.pwnedpasswords.com/range/${prefix}`,
                {
                    headers: {
                        "Add-Padding": "true"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("API request failed");
            }

            // Read the returned list of matching hashes
            const data = await response.text();

            // Find whether our hash suffix appears in the response
            const matchingLine = data
                .split(/\r?\n/)
                .find(line => line.split(":")[0].trim() === suffix);

            if (matchingLine) {
                const count = Number(matchingLine.split(":")[1].trim());

                return {
                    breached: true,
                    count: count
                };
            }

            return {
                breached: false,
                count: 0
            };

        } catch (error) {
            console.error("Breach check failed:", error);

            return {
                breached: null,
                count: 0
            };
        }
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

