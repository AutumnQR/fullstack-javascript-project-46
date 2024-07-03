#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((fileOne, fileTwo) => {
    const options = program.opts();
    const diff = genDiff(fileOne, fileTwo, options.format);
    console.log(diff);
  });

program.parse();
