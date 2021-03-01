import _ from 'lodash';

const getValue = (value) => (_.isObjectLike(value) ? `[complex value]` : value);

const renderPlain = (ast, keyAcc = '') => ast.filter(({ type }) => type !== 'unchanged')
  .map(({
    key, type, valueBefore, valueAfter, value,
  }) => {
    const newAcc = !keyAcc ? `${key}` : `${keyAcc}.${key}`;
    switch (type) {
      case 'nested': {
        return renderPlain(value, newAcc);
      }
      case 'added': {
        return `Property '${newAcc}' was added with value: ${getValue(value)}`;
      }
      case 'deleted': {
        return `Property '${newAcc}' was removed`;
      }
      case 'modifed': {
        return `Property '${newAcc}' was updated. From ${getValue(valueBefore)} to '${getValue(valueAfter)}'`;
      }
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  })
  .flat()
  .join('\n');

export default renderPlain;
