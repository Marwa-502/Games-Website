'use strict';
// Global Variables
let play,
  userChoice,
  botChoice,
  userScore,
  botScore,
  round,
  totalRounds,
  roundsLeft;

// nextRoundClicked; // Starting round
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
const elementWeaponText = document.querySelector('.weapon-text');
const elementVersus = document.querySelector('.versus');
const elementUserText = document.querySelector('.user-text');
const elementBotText = document.querySelector('.bot-text');

const initialUserWinsText = elementUserText.textContent;
const initialBotWinsText = elementBotText.textContent;
const initialBtnResetText = elementBtnReset.textContent;
const initialTieDisplayText = elementTieDisplay.textContent;

// Event handlers
window.addEventListener('load', init);
elementBtnPlay.addEventListener('click', playMode);
elementBtnReset.addEventListener('click', init);
elementBtnExit.addEventListener('click', backToHomepage);

// Main functions

// *Initial state*
function init() {
  play = true;
  round = 1;
  totalRounds = 5;
  roundsLeft = 5;
  userScore = 0;
  botScore = 0;

  displayElementContent(elementBotScore, botScore);
  displayElementContent(elementUserScore, userScore);
  defaultChoice();
  showElement(elementChooseWeapon);

  resetTextContent();
  hideElement(elementBtnReset);
  hideElement(elementRound);
  hideWinDisplay();
  hideElement(elementTieDisplay);
  hideElement(elementBtnPlay);
  getUserChoice();
}

function playMode() {
  if (play && round < totalRounds) {
    setUpGameElements();
    botChoice = getBotChoice();
    console.log('Bot choice:', botChoice);
    displayBotChoice(botChoice);
    handleRound();
    setTime();
  } else {
    setFinalWinner();
    gameEnds();
  }
}

// The game logic per round

function handleRound() {
  if (userChoice === botChoice) {
    showElement(elementTieDisplay);
  } else if (
    (userChoice === 'rock' && botChoice === 'scissors') ||
    (userChoice === 'paper' && botChoice === 'rock') ||
    (userChoice === 'scissors' && botChoice === 'paper')
  ) {
    showElement(elementUserWins); // Display winning message
    userScore = userScore + winRoundPoints;
    console.log('user score:', userScore); // Add 10 to userScore
    displayElementContent(elementUserScore, userScore); // Display updated userScore
  } else {
    showElement(elementBotWins);
    botScore = botScore + winRoundPoints;
    console.log('bot score:', botScore);
    displayElementContent(elementBotScore, botScore);
  }
  hideElement(elementBtnPlay);
}

// Update round status
function updateRound() {
  round++;
  console.log('Round:', round);
  displayElementContent(elementRoundNumber, round);
  roundsLeft--;
  console.log('Round-left:', roundsLeft);
  // hideElement(elementBtnNextRound);
  hideWinDisplay();
  hideElement(elementTieDisplay);
  defaultChoice();
}

// Set final winner
function setFinalWinner() {
  if (userScore === botScore) {
    showElement(elementTieDisplay);
    displayElementContent(elementTieDisplay, `Even Stevens! It's a tie!`);
  } else if (userScore > botScore) {
    showElement(elementUserWins);
    displayElementContent(elementUserText, 'You beat the bot! 🎉');
  } else {
    showElement(elementBotWins);
    displayElementContent(elementBotText, 'The bot beats you!');
  }
  defaultChoice();
}

function gameEnds() {
  hideElement(elementBtnPlay);
  hideElement(elementChooseWeapon);
  displayElementContent(elementBtnReset, 'Play Again');
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

function getUserChoice() {
  elementWeaponOpt.forEach(function (element) {
    element.addEventListener('click', function (event) {
      userChoice = event.target.id;
      console.log('user choice:', userChoice);
      showElement(elementBtnPlay);
      showElement(elementRound);
      showElement(elementBtnReset);
      displayUserChoice(userChoice);
      displayBotChoice('question-mark');
      hideElement(elementTieDisplay);
      hideWinDisplay();
    });
  });
}

function displayUserChoice(userChoice) {
  return (elementUserChoice.src = `../images/${userChoice}.png`);
}

function displayBotChoice(botChoice) {
  return (elementBotChoice.src = `../images/${botChoice}.png`);
}

function hideWinDisplay() {
  elementWinDisplay.forEach(function (element) {
    element.classList.add('hidden');
  });
}

function backToHomepage() {
  window.location.href = '../index.html';
}

function setUpGameElements() {
  showElement(elementBtnReset);
  showElement(elementRound);
  showElement(elementBtnPlay);
}

function setTime() {
  setTimeout(() => {
    // hideWinDisplay();
    // hideElement(elementTieDisplay);
    updateRound();
    getUserChoice();
  }, 2700); // 5000 milliseconds (5 seconds)
}

function defaultChoice() {
  userChoice = 'user';
  displayUserChoice(userChoice);
  botChoice = 'bot';
  displayBotChoice(botChoice);
}

function resetTextContent() {
  displayElementContent(elementUserText, initialUserWinsText);
  displayElementContent(elementBotText, initialBotWinsText);
  displayElementContent(elementBtnReset, initialBtnResetText);
  displayElementContent(elementTieDisplay, initialTieDisplayText);
}
