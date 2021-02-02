import _ from 'lodash';

const bober = JSON.parse('{'a': 1, 'b': 2, 'c': {'d': 4, 'e': {'f': 6}}}', function(k, v) {
  console.log(k); // пишем имя текущего свойства, последним именем будет ""
  return '123';       // возвращаем неизменённое значение свойства
});

console.log(bober)