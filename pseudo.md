# Rock Paper Scissors Game

## Overview
A simple console-based app in which the user plays 'Rock, Paper, Scissors' against the computer.

## Steps

- When the user opens or refreshes the page, the game doesn't start automatically
- F: game(): New Game is started
  - create variable named score with initial value of 0
  - F: playRound(): Play a round
    - F: randomChoice(): Computer makes a random choice of rock, paper or scissors, which is stored in variable computerSelection
    - F: getUserSelection(): prompts user for their choice or rock, paper or scissors, which returns a string which is stored in variable userSelection
      - upon receiving user input string, convert this to lowercase & trim whitespace from ends
      - F: checkUserInput(): Check for valid input from user
        - if input is valid - store in the variable userSelection
        - if input is invalid - getUserSelection() again
    - F: determineRoundWinner(): assign to variable roundScore
      - Compare userSelection with computerSelection (based on conditional logic):
        - if userSelection == computerSelection: 
          - alert user  "tie"
          - return 0
        - if computerSelection beats userSelection: 
          - alert user "{computerSelection} beats {userSelection} - you lose this round."
          - return -1
        - if userSelection beats computerSelection:
          - alert user "{userSelection} beats {computerSelection} - you win this round!"
          - return 1
      - Now this round is complete - return value of roundScore to game() 
  - Repeat until 5 rounds are complete:
    - after the 5th round
      - F: announceGameWinner():
        - if gameScore === 0
          - alert "tie"
        - if gameScore === -1
          - alert "you lost the game."
        - if gameScore === 1
          - alert "you won the game!"

NOTES:
- Need to fix ';' character looks the same when it's suggested by text editor as when I type it myself. 
  - Note current system theme (to not use again)
  - Change system theme 
