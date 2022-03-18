# Clockwise Code Challenge

Hey, thanks for your interest in Clockwise! This should be a fun little challenge.

## Geting Started

This repo itself is a nice little shell of a React application with a simple, but complete dev environment based off the great [react-create-app project](https://github.com/facebookincubator/create-react-app) (also has docs on this setup, if you want more info).

If you don't have it already, you'll need Node.js installed on your machine. [Download here](https://nodejs.org/en/).

**tl;dr**

```
cd [this_repo]/
npm install
npm start
```

Now the app is running in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will see the build errors and lint warnings in the console.

Open the code in your favorite editor and start building!


## Coding Challenge Instructions

### What You’re Building

![connect_four](https://upload.wikimedia.org/wikipedia/commons/a/ad/Connect_Four.gif)

The end goal is to create a playable React connect-four. But, one fun wrinkle: this is actually **Connect N**. The player should have the option to play on a board of any dimensions and decide how many in a row constitutes a win**.

The application already provides a very modest onboarding flow for the game (please feel free to modify or improve this as needed, but I would advise not to spend time up-front on this):

1. Ask for player names
1. Ask for board dimensions (default are the classic Connect 4 dimensions, 7 columns x 6 rows)
1. Ask for how many in a row to win (default is 4)


Your objective is to use this information to:

1. Start the game.
1. Build a Connect-4 board with the User's preferred dimensions.
1. Alternate turns: Player 1 drops a piece, player 2 drops a piece, etc... until a win or a draw.
1. Calculate a win:
    * A win occurs when either player has x number of pieces in a row in any direction (horizontal, vertical, or diagonal).
    * A draw occurs when there are no spots remaining.

### How to Build It

* Commit early and often
* Build it as a React app
* Style it from scratch, without using something like bootstrap
* Try to keep all client state in a centralized location. No need to use a state store like Redux (although you can if you want); a simple object is fine.


### How to Build It

We've attempted to ease this challenge by making it directed, so it's suggested you follow the steps below to completion. You can search the project for your next action item by looking for a comment containing `TODO(#)` where # is the step.

You shouldn't need to important any additional libraries, but feel free if you so choose to.

1. Design and implement the game state
   __Search for:__ `TODO(1)`
   __Files to edit:__ `src/Game.js`
   1. What pieces are placed on the board and where? Who do they belong to?
   1. Whose turn is it?
   1. How do updates to the game info affect the game state?
1. Placing game pieces &amp; checking for a winner
   __Search for:__ `TODO(2)`
   __Files to edit:__ `src/Game.js, src/Board.js`
   1. How does the game state change when a piece is placed?
   1. How do you know if a player has won?
   1. How do we show the changes to the board?
   1. Don't forget pieces are supposed to slide down vertically!
1. Styling the board
   __Search for:__ `TODO(1)`
   __Files to edit:__ `src/Board.js, src/Board.css`
   1. What does a real connect four board look like? What stylistic changes can you make to mimic it?
   1. Since pieces are dropped from the top, how can we animate that? How would gravity affect a still-dropped piece?
   1. Use your creativity here and try to make it look as great as you can! Although this doesn't affect the functionality of the game, this section is as important as the others.

### What We’re Looking For

These are in order of importance; so spend your time wisely!

1. Is it playable?
1. Are the solutions efficient and optimized?
1. How close does the board and pieces reflect the real game?
1. How smooth do the pieces animate?
1. Is the code well organized, readable, and logical?
1. Are all win scenarios accounted for?
1. Is the UI/UX friendly and well thought out?
1. How are you managing and passing state?
