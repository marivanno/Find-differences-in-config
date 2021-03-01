import _ from 'lodash';

const a = { 
    group2: {
    abc: 12345,
    deep: {
        id: 45,
    }
  }
}

const b = { 
    group2: {
    abc: 12,
    deep: {
        id: 45,
        id2: 48,
    }
  }
}

const buildAst = (jsonObjBefore, jsonObjAfter) => {
    const allKeyInArray = _.sortBy(_.union(_.keys(jsonObjBefore), _.keys(jsonObjAfter)));
    allKeyInArray.map((key) => {
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
      } else {
        return { key, value: jsonObjAfter[key], type: 'unchanged' };
      }
    });
    return allKeyInArray;
  };

console.log(buildAst(a, b))