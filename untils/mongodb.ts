import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://apirak:<password>@cluster0.twenky6.mongodb.net/?retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
