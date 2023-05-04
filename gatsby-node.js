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

const fetchExternalQuestions = async function ({ categories, difficulties, limit }) {
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



exports.onCreateNode = async ({ actions, node, createNodeId, createContentDigest }) => {
    if (node.internal.type !== "QuizDataJson") {
        return;
    }

    const { createNode } = actions;

    const { quizId, name, description, slug, difficulty, apiParams } = node;

    let questions = await fetchExternalQuestions(apiParams);

    createNode({
        id: createNodeId(`quiz-${quizId}`),
        quizId,
        name,
        description,
        slug,
        difficulty,
        questions,
        length: questions.length,

        parent: node.id,
        children: [],
        internal: {
            type: 'quiz',
            contentDigest: createContentDigest(node)
        }
    });

};



exports.onCreateWebpackConfig = ({ loaders, actions, getConfig }) => {
    // Source: https://stackoverflow.com/questions/68162448/how-to-use-a-custom-webpack-loader-in-gatsby-js
    const config = getConfig();

    config.module.rules.find(
        (rule) =>
            rule.test &&
            rule.test.toString() ===
            "/\\.(mp4|webm|ogv|wav|mp3|m4a|aac|oga|flac)$/"
    ).test = /\.(mp4|webm|ogv|mp3|m4a|aac|oga|flac)$/;

    config.module.rules.push({
        test: /\.ogg$/,
        use: [loaders.url()]
    });

    config.module.rules.push({
        test: /\.wav$/,
        use: [
            {
                ...loaders.url(),
                options: {
                    ...loaders.url().options,
                    limit: false
                }
            }
        ]
    });

    actions.replaceWebpackConfig(config);
}