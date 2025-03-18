const fs = require("fs");
const path = require("path");

const validateModel = (req, res, next) => {
  const { modelName } = req.params;
  const filePath = path.join(__dirname, "..", "config", "models", modelName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Modelo não encontrado." });
  }

  next();
};

module.exports = validateModel;
