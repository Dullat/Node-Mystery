const fs = require('fs')

console.log('Sync Read Starts...');
const dataSync = fs.readFileSync('sample.txt', 'utf8')
console.log(dataSync)
console.log('Sync read is Done...')

console.log('Async read begins...');
const dataAsync = fs.readFile('sample.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err)
    }
    if(data){
        console.log(data)
    }
})

const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise resolved..')
    },0)
}).then(data => {console.log(data)})

console.log(promis)


console.log('programe instructions end...')
