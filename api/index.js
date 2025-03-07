const express = require('express');
const container = require('./container');
const authRoutes = require('./routes/authRoutes')(container.authController);
const dashboardRoutes = require('./routes/dashboardRoutes')();
const groupRoutes = require('./routes/groupRoutes')(container.groupController);

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', groupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
