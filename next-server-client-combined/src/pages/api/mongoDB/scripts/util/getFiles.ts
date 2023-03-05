import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const FOLDER_PATH = "./public";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filePath } = req.body;

  try {
    const folderPath = path.join(FOLDER_PATH, filePath);
    const folderContents = await fs.promises.readdir(folderPath, { withFileTypes: true });
    const files = folderContents.filter((file) => file.isFile()).map((file) => file.name);

    res.status(200).json({ files });
  } catch (error) {
    console.error(`Error reading folder contents: ${error}`);
    res.status(500).json({ error: "Error reading folder contents" });
  }
}
