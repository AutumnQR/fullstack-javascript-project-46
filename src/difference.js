import _ from 'lodash';
import { stylish, stringify } from './utils/stylish.js';

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;

  const compareFiles = (fileOne, fileTwo, depth = 1) => {
    const fileOneKeys = Object.keys(fileOne);
    const fileTwoKeys = Object.keys(fileTwo);

    const allKeys = _.sortBy(_.union(fileOneKeys, fileTwoKeys));

    const diff = allKeys.map((key) => {
      const fileOneValue = fileOne[key];
      const fileTwoValue = fileTwo[key];

      // Возможно, этот участок кода не требуется, однако так код (switch/case) читается лучше
      const isObjects = () =>
        _.isObject(fileOneValue) && _.isObject(fileTwoValue);
      const isFileHaveKey = (file) => _.has(file, key);

      switch (true) {
        case isObjects():
          return stylish(
            `  ${key}: ${compareFiles(fileOneValue, fileTwoValue, depth + 1)}`,
            depth,
          );
        case !isFileHaveKey(fileTwo):
          return stylish(
            `- ${key}: ${stringify(fileOneValue, depth + 1)}`,
            depth,
          );

        case !isFileHaveKey(fileOne):
          return stylish(
            `+ ${key}: ${stringify(fileTwoValue, depth + 1)}`,
            depth,
          );

        case fileOneValue !== fileTwoValue:
          return [
            stylish(`- ${key}: ${stringify(fileOneValue, depth + 1)}`, depth),
            stylish(`+ ${key}: ${stringify(fileTwoValue, depth + 1)}`, depth),
          ];
        default:
          return stylish(
            `  ${key}: ${stringify(fileOneValue, depth + 1)}`,
            depth,
          );
      }
    });

    return stylish(diff, depth);
  };

  return compareFiles(fileOneData, fileTwoData);
};

export default genDiff;
