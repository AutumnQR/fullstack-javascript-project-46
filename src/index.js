import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import jsonFormat from './formatters/json.js';

const genDiff = (data, format) => {
  const { fileOneData, fileTwoData } = data;

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
