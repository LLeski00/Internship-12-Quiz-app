const quizApi = "https://opentdb.com/api.php?amount=5";

async function getTriviaContent(apiUrl) {
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

export { getTriviaContent, quizApi };
