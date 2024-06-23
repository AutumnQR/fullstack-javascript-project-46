import _ from 'lodash';
import path from 'path';

const YAML = ['.yml', '.yaml'];
const JSON = ['.json'];
const isYaml = (filePath) => _.includes(YAML, path.extname(path.resolve(filePath)));
const isJSON = (filePath) => _.includes(JSON, path.extname(path.resolve(filePath)));

export { isYaml, isJSON };
