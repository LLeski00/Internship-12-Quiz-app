import { getTriviaContent, quizApi } from "./api.js";
import { loadQuiz } from "./quiz.js";

const quizForm = document.querySelector("#quiz-form");
quizForm.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();

    let category = event.target[0].value;
    let difficulty = event.target[1].value;
    let gameType = event.target[2].value;
    let apiUrl = quizApi;
    apiUrl = addQueryParameter(apiUrl, category);
    apiUrl = addQueryParameter(apiUrl, difficulty);
    apiUrl = addQueryParameter(apiUrl, gameType);

    let content = await getTriviaContent(apiUrl);
    if (content === false) return;

    quizForm.style.display = "none";
    loadQuiz(content);
}

function addQueryParameter(apiUrl, parameter) {
    if (parameter !== "any") apiUrl += "&" + parameter;

    return apiUrl;
}

export { handleFormSubmit };
