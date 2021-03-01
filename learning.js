import _ from 'lodash';
import { generateToString } from './src/utiliy.js'

const a = { group3: {
    deep: {
        id: {
            number: 45
        },
    },
    fee: 100500
}
}

  console.log(generateToString(a, 1))