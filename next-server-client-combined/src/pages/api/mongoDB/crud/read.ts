import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import connect from "../mongoDB";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    console.log("Connecting");
    const { table } = req.body;
    const client = await connect();
    const database = client.db("test");
    const names = await database.collection(table).find({}).toArray();
    res.status(200).json({ names });
    //res.status(200).json({ msg: "No errors" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
