//  --- GET DOM ELEMENT REFERENCES ---
//  Buttons
const newGameBtn = document.querySelector(".new-game.btn");
const rockBtn = document.querySelector(".rock.wpn.btn");
const paperBtn = document.querySelector(".paper.wpn.btn");
const scissorsBtn = document.querySelector(".scissors.wpn.btn");

//  TextDisplays
const instructTextDisplayBox = document.querySelector(".instruct.msg.text-display-box");
const resultsTextDisplayBox = document.querySelector(".results.msg.text-display-box");

// --- EVENT HANDLERS ---
// Buttons
const clickNewGame = newGameBtn.addEventListener("click", () => {
  console.log("'New Game' btn clicked");

  game();
});
const playerChoosesRock = rockBtn.addEventListener("click", () => {
  console.log("'Rock' btn clicked");

  playRound("rock");
});
const playerChoosesPaper = paperBtn.addEventListener("click", () => {
  console.log("'Paper' btn clicked");

  playRound("paper");
});
const playerChoosesScissors = scissorsBtn.addEventListener("click", () => {
  console.log("'Scissors' btn clicked");

  playRound("scissors");
});

// --- APPENDING DOM ELEMENTS TO CONTAINERS ---

// FUNCTION: Convert a DOM reference, elementObj, into a true array, in order to feed that into appendTextToElements(). This is needed because appendTextToElements() can only process a collection of DOM elements in the form of a true array.
function elementToArray(elementObj) {
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

// FUNCTION: Append text to DOM element(s) for display on screen.
function appendTextToElements(
  text, // (string: required) The text content to be appended
  elements, // (array, node-list, or other array-like obj: required) A list of DOM references ()
  index = null, // (number: optional) This should be passed in if text is to be appended to only one specific element in the DOM reference list
  singleElFromList = false // (boolean: optional)  Must be set to true if an index number is passed in to select a single el from a list of DOM references
) {
  const els = elementToArray(elements); // Converts elements to an actual array of DOM references
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

/* Pseudocode
x1. Player clicks 'New Game' button
x2. CALL game(): A new game is started
  - Player score card is initialized: 
      playerScoreCard = 0
  - Computer score card is initialized: 
      computerScoreCard = 0
  - Player choice in current round is initialized: 
      playerChoice = ''
  - Computer choice in current round is initialized:
      computerChoice = ''
3. ROUNDS:
    a. CALL askPlayerForWpnChoice(): Display text to Player: `Round ${# of current round}: Select your weapon...`
    b. When Player clicks a weapon button -> CALL playRound():
      - Computer selects a random weapon
      - CALL calculateRoundWinner(): Determine this round's winner, 
        - RETURN true if Player won, 
        - RETURN false if Computer won, 
        - THROW ERROR otherwise
      - CALL displayRoundWinner(): Display this round's winner to Player:
              - If Player won, APPEND TO DOM: `You won, Well done. \n Round ${# of current round}: Select your weapon...`
              - If Computer won, APPEND TO DOM: `${computerChoice} beats ${playerChoice}, you lost. \n Round ${# of current round}: Select your weapon...`
      - CALL askPlayerForWpnChoice(): Display text to Player: `Round ${# of current round}: Select your weapon...` 
4. Repeat ROUNDS until playerScoreCard === 5
5. Finally, CALL displayGameWinner(): Display the result of the game to Player and ask to play again
  - IF Player won, APPEND TO DOM: `Congratulations! You won the game!!! \n
  Press 'New Game' to play again...
  - ELSE IF Computer won, APPEND TO DOM: `Sorry, you lost this game. \n
  Press 'New Game' to try again...
*/

// Make & return the selections for one round between Computer and Player
function playRound(wpnStr) {
  const playerSelection = wpnStr;
  const computerSelection = makeRandomComputerSelection();
  const scoresArr = [];

  return scoresArr;
}

function roundLoop() {
  while (playerScoreCard < 5) {  // Repeat rounds until Player reaches 5 points
    playerScoreCard += calcRoundWinner(roundSelectionsArr); // Add current round result to player's score

    }
}

function game() {
  console.log("game() called");

  // keep running summation of Player & Computer scores, and initialize an array to hold each round's selections
  let playerScoreCard = 0;
  let computerScoreCard = 0;
  let playerChoice = '';
  let computerChoice = '';

  // Play rounds until Player reaches 5 points
  roundLoop();

}


