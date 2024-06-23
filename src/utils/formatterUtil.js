import _ from 'lodash';

const getAllKeys = (fileOne, fileTwo) => _.union(Object.keys(fileOne), Object.keys(fileTwo))
const getSortedKeys = (fileOne, fileTwo) => _.sortBy(getAllKeys(fileOne, fileTwo));
const isFileHaveKey = (file, key) => _.has(file, key);

const getFullKey = (newKey, key) => (newKey ? `${newKey}.${key}` : key);
const getValues = (fileOne, fileTwo, key) => [fileOne[key], fileTwo[key]];

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

const formatJsonValue = (value) => {
  switch (true) {
    case _.isObject(value):
      return JSON.stringify(value);
    case _.isString(value):
      return `"${value}"`;
    default:
      return value;
  }
};

const handleMissingKey = (key, value, exp, isJson = false) => {
  if (isJson) {
    return `{"key": "${key}", "status": ${exp === '-' ? '"removed"' : '"added"'}
    ${exp === '+' ? `, "value": ${formatJsonValue(value)}` : ''}}`;
  }
  return `Property '${key}' was ${
    exp === '-' ? 'removed' : `added with value: ${formatValue(value)}`
  }`;
};

const handleNotEqual = (key, fileOneValue, fileTwoValue, isJson = false) => {
  if (isJson) {
    return `{
  "key": "${key}",
  "status": "updated",
  "from": ${formatJsonValue(fileOneValue)},
  "to": ${formatJsonValue(fileTwoValue)}
   }`;
  }
  return `Property '${key}' was updated. From ${formatValue(
    fileOneValue,
  )} to ${formatValue(fileTwoValue)}`;
};

const generateDiff = (fileOne, fileTwo, newKey, handler, isJson = false) => {
  const allKeys = getSortedKeys(fileOne, fileTwo);

  return allKeys
    .map((key) => {
      const fullKey = getFullKey(newKey, key);
      const [fileOneValue, fileTwoValue] = getValues(fileOne, fileTwo, key);

      switch (true) {
        case _.isObject(fileOneValue) && _.isObject(fileTwoValue):
          return handler(fileOneValue, fileTwoValue, fullKey);
        case !isFileHaveKey(fileTwo, key):
          return handleMissingKey(fullKey, fileOneValue, '-', isJson);
        case !isFileHaveKey(fileOne, key):
          return handleMissingKey(fullKey, fileTwoValue, '+', isJson);
        case fileOneValue !== fileTwoValue:
          return handleNotEqual(fullKey, fileOneValue, fileTwoValue, isJson);
        default:
          return null;
      }
    })
    .filter((item) => item !== null);
};

export {
  getSortedKeys, getValues, isFileHaveKey, generateDiff,
};
