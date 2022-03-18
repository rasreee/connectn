import React from 'react';

export function Instructions() {
  return (<div className="Instructions">
    <div className="Instructions-container">
      <h2>Instructions</h2>
      <p>The end goal is to create a playable React connect-four. But, one fun wrinkle: this is actually <strong>Connect N</strong>. The player should have the option to play on a board of any dimensions and decide how many in a row constitutes a win.</p>

      <p>The application already provides a very modest onboarding flow for the game (please feel free to modify or improve this as needed, but I would advise not to spend time up-front on this):</p>
      
      <ol>
        <li>Ask for player names</li>
        <li>Ask for board dimensions (default are the classic Connect 4 dimensions, 7 columns x 6 rows)</li>
        <li>Ask for how many in a row to win (default is 4)</li>
      </ol>

      <strong>Your objective is to use this information to:</strong>

      <ol>
        <li>Start the game.</li>
        <li>Build a Connect-4 board with the User's preferred dimensions.</li>
        <li>Alternate turns: Player 1 drops a piece, player 2 drops a piece, etc... until a win or a draw.</li>
        <li>
          <div>Calculate a win:</div>
          <ul>
            <li>A win occurs when either player has x number of pieces in a row in any direction (horizontal, vertical, or diagonal).</li>
            <li>A draw occurs when there are no spots remaining.</li>
          </ul>
        </li>
      </ol>

      <strong>How to Build It</strong>

      <p>We've attempted to ease this challenge by making it directed, so it's suggested you follow the steps below to completion. You can search the project for your next action item by looking for a comment containing <pre style={{ display: 'inline' }}>TODO(#)</pre> where # is the step.</p>

      <p>You shouldn't need to important any additional libraries, but feel free if you so choose to.</p>

      <ol>
        <li>
          Design and implement the game state
          <div><u>Search for:</u> <pre style={{ display: 'inline' }}>TODO(1)</pre></div>
          <div><u>Files to edit:</u> <pre style={{ display: 'inline' }}>src/Game.js</pre></div>
          <ul>
            <li>What pieces are placed on the board and where? Who do they belong to?</li>
            <li>Whose turn is it?</li>
            <li>How do updates to the game info affect the game state?</li>
          </ul>
        </li>
        <li>
          Placing game pieces &amp; checking for a winner
          <div><u>Search for:</u> <pre style={{ display: 'inline' }}>TODO(2)</pre></div>
          <div><u>Files to edit:</u> <pre style={{ display: 'inline' }}>src/Game.js, src/Board.js</pre></div>
          <ul>
            <li>How does the game state change when a piece is placed?</li>
            <li>How do you know if a player has won?</li>
            <li>How do we show the changes to the board?</li>
            <li>Don't forget pieces are supposed to slide down vertically!</li>
          </ul>
        </li>
        <li>
          Styling the board
          <div><u>Search for:</u> <pre style={{ display: 'inline' }}>TODO(3)</pre></div>
          <div><u>Files to edit:</u> <pre style={{ display: 'inline' }}>src/Board.js, src/Board.css</pre></div>
          <ul>
            <li>What does a real connect four board look like? What stylistic changes can you make to mimic it?</li>
            <li>Use your creativity here and try to make it look as great as you can! Although this doesn't affect the functionality of the game, this section is as important as the others.</li>
            <li>Bonus: Since pieces are dropped from the top, how can we animate that? How would gravity affect a still-dropped piece?</li>
          </ul>
        </li>
      </ol>

      <strong>What We’re Looking For</strong>

      <p>These are in order of importance; so spend your time wisely!</p>

      <ol>
        <li>Is it playable?</li>
        <li>How close does the board and pieces reflect the real game?</li>
        <li>How smooth do the pieces animate?</li>
        <li>Is the code well organized, readable, and logical?</li>
        <li>Are all win scenarios accounted for?</li>
        <li>Are the solutions efficient and optimized?</li>
        <li>Is the UI/UX friendly and well thought out?</li>
        <li>How are you managing and passing state?</li>
      </ol>
    </div>
  </div>);
}
