import { getTriviaContent, quizApi } from "./api.js";
import { loadQuiz } from "./quiz.js";

const quizForm = document.querySelector("#quiz-form");
quizForm.addEventListener("submit", handleFormSubmit);

let category;
let difficulty;
let gameType;

async function handleFormSubmit(event) {
    event.preventDefault();

    category = event.target[0].value;
    difficulty = event.target[1].value;
    gameType = event.target[2].value;
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

function displayForm() {
    quizForm.style.display = "flex";
}

function getCategory() {
    return document.querySelector(`#quiz-category option[value="${category}"]`)
        ?.textContent;
}

function getDifficulty() {
    return document.querySelector(
        `#quiz-difficulty option[value="${difficulty}"]`
    )?.textContent;
}

export { handleFormSubmit, displayForm, getCategory, getDifficulty };
