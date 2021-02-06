import gendiff from '../gendiff.js';

test('gendiff', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json'))
    .toEqual(['  bober: 2', '- follow: false', '  host: hexlet.io',
      '- proxy: 123.234.53.22', '- timeout: 20', '+ timeout: 50', '+ verbose: true']);
});

test('gendiff2', () => {
  expect(gendiff('__fixtures__/file3.json', '__fixtures__/file4.json'))
    .toEqual(['- follow: false', '  host: hexlet.io', '- proxy: 123.234.53.22',
      '- timeout: 20', '+ timeout: 50', '+ verbose: true']);
});

