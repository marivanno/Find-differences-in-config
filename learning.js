import _ from 'lodash';

const a = {
  animal: 'bober',
  number: 1989,
  number2: 1990,
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
      surname: 'Pedrila',
    },
  },
};

const b = {
  animal: 'bober',
  number: 2000,
  famaly: {
    male: 'Ivan shadrin',
    female: 'Marina chekmareva',
  },
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
    },
  },
};


const spacegenerator = (num) => '   '.repeat(num);

const buildTreeObject = (object) => {
  const ownArray = Object.entries(object);
  return ownArray.map(([key, value]) => {
    if (_.isObjectLike(value)) {
      return [key, buildTreeObject(value)];
    }
    return [key, value];
  });
};

const buildStringTree = (array, depth = 0) => {
  const result = array.reduce((acc, item) => {
    if (Array.isArray(item[1])) {
      return `${acc} \n${spacegenerator(depth)}  ${item[0]}: ${buildStringTree(item[1], depth + 1)}`;
    }
    return `${acc} \n${spacegenerator(depth)}  ${item[0]}: ${item[1]}`;
  }, '{');
  return `${result} \n${spacegenerator(depth)}}`;
};

console.log(buildStringTree(buildTreeObject(b)));
