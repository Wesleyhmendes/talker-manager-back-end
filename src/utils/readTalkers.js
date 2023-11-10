const path = require('path');
const fs = require('fs').promises;

const talkerPath = path.resolve(__dirname, '../talker.json');

async function readTalkers() {
  try {
    const talkers = await fs.readFile(talkerPath);
    return JSON.parse(talkers);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
}

module.exports = readTalkers;