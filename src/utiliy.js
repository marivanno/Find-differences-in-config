import _ from 'lodash';

export const spaceGen = (num) => '  '.repeat(num);

const buildArray = (object) => {
  const ownArray = Object.entries(object);
  return ownArray.map(([key, value]) => {
    if (_.isObjectLike(value)) {
      return [key, buildArray(value)];
    }
    return [key, value];
  });
};

const buildTree = (array, depth) => {
  const result = array.reduce((acc, item) => {
    if (Array.isArray(item[1])) {
      return `${acc} \n${spaceGen(depth)}  ${item[0]}: ${buildTree(item[1], depth + 2)}`;
    }
    return `${acc} \n${spaceGen(depth)}  ${item[0]}: ${item[1]}`;
  }, '{');
  return `${result} \n${spaceGen(depth)}}`;
};

export const generateToString = (depth, key, value, char) => {
  if (_.isObjectLike(value)) {
    return `${spaceGen(depth)}${char} ${key}: ${buildTree(buildArray(value), 2)}`;
  } return `${spaceGen(depth)}${char} ${key}: ${value}`;
};
