const express = require('express');
const fs = require('fs').promises;
const path = require('path');

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

async function readTalkers() {
  try {
    const talkers = await fs.readFile(talkerPath);
    return JSON.parse(talkers);
  } catch (error) {
    // res.status(200).json([]);
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
}

async function getTalkerById(id) {
  try {
    const talkers = await fs.readFile(talkerPath);
    const parsedTalkers = JSON.parse(talkers);
    return parsedTalkers.find((talker) => talker.id === id);
  } catch (err) {
    res.status(400).send({ message: 'Pessoa palestrante não encontrada' });
  }
}

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
  } catch (err) {
    res.status(200).json([]);
  }
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
