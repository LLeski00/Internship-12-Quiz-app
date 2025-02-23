import { checkAnswer, questionTimeout } from "./quiz.js";

const timerHTML = document.querySelector(".timer");

let timeoutId;
let timerId;
let timer;
let guess;
const timeout = 20;

function handleUserGuess(event) {
    clearTimeout(timeoutId);
    guess = event.target.textContent;
    timeoutId = setTimeout(() => {
        confirmGuess();
        guess = "";
    }, 2000);
}

function startTimer() {
    stopTimer();
    timer = timeout;
    timerHTML.textContent = timer;
    timerId = setInterval(() => {
        if (timer === 1) {
            handleQuestionTimeout();
            guess = "";
        } else {
            timer--;
            timerHTML.textContent = timer;
        }
    }, 1000);
}

function handleQuestionTimeout() {
    clearTimeout(timeoutId);
    timer = 0;
    timerHTML.textContent = timer;
    stopTimer();
    if (!guess) questionTimeout();
    else {
        if (!confirmGuess()) questionTimeout();
    }
}

function stopTimer() {
    clearInterval(timerId);
}

function confirmGuess() {
    if (confirm("Do you lock in your answer?")) {
        checkAnswer(guess);
        return true;
    }

    return false;
}

export { handleUserGuess, startTimer, stopTimer };
