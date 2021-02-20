import { load } from 'js-yaml';
import path from 'path';
import fs from 'fs';

export default (filepath) => {
  if (path.extname(filepath) === '.yml') {
    return load(fs.readFileSync(path.resolve('', filepath), 'utf8'));
  } if (path.extname(filepath) === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve('', filepath), 'utf8'));
  }
  return null;
};
