#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parser.js';
import genDiff from '../src/difference.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((fileOne, fileTwo) => {
    const data = parseFile(fileOne, fileTwo);
    const diff = genDiff(data);
    console.log(diff);
  });

program.option('-f, --format', 'output format');

program.parse();