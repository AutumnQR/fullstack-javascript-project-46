import _ from 'lodash';
import {
  getAllKeys,
  isObjects,
  isFileHaveKey,
  getFullKey,
  getValues,
} from '../utils/formatterUtil.js';

const formatValue = (value) => {
  switch (true) {
    case _.isObject(value):
      return JSON.stringify(value);
    default:
      return value;
  }
};

const handleMissingKey = (key, value, exp) => ({
  key,
  status: `${exp === '-' ? 'removed' : 'added'}`,
  ...(exp === '+' && { value: formatValue(value) }),
});

const handleNotEqual = (key, fileOneValue, fileTwoValue) => ({
  key,
  status: 'updated',
  from: formatValue(fileOneValue),
  to: formatValue(fileTwoValue),
});

const jsonFormat = (fileOne, fileTwo, newKey = '') => {
  const allKeys = getAllKeys(fileOne, fileTwo);

  const diff = allKeys.map((key) => {
    const fullKey = getFullKey(newKey, key);
    const [fileOneValue, fileTwoValue] = getValues(fileOne, fileTwo, key);

    switch (true) {
      case isObjects(fileOneValue, fileTwoValue):
        return jsonFormat(fileOneValue, fileTwoValue, fullKey);
      case !isFileHaveKey(fileTwo, key):
        return handleMissingKey(fullKey, fileOneValue, '-');
      case !isFileHaveKey(fileOne, key):
        return handleMissingKey(fullKey, fileTwoValue, '+');
      case fileOneValue !== fileTwoValue:
        return handleNotEqual(fullKey, fileOneValue, fileTwoValue);
      default:
        return null;
    }
  });

  return JSON.stringify(diff.flat().filter((item) => item !== null));
};

export default jsonFormat;
