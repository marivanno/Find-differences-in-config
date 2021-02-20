import buildTree from './buildTree.js';
import parser from '../parser.js';

const gendiff = (filepath1, filepath2) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  return buildTree(object1, object2);
};
export default gendiff;
