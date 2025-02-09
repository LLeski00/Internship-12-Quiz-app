const quizResultsHTML = document.querySelector(".quiz-results");
const resultsHTML = document.querySelector(".results-list");

loadResults();

function loadResults() {
    const results = JSON.parse(localStorage.getItem("results"));

    if (!results) {
        let h3 = document.createElement("h3");
        h3.textContent = "There are no results for now.";
        resultsHTML.appendChild(h3);
        return;
    }

    resultsHTML.innerHTML = "";

    for (const result of results) {
        let p = document.createElement("p");
        p.textContent = `${result.date} - Category: ${result.category} - Difficulty: ${result.difficulty} - Score: ${result.score}%`;
        resultsHTML.appendChild(p);
    }
}

function saveResult(category, difficulty, score) {
    let newResult = {
        date: new Date().toUTCString(),
        category: category,
        difficulty: difficulty,
        score: score,
    };

    let updatedResults = JSON.parse(localStorage.getItem("results"));

    if (!updatedResults)
        localStorage.setItem("results", JSON.stringify([newResult]));
    else {
        updatedResults.unshift(newResult);
        localStorage.setItem("results", JSON.stringify(updatedResults));
    }
    loadResults();
}

function hideResults() {
    quizResultsHTML.style.display = "none";
}

function displayResults() {
    quizResultsHTML.style.display = "block";
}

export { saveResult, hideResults, displayResults };
