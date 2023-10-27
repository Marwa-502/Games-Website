const prompt = require('prompt-sync')();

function getUserChoice() {

    return prompt("Choose Rock, Paper, or Scissors: ").toLowerCase();
}

function getComputerChoice() {

    const randomNum = Math.floor(Math.random() * 3);
    if (randomNum == 0) {
        return "rock";
    } else if (randomNum == 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function determineRoundWinner(userChoice, computerChoice) {
    console.log("You chose: ", userChoice);
    console.log("Computer chose: ", computerChoice);

    if (userChoice == computerChoice) {
        console.log("It's a tie!");
    } else if (
        (userChoice == "rock" && computerChoice == "scissors") ||
        (userChoice == "paper" && computerChoice == "rock") ||
        (userChoice == "scissors" && computerChoice == "paper")
    ) {
        userScore += 1;
        console.log("User wins the round!");
    } else {
        computerScore += 1;
        console.log("Computer wins the round!");
    }
    console.log(`Current Scores: User: ${userScore}, Computer: ${computerScore}`);
    console.log('---------------------------------------');
}

function printFinalScores() {
    console.log(`Final Scores: User: ${userScore}, Computer: ${computerScore}`);
    console.log('---------------------------------------');
}

let play = true;

while (play) {
    let roundsLeft = 5;
    let userScore = 0;
    let computerScore = 0;

    while (roundsLeft > 0) {
        const userInput = getUserChoice();
        const computerChoice = getComputerChoice();

        determineRoundWinner(userInput, computerChoice);

        roundsLeft -= 1;
    }

    printFinalScores();

    const replay = prompt("Do you want to play again (yes/no)?: ").toLowerCase();

    if (replay !== "yes") {
        console.log("Thanks for playing :)");
        play = false;
    }
}
