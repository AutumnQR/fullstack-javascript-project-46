import _ from 'lodash';

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
  const allKeys = _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));

  const diff = allKeys.map((key) => {
    const fullKey = newKey ? `${newKey}.${key}` : key;
    const [fileOneValue, fileTwoValue] = [fileOne[key], fileTwo[key]];

    const isObjects = _.isObject(fileOneValue) && _.isObject(fileTwoValue);
    const isFileHaveKey = (file) => _.has(file, key);

    switch (true) {
      case isObjects:
        return jsonFormat(fileOneValue, fileTwoValue, fullKey);
      case !isFileHaveKey(fileTwo):
        return handleMissingKey(fullKey, fileOneValue, '-');
      case !isFileHaveKey(fileOne):
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
