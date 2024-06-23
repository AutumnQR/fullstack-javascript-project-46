import { describe, expect, test } from '@jest/globals';

import parseFile from '../src/parser.js';
import genDiff from '../src/index.js';
import { isYaml } from '../src/utils/extensions.js';
import { readJsonFile, readYamlFile } from '../src/utils/readers.js';
import { getFixturePath, readFile } from '../src/utils/fixtures.js';

describe('flat structures', () => {
  test('No change should be noticed', () => {
    const answer = `{\n${['    a: 1', '    b: 2', '    c: 3'].join('\n')}\n}`;
    expect(
      genDiff(
        getFixturePath('test_file1.json'),
        getFixturePath('test_file2.json'),
      ),
    ).toBe(answer);
  });

  test('Comparison of Hexlet response and program response', () => {
    const answer = readFile('answer.txt');

    expect(
      genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')),
    ).toBe(answer);
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
    const answer = readFile('nested_answer.txt').trim();

    expect(
      genDiff(getFixturePath('file4.json'), getFixturePath('file5.json')),
    ).toBe(answer);
  });

  test('[YAML] Comparison of Hexlet nested structure and program response', () => {
    const answer = readFile('nested_answer.txt').trim();

    expect(
      genDiff(getFixturePath('file4.yaml'), getFixturePath('file5.yaml')),
    ).toBe(answer);
  });

  test('Comparing plain style with Hexlet response', () => {
    const answer = readFile('nested_plain_answer.txt').trim();

    expect(
      genDiff(
        getFixturePath('file4.json'),
        getFixturePath('file5.json'),
        'plain',
      ),
    ).toBe(answer);
  });
});

// describe('JSON format', () => {
//   test('Check alphabetical sorting', () => {
//     const data = {
//       fileOneData: { b: 1, d: 2, c: 3 },
//       fileTwoData: {
//         a: 1,
//         b: 4,
//         c: 3,
//         e: 5,
//       },
//     };
//
//     const answer = [
//       { key: 'a', status: 'added', value: 1 },
//       { key: 'b', status: 'updated', from: 1, to: 4 },
//       { key: 'd', status: 'removed' },
//       { key: 'e', status: 'added', value: 5 },
//     ];
//
//     expect(genDiff(data.fileOneData, data.fileTwoData, 'json')).toEqual(answer);
//   });
// });
