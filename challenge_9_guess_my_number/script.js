"use strict";

let score = 20;
let highScore = 0;
const secretNumber = Math.trunc(Math.random() * 20) + 1;

const displayMsg = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMsg("No number chosen!");
  }
  // when player wins
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number!'
    displayMsg("Correct Number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
    } else {
      highScore;
    }
    document.querySelector(".highscore").textContent = highScore;
  }

  // Refactoring the code - Don't repeat yourself principle
  else if (guess !== secretNumber) {
    // When guess is wrong
    if (score > 1) {
      displayMsg(guess > secretNumber ? "Too High!" : "Too Low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMsg("You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

// again btn
document.querySelector(".again").addEventListener("click", function () {
  // Restoring variables
  score = 20;
  const secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMsg("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".highscore").textContent = highScore;
  // Styling page
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
