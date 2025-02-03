function getTriviaQuestions(category, difficulty, gameType) {
    let apiUrl = "https://opentdb.com/api_config.php?amount=5";

    apiUrl = addQueryParameter(apiUrl, category);
    apiUrl = addQueryParameter(apiUrl, difficulty);
    apiUrl = addQueryParameter(apiUrl, gameType);

    console.log(apiUrl);
}

function addQueryParameter(apiUrl, parameter) {
    if (parameter !== "any") apiUrl += "&" + parameter;

    return apiUrl;
}

export { getTriviaQuestions };
