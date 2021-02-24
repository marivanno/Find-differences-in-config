import _ from 'lodash';

const buildAst = (jsonObjBefore, jsonObjAfter) => {
  const allKeyInArray = _.union(_.keys(jsonObjBefore), _.keys(jsonObjAfter)).sort();
  const resultObject = [];
  allKeyInArray.forEach((key) => {
    if (!_.has(jsonObjBefore, key)) {
      resultObject.push({ key, value: jsonObjAfter[key], type: 'added' });
    } else if (!_.has(jsonObjAfter, key)) {
      resultObject.push({
        key, value: jsonObjBefore[key], type: 'deleted',
      });
    } else if (jsonObjBefore[key] !== jsonObjAfter[key] && !_.isObjectLike(jsonObjBefore[key])) {
      resultObject.push({
        key, valueBefore: jsonObjBefore[key], valueAfter: jsonObjAfter[key], type: 'modifed',
      });
    } else if (jsonObjBefore[key] !== jsonObjAfter[key] && !_.isObjectLike(jsonObjAfter[key])) {
      resultObject.push({
        key, valueBefore: jsonObjBefore[key], valueAfter: jsonObjAfter[key], type: 'modifed',
      });
    } else if (_.isObjectLike(jsonObjBefore[key]) && _.isObjectLike(jsonObjAfter[key])) {
      resultObject.push({
        key, value: buildAst(jsonObjBefore[key], jsonObjAfter[key]), type: 'nested',
      });
    } else {
      resultObject.push({
        key, value: jsonObjAfter[key], type: 'unchanged',
      });
    }
  });
  return resultObject;
};

export default buildAst;
