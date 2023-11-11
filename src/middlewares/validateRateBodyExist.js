module.exports = async (req, res, next) => {
  const { rate } = req.body;
  if (rate === null || rate === undefined) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};