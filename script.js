const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll('.figure-part');

const words = ['java', 'python', 'javascript', 'html'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`).join("")}`;
    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord === selectedWord) {
        finalMessage.innerHTML = `Congratulations! You won! &#128522;`;
        popup.style.display = "flex";

    }

}
// Update the Wrong Letters
function updateWrongLetterttsEl() {
    //Display wrong letters
    console.log('Update wrong');
    wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""} ${wrongLetters.map(letter => `<span>${letter}</span>`)}`
    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";

        } else {
            part.style.display = "none";
        }
    });
    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerHTML = "Unfortunately you lost. &#128524;";
        popup.style.display = 'flex';

    }

}
//  show Notification
function showNotification() {
    console.log("show Notification");
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

//  Keydown letter press
window.addEventListener("keydown", e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }

        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterttsEl()

            }

        }
    }

})
// Restart game and play again
playAgainBtn.addEventListener("click", () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterttsEl();
    popup.style.display = 'none';
})
displayWord();