const { MongoClient } = require("mongodb");

const DEFAULT_LIMIT = 20;

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

async function getScores(database, { quizId, limit = DEFAULT_LIMIT }) {
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const results = await collection.find(
        { quizId: parseInt(quizId) }, 
        { _id: 0 }
    ).sort('score', -1).limit(limit).toArray();

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
}

async function postScore(database, {quizId, name, score}) {
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const result = await collection.insertOne({
        quizId: parseInt(quizId),
        name,
        score: parseInt(score)
    });

    return {
        statusCode: 201,
        body: JSON.stringify(result),
    };
}

const handler = async (event) => {
    const { httpMethod } = event;

    try {
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);

        if (httpMethod === "GET") {
            const { quizId, limit = DEFAULT_LIMIT } = event.queryStringParameters;
            return getScores(database, { quizId, limit });
        } else if (httpMethod === "POST") {
            const { quizId, name, score } = JSON.parse(event.body);
            return postScore(database, { quizId, name, score })
        } else {
            return { statusCode: 405, body: "This method is not allowed." };
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
};

module.exports = { handler };