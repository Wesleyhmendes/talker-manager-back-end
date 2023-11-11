const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readTalkers();

  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!q && rate && isFormatDate.test(date)) {
    const filterByRate = talkers.filter((talker) => talker.talk.rate === Number(rate));
    const filterByDate = filterByRate.filter((talker) => talker.talk.watchedAt === date);
    if (filterByDate) {
      return res.status(200).json(filterByDate);
    }
  }
  next();
};