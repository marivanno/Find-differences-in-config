import _ from 'lodash';

export const spacegenerator = (num) => '    '.repeat(num);

export const buildObjectToArray = (object) => {
  const ownArray = Object.entries(object);
  return ownArray.map(([key, value]) => {
    if (_.isObjectLike(value)) {
      return [key, buildObjectToArray(value)];
    }
    return [key, value];
  });
};

export const buildStringTree = (array, depth = 0) => {
  const result = array.reduce((acc, item) => {
    if (Array.isArray(item[1])) {
      return `${acc} \n${spacegenerator(depth)}  ${item[0]}: ${buildStringTree(item[1], depth + 1)}`;
    }
    return `${acc} \n${spacegenerator(depth)}  ${item[0]}: ${item[1]}`;
  }, '{');
  return `${result} \n${spacegenerator(depth)}}`;
};

