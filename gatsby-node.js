require("dotenv").config({
    path: `.env`,
});

const EleventyFetch = require("@11ty/eleventy-fetch");

// JSON DATA IMPORT
const ALL_CATEGORIES = require("./data/categories.json");
const DEFAULT_CATEGORY_INDEX = 0;

// REQUEST CONSTANTS
const BASE_URL = "https://the-trivia-api.com/v2/questions";
const BASE_HEADERS = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
};
const CACHE_DIRECTORY = ".11ty-cache";
const CACHE_DURATION = "1d";


// Queries The Trivia API for collections of trivia questions to add to the site.
const fetchExternalQuestions = async function ({ categories, difficulties, limit }) {
    // Query params are the limit and lists of categories/difficulty levels
    const params = new URLSearchParams({
        categories: categories.join(','),
        difficulties: difficulties.join(','),
        limit
    });

    // Build the request and fetch.
    const queryString = params.toString();
    const requestUrl = `${BASE_URL}?${queryString}`;

    let questionData = [];

    try {
        questionData = await EleventyFetch(requestUrl, {
            directory: CACHE_DIRECTORY,
            duration: CACHE_DURATION,
            type: "json",
            fetchOptions: {
                method: "GET",
                headers: BASE_HEADERS
            }
        });
        
        // Augment each piece of data received:
        questionData = questionData.map(item => {
            const { category: categoryId, question: {text}, correctAnswer, incorrectAnswers, isNiche } = item;
    
            // Map the question's category to its full information in the JSON file
            let fullCategory = ALL_CATEGORIES[DEFAULT_CATEGORY_INDEX];
            for (const _category of ALL_CATEGORIES) {
                if (categoryId === _category.categoryId) {
                    fullCategory = _category;
                    break; 
                }
            }
    
            // Change answers from strings to objects with their text and correct status
            let answers = [
                ...incorrectAnswers.map(text => ({ text, isCorrect: false })),
                { text: correctAnswer, isCorrect: true }
            ];
            
            // Return a new object with this information
            return {
                category: fullCategory,
                text,
                answers,
                isNiche
            };
        });
    } catch (error) {
        // Return an empty array if something goes wrong
        console.error(error);
        console.log("ERROR: Could not fetch questions from The Trivia API.");

        return [];
    }

    // Final result should be an array of questions
    return questionData;
};


exports.onCreateNode = async ({ actions, node, createNodeId, createContentDigest }) => {
    // This is a special procedure for quiz JSON data ONLY.
    // We're putting it here because onCreateNode is called while Gatsby creates a GraphQL data node.
    if (node.internal.type !== "QuizDataJson") {
        return;
    }

    const { createNode } = actions;

    // Extract node data.
    const { quizId, name, date, description, slug, difficulty, music, apiParams } = node;

    // Use the node's API parameters to fetch questions from the Trivia API.
    let questions = await fetchExternalQuestions(apiParams);

    // Use that data to create a new kind of node with a type called "quiz".
    createNode({
        id: createNodeId(`quiz-${quizId}`),
        quizId,
        name,
        date,
        description,
        slug,
        difficulty,
        questions,
        length: questions.length,

        music,

        parent: node.id,
        children: [],
        internal: {
            type: 'quiz',
            contentDigest: createContentDigest(node)
        }
    });

};


// Special procedure for handling OGG and WAV files for music and sounds.
// Requires modifying how the "gatsby-source-filesystem" plugin uses Webpack to process resources.
exports.onCreateWebpackConfig = ({ loaders, actions, getConfig }) => {
    // I made use of a StackOverflow resource to accomplish this.
    // Source: https://stackoverflow.com/questions/68162448/how-to-use-a-custom-webpack-loader-in-gatsby-js
    const config = getConfig();

    // Find the Webpack rule that processes audio.
    const audioRegexTest = "/\\.(mp4|webm|ogv|wav|mp3|m4a|aac|oga|flac)$/"

    // Change that rule to not care about WAV files.
    config.module.rules.find((rule) => rule.test && rule.test.toString() === audioRegexTest).test = /\.(mp4|webm|ogv|mp3|m4a|aac|oga|flac)$/;

    // Add a new rule to load OGG files.
    config.module.rules.push({
        test: /\.ogg$/,
        use: [loaders.url()]
    });

    // Add a new rule to load WAV files by URL only (not data URL).
    // Our WAV files are small and Howler (our sound module) does not work with data URLs.
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

    // Use this new config.
    actions.replaceWebpackConfig(config);
}