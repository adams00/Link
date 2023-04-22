const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = 'mongodb://database:27017/link';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        await client.db('link').collection('translations').createIndex({ word: 1 })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run()

async function addTestDocument(document) {
    await client.connect();
    const response = await client.db('test').collection('testowa').insertOne(document);
    await client.close();
    return response;
}

async function getTestDocument() {
    await client.connect();
    const response = await client.db('test').collection('testowa').findOne({ _id: 8 });
    await client.close();
    return response;
}

async function getTranslationFromDatabase(word) {
    await client.connect();
    const response = await client.db('link').collection('translations').findOne({ word });
    await client.close();
    return response;
}

async function addTranslationToDatabase(translationObject) {
    await client.connect();
    const response = await client.db('link').collection('translations').insertOne(translationObject);
    await client.close();
    return response;
}


module.exports = { addTestDocument, getTestDocument, getTranslationFromDatabase, addTranslationToDatabase };