import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.each([
  ['file1.json', 'file2.json', 'plain'],
  ['file1.json', 'file2.json', 'stylish'],
  ['file3.yml', 'file4.yml', 'plain'],
  ['file3.yml', 'file4.yml', 'stylish'],
  ['file5.json', 'file6.json', 'plain'],
  ['file5.json', 'file6.json', 'stylish'],
])('gendiff', (before, after, format) => {
  const file1 = path.resolve(__dirname, '..', `__tests__/__fixtures__/${before}`);
  const file2 = path.resolve(__dirname, '..', `__tests__/__fixtures__/${after}`);
  const result = fs.readFileSync(path.resolve(__dirname, '..', `__tests__/__fixtures__/${format}_${before}_${after}_result`), 'utf8');
  expect(gendiff(file1, file2, format)).toBe(result);
});
