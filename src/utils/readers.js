import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

export const readJsonFile = (filePath) =>
  JSON.parse(readFileSync(path.resolve(filePath), { encoding: 'utf-8' }));

export const readYamlFile = (filePath) =>
  yaml.load(readFileSync(path.resolve(filePath), { encoding: 'utf-8' }));
