import _ from 'lodash';

const stylish = (value, depth = 1, spacesCount = 2) => {
  const currentIndent = ' '.repeat(depth * spacesCount - 1);
  const bracketIndent = ' '.repeat(depth * 4 - 4);

  if (_.isArray(value)) {
    const lines = value.flat().map((val) => `${currentIndent}${val}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  }

  return `${currentIndent}${value}`;
};

const stringify = (value, depth = 1, spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;

    const currentIndent = ' '.repeat(depth * spacesCount);
    const bracketIndent = ' '.repeat(depth * spacesCount - 4);

    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, depth);
};

export { stylish, stringify };
