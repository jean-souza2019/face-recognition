const express = require("express");
const { getModelFile } = require("../controllers/modelsController");

const router = express.Router();

// Endpoint para servir modelos dinamicamente
router.get("/models/:modelName", getModelFile);

module.exports = router;
