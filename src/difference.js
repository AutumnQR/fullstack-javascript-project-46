import _ from 'lodash';

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;

  const fileOneKeys = Object.keys(fileOneData);
  const fileTwoKeys = Object.keys(fileTwoData);

  const allKeys = _.sortBy(_.union(fileOneKeys, fileTwoKeys));

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
