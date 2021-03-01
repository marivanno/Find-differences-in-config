import _ from 'lodash';

const buildAst = (jsonObjBefore, jsonObjAfter) => {
  const allKeyInArray = _.sortBy(_.union(_.keys(jsonObjBefore), _.keys(jsonObjAfter)));
  const result = allKeyInArray.map((key) => {
    if (!_.has(jsonObjBefore, key)) {
      return { key, value: jsonObjAfter[key], type: 'added' };
    } else if (!_.has(jsonObjAfter, key)) {
      return { key, value: jsonObjBefore[key], type: 'deleted' };
    } else if (jsonObjBefore[key] !== jsonObjAfter[key] && !_.isObjectLike(jsonObjBefore[key])) {
      return {
        key, valueBefore: jsonObjBefore[key], valueAfter: jsonObjAfter[key], type: 'modifed',
      };
    } else if (jsonObjBefore[key] !== jsonObjAfter[key] && !_.isObjectLike(jsonObjAfter[key])) {
      return {
        key, valueBefore: jsonObjBefore[key], valueAfter: jsonObjAfter[key], type: 'modifed',
      };
    } else if (_.isObjectLike(jsonObjBefore[key]) && _.isObjectLike(jsonObjAfter[key])) {
      return { key, value: buildAst(jsonObjBefore[key], jsonObjAfter[key]), type: 'nested' };
    } return { key, value: jsonObjAfter[key], type: 'unchanged' };
  });
  return result;
};

export default buildAst;
