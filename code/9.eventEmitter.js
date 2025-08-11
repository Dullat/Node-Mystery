const EventEmitter = require('events')

const celebrity = new EventEmitter()

// subscriber to celeb for observer1
celebrity.on('race-win', () => {
  console.log('🧔 Wohooo, you won ... my hero.....')
})

// subscriber to celeb for observer2
celebrity.on('race-win', () => {
  console.log('👨‍🦰 Boo oponent won, my hero suks')
})

setTimeout(() => {
  celebrity.emit('race-win')
}, 2000)


process.on('exit', (code) => {
  console.log('End of programe ')
})

celebrity.on('race', (result) => {
  if(result === 'win') console.log('woohooo.. we won')
  if(result === 'lose') console.log('uhh shit , we lost') 
})

celebrity.emit('race', 'win')
