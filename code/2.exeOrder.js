const fs = require('fs')


setImmediate(() => { console.log('immediate..') })
setTimeout(() => {
    console.log('timeout fnished on 0 sec')
})
process.nextTick(() => console.log('a tick'))


fs.readFile(__filename, () => {
    console.log('enter inside the readfile->')
    // immediate runs after the loop finish but before the io, so that why immediate logs first in fs
    setTimeout(() => {
        console.log('timeout from callback')
    })
    setImmediate(() => { console.log('immediate from call back') })
})