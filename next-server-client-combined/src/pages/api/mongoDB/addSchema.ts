import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/pages/api/mongoDB/mongoose";
import { models, sampleRecords } from "@/features/mongoDB/data/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method !== "POST") {
    console.log("Method not allowed: " + req.method);
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { modelKey } = req.body;
  const newRecord = sampleRecords[modelKey];

  try {
    await connectMongoDB();
    const count = await models[modelKey].countDocuments();
    if (count === 0) {
      await models[modelKey].create(newRecord);
      console.log(`Added record : ${newRecord}`);
      return res.status(201).json({ addedRecords: true });
    } else {
      console.log(`Table already has records`);
      return res.status(201).json({ addedRecords: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
