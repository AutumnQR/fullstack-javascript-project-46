import _ from 'lodash';

const getAllKeys = (fileOne, fileTwo) =>
  _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));
const isFileHaveKey = (file, key) => _.has(file, key);
const isObjects = (fileOneValue, fileTwoValue) =>
  _.isObject(fileOneValue) && _.isObject(fileTwoValue);

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
  const allKeys = getAllKeys(fileOne, fileTwo);

  return allKeys
    .map((key) => {
      const fullKey = getFullKey(newKey, key);
      const [fileOneValue, fileTwoValue] = getValues(fileOne, fileTwo, key);

      switch (true) {
        case isObjects(fileOneValue, fileTwoValue):
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

export { getAllKeys, getValues, isFileHaveKey, isObjects, generateDiff };
