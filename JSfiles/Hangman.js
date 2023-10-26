// begin 
const prompt = require('prompt-sync')();

let preDeterminedWords = ["marquis", "croquet", "dinner", "gnarly", "yachtsman", "zodiac", "larynx"];
let moves = 10;

console.log("Let's Play Hangman!");

let keepPlaying = true;
let randomIndex = Math.floor(Math.random() * preDeterminedWords.length);
let randomWord = preDeterminedWords[randomIndex];
let numOfLetters = [];

while (keepPlaying) {
    let underScore = "_".repeat(randomWord.length);
    console.log(underScore);

    let player = prompt("Guess a letter in the word: " + underScore);

    if (!player) {
        console.log("You quit.");
        keepPlaying = false;

    } else if (player.length !== 1) {
        console.log("Please enter a single letter.");

    } else if (randomWord.includes(player)) {
        numOfLetters.push(player);
        let revealedWord = "";

        for (const letter of randomWord) {
            if (numOfLetters.includes(letter)) {
                revealedWord += letter;
            } else {
                revealedWord += "_";
            }
        }
        console.log(revealedWord);

        console.log("Good guess! " + player + " is in the word.");

        if (revealedWord === randomWord) {
            console.log("You Win!");
            break;
        }
    } else {
        console.log("Sorry, " + player + " is not in the word.");
        moves--;
        console.log("You have " + moves + " moves left.");

        if (moves === 0) {
            console.log("Out of moves. You lose.");
            break;
        }
    }
}
//end