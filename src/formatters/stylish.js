import _ from 'lodash';

const indentShiftSize = 4;

const formatValue = (val, globalIndentSize) => {
  if (!_.isPlainObject(val)) {
    return val;
  }

  const localIndentSize = globalIndentSize + indentShiftSize;

  const lines = _.entries(val)
    .map(([key, value]) => {
      const formattedValue = formatValue(value, localIndentSize);
      return `${' '.repeat(localIndentSize)}${key}: ${formattedValue}`;
    })
    .join('\n');

  const globalIndent = ' '.repeat(globalIndentSize);

  return `{\n${lines}\n${globalIndent}}`;
};

const formatListToStylish = (list, globalIndentSize) => {
  const localIndentSize = globalIndentSize + indentShiftSize;

  const lines = list
    .map(({
      key, type, valueBefore, valueAfter, value,
    }) => {
      switch (type) {
        case 'deleted':
          return `${'- '.padStart(localIndentSize)}${key}: ${formatValue(value, localIndentSize)}`;
        case 'added':
          return `${'+ '.padStart(localIndentSize)}${key}: ${formatValue(value, localIndentSize)}`;
        case 'modifed': {
          const oldEntry = `${'- '.padStart(localIndentSize)}${key}: ${formatValue(valueBefore, localIndentSize)}`;
          const newEntry = `${'+ '.padStart(localIndentSize)}${key}: ${formatValue(valueAfter, localIndentSize)}`;
          return `${oldEntry}\n${newEntry}`;
        }
        case 'unchanged':
          return `${' '.repeat(localIndentSize)}${key}: ${formatValue(value, localIndentSize)}`;
        case 'nested':
          return `${' '.repeat(localIndentSize)}${key}: ${formatListToStylish(value, localIndentSize)}`;
        default:
          throw new Error(`Unknown type '${type}'`);
      }
    });

  const globalIndent = ' '.repeat(globalIndentSize);

  return `{\n${lines.join('\n')}\n${globalIndent}}`;
};

const renderTree = (diff) => formatListToStylish(diff, 0);

export default renderTree;
