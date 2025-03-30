const express = require("express");
const { getModelFile } = require("../controllers/modelsController");
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Endpoint para servir modelos dinamicamente
router.get("/models/:modelName", authenticateToken, getModelFile);

module.exports = router;
