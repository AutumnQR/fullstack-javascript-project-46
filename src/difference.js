import _ from 'lodash';

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;

  const fileOneKeys = Object.keys(fileOneData);
  const fileTwoKeys = Object.keys(fileTwoData);

  const allKeys = _.sortBy(_.union(fileOneKeys, fileTwoKeys));

  const diff = allKeys.map((key) => {
    const fileOneValue = fileOneData[key];
    const fileTwoValue = fileTwoData[key];

    switch (true) {
      case !_.has(fileTwoData, key):
        return `  - ${key}: ${fileOneValue}`;
      case !_.has(fileOneData, key):
        return `  + ${key}: ${fileTwoValue}`;
      case fileOneValue !== fileTwoValue:
        return [
          `  - ${key}: ${fileOneValue}`,
          `  + ${key}: ${fileTwoValue}`,
        ].join('\r\n');
      default:
        return `    ${key}: ${fileOneValue}`;
    }
  });

  return `{\r\n${diff.join('\r\n')}\r\n}`;
};

export default genDiff;
