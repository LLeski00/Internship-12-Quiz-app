const quizForm = document.querySelector("#quiz-form");
quizForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    let category = event.target[0].value;
    let difficulty = event.target[1].value;
    let gameType = event.target[2].value;

    console.log(category, difficulty, gameType);
}

export { handleFormSubmit };
