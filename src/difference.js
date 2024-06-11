import _ from 'lodash';

const genDiff = (data) => {
  const fileOneData = _.sortBy(Object.keys(data[0]));
  const fileTwoData = _.sortBy(Object.keys(data[1]));
  const diff = [];

  fileOneData.forEach((key) => {
    if (_.includes(fileTwoData, key)) {
      if (data[0][key] !== data[1][key]) {
        diff.push(`- ${key}: ${data[0][key]}`);
        diff.push(`+ ${key}: ${data[1][key]}`);
      } else {
        diff.push(`  ${key}: ${data[0][key]}`);
      }
    } else {
      diff.push(`- ${key}: ${data[0][key]}`);
    }
  });

  fileTwoData.forEach((key) => {
    if (!_.includes(fileOneData, key)) {
      diff.push(`+ ${key}: ${data[1][key]}`);
    }
  });

  return `{\n   ${diff.join('\n   ')}\n}`;
};

export default genDiff;
