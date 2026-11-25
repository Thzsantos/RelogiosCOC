const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use(authRoutes);


app.get('/', (req, res) => res.json({ msg: "Backend rodando na rota principal" }));

const authMiddleware = require('./middlewares/authMiddleware')

app.get('/api/perfil', authMiddleware, (req, res) => res.json({ msg: " vc esta logado" }));

module.exports = app;



