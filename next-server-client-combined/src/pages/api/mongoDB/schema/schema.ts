import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/pages/api/mongoDB/mongoose";
import models from "@/features/mongoDB/data/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method !== "POST") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { modelKey, newRecord } = req.body;

  try {
    await connectMongoDB();
    models[modelKey]
      .create(newRecord)
      .then(() => {
        console.log(`Added record : ${newRecord}`);
        res.status(201).json({ message: "Record created" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
