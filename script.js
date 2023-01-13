// - When the user opens or refreshes the page, the game doesn't start automatically
// F: game(): New Game is started
//  - create variable named score with initial value of 0
//  -
//  - if
//  - if playRound() returns null, exit the game

// Play an entire game with 5 rounds, then alert and console.log the result
function game() {
  let playerScoreCard = 0; // keeps running summation of player's score
  let i = 0;
  while (i < 5) {
    let roundResultArr = playRound(); // Play one round between computer and player, which returns an arr of [computerSelection, playerSelection] || null if user quits game || false if input is invalid
    if (roundResultArr === null) {
      // exits the game
      console.log("Player exited the game");
    } else if (roundResultArr === false) {
      // skips back out of while loop and restarts the current round
    } else {
      // if playRound() returned a valid arr:
      playerScoreCard += calcRoundWinner(roundResultArr); // Add current round result to player's score
      i++; // increment counter
    }
  }
  // After 5 rounds, give result to player and console.log the result
  if (playerScoreCard === 0) {
    alert(`End of game: You have tied with the computer`);
    console.log("Tie");
  } else if (playerScoreCard < 0) {
    alert(`End of game: Sorry, you lost! Better luck next time!`);
    console.log("Lose");
  } else {
    alert(`End of game: Congratulations! You won!`);
    console.log("Win");
  }
}

// Play one round between computer and player
function playRound() {
  // Get computer's and player's selections
  let computerSelection = makeRandomComputerSelection();
  let playerSelection = getPlayerSelection();
  // Validate player's selection & store in pass
  let pass = checkPlayerInput(playerSelection);

  if (pass === false || pass === null) {
    alert("Invalid input: please enter only 'rock', 'paper', or 'scissors'");
    if (confirm("Do you wish to continue the game?")) {
      // Triggers restart of current round in game()
      return false;
    } else {
      // Triggers exiting game()
      return null;
    }
  } else {
    // if player's input is valid, playRound() returns an arr containing computer's and player's selections
    return [computerSelection, playerSelection];
  }
}

// Computer makes a random choice of rock, paper or scissors, which returns string to computerSelection variable
function makeRandomComputerSelection() {
  let diceThrow = (Math.floor(Math.random() * 3)+1); // Random choice of 1, 2 or 3
  switch (diceThrow) {
    // Return computer's random game selection 
    case 1:
      return "rock";
      break;
    case 2:
      return "paper";
      break;
    case 3:
      return "scissors";
      break;
    default:
    // All possible cases are already covered from Math.random
  }
}

// Prompts user for their choice of rock, paper or scissors and returns entered string to variable playerSelection inside playRound()
function getPlayerSelection() {
  let playerInput = prompt("Please choose rock, paper, or scissors..."); // Get player selection
  return playerInput;
}

// Validates player's string input and returns true if valid, false if invalid, or null if the player cancels the 'Do you wish to continue?' prompt
function checkPlayerInput(playerInput) {
  let validInputArr = ["rock", "paper", "scissors"];    // Valid selections
  if (playerInput !== null) {
    // If player types something and presses enter
    playerInput = playerInput.trim().toLowerCase(); // convert playerInput to lowercase & trim whitespace from ends
    if (validInputArr.includes(playerInput)) {
      // If player input is valid
      return true;
    } else {
      // If player input is invalid
      return false;
    } 
  } else {
    // if user cancels the prompt, return null to playRound() which triggers game() to exit
    console.log("Player cancelled the prompt.");
    return null;
  }
}

// Determine whether the player won, lost or tied in the current round
function calcRoundWinner(roundResultArr) {
  // Possible alerts
  const alertWin = () =>
    alert(
      `Yay, ${roundResultArr[1]} beats ${roundResultArr[0]} - you win this round!`
    );
  const alertLose = () =>
    alert(
      `Sorry, ${roundResultArr[0]} beats ${roundResultArr[1]} - you lose this round.`
    );
  const alertTie = () =>
    alert(
      `It's a tie. You and the computer both selected ${roundResultArr[0]}}`
    );
  const alertError = () =>
    alert(
      "Sorry, something went wrong...restarting the game. If this error persists, then please contact support"
    );

  // Decide result, alert, and return score to variable score in game()
  if (roundResultArr[0] === roundResultArr[1]) {
    // Tie in round
    alertTie();
    return 0;
  } else if (roundResultArr[0] === "rock" && roundResultArr[1] === "scissors") {
    // Lose round
    alertLose();
    return -1;
  } else if (roundResultArr[0] === "rock" && roundResultArr[1] === "paper") {
    // Win round
    alertWin();
    return 1;
  } else if (roundResultArr[0] === "paper" && roundResultArr[1] === "rock") {
    // Lose round
    alertLose();
    return -1;
  } else if (
    roundResultArr[0] === "paper" &&
    roundResultArr[1] === "scissors"
  ) {
    // Win round
    alertWin();
    return 1;
  } else if (
    roundResultArr[0] === "scissors" &&
    roundResultArr[1] === "paper"
  ) {
    // Lose round
    alertLose();
    return -1;
  } else if (roundResultArr[0] === "scissors" && roundResultArr[1] === "rock") {
    // Win round
    alertWin();
    return 1;
  } else {
    // Error in round result array
    alertError();
    return 0;
  }
}

// END OF CODE ################################################################