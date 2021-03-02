import _ from 'lodash';

const buildAst = (objBefore, objAfter) => _.sortBy(_.union(_.keys(objBefore), _.keys(objAfter)))
  .map((key) => {
    if (!_.has(objBefore, key)) {
      return { key, value: objAfter[key], type: 'added' };
    }
    if (!_.has(objAfter, key)) {
      return { key, value: objBefore[key], type: 'deleted' };
    }
    if (objBefore[key] !== objAfter[key] && (!_.isObjectLike(objBefore[key])
    || !_.isObjectLike(objAfter[key]))) {
      return {
        key, valueBefore: objBefore[key], valueAfter: objAfter[key], type: 'modifed',
      };
    }
    if (_.isObjectLike(objBefore[key]) && _.isObjectLike(objAfter[key])) {
      return { key, value: buildAst(objBefore[key], objAfter[key]), type: 'nested' };
    } return { key, value: objAfter[key], type: 'unchanged' };
  });

export default buildAst;
