import { MongoClient, ObjectId } from "mongodb";

// Define the schema for a message
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// Define the schema for the document that will be stored in MongoDB
interface Document {
  messages: Message[];
}

// MongoDB connection string
const MONGO_URL: string = process.env.MONGO_URL ?? "";

// Database and collection names
const dbName = process.env.MONGO_DB_NAME ?? "";
const collectionName = process.env.MONGO_COLLECTION_NAME ?? "";

// Create a new MongoClient
const client = new MongoClient(MONGO_URL);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to database");
    return client.db(dbName).collection<Document>(collectionName);
  } catch (error) {
    console.error("Connection to database failed:", error);
    throw error;
  }
}

export async function insertDocument(document: Document) {
  const collection = await connectToDatabase();
  return await collection.insertOne(document);
}

export async function findDocuments(filter: Partial<Document> = {}) {
  const collection = await connectToDatabase();
  return await collection.find(filter).toArray();
}

export async function updateDocument(
  documentId: string,
  update: Partial<Document>
) {
  const collection = await connectToDatabase();
  return await collection.updateOne(
    { _id: new ObjectId(documentId) },
    { $set: update }
  );
}

export async function deleteDocument(documentId: string) {
  const collection = await connectToDatabase();
  return await collection.deleteOne({ _id: new ObjectId(documentId) });
}
