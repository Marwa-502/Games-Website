'use strict';
// Global Variables
let play, userChoice, botChoice, roundsLeft, userScore, botScore, nextRound;
let round = 1; // Starting round
const winRoundPoints = 10; // Points earned if win a round
const playerOption = ['rock', 'paper', 'scissors'];

// Selecting elements
const elementBtnPlay = document.querySelector('.btn-play');
const elementChooseWeapon = document.querySelector('.choose-weapon');
const elementWeaponOpt = document.querySelectorAll('.weapon-option');
const elementUserChoice = document.querySelector('.user-choice');
const elementBotChoice = document.querySelector('.bot-choice');
const elementRound = document.querySelector('.round');
const elementRoundNumber = document.querySelector('.round-number');
const elementUserScore = document.querySelector('.user-value');
const elementBotScore = document.querySelector('.bot-value');
const elementBtnReset = document.querySelector('.btn-reset');
const elementWinDisplay = document.querySelectorAll('.win-display');
const elementTieDisplay = document.querySelector('.tie-display');
const elementBtnExit = document.querySelector('.btn-exit');
const elementUserWins = document.querySelector('.user-wins');
const elementBotWins = document.querySelector('.bot-wins');
const elementBtnNextRound = document.querySelector('.btn-nextRound');

// Event handlers
window.addEventListener('load', init);
elementBtnPlay.addEventListener('click', playMode); // Change Play to Round, Show reset button and bot choice
elementBtnReset.addEventListener('click', init);
elementBtnExit.addEventListener('click', backToHomepage);

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
  hideWinDisplay();
  hideElement(elementTieDisplay);
  hideElement(elementBtnPlay);
  hideElement(elementBtnNextRound);
}

function playMode() {
  if (play) {
    showElement(elementBtnReset);
    showElement(elementRound);
    showElement(elementBtnPlay);
    hideElement(elementBtnPlay);

    while (roundsLeft > 0) {
      botChoice = getBotChoice();
      console.log(botChoice);

      // Print the choices
      displayBotChoice(botChoice);
      if (userChoice === botChoice) {
        showElement(elementTieDisplay);
      } else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
      ) {
        showElement(elementUserWins); // Display winning message
        userScore = userScore + winRoundPoints;
        console.log(userScore); // Add 10 to userScore
        displayElementContent(elementUserScore, userScore); // Display updated userScore
      } else {
        showElement(elementBotWins);
        botScore = botScore + winRoundPoints;
        console.log(botScore);
        displayElementContent(elementBotScore, botScore);
      }

      // Ask user if they want to keep playing
      showElement(elementBtnNextRound);
      askNextRound();

      if (nextRound === true) {
        round++;
        console.log(round);
        displayElementContent(elementRoundNumber, round);
        roundsLeft--;
        console.log(roundsLeft);
        hideElement(elementBtnNextRound);
        hideElement(elementWinDisplay);
      } else {
        roundsLeft = 0;
      }
    }
  } else {
    if (userScore === botScore) {
      showElement(elementTieDisplay);
    } else
      userScore > botScore
        ? displayElementContent(elementRound, 'Congrats you beat the bot! 🎉')
        : displayElementContent(elementRound, 'Sorry, the bot beats you! 😢');

    //   Display Final Score
    // console.log('User score:', userScore);
    // console.log('Bot score:', botScore);

    // Ask if user wants to play again
    showElement(elementBtnNextRound);
    displayElementContent(elementBtnNextRound, 'Play Again');
    askNextRound();
    console.log(nextRound);
  }

  // if (nextRound !== 'yes') {
  //   init();
  // }
}

// Display element content
function displayElementContent(elementSelector, text) {
  return (elementSelector.textContent = text);
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
      displayUserChoice(userChoice);
      displayBotChoice('question-mark');
      showElement(elementBtnPlay);
    });
  });
}

function hideWinDisplay() {
  elementWinDisplay.forEach(function (element) {
    element.classList.add('hidden');
  });
}

function backToHomepage() {
  window.location.href = '../index.html';
}

function askNextRound() {
  elementBtnNextRound.addEventListener('click', function (event) {
    nextRound = event.target;
    console.log(nextRound);
    return nextRound;
  });
}
