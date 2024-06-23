import _ from 'lodash';
import { getAllKeys, isFileHaveKey, isObjects } from '../utils/formatterUtil.js';

const formatValue = (value, depth = 1, spacesCount = 2) => {
  const bracketSpaceCount = 4;
  const currentIndent = ' '.repeat(depth * spacesCount - 1);
  const bracketIndent = ' '.repeat(depth * bracketSpaceCount - 4);

  if (_.isArray(value)) {
    const lines = value.flat().map((val) => `${currentIndent}${val}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  }

  return `${currentIndent}${value}`;
};

const stringify = (value, depth = 1, spacesCount = 4) => {
  const iter = (currentValue, iDepth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;

    const currentIndent = ' '.repeat(iDepth * spacesCount);
    const bracketIndent = ' '.repeat(iDepth * spacesCount - 4);

    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, iDepth + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, depth);
};

const handleMissingKey = (key, value, depth, exp) => formatValue(`${exp} ${key}: ${stringify(value, depth + 1)}`, depth);

const handleNotEqual = (key, fileOneValue, fileTwoValue, depth) => [
  formatValue(`- ${key}: ${stringify(fileOneValue, depth + 1)}`, depth),
  formatValue(`+ ${key}: ${stringify(fileTwoValue, depth + 1)}`, depth),
];

const handleEqualFiles = (key, fileOneValue, depth) => formatValue(`  ${key}: ${stringify(fileOneValue, depth + 1)}`, depth);

const stylish = (fileOne, fileTwo, depth = 1) => {
  const allKeys = getAllKeys(fileOne, fileTwo);

  const diff = allKeys.map((key) => {
    const [fileOneValue, fileTwoValue] = [fileOne[key], fileTwo[key]];

    switch (true) {
      case isObjects(fileOneValue, fileTwoValue):
        return formatValue(
          `  ${key}: ${stylish(fileOneValue, fileTwoValue, depth + 1)}`,
          depth,
        );
      case !isFileHaveKey(fileTwo, key):
        return handleMissingKey(key, fileOneValue, depth, '-');
      case !isFileHaveKey(fileOne, key):
        return handleMissingKey(key, fileTwoValue, depth, '+');
      case fileOneValue !== fileTwoValue:
        return handleNotEqual(key, fileOneValue, fileTwoValue, depth);
      default:
        return handleEqualFiles(key, fileOneValue, depth);
    }
  });

  return formatValue(diff, depth);
};

export default stylish;
