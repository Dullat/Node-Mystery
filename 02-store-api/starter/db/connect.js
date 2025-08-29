const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: 'store'
  })
}

module.exports = connectDB
