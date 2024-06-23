import _ from 'lodash';

const handleMissingKey = (key, value, exp) =>
  `Property: '${key}' was ${
    exp === '-'
      ? 'removed'
      : `was added with value ${_.isObject(value) ? `[complex value]` : `${value}`}`
  }`;

const handleNotEqual = (key, fileOneValue, fileTwoValue) =>
  `Property: '${key}' was updated. From ${
    _.isObject(fileOneValue) ? `[complex value]` : fileOneValue
  } to ${_.isObject(fileTwoValue) ? `[complex value]` : fileTwoValue}`;

const plain = (fileOne, fileTwo, newKey = '') => {
  const allKeys = _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));
  const diff = allKeys
    .map((key) => {
      const fullKey = newKey ? `${newKey}.${key}` : key;
      const [fileOneValue, fileTwoValue] = [fileOne[key], fileTwo[key]];
      const isObjects = _.isObject(fileOneValue) && _.isObject(fileTwoValue);
      const isFileHaveKey = (file) => _.has(file, key);

      switch (true) {
        case isObjects:
          return plain(fileOneValue, fileTwoValue, fullKey);
        case !isFileHaveKey(fileTwo):
          return handleMissingKey(fullKey, fileOneValue, '-');
        case !isFileHaveKey(fileOne):
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
