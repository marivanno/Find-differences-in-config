// const resultAST = [
//   { key: 'animal', value: 'bober', type: 'unchenged' },
//   { key: 'anima2', value: 'bober2', type: 'added' },
//   {
//     key: 'famaly',
//     type: 'nested',
//     value: [{
//       key: 'female',
//       valueBefore: 'Marina chekmareva',
//       valueAfter: 'Marina shadrina',
//       type: 'modifed',
//     },
//     { key: 'male', value: 'Ivan shadrin', type: 'unchenged' },
//     ],
//   },
//   {
//     key: 'number',
//     valueBefore: 1989,
//     valueAfter: 2000,
//     type: 'modifed',
//   },
//   { key: 'number2', value: 1990, type: 'deleted' },
//   {
//     key: 'people',
//     type: 'nested',
//     value: [
//       { key: 'americanPeople', value: 'George Bush', type: 'unchenged' },
//       {
//         key: 'russianPeople',
//         type: 'nested',
//         value: [
//           { key: 'name', value: 'Danila', type: 'unchenged' },
//           { key: 'surname', value: 'Pedrila', type: 'deleted' },
//         ],
//       },
//     ],
//   },
// ];

// const spacegenerator = (num) => '   '.repeat(num);

// const treeStile = (data, depth = 0) => {
//   const result = data.reduce((acc, item) => {
//     if (item.type === 'added') {
//       return `${acc} \n${spacegenerator(depth)}+ ${item.key}: ${item.value}`;
//     }
//     if (item.type === 'deleted') {
//       return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.value}`;
//     }
//     if (item.type === 'unchenged') {
//       return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${item.value}`;
//     }
//     if (item.type === 'modifed') {
//       return `${acc} \n${spacegenerator(depth)}- ${item.key}: ${item.valueAfter}\n${spacegenerator(depth)}+ ${item.key}: ${item.valueBefore}`;
//     }
//     if (item.type === 'nested') {
//       return `${acc} \n${spacegenerator(depth)}  ${item.key}: ${treeStile(item.value, depth + 1)}\n ${spacegenerator(depth + 1)}}`;
//     }
//     return acc;
//   }, '{');
//   return result;
// };
const test = { 
  key: 'surname',
  value: 'Pedrila',
  type: { key: 'surname', value: 'Pedrila', type: 'deleted' },
};
const convertToText = (obj) => {
  const string = [];
  if (obj === undefined) {
    	return String(obj);
  } if (typeof (obj) === 'object' && (obj.join === undefined)) {
    for (const prop in obj) {
        	if (obj.hasOwnProperty(prop)) string.push(`${prop}: ${convertToText(obj[prop])}`);
    }
    return `{${string.join(',')}}`;

    // is array
  } if (typeof (obj) === 'object' && !(obj.join === undefined)) {
    for (const prop in obj) {
      string.push(convertToText(obj[prop]));
    }
    return `[${string.join(',')}]`;

    // is function
  } if (typeof (obj) === 'function') {
    string.push(obj.toString());

    // all other values can be done with JSON.stringify
  } else {
    string.push(JSON.stringify(obj));
  }

  return string.join(',');
};

console.log(convertToText(test));
