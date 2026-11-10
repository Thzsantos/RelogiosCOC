const db = require('./database');
 
(async function testarConexao() {
  try {
    const [rows] = await db.query('SELECT NOW() AS dataHora');
 
    console.log('✅ Banco conectado!');
    console.log(rows);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
})();