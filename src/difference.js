import _ from 'lodash';

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;
  const allKeys = _.sortBy(
    _.union(Object.keys(fileOneData), Object.keys(fileTwoData)),
  );

  const diff = allKeys.map((key) => {
    if (!_.has(fileTwoData, key)) {
      return `  - ${key}: ${fileOneData[key]}`;
    }
    if (!_.has(fileOneData, key)) {
      return `  + ${key}: ${fileTwoData[key]}`;
    }
    if (fileOneData[key] !== fileTwoData[key]) {
      return [
        `  - ${key}: ${fileOneData[key]}`,
        `  + ${key}: ${fileTwoData[key]}`,
      ].join('\r\n');
    }
    return `    ${key}: ${fileOneData[key]}`;
  });

  return `{\r\n${diff.join('\r\n')}\r\n}`;
};

export default genDiff;
