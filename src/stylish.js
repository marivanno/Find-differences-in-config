import _ from 'lodash';

const spacegenerator = (num) => '   '.repeat(num);

const treeStile = (data, depth = 0) => {
  const result = data.reduce((acc, item) => {
    if (item.type === 'added' && !_.isObjectLike(item.value)) {
      return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${item.value}`;
    }
    if (item.type === 'deleted') {
      return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.value}`;
    }
    if (item.type === 'unchenged') {
      return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${item.value}`;
    }
    if (item.type === 'modifed') {
      return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.valueAfter}\n${spacegenerator(depth)}+ ${item.key}: ${item.valueBefore}`;
    }
    if (item.type === 'nested') {
      return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${treeStile(item.value, depth + 1)}\n ${spacegenerator(depth + 1)}}`;
    }
    return acc;
  }, '{');
  return result;
};

export default treeStile;
