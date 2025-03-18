const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('node:fs');
const container = require('./container');
const https = require('https'); // ✅ Importando o https
const path = require('path');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf8'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes = [
  require("./routes/authRoutes")(container.authController),
  require("./routes/groupRoutes")(container.groupController),
  require("./routes/faceRoutes")(container.faceController),
  require("./routes/modelsRoutes")
];

routes.forEach((module) => {
  app.use(`/api`, module);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const sslOptions = {
//   key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),   // 🔑 Chave privada
//   cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem'))  // 📜 Certificado público
// };

// // ✅ Criar o servidor HTTPS
// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`🚀 Server running with HTTPS on https://localhost:${PORT}`);
// });
