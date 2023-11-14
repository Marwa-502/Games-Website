'use strict';
// Global Variables
let play, userChoice, botChoice, roundsLeft, userScore, botScore;
const winRoundPoints = 10; // Points earned if win a round
const playerOption = ['rock', 'paper', 'scissors'];

// Selecting elements
const elementBtnPlay = document.querySelector('.btn-play');
const elementChooseWeapon = document.querySelector('.choose-weapon');
const elementWeaponOpt = document.querySelectorAll('.weapon-option');
const elementUserChoice = document.querySelector('.user-choice');
const elementBotChoice = document.querySelector('.bot-choice');
const elementRound = document.querySelector('.round');
const elementUserScore = document.querySelector('.user-score-1');
const elementBotScore = document.querySelector('.bot-score');
const elementBtnReset = document.querySelector('.btn-reset');

// Event handlers
window.addEventListener('load', init);
elementBtnPlay.addEventListener('click', playMode); // Change Play to Round, Show reset button and bot choice
elementBtnReset.addEventListener('click', init);

// Main functions

// *Initial state*
function init() {
  play = true;
  roundsLeft = 5;
  userScore = 0;
  botScore = 0;
  userChoice = 'user';
  displayUserChoice(userChoice); // to reset user-choice display
  botChoice = 'bot';
  displayBotChoice(botChoice);

  getUserChoice();
  hideElement(elementBtnReset);
  hideElement(elementRound);
}

function playMode() {
  while (play) {
    showElement(elementBtnReset);
    showElement(elementRound);

    while (roundsLeft > 0) {
      botChoice = getBotChoice();
      console.log(botChoice);

      // Print the choices
      displayUserChoice(userChoice);
      displayBotChoice(botChoice);
      if (userChoice === botChoice) {
        console.log(`It's a tie!`);
      } else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
      ) {
        console.log('You WIN!'); // Display winning message
        debugger;
        userScore = userScore + winRoundPoints;
        console.log(userScore); // Add 10 to userScore
        displayElementContent(elementUserScore, userScore); // Display updated userScore
      } else {
        //   // Ask user if they want to keep playing
        //   // Yes - continue
        //   // No - exit play = false
        //   // Restart
        console.log('You LOSE!');
        botScore = botScore + winRoundPoints;
        displayElementContent(elementBotScore, botScore);
      }
      roundsLeft--;
      console.log(roundsLeft);
    }

    if (userScore === botScore) {
      console.log(`It's a TIE!`);
    } else
      userScore > botScore
        ? console.log('You WIN the game!🎉')
        : console.log('You LOSE the game!🎉');

    //   Display Final Score
    console.log('User score:', userScore);
    console.log('Bot score:', botScore);
    // Ask if user wants to play again
    // const replay = prompt('Do you want to play again? (yes/no)').toLowerCase();
    // console.log(replay);

    // if (replay !== 'yes') {
    //   play = false;
    // }
  }
}

// Display element content
function displayElementContent(elementSelector, text) {
  document.querySelector(elementSelector).textContent = text;
}

function showElement(elementSelector) {
  return elementSelector.classList.remove('hidden');
}

function hideElement(elementSelector) {
  return elementSelector.classList.add('hidden');
}

// Generate random bot choice
function getBotChoice() {
  const randomIndex = Math.floor(Math.random() * playerOption.length);
  return playerOption[randomIndex];
}

function displayUserChoice(userChoice) {
  return (elementUserChoice.src = `../images/${userChoice}.png`);
}

function displayBotChoice(botChoice) {
  return (elementBotChoice.src = `../images/${botChoice}.png`);
}

function getUserChoice() {
  elementWeaponOpt.forEach(function (element) {
    element.addEventListener('click', function (event) {
      userChoice = event.target.id;
      console.log(userChoice);
    });
  });
}

function updateRound() {}
