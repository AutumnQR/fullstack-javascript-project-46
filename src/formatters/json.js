import { generateDiff } from '../utils/formatterUtil.js';

const jsonFormat = (fileOne, fileTwo, newKey = '') => {
  const data = generateDiff(fileOne, fileTwo, newKey, jsonFormat, true);

  return `[${data.join(',')}]`;
};

export default jsonFormat;
