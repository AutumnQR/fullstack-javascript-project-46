import { isYaml } from './utils/extensions.js';
import { readJsonFile, readYamlFile } from './utils/readers.js';

const parseFile = (fileOne, fileTwo) => ({
  fileOneData: isYaml ? readYamlFile(fileOne) : readJsonFile(fileOne),
  fileTwoData: isYaml ? readYamlFile(fileTwo) : readJsonFile(fileTwo),
});

export default parseFile;
