import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

const FOLDER_PATH = "./public";

const processFile = (filePath: string) => {
  const stats = fs.statSync(filePath);
  if (stats.isFile()) {
    try {
      const readFilePath = filePath;
      const writeFilePath = readFilePath.replace("\\files\\", "\\files_new\\");

      const htmlContent = fs.readFileSync(readFilePath, "utf-8");

      const dom = new JSDOM(htmlContent);
      const htmlElement = dom.window.document.documentElement;
      const hasLangAttribute = htmlElement.hasAttribute("lang");
      if (!hasLangAttribute) {
        htmlElement.setAttribute("lang", "us");
      }

      const modifiedHtmlContent = dom.serialize();
      const writeFolder = path.dirname(writeFilePath);
      if (!fs.existsSync(writeFolder)) {
        fs.mkdirSync(writeFolder, { recursive: true });
      }
      fs.writeFileSync(writeFilePath, modifiedHtmlContent);
    } catch (error) {
      console.error(`Error reading file contents: ${error}`);
    }
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      processFile(path.join(filePath, file));
    });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { filePath } = req.body;

  try {
    const readFilePath = path.join(FOLDER_PATH, filePath);

    const stats = fs.statSync(readFilePath);
    processFile(readFilePath);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error reading folder contents: ${error}`);
    res.status(500).json({ error: "Error reading folder contents" });
  }
};
