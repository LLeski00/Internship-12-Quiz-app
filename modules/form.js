import { getTriviaQuestions } from "./api.js";
import { loadQuiz } from "./quiz.js";

const quizForm = document.querySelector("#quiz-form");
quizForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    let category = event.target[0].value;
    let difficulty = event.target[1].value;
    let gameType = event.target[2].value;

    let questions = getTriviaQuestions(category, difficulty, gameType);
    if (questions === false) return;

    quizForm.style.display = "none";
    loadQuiz(questions);
}

export { handleFormSubmit };
