const fs = require('fs')

// non blocking I/o
console.log('reading a file with blocking')
const data = fs.readFileSync('sample.txt', 'utf8')
console.log('this is blocking read : ' + data)
console.log('blocking read ends...')


console.log('---------- non blocking read starts here --------------')



fs.readFile('sample.txt', 'utf8', (err,data) => {
  console.log('reading data...')
  if(data){
    console.log(data)
  }
  if(err){
    console.log(err)
  }
})

console.log('End of the program')



