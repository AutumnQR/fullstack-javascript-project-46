import _ from 'lodash';
import { stylish, stringify } from './utils/stylish.js';

const handleObjects = (key, fileOneValue, fileTwoValue, depth) => {
  return stylish(
    `  ${key}: ${compareFiles(fileOneValue, fileTwoValue, depth + 1)}`,
    depth,
  );
};

const handleMissingKey = (key, value, depth, exp) => {
  return stylish(`${exp} ${key}: ${stringify(value, depth + 1)}`, depth);
};

const handleNotEqual = (key, fileOneValue, fileTwoValue, depth) => {
  return [
    stylish(`- ${key}: ${stringify(fileOneValue, depth + 1)}`, depth),
    stylish(`+ ${key}: ${stringify(fileTwoValue, depth + 1)}`, depth),
  ];
};

const handleEqualFiles = (key, fileOneValue, depth) => {
  return stylish(`  ${key}: ${stringify(fileOneValue, depth + 1)}`, depth);
};

const compareFiles = (fileOne, fileTwo, depth = 1) => {
  const allKeys = _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));

  const diff = allKeys.map((key) => {
    const [fileOneValue, fileTwoValue] = [fileOne[key], fileTwo[key]];
    const isObjects = _.isObject(fileOneValue) && _.isObject(fileTwoValue);
    const isFileHaveKey = (file) => _.has(file, key);

    switch (true) {
      case isObjects:
        return handleObjects(key, fileOneValue, fileTwoValue, depth);
      case !isFileHaveKey(fileTwo):
        return handleMissingKey(key, fileOneValue, depth, '-');
      case !isFileHaveKey(fileOne):
        return handleMissingKey(key, fileTwoValue, depth, '+');
      case fileOneValue !== fileTwoValue:
        return handleNotEqual(key, fileOneValue, fileTwoValue, depth);
      default:
        return handleEqualFiles(key, fileOneValue, depth);
    }
  });

  return stylish(diff, depth);
};

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;

  return compareFiles(fileOneData, fileTwoData);
};

export default genDiff;
