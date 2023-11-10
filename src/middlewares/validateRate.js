const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await readTalkers();

  if (rate && !q) {
    const filteredByRate = talkers.filter((talker) => talker.talk.rate === Number(rate));
    res.status(200).json(filteredByRate);
  }
  next();
};