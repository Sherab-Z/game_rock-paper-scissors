// --- Parameter Settings --- //
const userScoreForGameEnd = 5; // when User reaches this score, the game ends

// --- Game Data Object --- //
const gameDataObj = {
  // Keep track of the round number, and each player's score
  roundNum: 0,
  userWpnChoice: '',
  computerWpnChoice: '',
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

// --- APPENDING DOM ELEMENTS TO CONTAINERS ---

// FUNC: Convert a DOM reference, elementObj, into a true array, in order to feed that into appendTextToElements(). This is needed because appendTextToElements() can only process a collection of DOM elements in the form of a true array.
function convertElementToArray(elementObj) {
  if (elementObj instanceof Element) {
    return [elementObj];
  } else if (elementObj instanceof NodeList || Array.isArray(elementObj)) {
    return Array.from(elementObj);
  } else {
    throw new Error(
      "Invalid argument: element must be a DOM element, a NodeList, or an array."
    );
  }
}

// FUNC: Append text to DOM element(s) for display on screen.
function appendTextToElements(
  text, // (string: required) The text content to be appended
  elements, // (array, node-list, or other array-like obj: required) A list of DOM references ()
  index = null, // (number: optional) This should be passed in if text is to be appended to only one specific element in the DOM reference list
  singleElFromList = false // (boolean: optional)  Must be set to true if an index number is passed in to select a single el from a list of DOM references
) {
  const els = convertElementToArray(elements); // Converts elements to an actual array of DOM references
  if (index === null && !singleElFromList) {
    // Default settings - a reference to only one DOM element is passed in as the elements arg
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const textNode = document.createTextNode(text);
      el.appendChild(textNode);
    }
  } else if (index !== null) {
    const el = els[index];
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
  } else {
    throw new Error("An index is required when singleElFromList is true.");
  }
}

// ....................................

// FUNC: Returns Computer's random weapon choice str from an arr of options
function makeRandomComputerChoice() {
  let options = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * options.length); // Generate random integer between 0 and 2
  return options[randomNum]; // Return a random item from the options array
}

// FUNC: Returns the winner of the current round
function determineRoundWinner(userChoice, computerChoice) {
  console.log("determineRoundWinner() called");

  let choicesArr = [userChoice, computerChoice]; // For easier & more readable handling of the choices, turn them into an array

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
      gameDataObj["userScore"]++; // Increment User score by 1
    case "computer_wins_round":
      gameDataObj["computerScore"]++; // Increment Computer score by 1
  }
}

function displayRoundWinnerTxt(roundWinner, roundNum) {
  const tieRoundMsg = `It's a tie: you and the Computer both chose ${userChoice}.`;
  const userWinsRoundMsg = `Well chosen! ${userChoice} beats ${computerChoice} - You win this round!`;
  const computerWinsRoundMsg = `Sorry, ${computerChoice} beats ${userChoice}. The Computer wins this round!`;

  switch (roundWinner) {
    case "tie":
      appendTextToElements(tieRoundMsg, resultsTxtDisplayBox);
    case "user_wins_round":

    case "computer_wins_round":
  }
}

function askUserForWpnChoice() {
  // Message string to display to User
  const askForWpnChoiceMsg = `Round ${gameDataObj.roundNum}: Choose your weapon!...`;

  // Display message to User inside of instructions box
  appendTextToElements(askForWpnChoiceMsg, instructTxtDisplayBox);
}


// FUNC: Play one round between User vs Computer
function playRound(wpnStr, userScore, computerScore, roundNum) {
  console.log("playRound() called");
  gameDataObj["roundNum"]++; // Increment the round number

  // Get weapon choices from both players
  gameDataObj[''] = wpnStr;
  const computerChoice = makeRandomComputerChoice();

  // Determine the winner of this round
  const roundWinner = determineRoundWinner(gameDataObj.userChoice, gameDataObj.computerChoice);

  // Display the results of this round to User
  displayRoundWinnerTxt(roundWinner);
  updateScores(roundWinner);

  // Ask User for their choice of weapon for the following round
  if (gameDataObj.userScore < 5) {
    askUserForWpnChoice();
  }
}

// function roundLoop() {
//   while (userScore < 5) {  // Repeat rounds until User reaches 5 points
//     userScore += calcRoundWinner(roundSelectionsArr); // Add current round result to User's score

//     }
// }

function resetGame() {
  console.log("resetGame() called");

  // Initialize gameDataObj values for the start of a new game
  gameDataObj.roundNum = 1;
  gameDataObj.userWpnChoice = '';
  gameDataObj.computerWpnChoice = '';
  gameDataObj.userScore = 0;
  gameDataObj.computerScore = 0;

  // Display initial instructions to User
  const welcomeStr = `Welcome to the game! \nRound 1: select your weapon...`;
  appendTextToElements(welcomeStr, instructTxtDisplayBox);
}
