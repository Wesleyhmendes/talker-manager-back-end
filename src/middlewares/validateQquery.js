const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readTalkers();
  if (q && !rate && !date) {
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    if (filteredTalkers.length) {
      return res.status(200).json(filteredTalkers);
    }
    return res.status(200).json([]);
  }
  next();
};