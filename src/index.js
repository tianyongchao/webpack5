
/**
 *   开发环境 webpack ./src/index.js -o ./build/built.js --mode=development
 *  生产环境   webpack ./src/index.js -o ./build/built.js --mode=production
 */
import data from './data.json'
import './index.less'
import print from './print.js'
function add (x, y) {
    return x + y
}
console.log(add(1,2), 121212121)
console.log(data)
print()