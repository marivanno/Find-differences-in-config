import _ from 'lodash';
const resultAST = [
  { key: 'animal', value: 'bober', type: 'unchenged' },
  {
    key: 'famaly',
    type: 'nested',
    value: [{
      key: 'female',
      valueBefore: 'Marina chekmareva',
      valueAfter: 'Marina shadrina',
      type: 'modifed',
    },
    { key: 'male', value: 'Ivan shadrin', type: 'unchenged' },
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
      { key: 'americanPeople', value: 'George Bush', type: 'unchenged' },
      {
        key: 'russianPeople',
        type: 'nested',
        value: [
          { key: 'name', value: 'Danila', type: 'unchenged' },
          { key: 'surname', value: 'Pedrila', type: 'deleted' },
        ],
      },
    ],
  },
];


console.log(JSON.stringify(resultAST))