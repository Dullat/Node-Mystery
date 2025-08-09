console.log('Start of script');

setTimeout(() => {
    console.log('Timeout finished (2 sec)')
}, 2000)

setImmediate(() => {
    console.log('setImmediate callback')
})

Promise.resolve().then(() => {
    console.log('Promise resolved...')
})

for (let i = 0; i < 5; i++) {
    console.log(`Loop iteration ${i + 1}`)
}

console.log('end of script');
