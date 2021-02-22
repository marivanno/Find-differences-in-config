#!/usr/bin/env node

import commander from 'commander';
import gendiff from './bin/gendiff.js';
import generateTreeStile from './stylish.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1>', 'path to file 1')
  .arguments('<filepath2>', 'path to file 2')
  .action((path1, path2) => {
    if (program.format === 'stylish') {
      console.log(generateTreeStile(gendiff(path1, path2)));
    } else console.log('penis');
  })
  .parse(process.argv);
