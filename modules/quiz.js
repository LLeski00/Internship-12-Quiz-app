import { handleUserGuess, startTimer, stopTimer } from "./timer.js";
import { displayForm, getCategory, getDifficulty } from "./form.js";
import { saveResult, hideResults, displayResults } from "./history.js";
import { decodeHtmlEntities } from "./helpers.js";

const quizHTML = document.querySelector(".quiz");
const quizNavHTML = document.querySelector(".quiz-nav");
const quizMainHTML = document.querySelector(".quiz-main");
const startQuizButton = document.querySelector("#start-quiz-button");
const nextQuestionButton = document.querySelector("#next-question-button");
const endQuizButton = document.querySelector("#end-quiz-button");
const backButton = document.querySelector("#back-button");
const question = document.querySelector(".question");
const questionCounter = document.querySelector(".question-counter");
const userScoreHTML = document.querySelector(".user-score");
const answersHtml = document.querySelector(".answers");
const feedbackHTML = document.querySelector(".feedback-message");

startQuizButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", displayQuestion);
endQuizButton.addEventListener("click", endQuiz);
backButton.addEventListener("click", goBack);

let quizContent;
let currentQuestionIdx;
let numOfQuestions;
let userScore;

function loadQuiz(content) {
    quizHTML.style.display = "block";
    startQuizButton.style.display = "block";
    quizContent = content;
    numOfQuestions = quizContent.length;
}

function startQuiz() {
    currentQuestionIdx = 0;
    userScore = 0;
    startQuizButton.style.display = "none";
    hideResults();
    displayQuiz();
}

function displayQuiz() {
    displayQuestion();
    quizNavHTML.style.display = "grid";
    quizMainHTML.style.display = "block";
}

function displayQuestion() {
    feedbackHTML.textContent = "";
    nextQuestionButton.style.display = "none";
    question.innerHTML = quizContent[currentQuestionIdx].question;
    questionCounter.innerHTML = `${currentQuestionIdx + 1} / ${numOfQuestions}`;
    userScoreHTML.textContent = `Score: ${userScore} / ${numOfQuestions}`;
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

function checkAnswer(guess) {
    stopTimer();
    disableAnswersClick();

    if (
        guess ===
        decodeHtmlEntities(quizContent[currentQuestionIdx].correct_answer)
    ) {
        userScore++;
        displayAnswerFeedback(true, guess);
    } else displayAnswerFeedback(false, guess);

    checkEndQuiz();
}

function questionTimeout() {
    disableAnswersClick();
    highlightCorrectAnswer();
    feedbackHTML.textContent = "Time ran out!";
    checkEndQuiz();
}

function disableAnswersClick() {
    answersHtml.childNodes.forEach((answer) => {
        answer.removeEventListener("click", handleUserGuess);
    });
}

function displayAnswerFeedback(isCorrect, answer) {
    highlightCorrectAnswer();

    if (isCorrect) {
        feedbackHTML.textContent = "The answer is correct!";
    } else {
        highlightIncorrectAnswer(answer);
        feedbackHTML.textContent = "The answer is incorrect!";
    }
}

function highlightCorrectAnswer() {
    const correctAnswer = [...document.querySelectorAll(".answers > p")].find(
        (p) =>
            p.textContent ===
            decodeHtmlEntities(quizContent[currentQuestionIdx].correct_answer)
    );
    correctAnswer.style.borderColor = "green";
}

function highlightIncorrectAnswer(answer) {
    const guess = [...document.querySelectorAll(".answers > p")].find(
        (p) => p.textContent === answer
    );
    guess.style.borderColor = "red";
}

function displayScoreFeedback() {
    let score = (userScore / numOfQuestions) * 100;
    let feedbackMessage;

    if (score < 20)
        feedbackMessage =
            "Don’t give up! Mistakes help us learn. Review the material and try again—you can do it!";
    else if (score < 40)
        feedbackMessage =
            "Keep going! You’re getting there. Focus a bit more, and you’ll improve in no time!";
    else if (score < 60)
        feedbackMessage =
            "Nice effort! You’ve got the basics, but there’s room for improvement. Keep practicing!";
    else if (score < 80)
        feedbackMessage =
            "Well done! You're on the right track. A little more effort, and you'll reach the top!";
    else
        feedbackMessage =
            "Great job! You showed outstanding understanding and effort. Keep up the amazing work!";

    feedbackHTML.textContent = `You reached the end of the quiz! Your score: ${score}% ${feedbackMessage}`;
}

function displayNextQuestionButton() {
    currentQuestionIdx++;
    nextQuestionButton.style.display = "block";
}

function checkEndQuiz() {
    if (currentQuestionIdx + 1 === numOfQuestions) displayEndQuizButton();
    else displayNextQuestionButton();
}

function displayEndQuizButton() {
    endQuizButton.style.display = "block";
}

function endQuiz() {
    quizNavHTML.style.display = "none";
    quizMainHTML.style.display = "none";
    nextQuestionButton.style.display = "none";
    endQuizButton.style.display = "none";

    displayScoreFeedback();
    backButton.style.display = "block";

    let category = getCategory();
    let difficulty = getDifficulty();
    saveResult(category, difficulty, (userScore / numOfQuestions) * 100);
}

function goBack() {
    backButton.style.display = "none";
    quizHTML.style.display = "none";
    feedbackHTML.textContent = "";
    displayForm();
    displayResults();
}

export { loadQuiz, checkAnswer, questionTimeout };
