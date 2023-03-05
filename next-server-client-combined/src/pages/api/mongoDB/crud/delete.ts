import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import connect from "../mongoDB";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const { recordId, table } = req.body;
    console.log(req.body.recordId);
    console.log("Connecting");
    const client = await connect();
    const database = client.db("test");
    database
      .collection(table)
      .findOneAndDelete({ _id: new ObjectId(recordId) })
      .then((user) => {
        if (user) {
          console.log(`Deleting record from ${table}: ${user}`);
          res.status(201).json({ message: "Record deleted" });
        } else {
          console.log(`ID provided was not valid for ${table}: ${recordId}`);
          res.status(404).json({ message: "No valid entry found for provided ID" });
        }
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
