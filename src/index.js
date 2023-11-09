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
    res.status(200).json([]);
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
