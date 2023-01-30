import { MongoClient } from "mongodb";
import { ListingsURLs } from "rentalsca";
import { connectToDatabase } from "./utils/mongodb";

export const getAvailableURLsFromDatabase = async (): Promise<ListingsURLs> => {
  const MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME =
    process.env.MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME;
  if (!MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME) {
    throw new Error(
      "Environment variable 'MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME' is not defined"
    );
  }

  let client: MongoClient | null = null;
  const connect = await connectToDatabase();
  try {
    client = connect.client;
    const db = connect.db;
    const collection = db.collection(
      MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME
    );
    return (
      await collection
        .aggregate([
          {
            $match: {
              "is-available": true,
            },
          },
          { $group: { _id: null, urls: { $push: "$url" } } },
          { $project: { urls: true, _id: false } },
        ])
        .toArray()
    )[0].urls;
  } finally {
    await client?.close();
  }
};
