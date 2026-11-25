require('dotenv').config();

const app = require('./app'); // usa o app configurado no app.js
const db = require('./config/database');

const PORT = process.env.SERVER_PORT || 3000;

db.query('SELECT 1')
  .then(() => {
    console.log('Tudo de Bom no Mysql 👍');
    app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ ERRO no MYSQL', err.message));











// export const dbConfig = Object.freeze({
//   host: "localhost",
//   port: 5432,
// });
 
// export default async function conectarBanco() {
//   console.log("Iniciando conexão simulada com o banco...");
 
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Conexão simulada estabelecida com sucesso!");
//     }, 1000);
//   });
// }