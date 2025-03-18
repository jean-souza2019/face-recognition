const path = require("path");

const getModelFile = (req, res) => {
  const { modelName } = req.params;

  // Caminho onde os modelos estão armazenados
  const modelsDirectory = path.join(__dirname, "..", "config", "models");

  // Caminho completo do arquivo solicitado
  const filePath = path.join(modelsDirectory, modelName);

  // Enviar o arquivo se ele existir
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Erro ao enviar o modelo: ${modelName}`, err);
      res.status(err.status || 500).json({ error: "Erro ao carregar modelo" });
    }
  });
};

module.exports = { getModelFile };
