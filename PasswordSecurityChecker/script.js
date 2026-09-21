
const passwordInput = document.querySelector("#password");
// this creates a variable where it finds an element with an ID called password

const analyzeButton = document.querySelector("#analyzeButton");

analyzeButton.addEventListener("click", function() {
    const password = passwordInput.value;

    console.log(password);
    console.log(password.length);

    checkLength(password);
});

function checkLength(password) {
    if (password.length >= 8) {
        console.log("password is long enough");
    } else {
        console.log("Password is too short");
    }
}
