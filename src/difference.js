import _ from "lodash";

const genDiff = (data) => {
  const { fileOneData, fileTwoData } = data;
  const allKeys = _.sortBy(
    _.union(Object.keys(fileOneData), Object.keys(fileTwoData)),
  );

  const diff = allKeys.map((key) => {
    if (!_.has(fileTwoData, key)) {
      return `- ${key}: ${fileOneData[key]}`;
    }
    if (!_.has(fileOneData, key)) {
      return `+ ${key}: ${fileTwoData[key]}`;
    }
    if (fileOneData[key] !== fileTwoData[key]) {
      return [
        `- ${key}: ${fileOneData[key]}`,
        `+ ${key}: ${fileTwoData[key]}`,
      ].join("\n   ");
    }
    return `  ${key}: ${fileOneData[key]}`;
  });

  return `{\n   ${diff.join("\n   ")}\n}`;
};

export default genDiff;
