import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Retrieve MongoDB credentials from environment variables
const dbUrl = process.env.DB_URL || " ";
const dbName = process.env.DB_NAME || "RUTHRA";
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";

// Log environment variables to verify they are loaded correctly
// console.log('DB Username:', dbUsr);
// console.log('DB Password:', dbPassword);
// console.log('DB Cluster:', dbCluster);

// Construct connection URLs
const localUrl = `mongodb://${dbUrl}`;
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/?retryWrites=true&w=majority&appName=Cluster0`;

// Log the connection URLs to verify they are correct
console.log('Local URL:', localUrl);
console.log('Cloud URL:', cloudUrl);

// Use cloudUrl if running in a cloud environment, otherwise localUrl
const connectionUrl = process.env.USE_CLOUD_DB === "true" ? cloudUrl : localUrl;

// Create a MongoClient instance
const client = new MongoClient(connectionUrl);

// Select a database
const db = client.db(dbName);

// Asynchronous function to connect to the database
const connectToDb = async () => {
  try {
    await client.connect();
    console.log("DB Connected Successfully");
  } catch (e) {
    console.error("Error connecting to database", e);
    process.exit(1);
  }
};

export { db, client };
export default connectToDb;
