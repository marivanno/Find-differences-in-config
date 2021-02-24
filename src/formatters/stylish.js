import { spaceGen, generateToString } from '../utiliy.js';

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
