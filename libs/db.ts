import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://apirak:<password>@cluster0.twenky6.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("yourDatabaseName");
        return database;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateDocument(collectionName: string, filter: any, update: any) {
    const database = await connectToDatabase();
    const collection = database.collection(collectionName);
    try {
        await collection.updateOne(filter, update);
        console.log("Document updated successfully");
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}