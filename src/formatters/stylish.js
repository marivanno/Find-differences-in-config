import _ from 'lodash';

const spaceGen = (num) => '    '.repeat(num);

const buildArray = (object) => {
  const ownArray = Object.entries(object);
  return ownArray.map(([key, value]) => {
    if (_.isObjectLike(value)) {
      return [key, buildArray(value)];
    }
    return [key, value];
  });
};

const buildTree = (array, depth = 0) => {
  const result = array.reduce((acc, item) => {
    if (Array.isArray(item[1])) {
      return `${acc} \n${spaceGen(depth)}  ${item[0]}: ${buildTree(item[1], depth + 1)}`;
    }
    return `${acc} \n${spaceGen(depth)}  ${item[0]}: ${item[1]}`;
  }, '{');
  return `${result} \n${spaceGen(depth)}}`;
};

const generateToString = (depth, key, value, char) => {
  if (_.isObjectLike(value)) {
    return `${spaceGen(depth)}${char} ${key}: ${buildTree(buildArray(value), 2)}`;
  } return `${spaceGen(depth)}${char} ${key}: ${value}`;
};

const renderTree = (data, depth = 0) => {
  const result = data.reduce((acc, {
    key, value, type, valueAfter, valueBefore,
  }) => {
    if (type === 'added') {
      return `${acc} \n${generateToString(depth, key, value, '+')}`;
    }
    if (type === 'deleted') {
      return `${acc} \n${generateToString(depth, key, value, '-')}`;
    }
    if (type === 'unchanged') {
      return `${acc} \n${generateToString(depth, key, value, ' ')}`;
    }
    if (type === 'modifed') {
      return `${acc} \n${generateToString(depth, key, valueBefore, '-')}\n${generateToString(depth, key, valueAfter, '+')}`;
    }
    if (type === 'nested') {
      return `${acc} \n${generateToString(depth, key, renderTree(value, depth + 1), ' ')}`;
    } throw new Error(`Unexpected type ${type}`);
  }, '{');
  return `${result} \n${spaceGen(depth)}}`;
};

export default renderTree;
