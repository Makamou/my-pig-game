'use strict';

//select element using id or class
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // little faster
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

const resetValue = () => {
  scores = [0, 0]; // Array holding score of both player
  currentScore = 0; // Initialize score holder
  activePlayer = 0; // traking player
  playing = true; // Allow to stop playing when winner

  // set player score to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  // Deselect the winner format
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // select player 1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
resetValue();

const switchNextPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // switch the player 0 -> 1 or 1 -> 0
  activePlayer = activePlayer === 0 ? 1 : 0;

  // reset the score
  currentScore = 0;

  // To select the user section use
  player0El.classList.toggle('player--active'); // remove class --active
  player1El.classList.toggle('player--active'); // add class --active
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    const diceImag = './images/dice-' + dice + '.png';
    diceEl.src = diceImag; // updating the right dice in the page

    // 3. Check for rolled: if true
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // ---------------refactor outside as a function----------------------
      //switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0El.classList.toggle('player--active'); //can also use remove
      // player1El.classList.toggle('player--active'); // and add
      switchNextPlayer();
    }
  }
});

// Holding the value by adding to current player score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; //scores[1]=scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false; // deactivate game
      diceEl.classList.add('hidden');

      // format winner section
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document

        // Remove select format
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch next player
      switchNextPlayer();
    }
  }
});

//reset
btnNew.addEventListener('click', resetValue);
/*
  // activate game
  playing = true;

  // Deselect the winner format
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // setting player and current score in both player
  for (let i = 0; i < scores.length; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
  }

  if (activePlayer === 1) {
    // select player 1
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    player0El.classList.add('player--active');
  }
  activePlayer = 0;
  currentScore = 0;
  // set player score to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];

  */

//   resetValue();
// });
