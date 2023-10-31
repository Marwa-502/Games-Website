
// Code from my labs.
//const prompt = require("prompt-sync")();
// let total = 0;
// while (total < 21) {
//     const randomNumber = parseInt(Math.floor(Math.random() * 5) + 1);
//     console.log(`Computer random: ${randomNumber}`)
//     const userChoice = parseInt(prompt("pick a number between 1 and 5:"));
//     total += userChoice + randomNumber;
//     console.log(total);
// }
// if (total == 21) {
//     console.log("you won");
// } else if (total > 21)
//     console.log("you lose");


// ****************************************************************** // 
document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playButton");
    const playAgainButton = document.getElementById("playAgain");
    const output = document.getElementById("output");
    const computersPlayLabel = document.getElementById("computersPlayLabel");
    const computersPlay = document.getElementById("computersPlay");
    const playerChoiceInput = document.getElementById("playerChoice");
    const totalDisplay = document.getElementById("total");
    const errorDisplay = document.getElementById("error");
    const playerChoices = [];
    const totals = [];

    playButton.addEventListener("click", function () {
        const player = parseInt(playerChoiceInput.value);
        if (player < 1 || player > 5) {
            errorDisplay.textContent = "Please enter a number between 1 and 5.";
            return;
        } else {
            errorDisplay.textContent = "";
        }

        const randomNum = Math.floor(Math.random() * 5) + 1;
        playerChoices.push(player);
        totals.push(player + randomNum);

        computersPlay.textContent = randomNum;
        totalDisplay.textContent = totals.reduce((acc, curr) => acc + curr, 0);

        output.innerHTML += `Computer random: ${randomNum} - Your choice: ${player} - Total: ${totalDisplay.textContent}<br>`;
        playerChoiceInput.value = '';

        if (computersPlayLabel.style.display === "none") {
            computersPlayLabel.style.display = "block";
            computersPlay.style.display = "block";
        }

        if (totalDisplay.textContent == 21) {
            output.innerHTML += "You won!";
        } else if (totalDisplay.textContent > 21) {
            output.innerHTML += "You lose!";
        }
    });
});
playAgainButton.addEventListener("click", () => location.reload());
