import buildTree from '../src/buildAst.js';
import renderPlain from '../src/formatters/plain.js'
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

const resultRenderPlan = `
Property 'famaly.female' was updated. From Marina chekmareva to Marina shadrina.
Property 'number' was updated. From 1989 to 2000.
Property 'number2' was removed.
Property 'people.russianPeople.surname' was removed.`;

test('buildingAstTree', () => {
  expect(buildTree(object1, object2))
    .toEqual(resultAST);
});

test('renderPlain', () => {
  expect(renderPlain(resultAST)).toEqual(resultRenderPlan);
});

