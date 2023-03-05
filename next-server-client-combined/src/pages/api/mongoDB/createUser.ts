import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import connect from "./mongoDB";

type Data = {
  message: string;
};

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    console.log("Connecting");
    const client = await connect();
    const database = client.db("test");

    const { username, password } = req.body; // assuming username and password are required fields
    const newUser = { username, password };

    database
      .collection("users")
      .insertOne(newUser)
      .then(() => {
        console.log(`User added to database: ${newUser}`);
        res.status(201).json({ message: "User created" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });

    // res.status(200).json({ msg: "No errors" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
