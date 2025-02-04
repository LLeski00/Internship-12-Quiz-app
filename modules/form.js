import { getTriviaContent } from "./api.js";
import { loadQuiz } from "./quiz.js";

const quizForm = document.querySelector("#quiz-form");
quizForm.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();

    let category = event.target[0].value;
    let difficulty = event.target[1].value;
    let gameType = event.target[2].value;

    let content = await getTriviaContent(category, difficulty, gameType);
    if (content === false) return;

    quizForm.style.display = "none";
    loadQuiz(content);
}

export { handleFormSubmit };
