const fs = require('fs');
const { join } = require('path');
const { debug } = require('console');

const updateLatestTime = (filepath, text) => {
  fs.writeFile(filepath, text, (err) => {
    if (err) debug(`[⚠️] Error: ${err.message}`);
  });
};

const initializer = () => {
  debug('[🌳] Rimbun - Start the program!');
  const fileName = 'UPDATE.md';
  const filePath = join(__dirname, fileName);
  const textData = `# Rimbun - Latest Update\n\n\`🌳 ${new Date().toString()}\``;
  debug('[🌳] Updating `UPDATE.md` ...');
  updateLatestTime(filePath, textData);
  debug('[🌳] Update successful! Program closed!');
};

initializer();
