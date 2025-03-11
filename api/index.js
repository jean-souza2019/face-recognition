const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('node:fs');
const container = require('./container');
const authRoutes = require('./routes/authRoutes')(container.authController);
const dashboardRoutes = require('./routes/dashboardRoutes')();
const groupRoutes = require('./routes/groupRoutes')(container.groupController);

const app = express();
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf8'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', groupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
