import { checkAnswer } from "./quiz.js";

const timerHTML = document.querySelector(".timer");

let timeoutId;
let timerId;
let timer;
const timeout = 20;

//TODO - Think about the situation where the user choses an answer 1s before the timeout
function handleUserGuess(event) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        if (confirm("Do you lock in your answer?"))
            checkAnswer(event.target.textContent);
    }, 2000);
}

function startTimer() {
    stopTimer();

    timer = timeout;
    timerHTML.textContent = timer;

    timerId = setInterval(() => {
        if (timer - 1 === 0) {
            timer = 0;
            timerHTML.textContent = timer;
            clearInterval(timerId);
            checkAnswer(false);
        } else {
            timer--;
            timerHTML.textContent = timer;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

export { handleUserGuess, startTimer, stopTimer, timerHTML };
