const http = require('http')

const server = http.createServer((req, res) => {
  console.log('user hit the server')
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.write('<h1>Home page</h1>')
  res.end()
})

server.listen(5000, () =>{
  console.log('runing on 5000')
})
