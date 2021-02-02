#!/usr/bin/env node

import program from 'commander';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const gendiff = (filepath1, filepath2) => {
  const jsonObj = JSON.parse(fs.readFileSync(path.resolve('', filepath1), 'utf8'));
  const jsonObj2 = JSON.parse(fs.readFileSync(path.resolve('', filepath2), 'utf8'));
  const allKeyInArray = _.union(_.keys(jsonObj), _.keys(jsonObj2)).sort();
  const resultObject = [];
  allKeyInArray.forEach((item) => {
    if (!_.has(jsonObj, item)) {
      resultObject.push(`+ ${item}: ${jsonObj2[item]}`);
    } else if (!_.has(jsonObj2, item)) {
      resultObject.push(`- ${item}: ${jsonObj[item]}`);
    } else if (jsonObj[item] !== jsonObj2[item]) {
      resultObject.push(`- ${item}: ${jsonObj2[item]}`);
      resultObject.push(`+ ${item}: ${jsonObj[item]}`);
    } else {
      resultObject.push(`  ${item}: ${jsonObj[item]}`);
    }
  });
  return console.log(`Your's difference in files: \n ${resultObject.join(',\n')}`);
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1>', 'path to file 1')
  .arguments('<filepath2>', 'path to file 2')
  .action((path1, path2) => gendiff(path1, path2))
  .parse(process.argv);

