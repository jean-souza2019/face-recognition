const fs = require("fs");
const { getModelPath } = require("../usecases/modelsUseCase");

const getModel = (modelName) => {
  const filePath = getModelPath(modelName);

  if (!fs.existsSync(filePath)) {
    throw new Error("Modelo não encontrado.");
  }

  return filePath;
};

module.exports = { getModel };
