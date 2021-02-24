import _ from 'lodash';

const getValue = (value) => (_.isObjectLike(value) ? '[complex value]' : value);

const renderPlain = (ast, keyAcc = '') => ast.filter(({ type }) => type !== 'unchanged')
  .reduce((acc, {
    key, type, valueBefore, valueAfter, value,
  }) => {
    const newAcc = !keyAcc ? `${key}` : `${keyAcc}.${key}`;
    switch (type) {
      case 'nested': {
        return `${acc}${renderPlain(value, newAcc)}`;
      }
      case 'added': {
        return `${acc}\nProperty '${newAcc}' was added with value: ${getValue(value)}.`;
      }
      case 'deleted': {
        return `${acc}\nProperty '${newAcc}' was removed.`;
      }
      case 'modifed': {
        return `${acc}\nProperty '${newAcc}' was updated. From ${getValue(valueBefore)} to ${getValue(valueAfter)}.`;
      }
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  }, '');

export default renderPlain;
