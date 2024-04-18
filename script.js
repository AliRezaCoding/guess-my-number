'use strict';

const inputGuess = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const labelMessage = document.querySelector('.message');
const labelScore = document.querySelector('.score');
const labelHighscore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const body = document.querySelector('body');


let score = 20;
let highscore = 0;
let secretNumber = Math.trunc((Math.random() * 20) + 1);

const displayMessage = function (msg) {
    labelMessage.textContent = msg;
}


// Event Handlers 
const checkInput = function () {
    const guess = Number(inputGuess.value);
    
    // When there is no input
    if (!guess) {
        displayMessage('⛔ No Number!');
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number');

        // Revealing secret number
        number.textContent = secretNumber;
        number.style.width = '30rem';


        body.style.background = '#60b347';

        if (score > highscore) {
            highscore = score;
            labelHighscore.textContent = highscore;
        }
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
            score--;
            labelScore.textContent = score;
        } else {
            displayMessage('You Lost The Game 💥');
            score = 0;
            labelScore.textContent = score;
        }
    }
};

const resetGame = function () {
    score = 20;
    labelScore.textContent = score;
    secretNumber = Math.trunc((Math.random() * 20) + 1);

    displayMessage('Start Guessing...');
    number.textContent = '?';
    inputGuess.value = '';

    body.style.backgroundColor = '#222';
    number.style.width = '15rem';
}


// Event Listeners
btnCheck.addEventListener('click', checkInput);
btnAgain.addEventListener('click', resetGame);




const checkKey = function (e) {
    if (e.key === 'Enter') checkInput();
};

inputGuess.addEventListener('focus', function () {
    inputGuess.addEventListener('keydown', checkKey);
});
inputGuess.addEventListener('blur', function(){
    inputGuess.removeEventListener('keydown', checkKey);
});