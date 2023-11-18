'use strict';
// **Global Variables**
let play, userChoice, botChoice, userScore, botScore, round, roundsLeft;
const winRoundPoints = 10; // Points earned if win a round
const playerOption = ['rock', 'paper', 'scissors'];
const totalRounds = 5;
let userHasStartedGame = false;

//
// init (only called at the very beginning, separate function round === 0)
// update (call on update of the round)
// reset (call only when you click reset)
//

// **Element Selectors**
const elementBtnPlay = document.querySelector('.btn-play');
const elementChooseWeapon = document.querySelector('.choose-weapon');
const elementWeaponOption = document.querySelectorAll('.weapon-option');
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
const initialRoundText = elementRoundNumber.textContent;

// **Event handlers**
window.addEventListener('load', init);

function initEventListeners() {
  elementBtnPlay.addEventListener('click', onPlayClick);
  elementBtnReset.addEventListener('click', resetGame);
  elementBtnExit.addEventListener('click', backToHomepage);

  elementWeaponOption.forEach(function (element) {
    element.addEventListener('click', onWeaponChoiceClick);
  });
}

// **Main functions**

// Initial state
function init() {
  round = 1;
  userScore = 0;
  botScore = 0;
  roundsLeft = 5;
  userHasStartedGame = false;

  initEventListeners();
  initPlayersDisplay();
  initHideElements();
  showElement(elementChooseWeapon);
  displayElementContent(elementBotScore, botScore);
  displayElementContent(elementUserScore, userScore);
  resetTextContent();
}

// Reset state
function resetGame() {
  play = true;
  round = 1;
  userScore = 0;
  botScore = 0;
  roundsLeft = 5;
  userHasStartedGame = false;

  initPlayersDisplay();
  initHideElements();
  showElement(elementChooseWeapon);
  displayElementContent(elementBotScore, botScore);
  displayElementContent(elementUserScore, userScore);
  resetTextContent();
}

// Main game logic when press play
function onPlayClick() {
  if (round <= totalRounds) {
    setUpGameElements();
    botChoice = getBotChoice();
    console.log('Bot chose:', botChoice);
    displayBotChoice(botChoice);
    handleRound();
    setTime();
  }
}

// **Functions inside main functions**

// When choosing a weapon
function onWeaponChoiceClick(event) {
  if (!userHasStartedGame) {
    showElement(elementRound);
    userHasStartedGame = true;
  }

  userChoice = event.target.id;
  setInitElements();
}

// Game logic per round
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
    console.log('User score:', userScore);
    displayElementContent(elementUserScore, userScore); // Display updated userScore
  } else {
    showElement(elementBotWins);
    botScore = botScore + winRoundPoints;
    console.log('Bot score:', userScore);
    displayElementContent(elementBotScore, botScore);
  }
  hideElement(elementBtnPlay);
}

// Update round status
function updateRound() {
  round++;
  roundsLeft--;
  displayElementContent(elementRoundNumber, round);
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
}

function gameEnds() {
  hideElement(elementBtnPlay);
  hideElement(elementChooseWeapon);
  // hideElement(elementRound);
  displayElementContent(elementBtnReset, 'Play Again');
}

// Generic function to display text content
function displayElementContent(elementSelector, text) {
  return (elementSelector.textContent = text);
}

// Generic function to remove class
function showElement(elementSelector) {
  return elementSelector.classList.remove('hidden');
}

// Generic function to hide class
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
  console.log('Element round:', round);
}

function setInitElements() {
  showElement(elementBtnPlay);
  showElement(elementBtnReset);
  displayUserChoice(userChoice);
  displayBotChoice('question-mark');
}

function initHideElements() {
  hideElement(elementBtnReset);
  hideElement(elementRound);
  hideWinDisplay();
  hideElement(elementTieDisplay);
  hideElement(elementBtnPlay);
}

function setTime() {
  // query element and set disabled = true (SEPARATE NOTE: in the css you set button:disabled pseudo element styling)
  // toggleWeaponOptionDisabled(true);
  setTimeout(() => {
    // toggleWeaponOptionDisabled(false);

    // query element and set disabled = false
    initPlayersDisplay();
    displayElementContent(elementRoundNumber, round);

    hideWinDisplay();
    hideElement(elementTieDisplay);

    if (round === totalRounds) {
      setFinalWinner();
      gameEnds();
    } else {
      updateRound();
    }
  }, 2700);
}

function toggleWeaponOptionDisabled(value) {
  weaponsOpt.forEach((element) => (element.disabled = value));
}

function initPlayersDisplay() {
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
  displayElementContent(elementRoundNumber, initialRoundText);
}
