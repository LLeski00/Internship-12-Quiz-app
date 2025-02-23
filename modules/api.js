const numOfQuestions = 5;
const quizApi = `https://opentdb.com/api.php?amount=${numOfQuestions}`;

async function getTriviaContent(category, difficulty, gameType) {
    let apiUrl = quizApi;
    apiUrl = addQueryParameter(apiUrl, category);
    apiUrl = addQueryParameter(apiUrl, difficulty);
    apiUrl = addQueryParameter(apiUrl, gameType);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json.results;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

function addQueryParameter(apiUrl, parameter) {
    if (parameter !== "any") apiUrl += "&" + parameter;

    return apiUrl;
}

export { getTriviaContent };
