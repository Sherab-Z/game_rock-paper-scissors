# Rock Paper Scissors Game

## Overview
A simple console-based app in which the user plays 'Rock, Paper, Scissors' against the computer.

Note: This is scratchpad pseudocode. I changed the algorithm in various places during implementation.

## Algorithm
 
1. x User clicks 'New Game' button
2. x CALL game(): A new game is started
  x User score card is initialized: 
      userScore = 0
  x Computer score card is initialized: 
      computerScore = 0
  x User choice in current round is initialized: 
      userChoice = ''
  x Computer choice in current round is initialized:
      computerChoice = ''
  - Display initial instructions to User:
    - "Welcome to the game! "
    - CALL askUserForWpnChoice(): Display text to User: `Round ${# of current round}: Select your weapon...`
3. ROUNDS:
    When User clicks a weapon button -> CALL playRound(weaponString):
      - Computer selects a random weapon
      - CALL determineRoundWinner(userChoice, computerChoice): Determine this round's winner, 
        - RETURN true if User won, 
        - RETURN false if Computer won, 
        - THROW ERROR otherwise
      - CALL updateScores(): 
        - If User won this round: userScore += 1
        - If Computer won this round: computerScore += 1
      - CALL displayRoundWinner(): Display this round's winner to User:
              - If User won, APPEND TO DOM: `You won, Well done. \n Round ${# of current round}: Select your weapon...`
              - If Computer won, APPEND TO DOM: `${computerChoice} beats ${userChoice}, you lost. \n Round ${# of current round}: Select your weapon...`
      - Delay 2 seconds, then:
        - Ask User for their next selection: CALL askUserForWpnChoice(): Display text to User: `Round ${# of current round}: Select your weapon...` 
4. Repeat ROUNDS while userScore < 5
5. When userScore === 5: 
  - CALL displayGameWinner(): Display the result of the game to User and ask to play again
  - wpn buttons deactivated due to conditional logic in their respective event handlers
  - IF User won, APPEND TO DOM: `Congratulations! You won the game!!! \n
  Press 'New Game' to play again...
  - ELSE IF Computer won, APPEND TO DOM: `Sorry, you lost this game. \n
  Press 'New Game' to try again...

Extras:
    - F: playRound(playerSelection) is called by event handler, which passes the selected weapon string (in lower case) as the argument
      - F: randomChoice(): Computer makes a random choice of 'rock', 'paper' or 'scissors', which is stored in the variable computerSelection
      - Returns the array [playerSelection, computerSelection]
    
## TODO:
- Make gameSettingsObj to hold all settings (e.g. userScoreForGameEnd, etc) - to encapsulate those variables
- Remove p elements from text-display-boxes and reassign classes in script.js - bc. textNode will be created & appended by JS anyway
- For each new round, round-number not updating in instructions-box msg
- Only 4 rounds being played
- Old messages accumulating in text-display-boxes at each new round