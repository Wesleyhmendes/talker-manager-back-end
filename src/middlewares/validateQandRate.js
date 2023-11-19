const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readTalkers();

  if (q && rate && !date) {
    const filterByQ = talkers
      .filter((talker) => talker.name.includes(q) && talker.talk.rate === Number(rate));
    if (filterByQ.length > 0) {
      return res.status(200).json(filterByQ);
    }
  }
  next();
};