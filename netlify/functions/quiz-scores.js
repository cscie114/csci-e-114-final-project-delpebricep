/*
    NETLIFY SERVERLESS FUNCTIONS
    These handle submitting and querying leaderboards for each quiz.
    Score information is stored on a MongoDB database.

    This was accomplished using the following MongoDB guide:
    https://www.mongodb.com/developer/languages/javascript/developing-web-application-netlify-serverless-functions-mongodb/
*/

// MongoDB setup
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();
mongoClient.close();

// Default number of scores to return
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// Given a quiz ID, fetches the top N scores for that quiz
async function getScores(database, { quizId, limit = DEFAULT_LIMIT }) {
    // Don't let the limit go over 100
    if (limit > 100) {
        limit = MAX_LIMIT;
    }

    // Find the quiz with that ID and return every item associated with it.
    // We do not need the "_id" property.
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const results = await collection.find(
        { quizId: parseInt(quizId) }, 
        { _id: 0 }
    )
    // Sort by score (descending) and return only N records.
    .sort('score', -1).limit(limit).toArray();

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
}

/* 
    Given a quiz ID, name, score, and letter, 
    this function posts the latter three as to that quiz's leaderboard.
*/
async function postScore(database, { quizId, name, score, grade, percentage }) {
    // Insert a new record to the database.
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const result = await collection.insertOne({
        quizId: parseInt(quizId),
        name,
        score: parseInt(score),
        grade,
        percentage
    });

    // No name? Return an error.
    if (!name) {
        return {
            statusCode: 400,
            body: JSON.stringify("Please enter a name when submitting a score.")
        }
    }

    return {
        statusCode: 201,
        body: JSON.stringify(result),
    };
}


// The Netlify function's request handler
const handler = async (event) => {
    const { httpMethod } = event;

    try {
        // Connect to MongoDB
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);

        // If it's a GET, we're querying records.
        if (httpMethod === "GET") {
            const { quizId, limit = DEFAULT_LIMIT } = event.queryStringParameters;
            return getScores(database, { quizId, limit });
        }
        
        // If it's a POST, we're posting a new record.
        if (httpMethod === "POST") {
            const { quizId, name, score, grade, percentage } = JSON.parse(event.body);
            return postScore(database, { quizId, name, score, grade, percentage })
        }
        
        // PATCH, PUT, and DELETE are not allowed.
        return { statusCode: 405, body: "This method is not allowed." };
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
};

module.exports = { handler };