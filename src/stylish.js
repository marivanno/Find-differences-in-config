import _ from 'lodash';
import { spacegenerator, buildObjectToArray, buildStringTree } from './utiliy.js';

const treeStile = (data, depth = 0) => {
  const result = data.reduce((acc, item) => {
    if (item.type === 'added' && _.isObjectLike(item.value)) {
      return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${buildStringTree(buildObjectToArray(item.value), 2)}`;
    }
    if (item.type === 'added') {
      return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${item.value}`;
    }
    if (item.type === 'deleted' && _.isObjectLike(item.value)) {
      return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${buildStringTree(buildObjectToArray(item.value), 2)}`;
    }
    if (item.type === 'deleted') {
      return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.value}`;
    }
    if (item.type === 'unchenged') {
      return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${item.value}`;
    }
    if (item.type === 'modifed' && _.isObjectLike(item.valueAfter)) {
      return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${buildStringTree(buildObjectToArray(item.valueAfter), 2)}\n${spacegenerator(depth)}- ${item.key}: ${item.valueBefore}`;
    }
    if (item.type === 'modifed' && _.isObjectLike(item.valueBefore)) {
      return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${item.valueAfter}\n${spacegenerator(depth)}- ${item.key}: ${buildStringTree(buildObjectToArray(item.valueBefore), 2)}`;
    }
    if (item.type === 'modifed') {
      return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.valueAfter}\n${spacegenerator(depth)}+ ${item.key}: ${item.valueBefore}`;
    }
    if (item.type === 'nested') {
      return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${treeStile(item.value, depth + 1)}`;
    }
    return acc;
  }, '{');
  return `${result} \n${spacegenerator(depth)}}`;
};

export default treeStile;
