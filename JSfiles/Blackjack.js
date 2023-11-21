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
const scoreBoard = document.getElementById('scoreBoard');
const elementBtnExit = document.querySelector('.btn-exit');

elementBtnExit.addEventListener('click', backToHomepage);

document.addEventListener('DOMContentLoaded', function () {
  const playButton = document.getElementById('rollButton');
  const playAgainButton = document.getElementById('playAgain');
  const computersPlay = document.getElementById('computersPlay');
  const playerInput = document.getElementById('playerInput');
  const TryAgainMessage = document.getElementById('error');
  const totals = [];

  playButton.addEventListener('click', function () {
    const playerValue = parseInt(playerInput.value);
    if (playerValue < 1 || playerValue > 5) {
      TryAgainMessage.textContent = 'Please choose a number between 1 - 5.';
      return;
    } else {
      TryAgainMessage.textContent = '';
    }

    const randomNum = Math.floor(Math.random() * 5) + 1; //randomNum =
    totals.push(playerValue + randomNum); //playerValue= , randomNum=
    console.log(totals);

    computersPlay.textContent = randomNum; //displays computers number after each round

    const playersTotal = totals.reduce((acc, curr) => acc + curr, 0); //  acc is the total and curr is the current element which is being added here, so in each roll, we're adding the current # to the running total.

    scoreBoard.innerHTML = ` Your choice: ${playerValue}  <br>  Total: ${playersTotal} <br>`;
    playerInput.value = '';

    if (playersTotal == 21) {
      scoreBoard.innerHTML += 'You won!'; // the += adds up the total and displays it at the end
    } else if (playersTotal > 21) {
      scoreBoard.innerHTML += 'You lose!'; //the += adds up the total and displays it at the end
    }
  });
  playAgainButton.addEventListener('click', () => location.reload());
});

function backToHomepage() {
  window.location.href = '../index.html';
}
