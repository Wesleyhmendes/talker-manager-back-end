const readTalkers = require('../utils/readTalkers');

module.exports = async (req, res, next) => {
  const { q, rate } = req.query;
  const talkers = await readTalkers();
  if (q && !rate) {
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    if (filteredTalkers) {
      return res.status(200).json(filteredTalkers);
    }
    return res.status(200).json([]);
  }
  next();
};