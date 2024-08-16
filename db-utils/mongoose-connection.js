import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Retrieve MongoDB credentials from environment variables
const dbName = process.env.DB_NAME || "RUTHRA";
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";

// Construct connection URLs
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// Log the connection URL to verify it is correct
console.log('Mongoose Cloud URL:', cloudUrl);

// Use cloudUrl if running in a cloud environment
const connectionUrl = process.env.USE_CLOUD_DB === "true" ? cloudUrl : `mongodb://${dbUrl}/${dbName}`;

// Connect to MongoDB
const connectToDb = async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose DB Connected Successfully");
  } catch (e) {
    console.error("Error connecting to database with Mongoose", e);
    process.exit(1);
  }
};

export default connectToDb;
