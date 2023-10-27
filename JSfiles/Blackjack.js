
const prompt = require("prompt-sync")();

let total = 0;

while (total < 21) {
    const randomNumber = parseInt(Math.floor(Math.random() * 5) + 1);
    console.log(`Computer random: ${randomNumber}`)
    const userChoice = parseInt(prompt("pick a number between 1 and 5:"));
    total += userChoice + randomNumber;
    console.log(total);
}

if (total == 21) {
    console.log("you won");
} else if (total > 21)
    console.log("you lose");
