import { describe, expect, test } from '@jest/globals';

import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import parseFile from '../src/parser.js';
import genDiff from '../src/difference.js';
import { isYaml } from '../src/utils/extensions.js';
import { readJsonFile, readYamlFile } from '../src/utils/readers.js';
import { getFixturePath, readFile } from '../src/utils/fixtures.js';

describe('flat structures', () => {
  test('No change should be noticed', () => {
    const data = {
      fileOneData: { a: 1, b: 2, c: 3 },
      fileTwoData: { a: 1, b: 2, c: 3 },
    };

    const answer = `{\n${['    a: 1', '    b: 2', '    c: 3'].join('\n')}\n}`;
    expect(genDiff(data)).toBe(answer);
  });

  test('Changing data in b', () => {
    const data = {
      fileOneData: { a: 1, b: 2, c: 3 },
      fileTwoData: { a: 1, b: 4, c: 3 },
    };

    const answer = `{\n${['    a: 1', '  - b: 2', '  + b: 4', '    c: 3'].join('\n')}\n}`;

    expect(genDiff(data)).toBe(answer);
  });

  test('Comparison of Hexlet response and program response', () => {
    const data = parseFile(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    );

    const answer = readFile('answer.txt');

    expect(genDiff(data)).toBe(answer);
  });

  test('Check alphabetical sorting', () => {
    const data = {
      fileOneData: { b: 1, d: 2, c: 3 },
      fileTwoData: {
        a: 1,
        b: 4,
        c: 3,
        e: 5,
      },
    };

    const answer = `{\n${['  + a: 1', '  - b: 1', '  + b: 4', '    c: 3', '  - d: 2', '  + e: 5'].join('\n')}\n}`;

    expect(genDiff(data)).toBe(answer);
  });

  test('is Yaml file?', () => {
    expect(isYaml(getFixturePath('file1.yaml'))).toBeTruthy();
    expect(isYaml(getFixturePath('file1.json'))).toBeFalsy();
    expect(isYaml(getFixturePath('answer.txt'))).toBeFalsy();
  });

  test('Correct parsing yaml files', () => {
    const jsonData = readJsonFile(getFixturePath('file1.json'));
    const yamlData = readYamlFile(getFixturePath('file1.yaml'));

    expect(jsonData).toEqual(yamlData);
  });
});

describe('nest structures', () => {
  test('[JSON] Comparison of Hexlet nested structure and program response', () => {
    const data = parseFile(
      getFixturePath('file4.json'),
      getFixturePath('file5.json'),
    );

    const answer = readFile('nested_answer.txt').trim();

    expect(genDiff(data)).toBe(answer);
  });

  test('[YAML] Comparison of Hexlet nested structure and program response', () => {
    const data = parseFile(
      getFixturePath('file4.yaml'),
      getFixturePath('file5.yaml'),
    );

    const answer = readFile('nested_answer.txt').trim();

    expect(genDiff(data)).toBe(answer);
  });
});
