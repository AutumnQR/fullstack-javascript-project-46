import path from 'path';
import { readFileSync } from 'node:fs';

const readJsonFile = (filePath) =>
  JSON.parse(readFileSync(path.resolve(filePath), { encoding: 'utf-8' }));

const parseFile = (fileOne, fileTwo) => ({
  fileOneData: readJsonFile(fileOne),
  fileTwoData: readJsonFile(fileTwo),
});

export default parseFile;
