const prompt = require('prompt-sync')(); // library for handling user input

//Issues i had with this code were as follows:
// couldnt get the game to ask the user to keep trying : answer was i needed a while loop
// couldnt figure out why it would keep looping after player guessed too high : answer i needed to put in a break
// couldnt figure out why it did the same looping after player guessed too low even after putting in the break. : 
// .....: answer was i needed to put line 16 and 17 INSIDE the While loop. it was originally above it.


const randomNum = Math.round(Math.random() * 100)

let player = "";

while (true) {
    let playerGuess = Number(prompt("Guess a number between 0 and 100: "));
    console.log("You chose", playerGuess);

    if (playerGuess === randomNum) {
        console.log("Awesome Guess! The number is: ", playerGuess,);
        console.log("You WIN!");
        break;
    } else {
        if (playerGuess < 0 || playerGuess > 100) {
            console.log("You chose: ,", userGuess, "Try again! pick a number between 0-100");

        } else if (playerGuess > randomNum) {
            console.log("Your guess of, ", playerGuess, "is too high, please try again!")
        }
        if (playerGuess < randomNum) {
            console.log("Your guess of, ", playerGuess, "is too low, please try again!")
        }
    }
}
