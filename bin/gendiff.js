#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../index.js'

const program = new commander.Command();

export default program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1>', 'path to file 1')
  .arguments('<filepath2>', 'path to file 2')
  .action((path1, path2) => {
    console.log(gendiff(path1, path2, program.format));
  })
  .parse(process.argv);

