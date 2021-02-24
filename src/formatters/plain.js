import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = (ast) => {
  const iter = (data, acc = '') => {
    const derivation = data.filter(({ type }) => type !== 'unchanged')
      .map(({
        key, type, valueBefore, valueAfter, value,
      }) => {
        const newAcc = !acc ? `${key}` : `${acc}.${key}`;
        switch (type) {
          case 'nested': {
            return iter(value, newAcc);
          }
          case 'added': {
            return `Property '${newAcc}' was added with value: ${getValue(valueAfter)}.`;
          }
          case 'deleted': {
            return `Property ${newAcc} was removed.`;
          }
          case 'modifed': {
            return `Property ${newAcc} was updated. From ${getValue(valueBefore)} to ${getValue(valueAfter)}.`;
          }
          default:
            throw new Error(`Ooops...unexpected type ${type} of node`);
        }
      });
    return derivation.join('\n');
  };
  return iter(ast);
};

export default renderPlain;
