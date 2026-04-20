const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');
const boletoRoutes = require('./routes/boletoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/boletos', boletoRoutes);

module.exports = app;
