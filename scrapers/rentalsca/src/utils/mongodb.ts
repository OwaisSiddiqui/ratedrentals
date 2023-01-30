import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const URI: undefined | string = process.env.MONGODB_RATEDRENTALS_URI;
  if (!URI) {
    throw new Error(
      "Please define the MONGODB_RATEDRENTALS_URI environment variable inside .env"
    );
  }
  const dbName: undefined | string = process.env.MONGODB_RATEDRENTALS_DB_NAME;
  if (!dbName) {
    throw new Error(
      "Please define the MONGODB_RATEDRENTALS_DB_NAME environment variable inside .env"
    );
  }

  const client = await MongoClient.connect(URI);
  const db = client.db(dbName);

  return { client, db };
};
