// --- Parameter Settings --- //
const userScoreForGameEnd = 5; // when User reaches this score, the game ends

// --- Game Data Object --- //
const gameDataObj = {
  // Keep track of the round number, and each player's score
  roundNum: 0,
  currentUserWpnChoice: '',
  currentComputerWpnChoice: '',
  userScore: 0,
  computerScore: 0,
};

//  --- GET DOM ELEMENT REFERENCES ---
//  Buttons
const newGameBtn = document.querySelector(".new-game.btn");
const rockBtn = document.querySelector(".rock.wpn.btn");
const paperBtn = document.querySelector(".paper.wpn.btn");
const scissorsBtn = document.querySelector(".scissors.wpn.btn");

//  TextDisplays
const instructTxtDisplayBox = document.querySelector(".instruct.msg.txt");
const resultsTxtDisplayBox = document.querySelector(".results.msg.txt");

// --- EVENT HANDLERS ---
// Buttons
const clickNewGame = newGameBtn.addEventListener("click", () => {
  console.log("'New Game' btn clicked");

  resetGame();
});
const userChoosesRock = rockBtn.addEventListener("click", () => {
  console.log("'Rock' btn clicked");

  gameDataObj.userScore < userScoreForGameEnd
    ? playRound("rock")
    : console.log("Game ended");
});
const userChoosesPaper = paperBtn.addEventListener("click", () => {
  console.log("'Paper' btn clicked");

  gameDataObj.userScore < userScoreForGameEnd
    ? playRound("paper")
    : console.log("Game ended");
});
const userChoosesScissors = scissorsBtn.addEventListener("click", () => {
  console.log("'Scissors' btn clicked");

  gameDataObj.userScore < userScoreForGameEnd
    ? playRound("scissors")
    : console.log("Game ended");
});

// --- FUNCTIONS ---

// FUNC: Append text to a DOM element for displaying on screen.
function appendTextToElement(
  msgStr, // (string: required) The text content to be appended
  el // (DOM Reference object: required) A reference to a DOM element
) {
  const textNode = document.createTextNode(msgStr);
  el.appendChild(textNode);
}

// FUNC: Returns Computer's random weapon choice str from an arr of options
function makeRandomComputerChoice() {
  let options = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * options.length); // Generate random integer between 0 and 2
  return options[randomNum]; // Return a random item from the options array
}

// FUNC: Returns the winner of the current round
function determineRoundWinner(currentUserWpnChoice, currentComputerWpnChoice) {
  console.log("determineRoundWinner() called");

  let choicesArr = [currentUserWpnChoice, currentComputerWpnChoice]; // For easier & more readable handling of the choices, turn them into an array

  if (choicesArr[0] === choicesArr[1]) {
    return "tie"; // If choices are the same, then User & Computer tied in this round
  } else if (
    (choicesArr[0] === "rock" && choicesArr[1] === "paper") ||
    (choicesArr[0] === "paper" && choicesArr[1] === "scissors") ||
    (choicesArr[0] === "scissors" && choicesArr[1] === "rock")
  ) {
    return "user_wins_round"; // User wins this round
  } else if (
    (choicesArr[1] === "rock" && choicesArr[0] === "paper") ||
    (choicesArr[1] === "paper" && choicesArr[0] === "scissors") ||
    (choicesArr[1] === "scissors" && choicesArr[0] === "rock")
  ) {
    return "computer_wins_round"; // Computer wins this round
  }
}

function updateScores(roundWinner) {
  switch (roundWinner) {
    case "tie":
    // Do nothing - players' scores don't change for a tie
    case "user_wins_round":
      gameDataObj.userScore ++; // Increment User score by 1
    case "computer_wins_round":
      gameDataObj.computerScore ++; // Increment Computer score by 1
  }
}

function displayRoundWinnerTxt(roundWinner) {
  const tieRoundMsg = `It's a tie: you and the Computer both chose ${gameDataObj.currentUserWpnChoice}.`;
  const userWinsRoundMsg = `Well chosen! ${gameDataObj.currentUserWpnChoice} beats ${gameDataObj.currentComputerWpnChoice} - You win this round!`;
  const computerWinsRoundMsg = `Sorry, ${gameDataObj.currentComputerWpnChoice} beats ${gameDataObj.currentUserWpnChoice}. The Computer wins this round!`;
  const errorMsg = `Error: Sorry, something went wrong...`;

  switch (roundWinner) {
    case "tie":
      appendTextToElement(tieRoundMsg, resultsTxtDisplayBox)
      break;
    case "user_wins_round":
      appendTextToElement(userWinsRoundMsg, resultsTxtDisplayBox)
      break;
    case "computer_wins_round":
      appendTextToElement(computerWinsRoundMsg, resultsTxtDisplayBox)
      break;
    default:
      appendTextToElement(errorMsg, resultsTxtDisplayBox);
  }
}

function askUserForWpnChoice() {
  // Message string to display to User
  const requestWpnChoiceMsg = `Round ${gameDataObj.roundNum}: Choose your weapon!...`;

  // Display message to User inside of instructions box
  appendTextToElement(requestWpnChoiceMsg, instructTxtDisplayBox);
}


// FUNC: Play one round between User vs Computer
function playRound(wpnStr) {
  console.log("playRound() called");
  gameDataObj.roundNum ++; // Increment the round number

  // Get weapon choices from both players
  gameDataObj.currentUserWpnChoice = wpnStr;
  gameDataObj.currentComputerWpnChoice = makeRandomComputerChoice();

  // Determine the winner of this round
  const roundWinner = determineRoundWinner(gameDataObj.currentUserWpnChoice, gameDataObj.currentComputerWpnChoice);

  // Display the results of this round to User
  displayRoundWinnerTxt(roundWinner);
  updateScores(roundWinner);

  // Ask User for their choice of weapon for the following round
  if (gameDataObj.userScore < 5) {
    askUserForWpnChoice();
  }
}

function resetGame() {
  console.log("resetGame() called");

  // Initialize gameDataObj values for the start of a new game
  gameDataObj.roundNum = 1;
  gameDataObj.currentUserWpnChoice = '';
  gameDataObj.currentComputerWpnChoice = '';
  gameDataObj.userScore = 0;
  gameDataObj.computerScore = 0;

  // Display initial instructions to User
  const welcomeStr = `Welcome to the game! \nRound 1: select your weapon...`;
  appendTextToElement(welcomeStr, instructTxtDisplayBox);
}
