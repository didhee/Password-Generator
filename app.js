const generateBtn = document.getElementById('generate-btn');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const lengthInput = document.getElementById('password-length');
const passwordEl = document.querySelectorAll('.password');
const popUp = document.getElementById('pop-up');


/*------------------------------------------*\
        #EVENT-HANDLERS
\*------------------------------------------*/


//for password-length
function updateLength(event) {
    const number = Math.floor(event.target.value);

    if (number >= 4 && number <= 15) {
        passwordLength = number;
    } else {
        alert("Password length must be between 4 and 15 characters.");
    }

    event.target.value = passwordLength;
}

function inputSteps(event) {
    if (event.target.id === "decrement") {
        lengthInput.stepDown();
    }

    if (event.target.id === "incremrnt") {
        lengthInput.stepUp();
    }

    passwordLength = lengthInput.value;
}

async function copyToClipboard(event) {
    const password = event.target.textContent;
    try {
        await navigator.clipboard.writeText(password);
    } catch(err) {
        console.log("Clipboard access denied. Time to go old school...");
        copyUsingExecCommand(password);
    }

    //show a popup to notify user
    clearTimeout(timeoutId);
    popUp.style.opacity = 0.9;
    timeoutId = setTimeout(() => popUp.style.opacity = '', 3000);
}

function copyUsingExecCommand(text) {
    const input = document.createElement("input");
    input.value = text;
    input.readOnly = true;
    input.style = {
        position: "absolute",
        left: "-9999px"
    }
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
}


/*---------------------------------------*\
        #PASSWORD GENERATOR FUNCTIONS
\*---------------------------------------*/

function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const specialCharacters = "~`@#$^&()_|[].,?:";
    const mathSymbols = "/-+=*%!";

    let characters = uppercase + lowercase + numbers + specialCharacters + mathSymbols;
    characters = characters.split('');

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}


function generatePasswords() {
    //this function generates a list of passwords based on the number of password elements chosen
    let passwords = [];
    for (let i = 0; i < passwordEl.length; i++) {
        const password = generatePassword();
        passwords.push(password);
    }

    //this is to display the passwords on the page
    for (let i = 0; i < passwords.length; i++) {
        passwordEl[i].textContent = passwords[i];
        passwordEl[i].classList.remove('hidden');
    }
}


//Initial state 

let timeoutId;
let passwordLength = 15;
lengthInput.value = passwordLength;


generateBtn.addEventListener('click', generatePasswords);
decrementBtn.addEventListener('click', inputSteps);
incrementBtn.addEventListener('click', inputSteps);

lengthInput.addEventListener('blur', updateLength);

passwordEl.forEach(element => {
    element.addEventListener('click', copyToClipboard);
})
