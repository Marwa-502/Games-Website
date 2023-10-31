
const playerGuessInput = document.getElementById("userGuess");
const submitGuessButton = document.getElementById("submitGuess");
const messageElement = document.getElementById("message");
const playAgainButton = document.getElementById("playAgain");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("timeLeft");

let interval; // Declare the interval variable
let numGuesses = 5;

function checkGuess() {
    const playerGuess = parseInt(playerGuessInput.value); // Saving the user's guess

    if (playerGuess === randomNum) {
        messageElement.textContent = "Congrats!! You Guessed Right!";
        endGame();
    } else if (numGuesses === 1) {
        messageElement.textContent = `Womp, Womp! You're Out Of Tries! The number was ${randomNum}`;
        endGame();
    } else {
        messageElement.textContent = `Wrong! Try Again. You have ${numGuesses - 1} Guesses Left!`;
        numGuesses--;
    }
    playerGuessInput.value = "";
}

function endGame() {
    submitGuessButton.disabled = true;
}

function countdown(seconds) {
    let counter = seconds;

    interval = setInterval(() => {
        if (counter > 0) {
            counter--;
            timeLeftElement.textContent = counter;
        } else {
            messageElement.textContent = `TIME'S UP! The correct number was ${randomNum}.`;
            endGame();
        }  
    }, 1000);
}

function startGame() {
    numGuesses = 5;
    randomNum = Math.floor(Math.random() * 10);
    submitGuessButton.disabled = false;
    messageElement.textContent = "";
}

// Button events
submitGuessButton.addEventListener("click", checkGuess);
playAgainButton.addEventListener("click", () => location.reload());

// Start the game when the page loads
countdown(30);
startGame();



// const prompt = require('prompt-sync')();

// while (true) {
//     let playerGuess = Number(prompt("Guess a number between 0 and 100: "));
//     console.log("You chose", playerGuess);

//     if (playerGuess === randomNum) {
//         console.log("Awesome Guess! The number is: ", playerGuess,);
//         console.log("You WIN!");
//         break;
//     } else {
//         if (playerGuess < 0 || playerGuess > 100) {
//             console.log("You chose: ,", userGuess, "Try again! pick a number between 0-100");

//         } else if (playerGuess > randomNum) {
//             console.log("Your guess of, ", playerGuess, "is too high, please try again!")
//         }
//         if (playerGuess < randomNum) {
//             console.log("Your guess of, ", playerGuess, "is too low, please try again!")
//         }
//     }
// }

// }