const request = require('./request.js') 
const response = require('./response.js')

function makeRequest(url, data){
  request.send(url, data)
  return response.read()
}

const data = makeRequest('https:google.com', 'hello')
console.log(data)
 console.log(require.cache)
