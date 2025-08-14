const fs = require('fs')
const http = require('http')
const EventEmitter = require('events')

const tracker = new EventEmitter()


tracker.on('start', (filePath) => {
  console.log('Download started: ' + filePath)
})

tracker.on('progress', (file, chunkCount) => {
    console.log(`⏳ Downloading ${file}... chunks so far: ${chunkCount}`);
});

tracker.on('completed', () => {
  console.log('completed')
})

const server = http.createServer((req, res) => {
  const filePath = './sample.txt'

  if(req.url === '/download'){
    tracker.emit('start', filePath)

    let chunkCounter = 0
    const readStream = fs.createReadStream(filePath)

    readStream.on('data', chunk => {
      chunkCounter += 1
      tracker.emit('progress', filePath, chunkCounter)
    })

    readStream.on('end', () => {
      tracker.emit('completed')
    })

    res.writeHead(200, {'Content-Type' : 'text/plain'})
    readStream.pipe(res)
  }
  if(req.url !== '/download'){
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end("Not found")
  }
})


server.listen(4500, () => {
  console.log('Runing at 4500')
})
