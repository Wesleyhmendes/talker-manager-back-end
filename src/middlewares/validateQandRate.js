const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await readTalkers();
  if (!q && !rate) {
    return res.status(200).json(talkers);
  }
  next();
};