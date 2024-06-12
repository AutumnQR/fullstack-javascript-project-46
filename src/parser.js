import path from "path";
import { readFileSync } from "node:fs";

const readJsonFile = (filePath) => {
  return JSON.parse(
    readFileSync(path.resolve(filePath), { encoding: "utf-8" }),
  );
};

const parseFile = (fileOne, fileTwo) => {
  return {
    fileOneData: readJsonFile(fileOne),
    fileTwoData: readJsonFile(fileTwo),
  };
};

export default parseFile;
