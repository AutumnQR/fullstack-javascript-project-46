import path from 'path';
import { readFileSync } from 'node:fs';

const parseFile = (filePath, filePathTwo) => {
  const fullPathOne = path.resolve(filePath);
  const fullPathTwo = path.resolve(filePathTwo);

  const fileOneData = readFileSync(fullPathOne, { encoding: 'utf-8' });
  const fileTwoData = readFileSync(fullPathTwo, { encoding: 'utf-8' });

  return [JSON.parse(fileOneData), JSON.parse(fileTwoData)];
};

export default parseFile;
