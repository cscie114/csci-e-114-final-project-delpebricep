const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    const { quizId, name, score } = JSON.parse(event.body);

    try {
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const result = await collection.insertOne({ 
            quizId: parseInt(quizId),
            name, 
            score: parseInt(score) 
        });

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
};

module.exports = { handler };