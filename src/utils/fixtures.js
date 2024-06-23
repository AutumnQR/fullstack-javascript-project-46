import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { isYaml, isJSON } from './extensions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (filename) => {
  switch (true) {
    case isYaml(filename):
      return path.join(__dirname, '..', '..', '__fixtures__', 'yaml', filename);
    case isJSON(filename):
      return path.join(__dirname, '..', '..', '__fixtures__', 'json', filename);
    default:
      return path.join(
        __dirname,
        '..',
        '..',
        '__fixtures__',
        'answers',
        filename,
      );
  }
};

export const readFile = (filename) =>
  readFileSync(getFixturePath(filename), 'utf-8');
