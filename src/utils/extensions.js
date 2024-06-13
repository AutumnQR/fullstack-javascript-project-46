import _ from 'lodash';
import path from 'path';

const YAML = ['.yml', '.yaml'];

export const isYaml = (filePath) => {
  return _.includes(YAML, path.extname(path.resolve(filePath)));
};
