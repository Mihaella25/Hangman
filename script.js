const myList = ["restaurant", "programmer", "yellow", "pancake", "camping", "javascript"];           
const word = myList[Math.floor(Math.random() * myList.length)];
const guessedLetters = [];

let lives = 7;
let gameStatus = 1;

function guessedWord() {
    for (let i = 0; i < word.length; ++i) {
        guessedLetters[i] = "_";
        document.getElementById("randomWord").innerHTML += "_ ";
    }
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="checkLetter('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');
        
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}
generateButtons();

function checkGameStatus() {
    if (lives === 0) {
        gameStatus = 0;
        document.getElementById("randomWord").innerHTML = "";
        for (let i = 0; i < word.length; ++i) {
            document.getElementById("randomWord").innerHTML += (word[i] + " ");
        }
        document.getElementById("gameStatus").innerHTML = "YOU LOST!";
    } else if (!guessedLetters.includes("_")) {
        gameStatus = 0;
        document.getElementById("gameStatus").innerHTML = "YOU WON!";
    }
}

function checkLetter(selectedLetter) {
    guessedLetters.indexOf(selectedLetter) === -1 ? null : guessedLetters.push(selectedLetter);
    document.getElementById(selectedLetter).setAttribute('disabled', true);

    if (gameStatus === 0) {
        return;
    }

    document.getElementById("randomWord").innerHTML = "";
    let letterFound = 0;
    for (let i = 0; i < word.length; ++i) {
        if (selectedLetter === word[i]) {
            guessedLetters[i] = word[i];
            letterFound = 1;
        }
        document.getElementById("randomWord").innerHTML += (guessedLetters[i] + " ");
    }
    
    if (letterFound === 0) {
        document.getElementById("lives").innerHTML = "Lives Left: " + --lives;
    }

    checkGameStatus();
}