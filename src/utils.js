require("dotenv").config();

const EleventyFetch = require("@11ty/eleventy-fetch");


// REQUEST CONSTANTS
const BASE_URL = "https://the-trivia-api.com/v2/questions";
const BASE_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
};
const CACHE_DIRECTORY = ".11ty-cache";
const CACHE_DURATION = "1d";



exports.sleep = function () {
    return new Promise(resolve => setTimeout(resolve, time));
};

// exports.shuffle = function(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

//         // swap elements array[i] and array[j]
//         // we use "destructuring assignment" syntax to achieve that
//         // you'll find more details about that syntax in later chapters
//         // same can be written as:
//         // let t = array[i]; array[i] = array[j]; array[j] = t
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// };

exports.fetchExternalQuestions = async function ({ categories, difficulties, limit }) {
    const params = new URLSearchParams({
        categories: categories.join(','),
        difficulties: difficulties.join(','),
        limit
    });

    const queryString = params.toString();
    const requestUrl = `${BASE_URL}?${queryString}`;

    let questionData = await EleventyFetch(requestUrl, {
        directory: CACHE_DIRECTORY,
        duration: CACHE_DURATION,
        type: "json",
        fetchOptions: {
            method: "GET",
            headers: BASE_HEADERS
        }
    });

    questionData = questionData.map(item => {
        const { category, question: {text}, correctAnswer, incorrectAnswers, isNiche } = item;

        let answers = [
            ...incorrectAnswers.map(text => ({ text, isCorrect: false })),
            { text: correctAnswer, isCorrect: true }
        ];
        
        return {
            category,
            text,
            answers,
            isNiche
        };
    });

    return questionData;
};

