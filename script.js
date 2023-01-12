// - When the user opens or refreshes the page, the game doesn't start automatically
// F: game(): New Game is started
//  - create variable named score with initial value of 0
//  - 
//  - if 
//  - if playRound() returns null, exit the game

// F: Play one round between computer and player
function playRound() {
  let computerSelection = makeRandomComputerSelection();
  let playerSelection = getPlayerSelection();
  let pass = checkPlayerInput(playerSelection);

  if (pass === false || pass === null) {
    alert("Invalid input: please enter only 'rock', 'paper', or 'scissors'");
    if (confirm("Do you wish to continue the game?")) {  // Restart current round in game()
      return (-1); 
    } else {  // Return null to game(), which will trigger exiting the game loop
      return null; 
    }
  } else if (pass === true) {  // if player's input is valid, playRound() returns an obj made of computer's and player's selections
    return selectionObj = {   
      computerSelection: computerSelection,
      playerSelection: playerSelection,
    };
  } else {
     // returns valid computer and player selections to game(), in the form of an arr
  }
}

// F: Computer makes a random choice of rock, paper or scissors, which is stored in variable computerSelection
function makeRandomComputerSelection() {
  let diceThrow = Math.floor(Math.random() * 3);
  switch (diceThrow) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
    default:
    // All possible cases are already covered from Math.random
  }
}

// F: prompts user for their choice or rock, paper or scissors; returns a string that is stored in the variable playerSelection inside playRound()
function getPlayerSelection() {
  let playerInput = prompt("Please choose rock, paper, or scissors...").trim().toLowerCase(); // Get player selection
  return playerInput;
}

function checkPlayerInput(playerInput) {
  let validInputArr = ["rock", "paper", "scissors"];
  if (playerInput !== null) {
    // If player types something and presses enter
    playerInput = playerInput.trim().toLowerCase(); // convert playerInput to lowercase & trim whitespace from ends
    if (validInputArr.includes(playerInput)) {
      return true;
    } else {
      return false;
    }// returns true if playerInput is valid, false if it's invalid
  } else {
    // if user cancels the prompt, return null to playRound()
    console.log("Player cancelled the prompt.");
    return null;
  }
}

//         - if input is valid - store in the variable playerSelection
//         - if input is invalid - getPlayerSelection() again
//     - F: determineRoundWinner(): assign to variable roundScore
//       - Compare userSelection with computerSelection (based on conditional logic):
//         - if userSelection == computerSelection:
//           - alert user  "tie"
//           - return 0
//         - if computerSelection beats userSelection:
//           - alert user "{computerSelection} beats {userSelection} - you lose this round."
//           - return -1
//         - if userSelection beats computerSelection:
//           - alert user "{userSelection} beats {computerSelection} - you win this round!"
//           - return 1
//       - Now this round is complete - return value of roundScore to game()
//   - Repeat until 5 rounds are complete:
//     - after the 5th round
//       - F: announceGameWinner():
//         - if gameScore === 0
//           - alert "tie"
//         - if gameScore === -1
//           - alert "you lost the game."
//         - if gameScore === 1
//           - alert "you won the game!"

// NOTES:
// FUTURE FEATURE: 'Do you wish to exit the game': If playRound() returns null when called by game(), then it means user pressed the cancel button. If so, ask user whether they wish to exit the game. If 'yes', exit the game, if 'no', replay the round and continue the game.

// OLD CODE START #################################

// // When the user opens a new game (by opening or refreshing the page), the computer makes a random choice of rock, paper or scissors;
// function getRandomChoice() {
//   let diceThrow = Math.floor(Math.random() * 3);
//   switch (diceThrow) {
//     case 0:
//       computerSelection = "rock";
//       break;
//     case 1:
//       computerSelection = "paper";
//       break;
//     case 2:
//       computerSelection = "scissors";
//       break;
//     default:
//       computerSelection = "The Computer has'nt made a choice";
//   }
//   return computerSelection;
// }

// function playSingleRound() {
//   // get computer's choice
//   getRandomChoice();
//   // prompt the user to make their choice
//   let playerSelection = prompt(
//     "Choose rock, paper, or scissors!");
//   if (playerSelection !== null) {   // clean up user's returned string
//     playerSelection = playerSelection.trim().toLowerCase();

//   } else {    // if user cancels the prompt
//     console.log("User cancelled the prompt.")
//   }
//   // compare the user's choice with its own, and based on conditional logic, determine the winner;
//   let roundResult;

//   switch (playerSelection) {
//     case "rock":
//       if (computerSelection === "rock") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}`);
//         alert("It's a tie.");
//         return (roundResult = 0);
//       } else if (computerSelection === "paper") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
//         return (roundResult = -1);
//       } else if (computerSelection === "scissors") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You win! ${playerSelection} beats ${computerSelection}`);
//         return (roundResult = 1);
//       } else {
//         alert("Something went wrong with the computer's choice.");
//       }
//       break;

//     case "paper":
//       if (computerSelection === "rock") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You win! ${playerSelection} beats ${computerSelection}`);
//         return (roundResult = 1);
//       } else if (computerSelection === "paper") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert("It's a tie.");
//         return (roundResult = 0);
//       } else if (computerSelection === "scissors") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
//         return (roundResult = -1);
//       } else {
//         alert("Something went wrong with the computer's choice.");
//       }
//       break;

//     case "scissors":
//       if (computerSelection === "rock") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
//         return (roundResult = -1);
//       } else if (computerSelection === "paper") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert(`You win - ${playerSelection} beats ${computerSelection}!`);
//         return (roundResult = 1);
//       } else if (computerSelection === "scissors") {
//         console.log(`szcl: round complete - player selected: ${playerSelection}, computer selected: ${computerSelection}!`);
//         alert("It's a tie.");
//         return (roundResult = 0);
//       } else {
//         alert("Something went wrong with the computer's choice.");
//       }
//       break;
//     case null:
//       return (roundResult = null);
//     default:
//       alert("You can only choose 'rock', 'paper' or 'scissors'. Please enter one of these values.");
//       playSingleRound();
//       return (roundResult = null);
//   }
// }

// function game() {
//   let computerSelection = null;

//   let playerOverallScore = 0;

//   let i = 0;
//   while (i < 5) {   // play game 5 times, keeping track of player's overall score
//     let roundScore = playSingleRound();
//     if (roundScore === null) {
//       alert("Please replay the round...");
//     } else {
//       playerOverallScore += roundScore;
//       i++;
//     }
//   }

//   if (playerOverallScore > 0) {
//     alert("Congratulations! You won the game!!!");
//   } else if (playerOverallScore < 0) {
//     alert("Sorry, you lost the game. Better luck next time!"); //
//   } else if (playerOverallScore === 0) {
//     alert("It's a tie. Want to try again?");
//   } else {
//     alert("Something went wrong...no result from the game...");
//   }
// }
