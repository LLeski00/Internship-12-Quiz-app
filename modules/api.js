async function getTriviaQuestions(category, difficulty, gameType) {
    let apiUrl = "https://opentdb.com/api.php?amount=5";
    let questions;

    apiUrl = addQueryParameter(apiUrl, category);
    apiUrl = addQueryParameter(apiUrl, difficulty);
    apiUrl = addQueryParameter(apiUrl, gameType);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        questions = json.results;
    } catch (error) {
        console.error(error.message);
    }

    console.log(questions);
}

function addQueryParameter(apiUrl, parameter) {
    if (parameter !== "any") apiUrl += "&" + parameter;

    return apiUrl;
}

export { getTriviaQuestions };
