const fs = require("fs");
const path = require("path");

async function listIcons() {
  const dir = path.join(__dirname, "../Public/Assets/Icons");
  const files = await fs.promises.readdir(dir);

  return files.map(file => `../Assets/Icons/${file}`);
}

module.exports = { listIcons };