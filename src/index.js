
/**
 *   开发环境 webpack ./src/index.js -o ./build/built.js --mode=development
 *  生产环境   webpack ./src/index.js -o ./build/built.js --mode=production
 */
import data from './data.json'
import './index.less'
function add (x, y) {
    return x + y
}
console.log(add(1,2), 100000)
console.log(data)