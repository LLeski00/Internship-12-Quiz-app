const startQuizButton = document.querySelector("#start-quiz-button");
startQuizButton.addEventListener("click", handleStartQuizClick);

let quizQuestions;
let currentQuestion = 0;
let numOfQuestions;

function loadQuiz(questions) {
    startQuizButton.style.display = "block";
    quizQuestions = questions;
    numOfQuestions = quizQuestions.length;
}

function handleStartQuizClick() {
    console.log("Quiz started");
}

export { loadQuiz };
