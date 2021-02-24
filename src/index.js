import buildAst from './buildAst.js';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  return buildAst(object1, object2);
};
