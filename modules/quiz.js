const startQuizButton = document.querySelector("#start-quiz-button");
const question = document.querySelector(".question");
const questionCounter = document.querySelector(".question-counter");
const answersHtml = document.querySelector(".answers");
startQuizButton.addEventListener("click", displayQuestion);

let quizContent;
let currentQuestionIdx = 0;
let numOfQuestions;

function loadQuiz(content) {
    startQuizButton.style.display = "block";
    quizContent = content;
    numOfQuestions = quizContent.length;
}

function displayQuestion() {
    question.innerHTML = quizContent[currentQuestionIdx].question;
    questionCounter.innerHTML = `${currentQuestionIdx + 1} / ${numOfQuestions}`;
    let numOfAnswers =
        quizContent[currentQuestionIdx].incorrect_answers.length + 1;
    createAnswers(numOfAnswers);
}

function createAnswers(numOfAnswers) {
    answersHtml.innerHTML = "";
    let answers = [];

    for (let index = 0; index < numOfAnswers - 1; index++)
        answers.push(quizContent[currentQuestionIdx].incorrect_answers[index]);

    let correct_answer = quizContent[currentQuestionIdx].correct_answer;
    let randomIdx = Math.floor(Math.random() * numOfAnswers);
    answers.splice(randomIdx, 0, correct_answer);
    answersHtml.innerHTML = answers.map((p) => `<p>${p}</p>`).join("");
    answersHtml.childNodes.forEach((answer) => {
        answer.addEventListener("click", checkAnswer);
    });
}

function checkAnswer(event) {
    let guessedAnswer = event.target.textContent;
    if (guessedAnswer === quizContent[currentQuestionIdx].correct_answer)
        console.log("Correct");
}

export { loadQuiz };
