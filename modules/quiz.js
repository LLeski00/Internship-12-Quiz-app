import { handleUserGuess, startTimer, stopTimer, timerHTML } from "./timer.js";
import { displayForm, getCategory, getDifficulty } from "./form.js";
import { saveResult } from "./history.js";

const startQuizButton = document.querySelector("#start-quiz-button");
const nextQuestionButton = document.querySelector("#next-question-button");
const endQuizButton = document.querySelector("#end-quiz-button");
const backButton = document.querySelector("#back-button");
const question = document.querySelector(".question");
const questionCounter = document.querySelector(".question-counter");
const answersHtml = document.querySelector(".answers");
const feedbackMessage = document.querySelector(".feedback-message");

startQuizButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", displayQuestion);
endQuizButton.addEventListener("click", endQuiz);
backButton.addEventListener("click", goBack);

let quizContent;
let currentQuestionIdx;
let numOfQuestions;
let userScore;

function loadQuiz(content) {
    startQuizButton.style.display = "block";
    quizContent = content;
    numOfQuestions = quizContent.length;
}

function startQuiz() {
    startQuizButton.style.display = "none";
    currentQuestionIdx = 0;
    userScore = 0;
    displayQuestion();
    questionCounter.style.display = "block";
    timerHTML.style.display = "block";
    question.style.display = "block";
    answersHtml.style.display = "block";
}

function displayQuestion() {
    feedbackMessage.textContent = "";
    nextQuestionButton.style.display = "none";
    question.innerHTML = quizContent[currentQuestionIdx].question;
    questionCounter.innerHTML = `${currentQuestionIdx + 1} / ${numOfQuestions}`;
    let numOfAnswers =
        quizContent[currentQuestionIdx].incorrect_answers.length + 1;
    createAnswers(numOfAnswers);
    startTimer();
}

function createAnswers(numOfAnswers) {
    let answers = [];

    for (let index = 0; index < numOfAnswers - 1; index++)
        answers.push(quizContent[currentQuestionIdx].incorrect_answers[index]);

    let correct_answer = quizContent[currentQuestionIdx].correct_answer;
    let randomIdx = Math.floor(Math.random() * numOfAnswers);
    answers.splice(randomIdx, 0, correct_answer);
    displayAnswers(answers);
}

function displayAnswers(answers) {
    answersHtml.innerHTML = answers.map((p) => `<p>${p}</p>`).join("");
    answersHtml.childNodes.forEach((answer) => {
        answer.addEventListener("click", handleUserGuess);
    });
}

//TODO - Improve so there are custom feedback messages for instance when the timer runs out
function checkAnswer(guess) {
    stopTimer();

    if (guess === quizContent[currentQuestionIdx].correct_answer) {
        userScore++;
        displayAnswerFeedback(true);
    } else displayAnswerFeedback(false);

    //TODO - disableAnswersClick();
    //TODO - Show correct answer
    if (currentQuestionIdx + 1 === numOfQuestions) displayEndQuizButton();
    else displayNextQuestionButton();
}

function displayAnswerFeedback(isCorrect) {
    if (isCorrect) feedbackMessage.textContent = "The answer is correct!";
    else feedbackMessage.textContent = "The answer is incorrect!";
}

function displayNextQuestionButton() {
    currentQuestionIdx++;
    nextQuestionButton.style.display = "block";
}

function displayEndQuizButton() {
    endQuizButton.style.display = "block";
}

//TODO - Maybe change the HTML so you can display none only one thing and everything dissapears at once
function endQuiz() {
    questionCounter.style.display = "none";
    timerHTML.style.display = "none";
    question.style.display = "none";
    answersHtml.style.display = "none";
    nextQuestionButton.style.display = "none";
    endQuizButton.style.display = "none";

    feedbackMessage.textContent = `You reached the end of the quiz! Your score: ${
        (userScore / numOfQuestions) * 100
    }%`;
    backButton.style.display = "block";

    let category = getCategory();
    let difficulty = getDifficulty();
    saveResult(category, difficulty, (userScore / numOfQuestions) * 100);
}

function goBack() {
    backButton.style.display = "none";
    feedbackMessage.textContent = "";
    displayForm();
    startQuizButton.style.display = "none";
}

export { loadQuiz, checkAnswer };
