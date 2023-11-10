module.exports = (req, res, next) => {
  const { talk } = req.body;
  const limit = /^[1-5]$/;

  if (talk.rate === undefined || talk.rate === null) {
    return res
      .status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!limit.test(talk.rate)) {
    return res
      .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};