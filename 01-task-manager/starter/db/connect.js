const mongoose = require('mongoose')

const connectDb = (url) => {
 return mongoose.connect(url, {dbName: 'dummy'})
}

module.exports = connectDb