import _ from 'lodash';

const a = {
  animal: 'bober',
  number: 1989,
  number2: 1990,
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
      surname: 'Pedrila',
    },
  },
};

const b = {
  animal: 'bober',
  number: 2000,
  famaly: {
    male: 'Ivan shadrin',
    female: 'Marina chekmareva',
  },
  people: {
    americanPeople: 'George Bush',
    russianPeople: {
      name: 'Danila',
    },
  },
};

const buildTree = (jsonObjBefore, jsonObjAfter) => {
  const allKeyInArray = _.union(_.keys(jsonObjBefore), _.keys(jsonObjAfter)).sort();
  const resultObject = [];
  allKeyInArray.forEach((key) => {
    if (!_.has(jsonObjBefore, key)) {
      resultObject.push({
        key,
        value: jsonObjAfter[key],
        type: 'added',
      });
    } else if (!_.has(jsonObjAfter, key)) {
      resultObject.push({
        key,
        value: jsonObjBefore[key],
        type: 'deleted',
      });
    } else if (jsonObjBefore[key] !== jsonObjAfter[key]
            && !_.isObjectLike(jsonObjBefore[key])) {
      resultObject.push({
        key,
        valueBefore: jsonObjBefore[key],
        valueAfter: jsonObjAfter[key],
        type: 'modifed',
      });
    } else if (jsonObjBefore[key] !== jsonObjAfter[key]
        && !_.isObjectLike(jsonObjAfter[key])) {
      resultObject.push({
        key,
        valueBefore: jsonObjBefore[key],
        valueAfter: jsonObjAfter[key],
        type: 'modifed',
      });
    } else if (_.isObjectLike(jsonObjBefore[key]) && _.isObjectLike(jsonObjAfter[key])) {
      resultObject.push({
        key,
        type: 'nested',
        value: buildTree(jsonObjBefore[key], jsonObjAfter[key]),
      });
    } else {
      resultObject.push({
        key,
        value: jsonObjAfter[key],
        type: 'unchenged',
      });
    }
  });
  return resultObject;
};

console.log(buildTree(a, b));
