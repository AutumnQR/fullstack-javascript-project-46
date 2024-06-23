import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import jsonFormat from './formatters/json.js';
import parseFile from './parser.js';

const genDiff = (fileOne, fileTwo, format) => {
  const { fileOneData, fileTwoData } = parseFile(fileOne, fileTwo);

  switch (format || 'stylish') {
  case 'stylish':
    return stylish(fileOneData, fileTwoData);
  case 'plain':
    return plain(fileOneData, fileTwoData);
  case 'json':
    return jsonFormat(fileOneData, fileTwoData);
  default:
    return stylish(fileOneData, fileTwoData);
  }
};

export default genDiff;
