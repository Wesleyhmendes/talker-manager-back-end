module.exports = async (req, res, next) => {
  const { rate } = req.query;
  const limit = [1, 2, 3, 4, 5];

  if (rate && !limit.includes(Number(rate))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};