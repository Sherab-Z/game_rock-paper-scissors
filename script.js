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

//  Output display text
const instructTxtDisplayTxt = document.querySelector(".instruct.msg.txt");

const resultsMsgDisplayTxt = document.querySelector(".results.msg.txt");

const userScoreDisplayTxt = document.querySelector(
  ".user.plyr.current.score.num"
);

const computerScoreDisplayTxt = document.querySelector(
  ".computer.plyr.current.score.num"
);

// Output display containers
const userScoreBox = document.querySelector(".user.plyr.current.score.text-display-box");

const computerScoreBox = document.querySelector(".computer.plyr.current.score.text-display-box");

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
  appendTextToElement(gameDataObj.currentUserScore, userScoreDisplayTxt);
  appendTextToElement(
    gameDataObj.currentComputerScore,
    computerScoreDisplayTxt
  );
}

// FUNC: At the end of each round, display a message with the winner of the round
function displayWinnerMsg(roundWinner) {
  // Round winner messages
  const tieRoundMsg = `Tie round: you and the Computer both chose ${gameDataObj.currentUserWpnChoice}...`;
  const userWinsRoundMsg = `Well chosen! ${gameDataObj.currentUserWpnChoice} beats ${gameDataObj.currentComputerWpnChoice} - You win this round!`;
  const computerWinsRoundMsg = `Sorry, ${gameDataObj.currentComputerWpnChoice} beats ${gameDataObj.currentUserWpnChoice}. The Computer wins this round!`;

  // Game winner messages
  const userWinsGameMsg =
    `Congratulations! You've saved humanity from the bots after ${gameDataObj.roundNum} rounds!...But for how long?..Play again?...`;
  const computerWinsGameMsg =
    `OH NO! The bots have won after ${gameDataObj.roundNum} rounds. But there might still be a chance for humanity.. Play again?...`;

  // Error message
  const errorMsg = `Error: Sorry, something went wrong...`;

  if (
    gameDataObj.currentUserScore < 5 &&
    gameDataObj.currentComputerScore < 5
  ) {
    switch (roundWinner) {
      case "tie":
        appendTextToElement(tieRoundMsg, resultsMsgDisplayTxt);
        break;
      case "user_wins_round":
        appendTextToElement(userWinsRoundMsg, resultsMsgDisplayTxt);
        break;
      case "computer_wins_round":
        appendTextToElement(computerWinsRoundMsg, resultsMsgDisplayTxt);
        break;
      default:
        appendTextToElement(errorMsg, resultsMsgDisplayTxt);
    }
  } else if (gameDataObj.currentUserScore >= 5) {
    userScoreDisplayTxt.style.color = "green";
    resultsMsgDisplayTxt.style.color = "green"; 
    appendTextToElement(userWinsGameMsg, resultsMsgDisplayTxt);
  } else if (gameDataObj.currentComputerScore >= 5) {
    computerScoreBox.style.color = "red";
    resultsMsgDisplayTxt.style.color = "red"; 
    appendTextToElement(computerWinsGameMsg, resultsMsgDisplayTxt);
  } else {
    appendTextToElement(errorMsg, resultsMsgDisplayTxt);
  }
}

function askUserForWpnChoice() {
  // Message string to display to User
  const requestWpnChoiceMsg = `ROUND ${gameDataObj.roundNum} - Choose your weapon!...`;

  // Display message to User inside of instructions box
  appendTextToElement(requestWpnChoiceMsg, instructTxtDisplayTxt);
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
    instructTxtDisplayTxt,
    resultsMsgDisplayTxt,
    userScoreDisplayTxt,
    computerScoreDisplayTxt
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
    instructTxtDisplayTxt,
    resultsMsgDisplayTxt,
    userScoreDisplayTxt,
    computerScoreDisplayTxt
  );

  // Clear dynamically applied styles
  userScoreDisplayTxt.style.color = "black";
  computerScoreDisplayTxt.style.color = "black";
  resultsMsgDisplayTxt.style.color = "white";

  // Initialize gameDataObj values for the start of a new game
  gameDataObj.roundNum = 1;
  gameDataObj.currentUserWpnChoice = "";
  gameDataObj.currentComputerWpnChoice = "";
  gameDataObj.currentUserScore = 0;
  gameDataObj.currentComputerScore = 0;

  // Display initial instructions on UI
  const welcomeStr = `Welcome to the future, where it's human vs. computer...the first to score 5 points will take over the world...so keep your wits about you... ROUND 1! SELECT YOUR WEAPON!`;

  appendTextToElement(welcomeStr, instructTxtDisplayTxt);

  // Display initial scores
  let userScore = gameDataObj.currentUserScore;
  let computerScore = gameDataObj.currentComputerScore;

  appendTextToElement(userScore, userScoreDisplayTxt);

  appendTextToElement(computerScore, computerScoreDisplayTxt);
}
