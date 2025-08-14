const http = require('http')
const https = require('https')
const EventEmitter = require('events')

const tracker = new EventEmitter()
tracker.on('loaded', () => {
  console.log('loaded')
})
let page = '';


const server = http.createServer((req, res )=> {
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type' : 'text-html'})
    res.end('<h1>hahahah</h1>')
  }
  if(req.url === '/google.com'){
    const options = {
      hostname: 'www.google.com',
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
      }
    }

    const proxyReq = https.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res)
    })

    proxyReq.on('error', (err) => {
      res.writeHead(500, {'Content-Type' : 'text/plain'})
      res.end('Error : ' + err.message)
    })

    proxyReq.end()
  }
})

server.listen(3000)
