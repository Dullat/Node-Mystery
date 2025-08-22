const authorize = (req, res, next) => {
  console.log("authorized");
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 3 };
    next();
  } else {
    res.status(401).send("not authorized");
  }
};

module.exports = authorize;
