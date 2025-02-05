import { checkAnswer } from "./quiz.js";

let timeoutId;

function handleUserGuess(event) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        checkAnswer(event.target.textContent);
    }, 2000);
}

export { handleUserGuess };
