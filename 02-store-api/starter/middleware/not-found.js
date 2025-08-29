const notFound = (req, res, next) => res.status(404).json({msg: "no route"})

module.exports = notFound
