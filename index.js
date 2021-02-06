import program from 'commander';
import gendiff from './gendiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1>', 'path to file 1')
  .arguments('<filepath2>', 'path to file 2')
  .action((path1, path2) => {
    console.log(`\n\n\nYour's difference in files:\n\n\n${gendiff(path1, path2).join(',\n')}\n\n`);
  })
  .parse(process.argv);
