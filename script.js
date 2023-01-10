// When the user opens a new game (by opening or refreshing the page), the computer makes a random choice of rock, paper or scissors; 
function getRandomChoice() {
  let i = Math.floor(Math.random() * 3);
  let computerChoice;
  switch (i) {
    case 0:
      computerChoice = "rock";
      break;
    case 1:
      computerChoice = "paper";
      break;
    case 2:
      computerChoice = "scissors";
      break;
    default:
      computerChoice = "The Computer has'nt made a choice";
  }
}