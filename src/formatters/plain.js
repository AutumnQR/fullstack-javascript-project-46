import _ from 'lodash';
import {
  getAllKeys,
  getFullKey,
  getValues,
  isFileHaveKey,
  isObjects,
} from '../utils/formatterUtil.js';

const formatValue = (value) => {
  switch (true) {
    case _.isObject(value):
      return '[complex value]';
    case _.isString(value):
      return `'${value}'`;
    default:
      return value;
  }
};

const handleMissingKey = (key, value, exp) => `Property '${key}' was ${
    exp === '-' ? 'removed' : `added with value: ${formatValue(value)}`
  }`;

const handleNotEqual = (key, fileOneValue, fileTwoValue) => `Property '${key}' was updated. From ${formatValue(
    fileOneValue,
  )} to ${formatValue(fileTwoValue)}`;

const plain = (fileOne, fileTwo, newKey = '') => {
  const allKeys = getAllKeys(fileOne, fileTwo);

  const diff = allKeys
    .map((key) => {
      const fullKey = getFullKey(newKey, key);
      const [fileOneValue, fileTwoValue] = getValues(fileOne, fileTwo, key);

      switch (true) {
        case isObjects(fileOneValue, fileTwoValue):
          return plain(fileOneValue, fileTwoValue, fullKey);
        case !isFileHaveKey(fileTwo, key):
          return handleMissingKey(fullKey, fileOneValue, '-');
        case !isFileHaveKey(fileOne, key):
          return handleMissingKey(fullKey, fileTwoValue, '+');
        case fileOneValue !== fileTwoValue:
          return handleNotEqual(fullKey, fileOneValue, fileTwoValue);
        default:
          return null;
      }
    })
    .filter((item) => item !== null);

  return diff.join('\n');
};

export default plain;
