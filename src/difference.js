import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const genDiff = (data, format) => {
  const { fileOneData, fileTwoData } = data;

  switch (format || 'stylish') {
    case 'stylish':
      return stylish(fileOneData, fileTwoData);
    case 'plain':
      return plain(fileOneData, fileTwoData);
    default:
      throw Error('Undefined format value');
  }
};

export default genDiff;
