const fs = require('fs')

function greet(name, callback) {
    if (!name) {
        callback(new Error('No name given'), null)
    }

    if (name) {
        const data = fs.readFile('sample.txt', 'utf8', (err, data) => {
            if (err) {
                callback(err, null)
            }
            if (!err && data) {
                const message = `Hi ${name} here is your note : \n${data}`
                callback(null, message)
            }
        })
    }
}

greet('dullat', (err, data) => {
    console.log(data)
})



// const fs = require('fs').promises;

// async function greet(name) {
//     if (!name) throw new Error('No name given');

//     const data = await fs.readFile('sample.txt', 'utf8');
//     return `Hi ${name} here is your note:\n${data}`;
// }

// greet('dullat')
//     .then(message => console.log(message))
//     .catch(err => console.error(err.message));
