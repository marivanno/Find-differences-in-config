import renderPlain from './plain.js';
import renderJson from './json.js';
import renderTree from './stylish.js';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return renderJson(ast);
    default:
      return renderTree(ast);
  }
};
