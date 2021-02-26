import buildAst from './src/buildAst.js';
import parser from './src/parser.js';
import formatter from './src/formatters/index.js'

export default (filepath1, filepath2, format) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  return formatter(buildAst(object1, object2), format);
};