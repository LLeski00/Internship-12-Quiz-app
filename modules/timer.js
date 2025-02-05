import { checkAnswer } from "./quiz.js";

let timeoutId;

function handleUserGuess(event) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        if (confirm("Do you lock in your answer?"))
            checkAnswer(event.target.textContent);
    }, 2000);
}

export { handleUserGuess };
