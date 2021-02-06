#!/usr/bin/env node

import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const gendiff = (filepath1, filepath2) => {
  const jsonObj = JSON.parse(fs.readFileSync(path.resolve('', filepath1), 'utf8'));
  const jsonObj2 = JSON.parse(fs.readFileSync(path.resolve('', filepath2), 'utf8'));
  const allKeyInArray = _.union(_.keys(jsonObj), _.keys(jsonObj2)).sort();
  const resultObject = [];
  allKeyInArray.forEach((item) => {
    if (!_.has(jsonObj, item)) {
      resultObject.push(`+ ${item}: ${jsonObj2[item]}`);
    } else if (!_.has(jsonObj2, item)) {
      resultObject.push(`- ${item}: ${jsonObj[item]}`);
    } else if (jsonObj[item] !== jsonObj2[item]) {
      resultObject.push(`- ${item}: ${jsonObj2[item]}`);
      resultObject.push(`+ ${item}: ${jsonObj[item]}`);
    } else {
      resultObject.push(`  ${item}: ${jsonObj[item]}`);
    }
  });
  return resultObject;
};

export default gendiff;
