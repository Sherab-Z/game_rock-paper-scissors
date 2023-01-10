# Rock Paper Scissors Game

## Overview

- When the user opens a new game (by opening or refreshing the page), the computer makes a random choice of rock, paper or scissors;
- Play a round:
  - prompt the user to make their choice;
  - convert this to lowercase and store in the variable userChoice;
  - compare the user's choice with computer's based on conditional logic and alert user about who is the winner:
    - for each allowed user choice:
      - compare to computerChoice;
      - store the result in the variable roundResult;
      - alert the result of the round to the user;
      - if user's choice is invalid, alert error message to the user;
- Repeat until 5 rounds are completed:
  - store the scores along the way in 2 variables;
  - after the 5th round, compare scores and alert the overall winner to the user;

NOTES:
currently debugging playSingleRound(). It gives a winner, but doesn't return a number (-1, 0, or 1) as expected...?

- use dev tools breakpoints to debug
