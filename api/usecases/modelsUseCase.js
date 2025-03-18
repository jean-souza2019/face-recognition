const path = require("path");

const getModelPath = (modelName) => {
  return path.join(__dirname, "..", "config", "models", modelName);
};

module.exports = { getModelPath };
