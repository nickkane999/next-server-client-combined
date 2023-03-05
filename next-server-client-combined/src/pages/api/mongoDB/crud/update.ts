import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import connect from "../mongoDB";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    console.log("Connecting");
    const client = await connect();
    const database = client.db("test");

    const { recordId, table, ...record } = req.body;
    const filter = { _id: new ObjectId(recordId) };
    const update = { $set: record };
    if (record._id) delete update.$set._id;

    database
      .collection(table)
      .updateOne(filter, update)
      .then(() => {
        console.log(`Record updated: ${recordId}`);
        res.status(200).json({ message: "Record updated" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
