import buildTree from '../src/bin/buildTree.js';
// import treeStile from '../src/stylish.js';
const object1 = {
  animal: 'bober',
  number: 1989,
  number2: 1990,
  famaly: {
    male: 'Ivan shadrin',
    female: 'Marina chekmareva',
  },
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
      surname: 'Pedrila',
    },
  },
};

const object2 = {
  animal: 'bober',
  number: 2000,
  famaly: {
    male: 'Ivan shadrin',
    female: 'Marina shadrina',
  },
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
    },
  },
};

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

test('gendiff', () => {
  expect(buildTree(object1, object2))
    .toEqual(resultAST);
});

// test('stylish', () => {
//   expect(treeStile([
//     { key: 'animal', value: 'bober', type: 'unchenged' },
//     { key: 'key', type: 'object', value: [[Object], [Object]] },
//     {
//       key: 'key4', valueAfter: '123', valueBefore: 123, type: 'modifed',
//     },
//     {
//       key: 'people',
//       valueBefore: { marina: 'shadrina', ivan: 'shadrin' },
//       type: 'deleted',
//     },
//   ]))
//     .toEqual('{\n  avg: 0.278\n  hr: petia\n- rbi: 22\n+ rbi: 147\n}');
// });