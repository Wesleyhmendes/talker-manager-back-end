const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readTalkers();

  if (q && !rate && date) {
    const filterByQ = talkers.filter((talker) => talker.name.includes(q));
    const filterByDate = filterByQ.filter((talker) => talker.talk.watchedAt === date);
    if (filterByDate) {
      return res.status(200).json(filterByDate);
    }
  }
  next();
};