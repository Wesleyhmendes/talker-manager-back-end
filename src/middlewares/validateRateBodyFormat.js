module.exports = async (req, res, next) => {
  const { rate } = req.body;
  const limit = /^[1-5]$/;

  if (!limit.test(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};