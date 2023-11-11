const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readTalkers();

  if (date && !q && !rate) {
    const filterByDate = talkers.filter((talker) => talker.talk.watchedAt === date);
    if (filterByDate) {
      return res.status(200).json(filterByDate);
    }
  }
  next();
};