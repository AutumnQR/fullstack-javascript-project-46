#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parser.js';
import genDiff from '../src/difference.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((fileOne, fileTwo) => {
    const data = parseFile(fileOne, fileTwo);
    const options = program.opts();
    const diff = genDiff(data, options.format);
    console.log(diff);
  });

program.parse();
