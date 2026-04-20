const app = require('./src/app');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${DB_HOST}:${PORT}`);
});
