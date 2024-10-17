import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web_nangcao'
});

const connection = pool.promise();

export default connection;