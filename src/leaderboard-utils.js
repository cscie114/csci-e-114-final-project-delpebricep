const BASE_URL = "/.netlify/functions/quiz-scores";
const BASE_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
};
const DEFAULT_LIMIT = 10;


// Fetches leaderboard scores for a quiz via a Netlify function
export async function getLeaderboardScores(quizId, limit=DEFAULT_LIMIT) {
    // Setup query params
    const params = new URLSearchParams({ quizId, limit });

    // Build the request and fetch.
    const queryString = params.toString();
    const requestUrl = `${BASE_URL}?${queryString}`;

    const response = await fetch(requestUrl, { 
        method: "GET",
        headers: BASE_HEADERS
    });
    const results = await response.json();

    // Throw error's response if request fails
    if (!response.ok) {
        throw results;
    }
    
    return results;
}


// Posts a leaderboard score for a quiz via a Netlify function
export async function postLeaderboardScore(quizId, { name, score, grade, percentage }) {
    // Wait for data to be sent to the serverless function
    const response = await fetch("/.netlify/functions/quiz-scores", {
        method: "POST",
        body: JSON.stringify({
            quizId,
            name,
            score,
            grade,
            percentage
        }),
        headers: { "Content-Type": "application/json" }
    });
    const results = await response.json();

    // Throw the response's error text if request fails
    if (!response.ok) {
        throw results;
    }
        
    return results;
}
