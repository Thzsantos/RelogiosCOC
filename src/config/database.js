
require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar:', err.message);
        return;
    }

    console.log('✅ Conectado ao MySQL com sucesso!');
    connection.release();
});

module.exports = pool.promise();
