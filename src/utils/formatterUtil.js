import _ from 'lodash';

const getAllKeys = (fileOne, fileTwo) => _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));
const isFileHaveKey = (file, key) => _.has(file, key);
const isObjects = (fileOneValue, fileTwoValue) => _.isObject(fileOneValue) && _.isObject(fileTwoValue);

export { getAllKeys, isFileHaveKey, isObjects };
