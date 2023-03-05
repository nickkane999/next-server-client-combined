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
    const client = await connect();
    const database = client.db("test");

    const { formData, fields, table } = req.body;
    const newRecord: { [key: string]: any } = {};
    console.log(fields);
    console.log(formData);
    for (const field of fields) {
      const { name } = field;
      newRecord[name] = formData[name];
    }
    console.log(newRecord);

    database
      .collection(table)
      .insertOne(newRecord)
      .then(() => {
        console.log(`Added record to ${table}: ${newRecord}`);
        res.status(201).json({ message: "Record created" });
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
