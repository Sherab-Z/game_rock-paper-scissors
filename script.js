// When the user opens a new game (by opening or refreshing the page), the computer makes a random choice of rock, paper or scissors;
function getRandomChoice() {
  let i = Math.floor(Math.random() * 3);
  switch (i) {
    case 0:
      computerSelection = "rock";
      break;
    case 1:
      computerSelection = "paper";
      break;
    case 2:
      computerSelection = "scissors";
      break;
    default:
      computerSelection = "The Computer has'nt made a choice";
  }
  return computerSelection;
}

function playSingleRound() {
  // get computer's choice
  getRandomChoice();
  // prompt the user to make their choice
  let playerSelection = prompt(
    "Choose rock, paper, or scissors!"
  ).toLowerCase();
  // compare the user's choice with its own, and based on conditional logic, determine the winner;
  let roundResult;

  switch (playerSelection) {
    case "rock":
      if (computerSelection === "rock") {
        console.log("szcl: round complete!");
        alert("It's a tie.");
        return (roundResult = 0);
      } else if (computerSelection === "paper") {
        console.log("szcl: round complete!");
        alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
        return (roundResult = -1);
      } else if (computerSelection === "scissors") {
        console.log("szcl: round complete!");
        alert(`You win! ${playerSelection} beats ${computerSelection}`);
        return (roundResult = 1);
      } else {
        alert("Please choose either 'rock', 'paper' or 'scissors'.");
        return (roundResult = null);
      }
      break;

    case "paper":
      if (computerSelection === "rock") {
        console.log("szcl: round complete!");
        alert(`You win! ${playerSelection} beats ${computerSelection}`);
        return (roundResult = 1);
      } else if (computerSelection === "paper") {
        console.log("szcl: round complete!");
        alert("It's a tie.");
        return (roundResult = 0);
      } else if (computerSelection === "scissors") {
        console.log("szcl: round complete!");
        alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
        return (roundResult = -1);
      } else {
        alert("Please choose either 'rock', 'paper' or 'scissors'.");
        return (roundResult = null);
      }
      break;

    case "scissors":
      if (computerSelection === "rock") {
        console.log("szcl: round complete!");
        alert(`You lose - ${computerSelection} beats ${playerSelection}.`);
        return (roundResult = -1);
      } else if (computerSelection === "paper") {
        console.log("szcl: round complete!");
        alert(`You win - ${playerSelection} beats ${computerSelection}!`);
        return (roundResult = 1);
      } else if (computerSelection === "scissors") {
        console.log("szcl: round complete!");
        alert("It's a tie.");
        return (roundResult = 0);
      } else {
        alert("Please choose either 'rock', 'paper' or 'scissors'.");
        return (roundResult = null);
      }
      break;
  }
}

function game() {
  let computerSelection = null;

  let playerOverallScore = 0;

  let i = 0;
  while (i < 5) {   // play game 5 times, keeping track of player's overall score
    let roundScore = playSingleRound();
    if (roundScore === null) {
      alert("Please replay the round...");
    } else {
      playerOverallScore += roundScore;
      i--;
    }
  }

  if (playerOverallScore > 0) {
    alert("Congratulations! You won the game!!!");
  } else if (playerOverallScore < 0) {
    alert("Sorry, you lost the game. Better luck next time!"); //
  } else if (playerOverallScore === 0) {
    alert("It's a tie. Want to try again?");
  } else {
    alert("Something went wrong...no result from the game.");
  }
}
