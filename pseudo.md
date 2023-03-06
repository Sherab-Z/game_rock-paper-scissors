# Rock Paper Scissors Game

## Overview
A simple console-based app in which the user plays 'Rock, Paper, Scissors' against the computer.

Note: This is scratchpad pseudocode. I changed the algorithm in various places during implementation.

## Steps

- When the user opens or refreshes the page, the game doesn't start automatically
- Player clicks 'New Game' button: calls game() function
  1. Create variable named playerScore with initial value of 0 - at the end of the game if playerScore > 0 then Player wins, or if playerScore < 0 then Player loses, or if playerScore == 0 then it's a tie
  2. Display message in div: 'Round #: Choose your weapon...' where '#' (is the round number). Program then waits for the Player's selection...
  3. When Player clicks one of the 3 buttons: 'Rock', 'Paper', or 'Scissors':
      - F: playRound(playerSelection) is called by event handler, which passes Player's selected weapon string (in lower case) as the argument
      - F: randomChoice(): Computer makes a random choice of 'rock', 'paper' or 'scissors', which is stored in the variable computerSelection
      - Returns the array [playerSelection, computerSelection]
  4. F: determineRoundWinner(): assign to variable roundScore
    - Compare userSelection with computerSelection (based on conditional logic):
      - if userSelection == computerSelection: 
        - display to Player:  "tie"
        - return 0
      - if computerSelection beats userSelection: 
        - display to Player: "{computerSelection} beats {userSelection} - you lose this round."
        - return -1
      - if userSelection beats computerSelection:
        - display to Player: "{userSelection} beats {computerSelection} - you win this round!"
        - return 1
    - Now this round is complete - return value of roundScore to game() 
  5. Repeat until 5 rounds are complete
  6. Then announceGameWinner():
    - if playerScore === 0
      - display to Player: "tie" + Add button 'Play again?' which calls game() 
    - if playerScore < 0
      - display to Player: "you lost the game." + Add button 'Play again?' which calls game() 
    - if playerScore > 0
      - display to Player: "you won the game!" + Add button 'Play again?' which calls game() 
  7. If Player clicks 'Play again', game() is called again and a new game begins.

Extras:
    - F: playRound(playerSelection) is called by event handler, which passes the selected weapon string (in lower case) as the argument
      - F: randomChoice(): Computer makes a random choice of 'rock', 'paper' or 'scissors', which is stored in the variable computerSelection
      - Returns the array [playerSelection, computerSelection]
    
