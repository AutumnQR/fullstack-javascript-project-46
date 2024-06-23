import { generateDiff } from '../utils/formatterUtil.js';

const plain = (fileOne, fileTwo, newKey = '') => {
  const data = generateDiff(fileOne, fileTwo, newKey, plain, false);

  return data.join('\n');
};

export default plain;
