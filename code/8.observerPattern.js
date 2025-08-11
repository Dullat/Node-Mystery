const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('show', (name) => {
  console.log('Showing you the name : ' + name)
})


setTimeout(() => {
  myEvent.emit('show', 'Dullat')
}, 2000)


// just callback practice
function custom(name, callback){
  if(name){
    callback(name)
  }
}

custom('dullat', (data) => {
    console.log(data)
})
