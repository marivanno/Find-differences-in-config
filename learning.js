import _ from 'lodash';

const resultAST = [
  { key: 'animal', value: 'bober', type: 'unchanged' },
  {
    key: 'famaly',
    type: 'nested',
    value: [{
      key: 'female',
      valueBefore: 'Marina chekmareva',
      valueAfter: 'Marina shadrina',
      type: 'modifed',
    },
    { key: 'male', value: 'Ivan shadrin', type: 'unchanged' },
    ],
  },
  {
    key: 'number',
    valueBefore: 1989,
    valueAfter: 2000,
    type: 'modifed',
  },
  { key: 'number2', value: 1990, type: 'deleted' },
  {
    key: 'people',
    type: 'nested',
    value: [
      { key: 'americanPeople', value: 'George Bush', type: 'unchanged' },
      {
        key: 'russianPeople',
        type: 'nested',
        value: [
          { key: 'name', value: 'Danila', type: 'unchanged' },
          { key: 'surname', value: 'Pedrila', type: 'deleted' },
        ],
      },
    ],
  },
];
const getValue = (value) => (_.isObjectLike(value) ? '[complex value]' : value);

const renderPlain = (ast, keyAcc = '') => ast.filter(({ type }) => type !== 'unchanged')
  .reduce((acc, {
    key, type, valueBefore, valueAfter, value,
  }) => {
    const newAcc = !keyAcc ? `${key}` : `${keyAcc}.${key}`;
    switch (type) {
      case 'nested': {
        return `${acc}${renderPlain(value, newAcc)}`;
      }
      case 'added': {
        return `${acc}\nProperty '${newAcc}' was added with value: ${getValue(value)}.`;
      }
      case 'deleted': {
        return `${acc}\nProperty '${newAcc}' was removed.`;
      }
      case 'modifed': {
        return `${acc}\nProperty '${newAcc}' was updated. From ${getValue(valueBefore)} to ${getValue(valueAfter)}.`;
      }
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  }, '');

console.log(renderPlain(resultAST));
