/* eslint-disable max-lines-per-function */
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const getToken = require('./utils/tokenGenerator');
const readTalkers = require('./utils/readTalkers');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validationCredential = require('./middlewares/validationCredentials');
const validationAge = require('./middlewares/validationAge');
const validationName = require('./middlewares/validationName');
const validationTalk = require('./middlewares/validationTalk');
const validationWatchedAt = require('./middlewares/validationWatchedAt');
const validatationRate = require('./middlewares/validationRate');
const validateRateFormat = require('./middlewares/validateRateFormat');
const validateDateFormat = require('./middlewares/validateDateFormat');
const validateQRD = require('./middlewares/validateQRD');
const validateRateBodyFormat = require('./middlewares/validateRateBodyFormat');
const validateRateBodyExist = require('./middlewares/validateRateBodyExist');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkerPath = path.resolve(__dirname, './talker.json');

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
  } catch (err) {
    res.status(200).json([]);
  }
});

app.get('/talker/search',
  validationCredential,
  validateQRD,
  validateRateFormat,
  validateDateFormat,
  async (req, res) => {
    const { q, rate, date } = req.query;
    const talkers = await readTalkers();
    let filterBy = talkers;

    if (rate) {
      filterBy = filterBy.filter((talker) => talker.talk.rate === Number(rate));
    }
    if (date) {
      filterBy = filterBy.filter((talker) => talker.talk.watchedAt === date);
    }
    if (q) {
      filterBy = filterBy.filter((talker) => talker.name.includes(q));
    }
    return res.status(200).json(filterBy);
  });

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = getToken();
  return res.status(200).json({ token });
});

async function addTalker(name, age, talk) {
  const { watchedAt, rate } = talk;
  const talkers = await readTalkers();
  const newObject = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const addNewTalker = JSON.stringify([...talkers, newObject]);
  return { addNewTalker, newObject };
}

app.post('/talker',
  validationCredential,
  validationAge,
  validationName,
  validationTalk,
  validationWatchedAt,
  validatationRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { addNewTalker, newObject } = await addTalker(name, age, talk);
    await fs.writeFile(talkerPath, addNewTalker);
    return res.status(201).json(newObject);
  });

app.patch('/talker/rate/:id',
  validationCredential,
  validateRateBodyExist,
  validateRateBodyFormat,
  async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const talkers = await readTalkers();

    const oldTalkers = talkers.filter((talker) => talker.id !== Number(id));
    const updateTalker = talkers.find((talker) => talker.id === Number(id));
    updateTalker.talk.rate = rate;

    if (oldTalkers && updateTalker) {
      const insertNewTalker = JSON.stringify([...oldTalkers, updateTalker]);
      await fs.writeFile(talkerPath, insertNewTalker);
    }

    return res.status(204).end();
  });

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await readTalkers();
    const { id } = req.params;

    const talkerById = talkers.find((talker) => talker.id === Number(id));
    if (!talkerById) {
      res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerById);
  } catch (err) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.put('/talker/:id',
  validationCredential,
  validationAge,
  validationName,
  validationTalk,
  validationWatchedAt,
  validatationRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const { watchedAt, rate } = talk;

    const talkers = await readTalkers();
    const updateTalker = talkers.find((talker) => talker.id === Number(id));

    if (!updateTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    updateTalker.name = name;
    updateTalker.age = age;
    updateTalker.talk.watchedAt = watchedAt;
    updateTalker.talk.rate = rate;

    const editNewTalker = JSON.stringify([...talkers, updateTalker]);
    await fs.writeFile(talkerPath, editNewTalker);
    return res.status(200).json(updateTalker);
  });

app.delete('/talker/:id', validationCredential, async (req, res) => {
  const { id } = req.params;

  const talkers = await readTalkers();

  const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));

  await fs.writeFile(talkerPath, JSON.stringify(updatedTalkers, null, 2));

  res.status(204).end();
});
