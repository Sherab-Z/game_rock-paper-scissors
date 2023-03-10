// --- Parameter Settings --- //
const winningScore = 5; // when User reaches this score, the game ends

// --- Game Data Object --- //
const gameDataObj = {
  // Keep track of the round number, and each player's score
  roundNum: 0,
  currentUserWpnChoice: "",
  currentComputerWpnChoice: "",
  currentUserScore: 0,
  currentComputerScore: 0,
};

//  --- GET DOM ELEMENT REFERENCES ---
//  Buttons
const newGameBtn = document.querySelector(".new-game.btn");

const rockBtn = document.querySelector(".rock.wpn.btn");

const paperBtn = document.querySelector(".paper.wpn.btn");

const scissorsBtn = document.querySelector(".scissors.wpn.btn");

//  Display Boxes
const instructTxtDisplayBox = document.querySelector(".instruct.msg.txt");

const resultsTxtDisplayBox = document.querySelector(".results.msg.txt");

const userScoreDisplayBox = document.querySelector(
  ".user.plyr.current.score.num"
);

const computerScoreDisplayBox = document.querySelector(
  ".computer.plyr.current.score.num"
);

// --- EVENT HANDLERS ---
// Buttons
const clickNewGame = newGameBtn.addEventListener("click", () => {
  console.log("'New Game' btn clicked");

  resetGame();
});
const userChoosesRock = rockBtn.addEventListener("click", () => {
  console.log("'Rock' btn clicked");

  gameDataObj.currentUserScore >= winningScore ||
  gameDataObj.currentComputerScore >= winningScore
    ? console.log("Game ended")
    : playRound("rock");
});
const userChoosesPaper = paperBtn.addEventListener("click", () => {
  console.log("'Paper' btn clicked");

  gameDataObj.currentUserScore >= winningScore ||
  gameDataObj.currentComputerScore >= winningScore
    ? console.log("Game ended")
    : playRound("paper");
});
const userChoosesScissors = scissorsBtn.addEventListener("click", () => {
  console.log("'Scissors' btn clicked");

  gameDataObj.currentUserScore >= winningScore ||
  gameDataObj.currentComputerScore >= winningScore
    ? console.log("Game ended")
    : playRound("scissors");
});

// --- FUNCTIONS ---

// FUNC: Append text to a DOM element for displaying on screen.
function appendTextToElement(
  data, // (type: any; required) The text content to be appended (converted to a string inside this function)
  el // (DOM Reference object: required) A reference to a DOM element
) {
  const textNode = document.createTextNode(data.toString());
  el.appendChild(textNode);
}

// FUNC: Returns Computer's random weapon choice str from an arr of options
function makeRandomComputerChoice() {
  let options = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * options.length); // Generate random integer between 0 and 2
  return options[randomNum]; // Return a random item from the options array
}

// FUNC: Returns the winner of the current round
function determineRoundWinner() {
  console.log("determineRoundWinner() called");

  let choicesArr = [
    gameDataObj.currentUserWpnChoice,
    gameDataObj.currentComputerWpnChoice,
  ]; // For easier & more readable handling of the choices, turn them into an array

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

// FUNC: IF there's a winner in the current round, then increment their score; IF it's a tie, then do nothing
function updateScores(roundWinner) {
  switch (roundWinner) {
    case "user_wins_round":
      gameDataObj.currentUserScore++; // Increment User score by 1
      break;
    case "computer_wins_round":
      gameDataObj.currentComputerScore++; // Increment Computer score by 1
      break;
    default:
    // Tie: do nothing
  }
}

// FUNC: Display current scores on UI
function displayScores() {
  appendTextToElement(gameDataObj.currentUserScore, userScoreDisplayBox);
  appendTextToElement(
    gameDataObj.currentComputerScore,
    computerScoreDisplayBox
  );
}

// FUNC: At the end of each round, display a message with the winner of the round
function displayWinnerMsg(roundWinner) {
  // Round winner messages
  const tieRoundMsg = `It's a tie: you and the Computer both chose ${gameDataObj.currentUserWpnChoice}.`;
  const userWinsRoundMsg = `Well chosen! ${gameDataObj.currentUserWpnChoice} beats ${gameDataObj.currentComputerWpnChoice} - You win this round!`;
  const computerWinsRoundMsg = `Sorry, ${gameDataObj.currentComputerWpnChoice} beats ${gameDataObj.currentUserWpnChoice}. The Computer wins this round!`;

  // Game winner messages
  const userWinsGameMsg =
    "Congratulations! You won the game! Would you like to play again?...";
  const computerWinsGameMsg =
    "Better luck next time! The computer won the game. Would you like to play again?...";

  // Error message
  const errorMsg = `Error: Sorry, something went wrong...`;

  if (
    gameDataObj.currentUserScore < 5 &&
    gameDataObj.currentComputerScore < 5
  ) {
    switch (roundWinner) {
      case "tie":
        appendTextToElement(tieRoundMsg, resultsTxtDisplayBox);
        break;
      case "user_wins_round":
        appendTextToElement(userWinsRoundMsg, resultsTxtDisplayBox);
        break;
      case "computer_wins_round":
        appendTextToElement(computerWinsRoundMsg, resultsTxtDisplayBox);
        break;
      default:
        appendTextToElement(errorMsg, resultsTxtDisplayBox);
    }
  } else if (gameDataObj.currentUserScore >= 5) {
    appendTextToElement(userWinsGameMsg, resultsTxtDisplayBox);
  } else if (gameDataObj.currentComputerScore >= 5) {
    appendTextToElement(computerWinsGameMsg, resultsTxtDisplayBox);
  } else {
    appendTextToElement(errorMsg, resultsTxtDisplayBox);
  }
}

function askUserForWpnChoice() {
  // Message string to display to User
  const requestWpnChoiceMsg = `Round ${gameDataObj.roundNum}: Choose your weapon!...`;

  // Display message to User inside of instructions box
  appendTextToElement(requestWpnChoiceMsg, instructTxtDisplayBox);
}

/* FUNC: Clear text from message box(es) on the UI. Arguments: 1 or more individual DOM references entered as separate args via rest parameter syntax to create a boxes array of DOM elements */
function clearTxtFromDisplayBoxes(...boxes) {
  boxes.forEach((box) => {
    box.textContent = "";
  });
}

// FUNC: Play one round between User vs Computer
function playRound(wpnStr) {
  console.log("playRound() called");

  // Clear all text from message boxes
  clearTxtFromDisplayBoxes(
    instructTxtDisplayBox,
    resultsTxtDisplayBox,
    userScoreDisplayBox,
    computerScoreDisplayBox
  );

  // Increment the round number
  gameDataObj.roundNum++;

  // Get weapon choices from both players
  gameDataObj.currentUserWpnChoice = wpnStr;
  gameDataObj.currentComputerWpnChoice = makeRandomComputerChoice();

  // Determine the winner of this round
  const roundWinner = determineRoundWinner();

  // Update scores & display the results of this round to User
  updateScores(roundWinner);
  displayScores();
  displayWinnerMsg(roundWinner);

  // Ask User for their choice of weapon for the following round
  if (gameDataObj.currentUserScore < 5) {
    askUserForWpnChoice();
  }
}

function resetGame() {
  console.log("resetGame() called");

  // Clear all text from message boxes
  clearTxtFromDisplayBoxes(
    instructTxtDisplayBox,
    resultsTxtDisplayBox,
    userScoreDisplayBox,
    computerScoreDisplayBox
  );

  // Initialize gameDataObj values for the start of a new game
  gameDataObj.roundNum = 1;
  gameDataObj.currentUserWpnChoice = "";
  gameDataObj.currentComputerWpnChoice = "";
  gameDataObj.currentUserScore = 0;
  gameDataObj.currentComputerScore = 0;

  // Display initial instructions on UI
  const welcomeStr = `Welcome to the game! \nRound 1: select your weapon...`;

  appendTextToElement(welcomeStr, instructTxtDisplayBox);

  // Display initial scores
  let userScore = gameDataObj.currentUserScore;
  let computerScore = gameDataObj.currentComputerScore;

  appendTextToElement(userScore, userScoreDisplayBox);

  appendTextToElement(computerScore, computerScoreDisplayBox);
}
