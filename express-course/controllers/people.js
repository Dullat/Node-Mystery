const getPeople = (req, res) => {
  res.status(200).json({ sucess: true, data: people });
};

module.exports = { getPeople };
