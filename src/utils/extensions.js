import _ from 'lodash';
import path from 'path';

const YAML = ['.yml', '.yaml'];

const isYaml = (filePath) =>
  _.includes(YAML, path.extname(path.resolve(filePath)));

export default isYaml;
