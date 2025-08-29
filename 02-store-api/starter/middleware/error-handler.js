const { CustomAPIError } = require("../errors/customError")

const errorHandlerMiddleware = async (err, req, res, next) => {
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({err: err, msg : err.message})
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again', err: err })
}

module.exports = errorHandlerMiddleware
