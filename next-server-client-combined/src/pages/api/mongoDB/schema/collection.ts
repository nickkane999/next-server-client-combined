import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../mongoDB";

export default async function createCollection(req: NextApiRequest, res: NextApiResponse) {
  const client = await connect();
  const { schema, collectionName } = req.body;
  try {
    console.log("Connected to MongoDB");

    const database = client.db("test");
    const collectionOptions = { validator: { $jsonSchema: schema } };
    const collection = await database.createCollection(collectionName, collectionOptions);
    console.log(`Collection '${collectionName}' created with schema validation`);

    console.log("Collection created and documents added");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}
