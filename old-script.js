/* ISSUES:
  - calcRoundWinner() is also displaying the results - this should be done by a separate function
  - 
*/
/* TODO's
  - Add an event listener to the buttons that call your playRound function with the correct playerSelection every time a button is clicked. (you can keep the console.logs for this step)
  - Add a div for displaying results and change all of your console.logs into DOM methods.
  - Display the running score, and announce a winner of the game once one player reaches 5 points.
  - Once finished, checked and all legit: git commit the changes to rps-ui branch
*/

//  GET ELEMENT DOM REFERENCES
//  Buttons
const newGameBtn = document.querySelector(".newGame.btn");
const rockBtn = document.querySelector(".rock.wpn.btn");
const paperBtn = document.querySelector(".paper.wpn.btn");
const scissorsBtn = document.querySelector(".scissors.wpn.btn");
//  Containers
const startDiv = document.querySelector(".start.container");
const resultsDiv = document.querySelector(".results.container");

// EVENT HANDLERS
// Buttons
const clickNewGame = newGameBtn.addEventListener("click", () => {
  console.log("game() called");
  game();
});
const playerChoosesRock = rockBtn.addEventListener("click", () => {
  roundSelectionsArr = playRound("rock");
});
const playerChoosesPaper = paperBtn.addEventListener("click", () => {
  roundSelectionsArr = playRound("paper");
});
const playerChoosesScissors = scissorsBtn.addEventListener("click", () => {
  roundSelectionsArr = playRound("scissors");
});

// APPENDING TO DOM CONTAINERS
function elementToArray(elementObj) {
  // Converts a DOM reference, elementObj, into a true array, in order to feed that into appendTextToElements(). This is because appendTextToElements() can only process a collection of DOM elements as an array.
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

// FUNCTION: Appends text to DOM elements. Args: text is the text (string, required) is the content to be appended; elements (array, node-list, or other array-like obj, required) is a list of DOM references, which can be either a Node List, an array, or any array-like object; index (number, optional, default=null) is to be passed in if only one element from the DOM reference list is to be appended to; chooseOneElFromList (boolean, optional, default=false) tells the function if a specific DOM element should be appended to, based on a passed in index - this must be set to true if only one element from the DOM reference list is to be appended to.
function appendTextToElements(
  text,
  elements,
  index = null,
  chooseOneElFromList = false
) {
  const els = elementToArray(elements); // Converts elements to an actual array of DOM references
  if (index === null && !chooseOneElFromList) {
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
    throw new Error("An index is required when chooseOneElFromList is true.");
  }
}

function playAllRounds() {
  while (playerScoreCard < 5) {  // Repeat rounds until Player reaches 5 points
    playerScoreCard += calcRoundWinner(roundSelectionsArr); // Add current round result to player's score

    }
  }

// Play an entire game, then display and console.log the result
function game() {
  console.log("game on!");

  // keep running summation of Player & Computer scores, and initialize an array to hold each round's selections
  let playerScoreCard = 0;
  let computerScoreCard = 0;
  let roundSelectionsArr = [];

  // Display instructions to Player
  appendTextToElements("Choose your weapon...", startDiv);

  // Play rounds until Player reaches 5 points
  let i = 0;
  playAllRounds();
  
  showGameResult(playerScoreCard); // After all rounds are done, show Player in a div para whether they won, lost or tied in the game, and console.log the result
}

// Returns Computer's random selection from the game options
function makeRandomComputerSelection() {
  let options = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * options.length); // Generate random integer between 0 and 2
  return options[randomNum]; // Return a random item from the options array
}

// Make & return the selections for one round between Computer and Player
function playRound(wpnStr) {
  const playerSelection = wpnStr
  const computerSelection = makeRandomComputerSelection();
  return [computerSelection, playerSelection];
}

// Prompt user for their choice of rock, paper or scissors and return entered string to variable playerSelection inside playRound()
function askForPlayerSelection() {
  // Get player selection
}

// Determine whether Player won, lost or tied in the current round
function calcRoundWinner(roundSelectionsArr) {
  // Possible alerts
  const showWin = () =>
    (resultsDiv.textContent = `Yay, ${roundSelectionsArr[1]} beats ${roundSelectionsArr[0]} - you win this round!`);
  const showLose = () =>
    (resultsDiv.textContent = `Sorry, ${roundSelectionsArr[0]} beats ${roundSelectionsArr[1]} - you lose this round.`);
  const showTie = () =>
    (resultsDiv.textContent = `It's a tie. You and the computer both selected ${roundSelectionsArr[0]}`);
  const showError = () =>
    (resultsDiv.textContent =
      "Sorry, something went wrong...restarting the game. If this error persists, then please contact support");

  // Decide result, alert, and return score to variable score in game()
  if (roundSelectionsArr[0] === roundSelectionsArr[1]) {
    // Tie in round
    showTie();
    return 0;
  } else if (roundSelectionsArr[0] === "rock" && roundSelectionsArr[1] === "scissors") {
    // Lose round
    showLose();
    return -1;
  } else if (roundSelectionsArr[0] === "rock" && roundSelectionsArr[1] === "paper") {
    // Win round
    showWin();
    return 1;
  } else if (roundSelectionsArr[0] === "paper" && roundSelectionsArr[1] === "rock") {
    // Lose round
    showLose();
    return -1;
  } else if (
    roundSelectionsArr[0] === "paper" &&
    roundSelectionsArr[1] === "scissors"
  ) {
    // Win round
    showWin();
    return 1;
  } else if (
    roundSelectionsArr[0] === "scissors" &&
    roundSelectionsArr[1] === "paper"
  ) {
    // Lose round
    return -1;
  } else if (roundSelectionsArr[0] === "scissors" && roundSelectionsArr[1] === "rock") {
    // Win round
    return 1;
  } else {
    // Error in round result array
    return 0;
  }
}

function showGameResult(finalScore) {
  // Show
  if (finalScore === 0) {
    resultsDiv.textContent = `End of game: You have tied with the computer`;
    console.log("Tie");
  } else if (finalScore < 0) {
    resultsDiv.textContent = `End of game: Sorry, you lost! Better luck next time!`;
    console.log("Lose");
  } else if (finalScore > 0) {
    resultsDiv.textContent = `End of game: Congratulations! You won!`;
    console.log("Win");
  } else {
    resultsDiv.textContent = `ERROR: Sorry, something went wrong with the app...`;
    console.log("ERROR");
  }
}

// END OF CODE ################################################################
// TESTING CODE:

// JUNK?
/*
FROM roundLoop():
if (roundSelectionsArr === null) {
      // exits the game
      resultsDiv.textContent = "You exited the game.";
      return null; // exit the game
    } else if (roundSelectionsArr === false) {
      continue; // skip this loop iteration and restart the current round
*/