import { handleUserGuess } from "./timer.js";

const startQuizButton = document.querySelector("#start-quiz-button");
const nextQuestionButton = document.querySelector("#next-question-button");
const endQuizButton = document.querySelector("#end-quiz-button");
const question = document.querySelector(".question");
const questionCounter = document.querySelector(".question-counter");
const answersHtml = document.querySelector(".answers");
const feedbackMessage = document.querySelector(".feedback-message");

startQuizButton.addEventListener("click", displayQuestion);
nextQuestionButton.addEventListener("click", displayQuestion);
endQuizButton.addEventListener("click", endQuiz);

let quizContent;
let currentQuestionIdx = 0;
let numOfQuestions;
let userScore = 0;

function loadQuiz(content) {
    startQuizButton.style.display = "block";
    quizContent = content;
    numOfQuestions = quizContent.length;
}

function displayQuestion() {
    feedbackMessage.textContent = "";
    nextQuestionButton.style.display = "none";
    question.innerHTML = quizContent[currentQuestionIdx].question;
    questionCounter.innerHTML = `${currentQuestionIdx + 1} / ${numOfQuestions}`;
    let numOfAnswers =
        quizContent[currentQuestionIdx].incorrect_answers.length + 1;
    createAnswers(numOfAnswers);
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

function endQuiz() {
    questionCounter.style.display = "none";
    question.style.display = "none";
    answersHtml.style.display = "none";
    nextQuestionButton.style.display = "none";
    endQuizButton.style.display = "none";

    feedbackMessage.textContent = `You reached the end of the quiz! Your score: ${userScore} / ${numOfQuestions}`;
}

export { loadQuiz, checkAnswer };
