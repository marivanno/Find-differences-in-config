import _ from 'lodash';
import { spaceGen, ObjectToString } from '../utiliy.js';

const renderTree = (data, depth = 0) => {
  const result = data.reduce((acc, {
    key, value, type, valueAfter, valueBefore,
  }) => {
    if (type === 'added' && _.isObjectLike(value)) {
      return `${acc} \n${spaceGen(depth)}+ ${key}: ${ObjectToString(value, 2)}`;
    }
    if (type === 'added') {
      return `${acc} \n${spaceGen(depth)}+ ${key}: ${value}`;
    }
    if (type === 'deleted' && _.isObjectLike(value)) {
      return `${acc} \n${spaceGen(depth)}- ${key}: ${ObjectToString(value, 2)}`;
    }
    if (type === 'deleted') {
      return `${acc} \n${spaceGen(depth)}- ${key}: ${value}`;
    }
    if (type === 'unchanged') {
      return `${acc} \n${spaceGen(depth)}  ${key}: ${value}`;
    }
    if (type === 'modifed' && _.isObjectLike(valueAfter)) {
      return `${acc} \n${spaceGen(depth)}- ${key}: ${valueBefore}\n${spaceGen(depth)}+ ${key}: ${ObjectToString(valueAfter, 2)}`;
    }
    if (type === 'modifed' && _.isObjectLike(valueBefore)) {
      return `${acc} \n${spaceGen(depth)}- ${key}: ${ObjectToString(valueBefore, 2)}\n${spaceGen(depth)}+ ${key}: ${valueAfter}`;
    }
    if (type === 'modifed') {
      return `${acc} \n${spaceGen(depth)}- ${key}: ${valueBefore}\n${spaceGen(depth)}+ ${key}: ${valueAfter}`;
    }
    if (type === 'nested') {
      return `${acc} \n${spaceGen(depth)}  ${key}: ${renderTree(value, depth + 1)}`;
    }
    return acc;
  }, '{');
  return `${result} \n${spaceGen(depth)}}`;
};

export default renderTree;
